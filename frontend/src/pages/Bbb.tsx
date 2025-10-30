import { useState } from "react";
import { CompoundInput } from "@/components/CompoundInput";
import { ResultCard } from "@/components/ResultCard";
import { SmilesStructure } from "@/components/SmilesStructure";
import { ChemicalStructure } from "@/components/ChemicalStructure";
import { toast } from "sonner";
import { api } from "@/lib/api";

export default function Bbb() {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const handleValidate = async (compoundName: string) => {
    setIsLoading(true);
    
    try {
      const result = await api.predictBbb(compoundName);
      setPrediction(result);
      setShowResults(true);
      toast.success("BBB prediction complete!");
    } catch (error: any) {
      toast.error(error.message || "Prediction failed");
      setShowResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-heading font-bold gradient-text">
            BBB Prediction
          </h1>
          <p className="text-muted-foreground">
            Blood-Brain Barrier penetration assessment
          </p>
        </div>

        {/* Core Concept */}
        <div className="glass-card p-6 rounded-xl border border-primary/20 bg-primary/5">
          <h2 className="text-xl font-heading font-semibold mb-3 text-primary">
            🧠 Core Concept
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The BBB protects the brain from harmful substances. For CNS (brain) drugs, the molecule must cross this barrier safely. ✅ Crosses BBB = Suitable for neurological drugs | ❌ Does not cross = For peripheral (non-brain) action only.
          </p>
        </div>

        <div className="glass-card p-6 rounded-xl border border-primary/20">
          <CompoundInput onValidate={handleValidate} isLoading={isLoading} />
        </div>

        {showResults && prediction && (
          <div className="animate-fade-in space-y-6">
            {/* Basic Results */}
            <div className="grid md:grid-cols-2 gap-6">
              <ResultCard
                type={prediction.bbbClassification === "BBB+" ? "success" : "error"}
                title="BBB Classification"
                description="Blood-Brain Barrier penetration prediction"
                value={prediction.bbbClassification}
              />
              
              <ResultCard
                type="success"
                title="BBB Probability"
                description={`Probability: ${(prediction.bbbProbability * 100).toFixed(1)}%`}
                value={`${(prediction.bbbProbability * 100).toFixed(1)}%`}
              />
            </div>

            {/* SMILES and Chemical Structure */}
            <div className="grid md:grid-cols-2 gap-6">
              <SmilesStructure
                smiles={prediction.smiles}
                compoundName={prediction.compoundName}
                isValid={true}
              />
              <ChemicalStructure
                smiles={prediction.smiles}
                compoundName={prediction.compoundName}
                isValid={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
