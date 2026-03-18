import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, Wrench } from "lucide-react";
import type { AuthUser } from "../types";

interface NavbarProps {
  user: AuthUser | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export function Navbar({ user, onLoginClick, onLogout }: NavbarProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 md:px-10"
      style={{
        background: "linear-gradient(90deg, #071A2A 0%, #0B2A3D 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5 flex-1">
        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
          <Wrench className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-bold text-xl tracking-tight">
          Mechtools
        </span>
        <span
          className="ml-1 text-xs font-medium px-1.5 py-0.5 rounded"
          style={{ background: "rgba(47,111,184,0.25)", color: "#7BAEDE" }}
        >
          Engineering Suite
        </span>
      </div>

      {/* Auth */}
      <div className="flex items-center gap-3">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                data-ocid="nav.toggle"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-white cursor-pointer transition-colors hover:bg-white/10"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <Avatar className="w-6 h-6">
                  <AvatarFallback
                    className="text-xs font-bold"
                    style={{ background: "#2F6FB8", color: "white" }}
                  >
                    {user.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{user.username}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem
                data-ocid="nav.delete_button"
                onClick={onLogout}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            data-ocid="nav.primary_button"
            size="sm"
            onClick={onLoginClick}
            className="font-semibold tracking-wide text-xs uppercase"
            style={{ background: "#2F6FB8", color: "white" }}
          >
            Login / Register
          </Button>
        )}
      </div>
    </nav>
  );
}
