import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function LoadConfiguration({
  loadType,
  setLoadType,
  loadMagnitude,
  setLoadMagnitude,
  loadStartPosition,
  setLoadStartPosition,
  loadEndPosition,
  setLoadEndPosition,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Load Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Load Type</Label>
            <RadioGroup value={loadType} onValueChange={setLoadType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Point Load" id="pointLoad" />
                <Label htmlFor="pointLoad">Point Load</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Uniform Load" id="uniformLoad" />
                <Label htmlFor="uniformLoad">Uniform Load</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="loadMagnitude">Load Magnitude (N)</Label>
            <Input
              id="loadMagnitude"
              type="number"
              value={loadMagnitude}
              onChange={(e) => setLoadMagnitude(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="loadStartPosition">Load Start Position (mm)</Label>
            <Input
              id="loadStartPosition"
              type="number"
              value={loadStartPosition}
              onChange={(e) => setLoadStartPosition(Number(e.target.value))}
            />
          </div>
          {loadType === 'Uniform Load' && (
            <div>
              <Label htmlFor="loadEndPosition">Load End Position (mm)</Label>
              <Input
                id="loadEndPosition"
                type="number"
                value={loadEndPosition}
                onChange={(e) => setLoadEndPosition(Number(e.target.value))}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

