import { Dna, Target, Database, BarChart3, CheckCircle, Lock, Link2, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function Home() {
  const navigate = useNavigate();

  const concepts = [
    {
      icon: Lock,
      title: "What Are Receptors?",
      description: "Receptors are biological 'locks' that drugs or neurotransmitters bind to. Binding changes how cells behave, controlling functions like mood, memory, and alertness.",
    },
    {
      icon: Link2,
      title: "Why Binding Matters",
      description: "Drugs must bind strongly to their receptors to work. The pKi value measures that strength — higher values mean stronger, more stable drug-receptor interactions.",
    },
    {
      icon: Brain,
      title: "How SerotoninAI Helps",
      description: "This tool predicts molecular binding strength, drug-likeness, absorption, and brain permeability — all essential to understanding a compound's potential as a drug.",
    },
  ];

  const features = [
    {
      icon: Target,
      title: "5-HT Receptors",
      description: "Predict pKi binding affinity for all 11 major serotonin receptor subtypes",
      path: "/receptors",
    },
    {
      icon: Database,
      title: "SERT",
      description: "Evaluate serotonin transporter interaction potential",
      path: "/sert",
    },
    
    {
      icon: CheckCircle,
      title: "HIA",
      description: "Predict Human Intestinal Absorption for oral drugs",
      path: "/hia",
    },
    {
      icon: Brain,
      title: "BBB",
      description: "Assess Blood-Brain Barrier permeability",
      path: "/bbb",
    },
    {
      icon: BarChart3,
      title: "Batch Mode",
      description: "Upload multiple compounds for bulk predictions",
      path: "/batch",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="container mx-auto max-w-6xl space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent glow-effect mb-4">
            <Dna className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-heading font-bold gradient-text leading-tight">
            SerotoninAI
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Decode Molecular Affinity for Smarter Drug Discovery
          </p>
          
          <p className="text-base text-muted-foreground/80 max-w-2xl mx-auto">
            Understand how molecules interact with serotonin receptors, and explore their drug-like potential.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Button 
              size="lg"
              onClick={() => navigate("/receptors")}
              className="bg-gradient-to-r from-primary to-secondary hover-glow text-lg px-8"
            >
              Start Prediction
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate("/help")}
              className="glass-card border-primary/30 hover:border-primary text-lg px-8"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Core Concept Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-heading font-bold text-center gradient-text">
            Core Concepts
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {concepts.map((concept) => {
              const Icon = concept.icon;
              return (
                <Card 
                  key={concept.title}
                  className="glass-card p-6 rounded-xl border border-primary/20 space-y-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold">
                    {concept.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {concept.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="space-y-6">
          <h2 className="text-3xl font-heading font-bold text-center gradient-text">
            Prediction Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.title}
                  onClick={() => navigate(feature.path)}
                  className="glass-card p-6 rounded-xl border border-primary/20 hover-glow smooth-transition cursor-pointer"
                >
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-heading font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Workflow Section */}
        <div className="glass-card p-8 rounded-xl border border-primary/20">
          <h2 className="text-2xl font-heading font-bold gradient-text mb-6 text-center">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Input", desc: "Enter compound name" },
              { step: "2", title: "Validate", desc: "Verify structure" },
              { step: "3", title: "Predict", desc: "Run ML models" },
              { step: "4", title: "Visualize", desc: "View results" },
            ].map((item, idx) => (
              <div key={idx} className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-xl font-bold mx-auto glow-effect">
                  {item.step}
                </div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
