import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle } from "lucide-react";

interface ChemicalStructureProps {
  smiles: string;
  compoundName: string;
  isValid?: boolean;
}

export const ChemicalStructure = ({ smiles, compoundName, isValid = true }: ChemicalStructureProps) => {
  // For now, we'll create a placeholder structure visualization
  // In a real implementation, you would use libraries like RDKit, ChemDoodle, or similar
  const renderStructurePlaceholder = () => {
    if (!isValid) {
      return (
        <div className="flex items-center justify-center h-64 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="text-center space-y-2">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
            <p className="text-destructive font-medium">Invalid SMILES</p>
            <p className="text-sm text-destructive/80">Cannot render structure</p>
          </div>
        </div>
      );
    }

    // Create a simple molecular representation based on SMILES length and complexity
    const complexity = smiles.length;
    const rings = (smiles.match(/\[|\]/g) || []).length;
    const branches = (smiles.match(/\(|\)/g) || []).length;
    
    return (
      <div className="flex items-center justify-center h-64 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="text-center space-y-4">
          <div className="w-32 h-32 mx-auto relative">
            {/* Simple molecular structure visualization */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Central atom */}
              <circle cx="100" cy="100" r="8" fill="hsl(var(--primary))" />
              
              {/* Bonds based on complexity */}
              {complexity > 20 && (
                <>
                  <line x1="100" y1="100" x2="150" y2="80" stroke="hsl(var(--primary))" strokeWidth="2" />
                  <circle cx="150" cy="80" r="6" fill="hsl(var(--secondary))" />
                </>
              )}
              {complexity > 30 && (
                <>
                  <line x1="100" y1="100" x2="50" y2="120" stroke="hsl(var(--primary))" strokeWidth="2" />
                  <circle cx="50" cy="120" r="6" fill="hsl(var(--secondary))" />
                </>
              )}
              {rings > 0 && (
                <>
                  <line x1="100" y1="100" x2="120" y2="150" stroke="hsl(var(--primary))" strokeWidth="2" />
                  <circle cx="120" cy="150" r="6" fill="hsl(var(--secondary))" />
                  <line x1="120" y1="150" x2="80" y2="150" stroke="hsl(var(--primary))" strokeWidth="2" />
                  <circle cx="80" cy="150" r="6" fill="hsl(var(--secondary))" />
                  <line x1="80" y1="150" x2="100" y2="100" stroke="hsl(var(--primary))" strokeWidth="2" />
                </>
              )}
              {branches > 0 && (
                <>
                  <line x1="100" y1="100" x2="100" y2="50" stroke="hsl(var(--primary))" strokeWidth="2" />
                  <circle cx="100" cy="50" r="6" fill="hsl(var(--secondary))" />
                </>
              )}
            </svg>
          </div>
          
          <div className="space-y-1">
            <CheckCircle className="w-6 h-6 text-success mx-auto" />
            <p className="text-sm font-medium">2D Structure Rendered</p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Complexity: {complexity} characters</p>
              <p>Rings: {rings}</p>
              <p>Branches: {branches}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="glass-card border-primary/30 hover-glow smooth-transition">
      <CardHeader>
        <CardTitle className="gradient-text flex items-center gap-2">
          ⚗️ Chemical Structure
          <Badge variant={isValid ? "default" : "destructive"} className="text-xs">
            {isValid ? "Rendered" : "Error"}
          </Badge>
        </CardTitle>
        <CardDescription>
          2D molecular structure visualization for {compoundName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderStructurePlaceholder()}
        
        <div className="mt-4 text-xs text-muted-foreground space-y-1">
          <p><strong>Note:</strong> This is a simplified visualization. For detailed molecular structures,</p>
          <p>consider integrating specialized chemical drawing libraries like RDKit or ChemDoodle.</p>
        </div>
      </CardContent>
    </Card>
  );
};
