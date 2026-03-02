import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { CreditCard, History, Image, LayoutDashboard, LogOut, Settings, Upload, Zap } from "lucide-react";
import { useMemo } from "react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard/home" },
  { icon: Upload, label: "Upload", to: "/dashboard/upload" },
  { icon: History, label: "History", to: "/dashboard/history" },
  { icon: CreditCard, label: "Billing", to: "/dashboard/billing" },
  { icon: Settings, label: "Settings", to: "/dashboard/settings" },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const activeTo = useMemo(() => {
    const match = navItems.find((x) => location.pathname.startsWith(x.to));
    return match?.to ?? "/dashboard/upload";
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex">
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
              key={item.to}
              onClick={() => navigate(item.to)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeTo === item.to
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

          <div className="px-3 pb-2">
            <p className="text-xs text-muted-foreground truncate">
              {user?.email ? `Signed in as ${user.email}` : "Guest mode"}
            </p>
          </div>
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}

