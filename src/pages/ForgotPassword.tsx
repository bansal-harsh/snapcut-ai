import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Mail, Zap } from "lucide-react";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg gradient-btn flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold gradient-text">SnapCut AI</span>
          </Link>
          <h1 className="text-2xl font-display font-bold">Reset your password</h1>
          <p className="text-sm text-muted-foreground mt-1">
            This is a placeholder until real auth is connected.
          </p>
        </div>

        <div className="glass-card rounded-lg p-6 space-y-5">
          {!sent ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 h-11 bg-background"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <Button
                variant="gradient"
                className="w-full h-11"
                disabled={!email.trim()}
                onClick={() => setSent(true)}
              >
                Send reset link
              </Button>
              <p className="text-xs text-muted-foreground">
                After you add real authentication, this should send an email reset link.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                If an account exists for <span className="text-foreground font-medium">{email}</span>,
                we sent a reset link.
              </p>
              <Button variant="outline" className="w-full h-11" asChild>
                <Link to="/login">Back to Sign In</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

