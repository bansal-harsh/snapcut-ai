import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/landing/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-6">
            This is a placeholder privacy policy page. Update it before launching publicly.
          </p>
          <div className="glass-card rounded-lg p-6 space-y-4 text-sm text-muted-foreground">
            <p>
              We process uploaded images only to provide the background removal result. If you enable
              history, items may be stored locally in your browser.
            </p>
            <p>
              If you connect real authentication and a database later, you can store history per
              account on the server.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

