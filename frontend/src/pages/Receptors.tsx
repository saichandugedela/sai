import { useState } from "react";
import { CompoundInput } from "@/components/CompoundInput";
import { ResultCard } from "@/components/ResultCard";
import { RadarChartComponent } from "@/components/RadarChart";
import { SmilesStructure } from "@/components/SmilesStructure";
import { ChemicalStructure } from "@/components/ChemicalStructure";
import { RuleOfThreeRadar } from "@/components/RuleOfThreeRadar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { api } from "@/lib/api";

const receptors = [
  { id: "5-HT1A", name: "5-HT1A Receptor", info: "Modulates anxiety, mood, and stress response. Key target for antidepressants." },
  { id: "5-HT1B", name: "5-HT1B Receptor", info: "Regulates serotonin release and involved in migraine pathophysiology." },
  { id: "5-HT1D", name: "5-HT1D Receptor", info: "Implicated in migraine and vasoconstriction processes." },
  { id: "5-HT2A", name: "5-HT2A Receptor", info: "Primary target for psychedelics and atypical antipsychotics." },
  { id: "5-HT2B", name: "5-HT2B Receptor", info: "Linked to cardiac valvulopathy; important safety consideration." },
  { id: "5-HT2C", name: "5-HT2C Receptor", info: "Regulates appetite, mood, and energy balance." },
  { id: "5-HT3", name: "5-HT3 Receptor", info: "Ion channel receptor; target for anti-emetics." },
  { id: "5-HT4", name: "5-HT4 Receptor", info: "Involved in gastrointestinal motility and cognition." },
  { id: "5-HT5A", name: "5-HT5A Receptor", info: "Role in circadian rhythms and memory processes." },
  { id: "5-HT6", name: "5-HT6 Receptor", info: "Target for cognitive enhancement in neurodegenerative diseases." },
  { id: "5-HT7", name: "5-HT7 Receptor", info: "Modulates mood, circadian rhythms, and smooth muscle relaxation." },
];

export default function Receptors() {
  const [selectedReceptor, setSelectedReceptor] = useState<string>("");
  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleValidate = async (compoundName: string) => {
    if (!selectedReceptor) {
      toast.error("Please select a receptor first");
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await api.predictReceptor(compoundName, selectedReceptor);
      setPrediction(result);
      setShowResults(true);
      toast.success("Prediction complete!");
    } catch (error: any) {
      toast.error(error.message || "Prediction failed");
      setShowResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  const radarData = prediction ? [
    { parameter: "MW ≤500", value: (prediction.molecularWeight / 500) * 100, threshold: 100, actual: prediction.molecularWeight, limit: 500 },
    { parameter: "logP ≤5", value: (prediction.logP / 5) * 100, threshold: 100, actual: prediction.logP, limit: 5 },
    { parameter: "HBD ≤5", value: (prediction.hbd / 5) * 100, threshold: 100, actual: prediction.hbd, limit: 5 },
    { parameter: "HBA ≤10", value: (prediction.hba / 10) * 100, threshold: 100, actual: prediction.hba, limit: 10 },
    { parameter: "TPSA ≤140", value: (prediction.tpsa / 140) * 100, threshold: 100, actual: prediction.tpsa, limit: 140 },
  ] : [];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-heading font-bold gradient-text">
            5-HT Receptor Prediction
          </h1>
          <p className="text-muted-foreground">
            Predict ligand binding affinity (pKi) for serotonin receptor subtypes
          </p>
        </div>

        {/* Core Concept */}
        <div className="glass-card p-6 rounded-xl border border-primary/20 bg-primary/5">
          <h2 className="text-xl font-heading font-semibold mb-3 text-primary">
            🧠 Core Concept
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Serotonin receptors (5-HT1–7) control emotion and cognition. Measuring pKi helps identify molecules with strong potential for antidepressant or neuroactive effects. Higher pKi values indicate stronger binding affinity — essential for effective drug action.
          </p>
        </div>

        {/* Input Section */}
        <div className="glass-card p-6 rounded-xl border border-primary/20 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="receptor" className="text-sm font-medium">
              Select Receptor Subtype
            </Label>
            <div className="flex gap-2">
              <Select value={selectedReceptor} onValueChange={setSelectedReceptor}>
                <SelectTrigger className="glass-card border-primary/30">
                  <SelectValue placeholder="Choose a receptor..." />
                </SelectTrigger>
                <SelectContent className="glass-card border-primary/30">
                  {receptors.map((receptor) => (
                    <SelectItem key={receptor.id} value={receptor.id}>
                      {receptor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedReceptor && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="glass-card px-3 rounded-lg border border-primary/30 hover-glow smooth-transition">
                        <Info className="w-4 h-4 text-primary" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="glass-card border-primary/30 max-w-xs">
                      <p className="text-sm">
                        {receptors.find(r => r.id === selectedReceptor)?.info}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>

          <CompoundInput onValidate={handleValidate} isLoading={isLoading} />
        </div>

        {/* Results Section */}
        {showResults && prediction && (
          <div className="space-y-6 animate-fade-in">
            {/* Basic Results */}
            <div className="grid md:grid-cols-2 gap-6">
              <ResultCard
                type={prediction.isActive ? "success" : "error"}
                title={`${selectedReceptor} Binding Affinity`}
                description={`Predicted pKi value for ${selectedReceptor} receptor binding`}
                value={prediction.pKi}
              />
              
              <ResultCard
                type={prediction.applicabilityDomain === "Within" ? "success" : "error"}
                title="Applicability Domain"
                description={`Prediction ${prediction.applicabilityDomain.toLowerCase()} domain`}
                value={prediction.applicabilityDomain}
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

            {/* Radar Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <RadarChartComponent
                title="Lipinski's Rule of Five"
                description="Drug-likeness assessment based on molecular properties"
                data={radarData}
              />
              <RuleOfThreeRadar
                molecularWeight={prediction.molecularWeight}
                logP={prediction.logP}
                hbd={prediction.hbd}
                hba={prediction.hba}
                tpsa={prediction.tpsa}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
