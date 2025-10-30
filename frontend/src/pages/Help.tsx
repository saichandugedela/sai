import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail } from "lucide-react";

export default function Help() {
  const faqs = [
    {
      question: "What is a receptor?",
      answer: "A receptor is a protein that receives signals from molecules, triggering biological effects. Think of it as a 'lock' that drugs (keys) bind to, initiating cellular responses that control mood, memory, pain, and more."
    },
    {
      question: "Why do we bind with receptors?",
      answer: "Binding starts the drug's action, deciding how strong and specific the effect will be. Strong binding (high pKi) means the compound is more likely to be an effective drug, while weak binding means minimal therapeutic effect."
    },
    {
      question: "What is pKi?",
      answer: "pKi is the logarithmic measure of binding strength — higher values mean stronger binding and more potent compounds. A pKi ≥ 5 is generally considered significant for drug development. It's calculated as the negative logarithm of the inhibition constant (Ki)."
    },
    {
      question: "What is HIA?",
      answer: "Human Intestinal Absorption (HIA) checks how well a drug is absorbed orally. High HIA means the compound can be taken as a pill and absorbed through the gut into the bloodstream. Low HIA may require injection or reformulation."
    },
    {
      question: "What is BBB penetration?",
      answer: "BBB (Blood-Brain Barrier) determines if a compound can enter the brain to act on CNS receptors. Crossing the BBB is crucial for neurological drugs like antidepressants and psychedelics. If it can't cross, it's only suitable for peripheral action."
    },
    {
      question: "What is Lipinski's Rule of Five?",
      answer: "Lipinski's Rule predicts oral drug-likeness and bioavailability. Rules: MW ≤ 500, logP ≤ 5, H-bond donors ≤ 5, acceptors ≤ 10. Compounds that pass are more likely to be orally absorbed and distributed properly in the body."
    },
    {
      question: "Why calculate Lipinski's Rule?",
      answer: "To identify molecules that can be safely and effectively taken orally. It filters out compounds that are too large, too greasy, or too polar to pass through membranes and reach their target."
    },
    {
      question: "What is the Rule of Three?",
      answer: "Rule of Three finds simple, flexible molecular fragments used in early drug discovery. Criteria: MW ≤ 300, logP ≤ 3, ≤3 donors/acceptors. These 'fragment-like' molecules are ideal starting points for building larger drug candidates."
    },
    {
      question: "What is the Applicability Domain?",
      answer: "Applicability Domain ensures prediction reliability by checking if your molecule fits within the model's known range. If inside the domain, predictions are trustworthy. If outside, results should be interpreted with caution."
    },
    {
      question: "How accurate are predictions?",
      answer: "Models are trained on QSAR/QSPR datasets using experimental data. Accuracy depends on how similar your compound is to the training data. Predictions provide valuable guidance but should be validated through experimental testing before drug development decisions."
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-heading font-bold gradient-text">
            Help & FAQ
          </h1>
          <p className="text-muted-foreground">
            Common questions and definitions
          </p>
        </div>

        <div className="glass-card p-6 rounded-xl border border-primary/20">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-primary/20">
                <AccordionTrigger className="text-left font-semibold hover:text-primary smooth-transition">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="glass-card p-6 rounded-xl border border-primary/20 space-y-4">
          <h2 className="text-xl font-heading font-semibold gradient-text">
            Need More Help?
          </h2>
          <p className="text-muted-foreground">
            For technical support, research collaborations, or questions about the prediction models, please contact us:
          </p>
          <div className="flex items-center gap-2 text-primary">
            <Mail className="w-5 h-5" />
            <a href="mailto:support@serotoninai.research" className="hover:underline">
              support@serotoninai.research
            </a>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-warning/30 bg-warning/5">
          <h3 className="font-semibold text-warning mb-2">Important Note</h3>
          <p className="text-sm text-muted-foreground">
            SerotoninAI is a research tool intended for educational and scientific purposes only. 
            Predictions should be validated through experimental methods before any drug development decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
