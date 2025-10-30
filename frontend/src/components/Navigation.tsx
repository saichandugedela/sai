import { Home, Dna, Beaker, FolderOpen, Pill, Brain, HelpCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Dna, label: "5-HT Receptors", path: "/receptors" },
  { icon: Beaker, label: "SERT", path: "/sert" },
  { icon: Pill, label: "HIA", path: "/hia" },
  { icon: Brain, label: "BBB", path: "/bbb" },
  { icon: FolderOpen, label: "Batch", path: "/batch" },
  { icon: HelpCircle, label: "Help", path: "/help" },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover-scale">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center glow-effect">
              <Dna className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-heading font-bold gradient-text">
              SerotoninAI
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg smooth-transition",
                    "hover:bg-muted/50",
                    isActive && "bg-primary/20 text-primary"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline text-sm font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
