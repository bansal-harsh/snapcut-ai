import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useHistory } from "@/hooks/useHistory";
import { Download, History, Trash2, X } from "lucide-react";

function formatDate(ts: number) {
  return new Date(ts).toLocaleString();
}

export default function HistoryPanel() {
  const { user } = useAuth();
  const { items, clear, remove } = useHistory(user?.email);

  if (items.length === 0) {
    return (
      <div className="glass-card rounded-lg p-8 text-center text-muted-foreground">
        <History className="w-10 h-10 mx-auto mb-3 opacity-50" />
        <p>No uploads yet. Process your first image to see history here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Showing {items.length} item{items.length === 1 ? "" : "s"}
          {user?.email ? ` for ${user.email}` : " (guest)"}
        </p>
        <Button variant="outline" size="sm" onClick={clear} className="gap-2">
          <Trash2 className="w-4 h-4" />
          Clear
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="glass-card rounded-lg p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{item.fileName || "Image"}</p>
                <p className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</p>
              </div>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => remove(item.id)}
                aria-label="Remove history item"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md overflow-hidden bg-background/50 border border-border/50 aspect-square flex items-center justify-center">
                {item.originalDataUrl ? (
                  <img src={item.originalDataUrl} alt="Original" className="max-w-full max-h-full object-contain" />
                ) : (
                  <span className="text-xs text-muted-foreground">Original</span>
                )}
              </div>
              <div className="rounded-md overflow-hidden bg-[repeating-conic-gradient(hsl(var(--muted))_0%_25%,hsl(var(--background))_0%_50%)] bg-[length:20px_20px] border border-border/50 aspect-square flex items-center justify-center">
                <img src={item.resultDataUrl} alt="Result" className="max-w-full max-h-full object-contain" />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                variant="gradient"
                size="sm"
                className="gap-2"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = item.resultDataUrl;
                  link.download = "snapcut-background-removed.png";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

