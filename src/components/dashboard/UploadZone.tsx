import { useState, useCallback } from "react";
import { Upload, Image, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

const UploadZone = () => {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((f: File) => {
    setError(null);
    setResult(null);

    if (!ACCEPTED.includes(f.type)) {
      setError("Only JPG, PNG, and WEBP formats are supported.");
      return;
    }
    if (f.size > MAX_SIZE) {
      setError("File size must be under 10 MB.");
      return;
    }

    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const onSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleProcess = async () => {
    if (!file) {
      setError("Please upload an image first.");
      return;
    }

    try {
      setProcessing(true);
      setError(null);

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/remove-background", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let message = "Failed to remove background. Please try again.";
        try {
          const data = await response.json();
          if (data?.error) message = data.error;
        } catch {
          // ignore JSON parse errors
        }
        throw new Error(message);
      }

      const data: { image?: string } = await response.json();

      if (!data.image) {
        throw new Error("Server did not return a processed image.");
      }

      setResult(data.image);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error while processing image.";
      setError(message);
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {!preview ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`border-2 border-dashed rounded-lg p-16 text-center transition-all duration-300 cursor-pointer ${
            dragOver
              ? "border-primary bg-primary/5 neon-glow"
              : "border-border hover:border-primary/50"
          }`}
        >
          <input type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden" id="upload" onChange={onSelect} />
          <label htmlFor="upload" className="cursor-pointer">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-display font-semibold mb-1">Drop your image here</p>
            <p className="text-sm text-muted-foreground">or click to browse · JPG, PNG, WEBP · Max 10 MB</p>
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Original */}
            <div className="glass-card rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">Original</span>
                <button onClick={reset} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="aspect-square rounded-md overflow-hidden bg-background flex items-center justify-center">
                <img src={preview} alt="Original" className="max-w-full max-h-full object-contain" />
              </div>
            </div>

            {/* Result */}
            <div className="glass-card rounded-lg p-4">
              <span className="text-sm font-medium text-muted-foreground mb-3 block">Result</span>
              <div className="aspect-square rounded-md overflow-hidden bg-[repeating-conic-gradient(hsl(var(--muted))_0%_25%,hsl(var(--background))_0%_50%)] bg-[length:20px_20px] flex items-center justify-center">
                {processing ? (
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                ) : result ? (
                  <img src={result} alt="Result" className="max-w-full max-h-full object-contain" />
                ) : (
                  <Image className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            {!result ? (
              <Button variant="gradient" size="lg" onClick={handleProcess} disabled={processing}>
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                  </>
                ) : (
                  "Remove Background"
                )}
              </Button>
            ) : (
              <>
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={() => {
                    if (!result) return;
                    const link = document.createElement("a");
                    link.href = result;
                    link.download = "snapcut-background-removed.png";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Download className="w-4 h-4 mr-1" /> Download
                </Button>
                <Button variant="neon" size="lg" onClick={reset}>
                  New Image
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="text-destructive text-sm text-center mt-4">{error}</p>
      )}
    </div>
  );
};

export default UploadZone;
