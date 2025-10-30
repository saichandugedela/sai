import { Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RuleOfThreeRadarProps {
  molecularWeight: number;
  logP: number;
  hbd: number; // Hydrogen bond donors
  hba: number; // Hydrogen bond acceptors
  tpsa: number; // Topological polar surface area
}

export const RuleOfThreeRadar = ({ 
  molecularWeight, 
  logP, 
  hbd, 
  hba, 
  tpsa 
}: RuleOfThreeRadarProps) => {
  // Rule of Three criteria for fragment-based drug discovery
  const ruleOfThreeData = [
    {
      parameter: "MW ≤300",
      value: Math.min((molecularWeight / 300) * 100, 100),
      threshold: 100,
      actual: molecularWeight,
      limit: 300
    },
    {
      parameter: "logP ≤3",
      value: Math.min((logP / 3) * 100, 100),
      threshold: 100,
      actual: logP,
      limit: 3
    },
    {
      parameter: "HBD ≤3",
      value: Math.min((hbd / 3) * 100, 100),
      threshold: 100,
      actual: hbd,
      limit: 3
    },
    {
      parameter: "HBA ≤3",
      value: Math.min((hba / 3) * 100, 100),
      threshold: 100,
      actual: hba,
      limit: 3
    },
    {
      parameter: "TPSA ≤60",
      value: Math.min((tpsa / 60) * 100, 100),
      threshold: 100,
      actual: tpsa,
      limit: 60
    }
  ];

  const violations = ruleOfThreeData.filter(item => item.actual > item.limit).length;
  const compliance = ((5 - violations) / 5) * 100;

  return (
    <Card className="glass-card border-primary/30 hover-glow smooth-transition">
      <CardHeader>
        <CardTitle className="gradient-text flex items-center gap-2">
          🎯 Rule of Three Compliance
          <Badge variant={violations === 0 ? "default" : violations <= 2 ? "secondary" : "destructive"}>
            {violations === 0 ? "Compliant" : `${violations} Violations`}
          </Badge>
        </CardTitle>
        <CardDescription>
          Fragment-based drug discovery guidelines for lead optimization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ResponsiveContainer width="100%" height={300}>
          <RechartsRadar data={ruleOfThreeData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis 
              dataKey="parameter" 
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }}
            />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="Compound"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.6}
            />
            <Radar
              name="Threshold"
              dataKey="threshold"
              stroke="hsl(var(--secondary))"
              fill="hsl(var(--secondary))"
              fillOpacity={0.2}
            />
            <Legend />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value: number, name: string, props: any) => {
                if (name === "Compound") {
                  return [`${props.payload.actual.toFixed(1)} (${value.toFixed(1)}%)`, name];
                }
                return [value, name];
              }}
            />
          </RechartsRadar>
        </ResponsiveContainer>

        {/* Compliance Summary */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Compliance:</span>
            <span className={`text-sm font-bold ${compliance >= 80 ? 'text-success' : compliance >= 60 ? 'text-warning' : 'text-destructive'}`}>
              {compliance.toFixed(1)}%
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Rule of Three:</strong> Guidelines for fragment-based drug discovery</p>
            <p><strong>Purpose:</strong> Ensures compounds are suitable starting points for optimization</p>
            <p><strong>Violations:</strong> {violations} out of 5 criteria exceeded</p>
          </div>

          {/* Detailed Values */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {ruleOfThreeData.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 rounded bg-muted/30">
                <span className="text-muted-foreground">{item.parameter.split(' ')[0]}:</span>
                <span className={`font-mono ${item.actual > item.limit ? 'text-destructive' : 'text-success'}`}>
                  {item.actual.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
