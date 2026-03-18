import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (username: string, password: string) => boolean;
  onRegister: (username: string, password: string) => boolean;
}

export function AuthModal({
  open,
  onOpenChange,
  onLogin,
  onRegister,
}: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const reset = () => {
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleSubmit = () => {
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    const success =
      tab === "login"
        ? onLogin(username, password)
        : onRegister(username, password);
    if (success) {
      reset();
      onOpenChange(false);
    } else {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val);
        if (!val) reset();
      }}
    >
      <DialogContent
        data-ocid="auth.modal"
        className="sm:max-w-md"
        style={{ borderRadius: "14px" }}
      >
        <DialogHeader>
          <DialogTitle
            className="text-xl font-bold"
            style={{ color: "#1B2430" }}
          >
            Welcome to Mechtools
          </DialogTitle>
        </DialogHeader>
        <Tabs
          value={tab}
          onValueChange={(v) => {
            setTab(v as "login" | "register");
            setError("");
          }}
        >
          <TabsList className="w-full mb-4">
            <TabsTrigger data-ocid="auth.tab" value="login" className="flex-1">
              Sign In
            </TabsTrigger>
            <TabsTrigger
              data-ocid="auth.tab"
              value="register"
              className="flex-1"
            >
              Register
            </TabsTrigger>
          </TabsList>

          {["login", "register"].map((t) => (
            <TabsContent key={t} value={t} className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor={`${t}-username`}
                  className="text-sm font-medium"
                >
                  Username
                </Label>
                <Input
                  id={`${t}-username`}
                  data-ocid="auth.input"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor={`${t}-password`}
                  className="text-sm font-medium"
                >
                  Password
                </Label>
                <Input
                  id={`${t}-password`}
                  data-ocid="auth.input"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>

              {error && (
                <div
                  data-ocid="auth.error_state"
                  className="flex items-center gap-2 p-3 rounded-lg text-sm"
                  style={{
                    background: "rgba(220,38,38,0.07)",
                    color: "#DC2626",
                  }}
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <Button
                data-ocid="auth.submit_button"
                className="w-full font-semibold tracking-wide uppercase text-sm"
                style={{ background: "#2F6FB8", color: "white" }}
                onClick={handleSubmit}
              >
                {t === "login" ? "Sign In" : "Create Account"}
              </Button>

              <Button
                data-ocid="auth.cancel_button"
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => {
                  onOpenChange(false);
                  reset();
                }}
              >
                Cancel
              </Button>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
