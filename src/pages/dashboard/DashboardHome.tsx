import { Image, Upload, Zap } from "lucide-react";

export default function DashboardHome() {
  return (
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
  );
}

