import { Zap, Shield, Image, Code, CreditCard, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Remove backgrounds in under 5 seconds with our optimized AI pipeline.",
  },
  {
    icon: Image,
    title: "HD Quality",
    description: "Support for images up to 5000×5000px in JPG, PNG, and WEBP formats.",
  },
  {
    icon: Shield,
    title: "Secure Processing",
    description: "Images auto-delete after 24 hours. No permanent storage, full privacy.",
  },
  {
    icon: Code,
    title: "Developer API",
    description: "RESTful API with rate limiting, usage tracking, and comprehensive docs.",
  },
  {
    icon: CreditCard,
    title: "Flexible Plans",
    description: "Free tier with 5 images/day, unlimited Pro plans, and credit packs.",
  },
  {
    icon: BarChart3,
    title: "Usage Dashboard",
    description: "Track uploads, credits, and downloads with real-time analytics.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Professional background removal with enterprise-grade features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-lg p-6 hover-neon transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
