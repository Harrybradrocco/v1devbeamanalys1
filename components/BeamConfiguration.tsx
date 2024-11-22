import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function BeamConfiguration({
  beamType,
  setBeamType,
  beamCrossSection,
  setBeamCrossSection,
  beamLength,
  setBeamLength,
  leftSupport,
  setLeftSupport,
  rightSupport,
  setRightSupport,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Beam Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="beamType">Beam Type</Label>
            <Select value={beamType} onValueChange={setBeamType}>
              <SelectTrigger id="beamType">
                <SelectValue placeholder="Select beam type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Simple Beam">Simple Beam</SelectItem>
                <SelectItem value="Cantilever Beam">Cantilever Beam</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="beamCrossSection">Beam Cross Section</Label>
            <Select value={beamCrossSection} onValueChange={setBeamCrossSection}>
              <SelectTrigger id="beamCrossSection">
                <SelectValue placeholder="Select beam cross section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Rectangular">Rectangular</SelectItem>
                <SelectItem value="I Beam">I Beam</SelectItem>
                <SelectItem value="C Channel">C Channel</SelectItem>
                <SelectItem value="Circular">Circular</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="beamLength">Beam Length (mm)</Label>
            <Input
              id="beamLength"
              type="number"
              value={beamLength}
              onChange={(e) => setBeamLength(Number(e.target.value))}
            />
          </div>
          {beamType === 'Simple Beam' && (
            <>
              <div>
                <Label htmlFor="leftSupport">Left Support Position (mm)</Label>
                <Input
                  id="leftSupport"
                  type="number"
                  value={leftSupport}
                  onChange={(e) => setLeftSupport(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="rightSupport">Right Support Position (mm)</Label>
                <Input
                  id="rightSupport"
                  type="number"
                  value={rightSupport}
                  onChange={(e) => setRightSupport(Number(e.target.value))}
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

