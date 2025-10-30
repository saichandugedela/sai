import { useState } from "react";
import { Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { api } from "@/lib/api";

export default function Batch() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedModels, setSelectedModels] = useState<string[]>(["receptors"]);
  const [results, setResults] = useState<any[]>([]);

  const models = [
    { id: "receptors", label: "5-HT Receptors", description: "All serotonin receptor subtypes" },
    { id: "sert", label: "SERT", description: "Serotonin transporter binding" },
    { id: "hia", label: "HIA", description: "Human Intestinal Absorption" },
    { id: "bbb", label: "BBB", description: "Blood-Brain Barrier penetration" },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      toast.success(`File "${uploadedFile.name}" uploaded successfully`);
    }
  };

  const toggleModel = (modelId: string) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const handleProcess = async () => {
    if (!file) {
      toast.error("Please upload a file first");
      return;
    }
    if (selectedModels.length === 0) {
      toast.error("Please select at least one prediction model");
      return;
    }

    setIsProcessing(true);
    
    try {
      // Read CSV file
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      const header = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      let compoundColumn = -1;
      if (header.includes('compound_name')) {
        compoundColumn = header.indexOf('compound_name');
      } else if (header.includes('compoundname')) {
        compoundColumn = header.indexOf('compoundname');
      } else if (header.includes('name')) {
        compoundColumn = header.indexOf('name');
      } else {
        compoundColumn = 0; // Default to first column
      }

      const compounds = lines.slice(1).map(line => {
        const values = line.split(',');
        return values[compoundColumn]?.trim() || '';
      }).filter(c => c.length > 0);

      if (compounds.length === 0) {
        toast.error("No compounds found in file");
        setIsProcessing(false);
        return;
      }

      // Call batch API
      const result = await api.predictBatch(compounds, selectedModels);
      setResults(result.results || []);
      setShowResults(true);
      toast.success(`✅ Predictions Complete! Processed ${result.results.length} compounds`);
    } catch (error: any) {
      toast.error(error.message || "Batch processing failed");
      setShowResults(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (results.length === 0) return;

    const timestamp = new Date().toISOString().slice(0, 10);
    const modelType = selectedModels.join("_");
    
    // Convert results to CSV
    const headers = Object.keys(results[0]);
    const csvRows = [
      headers.join(','),
      ...results.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(',')
      )
    ];
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SerotoninAI_results_${modelType}_${timestamp}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success(`Downloaded SerotoninAI_results_${modelType}_${timestamp}.csv`);
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="container mx-auto max-w-5xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-heading font-bold gradient-text">
            Batch Calculation
          </h1>
          <p className="text-muted-foreground">
            Upload multiple compounds for bulk predictions
          </p>
        </div>

        {/* Core Concept */}
        <div className="glass-card p-6 rounded-xl border border-primary/20 bg-primary/5">
          <h2 className="text-xl font-heading font-semibold mb-3 text-primary">
            💡 Core Concept
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Enables large-scale predictions for multiple molecules — useful for researchers screening compound libraries. Upload a CSV with compound names or SMILES, select your prediction types, and download comprehensive results.
          </p>
        </div>

        <div className="glass-card p-8 rounded-xl border border-primary/20 space-y-6">
          {/* File Upload */}
          <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center space-y-4 hover-glow smooth-transition">
            <Upload className="w-16 h-16 text-primary mx-auto" />
            <div className="space-y-2">
              <p className="text-lg font-semibold">Upload CSV File</p>
              <p className="text-sm text-muted-foreground">
                File should contain a "compound_name" or "smiles" column
              </p>
            </div>
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button asChild variant="outline" className="glass-card border-primary/30">
                <span>Choose File</span>
              </Button>
            </label>
            {file && (
              <p className="text-sm text-success">
                ✓ Selected: {file.name}
              </p>
            )}
          </div>

          {/* Model Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Select Prediction Models</Label>
            <div className="grid md:grid-cols-2 gap-4">
              {models.map((model) => (
                <div 
                  key={model.id}
                  className="glass-card p-4 rounded-lg border border-primary/20 flex items-start gap-3 hover-glow smooth-transition cursor-pointer"
                  onClick={() => toggleModel(model.id)}
                >
                  <Checkbox 
                    checked={selectedModels.includes(model.id)}
                    onCheckedChange={() => toggleModel(model.id)}
                  />
                  <div className="space-y-1">
                    <Label className="font-semibold cursor-pointer">{model.label}</Label>
                    <p className="text-sm text-muted-foreground">{model.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleProcess}
            disabled={!file || isProcessing || selectedModels.length === 0}
            className="w-full bg-gradient-to-r from-primary to-secondary hover-glow"
            size="lg"
          >
            {isProcessing ? "Processing..." : "Process Batch"}
          </Button>
        </div>

        {isProcessing && (
          <div className="glass-card p-6 rounded-xl border border-primary/20 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-muted-foreground">
                Processing compounds... This may take a few moments.
              </p>
            </div>
          </div>
        )}

        {showResults && !isProcessing && results.length > 0 && (
          <div className="glass-card p-6 rounded-xl border border-success/30 bg-success/5 animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-success">✅ Predictions Complete</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Processed {results.length} compound(s) with {selectedModels.length} model(s): {selectedModels.join(", ")}
                </p>
              </div>
              <Button 
                onClick={handleDownload}
                className="bg-success hover:bg-success/80"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
            </div>

            {/* Quick Results Preview */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-border/50">
                    <th className="py-2 pr-4">Compound</th>
                    <th className="py-2 pr-4">Status</th>
                    {selectedModels.includes("sert") && (
                      <>
                        <th className="py-2 pr-4">SERT pKi</th>
                        <th className="py-2 pr-4">SERT Active</th>
                      </>
                    )}
                    {selectedModels.includes("bbb") && (
                      <>
                        <th className="py-2 pr-4">BBB Class</th>
                        <th className="py-2 pr-4">BBB Prob</th>
                      </>
                    )}
                    {selectedModels.includes("hia") && (
                      <>
                        <th className="py-2 pr-4">HIA Class</th>
                        <th className="py-2 pr-4">HIA Value</th>
                        <th className="py-2 pr-4">HIA Prob</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, idx) => {
                    const pred = row?.predictions || {};
                    const sert = pred?.SERT;
                    const bbb = pred?.BBB;
                    const hia = pred?.HIA;
                    const status = row?.error
                      ? `Error: ${row.error}`
                      : "OK";
                    return (
                      <tr key={idx} className="border-b border-border/20">
                        <td className="py-2 pr-4 font-medium">{row?.compound ?? ""}</td>
                        <td className="py-2 pr-4">{status}</td>
                        {selectedModels.includes("sert") && (
                          <>
                            <td className="py-2 pr-4">{sert?.pKi ?? "-"}</td>
                            <td className="py-2 pr-4">{sert?.isActive ? "Yes" : (sert ? "No" : "-")}</td>
                          </>
                        )}
                        {selectedModels.includes("bbb") && (
                          <>
                            <td className="py-2 pr-4">{bbb?.classification ?? "-"}</td>
                            <td className="py-2 pr-4">{bbb?.probability ?? "-"}</td>
                          </>
                        )}
                        {selectedModels.includes("hia") && (
                          <>
                            <td className="py-2 pr-4">{hia?.classification ?? "-"}</td>
                            <td className="py-2 pr-4">{hia?.value ?? "-"}</td>
                            <td className="py-2 pr-4">{hia?.probability ?? "-"}</td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
