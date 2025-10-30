import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SmilesStructureProps {
  smiles: string;
  compoundName: string;
  isValid?: boolean;
}

export const SmilesStructure = ({ smiles, compoundName, isValid = true }: SmilesStructureProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(smiles);
      setCopied(true);
      toast.success("SMILES copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy SMILES");
    }
  };

  return (
    <Card className="glass-card border-primary/30 hover-glow smooth-transition">
      <CardHeader>
        <CardTitle className="gradient-text flex items-center gap-2">
          🧬 SMILES Structure
          <Badge variant={isValid ? "default" : "destructive"} className="text-xs">
            {isValid ? "Valid" : "Invalid"}
          </Badge>
        </CardTitle>
        <CardDescription>
          Canonical SMILES representation for {compoundName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <div className="glass-card p-4 rounded-lg border border-primary/20 bg-primary/5">
            <code className="text-sm font-mono break-all text-foreground">
              {smiles}
            </code>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="absolute top-2 right-2"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>SMILES:</strong> Simplified Molecular-Input Line-Entry System</p>
          <p><strong>Canonical:</strong> Standardized representation ensuring consistency</p>
          <p><strong>Usage:</strong> Used for molecular structure analysis and prediction</p>
        </div>
      </CardContent>
    </Card>
  );
};
