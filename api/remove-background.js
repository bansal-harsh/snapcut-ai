import Busboy from "busboy";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB (match frontend)

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const bb = Busboy({
      headers: req.headers,
      limits: {
        files: 1,
        fileSize: MAX_SIZE,
      },
    });

    /** @type {{buffer: Buffer, mimeType: string, filename: string} | null} */
    let fileOut = null;
    let fileTooLarge = false;

    bb.on("file", (fieldname, file, info, encoding, mimetype) => {
      if (fieldname !== "image") {
        file.resume();
        return;
      }

      let filename = "upload";
      let mimeType = "application/octet-stream";

      // busboy v1: (fieldname, file, info)
      if (typeof info === "object" && info !== null) {
        filename = info.filename || filename;
        mimeType = info.mimeType || mimeType;
      } else {
        // older: (fieldname, file, filename, encoding, mimetype)
        filename = info || filename;
        mimeType = mimetype || mimeType;
      }

      const chunks = [];
      let total = 0;

      file.on("data", (d) => {
        chunks.push(d);
        total += d.length;
      });

      file.on("limit", () => {
        fileTooLarge = true;
        file.resume();
      });

      file.on("end", () => {
        if (fileTooLarge) return;
        fileOut = { buffer: Buffer.concat(chunks, total), mimeType, filename };
      });
    });

    bb.on("error", reject);

    bb.on("finish", () => {
      if (fileTooLarge) {
        reject(Object.assign(new Error("File too large. Max 10 MB."), { statusCode: 413 }));
        return;
      }
      if (!fileOut) {
        reject(Object.assign(new Error("No image file provided."), { statusCode: 400 }));
        return;
      }
      resolve(fileOut);
    });

    req.pipe(bb);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    res.json({ error: "Method not allowed" });
    return;
  }

  if (!process.env.CLIPDROP_API_KEY) {
    res.statusCode = 500;
    res.json({ error: "CLIPDROP_API_KEY is not configured on the server." });
    return;
  }

  try {
    const { buffer, mimeType, filename } = await parseMultipart(req);

    const formData = new FormData();
    formData.append("image_file", new Blob([buffer], { type: mimeType }), filename);

    const clipdropResponse = await fetch("https://clipdrop-api.co/remove-background/v1", {
      method: "POST",
      headers: {
        "x-api-key": process.env.CLIPDROP_API_KEY,
      },
      body: formData,
    });

    if (!clipdropResponse.ok) {
      let errorBody;
      try {
        errorBody = await clipdropResponse.json();
      } catch {
        errorBody = { error: await clipdropResponse.text() };
      }
      res.statusCode = clipdropResponse.status;
      res.json(errorBody);
      return;
    }

    const arrayBuffer = await clipdropResponse.arrayBuffer();
    const outBuffer = Buffer.from(arrayBuffer);
    const base64 = outBuffer.toString("base64");
    res.statusCode = 200;
    res.json({ image: `data:image/png;base64,${base64}` });
  } catch (err) {
    const statusCode = typeof err === "object" && err && "statusCode" in err ? err.statusCode : 500;
    const message = err instanceof Error ? err.message : "Unexpected error while processing image.";
    res.statusCode = Number(statusCode) || 500;
    res.json({ error: message });
  }
}

