import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8081;

const upload = multer({ storage: multer.memoryStorage() });

if (!process.env.CLIPDROP_API_KEY) {
  // eslint-disable-next-line no-console
  console.warn(
    "[server] CLIPDROP_API_KEY is not set. /api/remove-background will fail until you add it to your environment.",
  );
}

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.post("/api/remove-background", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No image file provided." });
    }

    if (!process.env.CLIPDROP_API_KEY) {
      return res.status(500).json({ error: "CLIPDROP_API_KEY is not configured on the server." });
    }

    const formData = new FormData();
    const blob = new Blob([file.buffer], { type: file.mimetype || "image/png" });
    formData.append("image_file", blob, file.originalname);

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
      // eslint-disable-next-line no-console
      console.error("[server] Clipdrop error:", clipdropResponse.status, errorBody);
      return res.status(clipdropResponse.status).json(errorBody);
    }

    const arrayBuffer = await clipdropResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;

    return res.json({ image: dataUrl });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[server] Unexpected error:", err);
    return res.status(500).json({ error: "Unexpected server error while processing image." });
  }
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] Listening on http://localhost:${port}`);
});

