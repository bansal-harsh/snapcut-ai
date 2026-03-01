import { Link, useNavigate } from "react-router-dom";
import { Zap, LayoutDashboard, Upload, History, CreditCard, Settings, LogOut, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadZone from "@/components/dashboard/UploadZone";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Upload, label: "Upload", id: "upload" },
  { icon: History, label: "History", id: "history" },
  { icon: CreditCard, label: "Billing", id: "billing" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const Dashboard = () => {
  const [active, setActive] = useState("upload");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border/50 glass-card">
        <div className="p-4 border-b border-border/50">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-btn flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold gradient-text">SnapCut AI</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border/50">
          {/* Credits */}
          <div className="glass-card rounded-lg p-3 mb-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Credits</span>
              <span className="font-medium text-primary">3 / 5</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-3/5 gradient-btn rounded-full" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Resets daily · Free Plan</p>
          </div>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-10">
        {active === "upload" && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-display font-bold">Remove Background</h1>
              <p className="text-muted-foreground text-sm mt-1">Upload an image to get started</p>
            </div>
            <UploadZone />
          </div>
        )}

        {active === "dashboard" && (
          <div>
            <h1 className="text-2xl font-display font-bold mb-6">Dashboard</h1>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Images Today", value: "2", icon: Image },
                { label: "Credits Left", value: "3", icon: Zap },
                { label: "Total Processed", value: "47", icon: Upload },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <p className="text-3xl font-display font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === "history" && (
          <div>
            <h1 className="text-2xl font-display font-bold mb-6">Upload History</h1>
            <div className="glass-card rounded-lg p-8 text-center text-muted-foreground">
              <History className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p>No uploads yet. Process your first image to see history here.</p>
            </div>
          </div>
        )}

        {active === "billing" && (
          <div>
            <h1 className="text-2xl font-display font-bold mb-6">Billing</h1>
            <div className="glass-card rounded-lg p-6">
              <p className="text-muted-foreground mb-4">You're on the <span className="text-foreground font-medium">Free Plan</span> — 5 images/day.</p>
              <Button variant="gradient" asChild>
                <Link to="/#pricing">Upgrade to Pro</Link>
              </Button>
            </div>
          </div>
        )}

        {active === "settings" && (
          <div>
            <h1 className="text-2xl font-display font-bold mb-6">Settings</h1>
            <div className="glass-card rounded-lg p-6 text-muted-foreground">
              Account settings will be available once authentication is connected.
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
