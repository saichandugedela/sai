import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, Loader2 } from "lucide-react";

interface CompoundInputProps {
  onValidate: (compound: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const CompoundInput = ({ 
  onValidate, 
  isLoading = false,
  placeholder = "Enter compound or drug name (e.g., Serotonin, Fluoxetine)"
}: CompoundInputProps) => {
  const [compound, setCompound] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (compound.trim()) {
      onValidate(compound.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="compound" className="text-sm font-medium">
          Compound Name
        </Label>
        <div className="flex gap-2">
          <Input
            id="compound"
            value={compound}
            onChange={(e) => setCompound(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="glass-card border-primary/30 focus:border-primary smooth-transition"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !compound.trim()}
            className="bg-gradient-to-r from-primary via-secondary to-accent hover-glow"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span className="ml-2">Search</span>
          </Button>
        </div>
      </div>
    </form>
  );
};
