import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

export default function BendingMomentChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bending Moment Diagram</CardTitle>
      </CardHeader>
      <CardContent>
        <div id="bendingMomentDiagram">
          <ChartContainer config={{ bendingMoment: { label: 'Bending Moment', color: 'hsl(var(--chart-2))' } }} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="x" 
                  label={{ value: 'Position (m)', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis 
                  label={{ value: 'Bending Moment (N⋅m)', angle: -90, position: 'insideLeft', offset: 15 }} 
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="bendingMoment" stroke="var(--color-bendingMoment)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

