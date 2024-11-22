import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

export default function ShearForceChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shear Force Diagram</CardTitle>
      </CardHeader>
      <CardContent>
        <div id="shearForceDiagram">
          <ChartContainer config={{ shearForce: { label: 'Shear Force', color: 'hsl(var(--chart-1))' } }} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="x" 
                  label={{ value: 'Position (m)', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis 
                  label={{ value: 'Shear Force (N)', angle: -90, position: 'insideLeft', offset: 15 }} 
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="shearForce" stroke="var(--color-shearForce)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

