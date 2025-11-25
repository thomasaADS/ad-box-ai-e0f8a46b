import { Link, useLocation } from "react-router-dom";
import { Sparkles, FileText, BarChart3, Settings, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

export function TopNav() {
  const location = useLocation();
  const { t } = useTranslation();

  const links = [
    { href: "/brief", label: "ברייף", icon: FileText },
    { href: "/ai-chat", label: "AI Chat", icon: Sparkles },
    { href: "/landing-builder", label: "בניית אתר", icon: Globe },
    { href: "/dashboard", label: "קמפיינים", icon: BarChart3 },
    { href: "/settings", label: "הגדרות", icon: Settings },
  ];

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              AdSync
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
