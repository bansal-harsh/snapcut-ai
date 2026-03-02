import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/landing/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-6">
            This is a placeholder terms page. Update it before launching publicly.
          </p>
          <div className="glass-card rounded-lg p-6 space-y-4 text-sm text-muted-foreground">
            <p>
              By using SnapCut AI you agree not to upload unlawful content and to comply with third‑party
              API terms (e.g. Clipdrop).
            </p>
            <p>
              Service availability, quotas/credits, and fair-use limits may apply depending on your plan.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

