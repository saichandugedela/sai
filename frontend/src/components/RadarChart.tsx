import { Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RadarChartProps {
  title: string;
  description: string;
  data: Array<{
    parameter: string;
    value: number;
    threshold: number;
    actual?: number;
    limit?: number;
  }>;
}

export const RadarChartComponent = ({ title, description, data }: RadarChartProps) => {
  // Calculate violations for Lipinski's Rule of Five
  const violations = data.filter(item => item.actual && item.limit && item.actual > item.limit).length;
  const compliance = ((5 - violations) / 5) * 100;

  return (
    <Card className="glass-card border-primary/30 hover-glow smooth-transition">
      <CardHeader>
        <CardTitle className="gradient-text flex items-center gap-2">
          {title}
          <Badge variant={violations === 0 ? "default" : violations <= 1 ? "secondary" : "destructive"}>
            {violations === 0 ? "Compliant" : `${violations} Violations`}
          </Badge>
        </CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ResponsiveContainer width="100%" height={400}>
          <RechartsRadar data={data}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis 
              dataKey="parameter" 
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
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
              fillOpacity={0.3}
            />
            <Legend />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value: number, name: string, props: any) => {
                if (name === "Compound" && props.payload.actual !== undefined) {
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
            <p><strong>Lipinski's Rule of Five:</strong> Drug-likeness assessment criteria</p>
            <p><strong>Purpose:</strong> Predicts oral bioavailability and drug-likeness</p>
            <p><strong>Violations:</strong> {violations} out of 5 criteria exceeded</p>
          </div>

          {/* Detailed Values */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {data.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 rounded bg-muted/30">
                <span className="text-muted-foreground">{item.parameter.split(' ')[0]}:</span>
                <span className={`font-mono ${item.actual && item.limit && item.actual > item.limit ? 'text-destructive' : 'text-success'}`}>
                  {item.actual ? item.actual.toFixed(1) : 'N/A'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
