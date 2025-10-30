const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface ReceptorPrediction {
  success: boolean;
  compoundName: string;
  smiles: string;
  pKi: number;
  isActive: boolean;
  receptor: string;
  applicabilityDomain: string;
  molecularWeight: number;
  logP: number;
  hbd: number;
  hba: number;
  tpsa: number;
}

export interface SertPrediction {
  success: boolean;
  compoundName: string;
  smiles: string;
  pKi: number;
  isActive: boolean;
  applicabilityDomain: string;
  molecularWeight: number;
  logP: number;
  hbd: number;
  hba: number;
  tpsa: number;
}

export interface HiaPrediction {
  success: boolean;
  compoundName: string;
  smiles: string;
  hiaClassification: string;
  hiaValue: number;
  hiaProbability: number;
  molecularWeight: number;
  logP: number;
  hbd: number;
  hba: number;
  tpsa: number;
}

export interface BbbPrediction {
  success: boolean;
  compoundName: string;
  smiles: string;
  bbbClassification: string;
  bbbProbability: number;
  molecularWeight: number;
  logP: number;
  hbd: number;
  hba: number;
  tpsa: number;
}

export const api = {
  predictReceptor: async (compoundName: string, receptor: string): Promise<ReceptorPrediction> => {
    const response = await fetch(`${API_BASE_URL}/api/receptors/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ compoundName, receptor }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Prediction failed");
    }

    return response.json();
  },

  predictSert: async (compoundName: string): Promise<SertPrediction> => {
    const response = await fetch(`${API_BASE_URL}/api/sert/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ compoundName }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Prediction failed");
    }

    return response.json();
  },

  predictHia: async (compoundName: string): Promise<HiaPrediction> => {
    const response = await fetch(`${API_BASE_URL}/api/hia/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ compoundName }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Prediction failed");
    }

    return response.json();
  },

  predictBbb: async (compoundName: string): Promise<BbbPrediction> => {
    const response = await fetch(`${API_BASE_URL}/api/bbb/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ compoundName }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Prediction failed");
    }

    return response.json();
  },

  predictBatch: async (compounds: string[], selectedModels: string[]) => {
    const receptorModels = [
      "5-HT1A",
      "5-HT1B",
      "5-HT1D",
      "5-HT2A",
      "5-HT2B",
      "5-HT2C",
      "5-HT3",
      "5-HT4",
      "5-HT5A",
      "5-HT6",
      "5-HT7",
    ];

    const models = [
      ...(selectedModels.includes("receptors") ? receptorModels : []),
      ...(selectedModels.includes("sert") ? ["SERT"] : []),
      ...(selectedModels.includes("hia") ? ["HIA"] : []),
      ...(selectedModels.includes("bbb") ? ["BBB"] : []),
    ];

    const response = await fetch(`${API_BASE_URL}/api/batch/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ compounds, models }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Batch prediction failed");
    }

    return response.json();
  },
};

