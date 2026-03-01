import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-btn flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold gradient-text">SnapCut AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <a href="#api" className="text-sm text-muted-foreground hover:text-foreground transition-colors">API</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button variant="gradient" size="sm" asChild>
            <Link to="/register">Get Started</Link>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-card border-t border-border/50 p-4 space-y-3">
          <a href="#features" className="block text-sm text-muted-foreground hover:text-foreground py-2">Features</a>
          <a href="#pricing" className="block text-sm text-muted-foreground hover:text-foreground py-2">Pricing</a>
          <a href="#api" className="block text-sm text-muted-foreground hover:text-foreground py-2">API</a>
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" size="sm" asChild className="flex-1">
              <Link to="/login">Log in</Link>
            </Button>
            <Button variant="gradient" size="sm" asChild className="flex-1">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
