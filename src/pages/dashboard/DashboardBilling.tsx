import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function DashboardBilling() {
  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Billing</h1>
      <div className="glass-card rounded-lg p-6">
        <p className="text-muted-foreground mb-4">
          You're on the <span className="text-foreground font-medium">Free Plan</span> — 5 images/day.
        </p>
        <Button variant="gradient" asChild>
          <Link to="/#pricing">Upgrade to Pro</Link>
        </Button>
      </div>
    </div>
  );
}

