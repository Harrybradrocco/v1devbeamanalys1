import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function BeamDimensions({
  beamCrossSection,
  width,
  setWidth,
  height,
  setHeight,
  flangeWidth,
  setFlangeWidth,
  flangeThickness,
  setFlangeThickness,
  webThickness,
  setWebThickness,
  diameter,
  setDiameter,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Beam Dimensions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {beamCrossSection === 'Rectangular' && (
            <>
              <div>
                <Label htmlFor="width">Width (mm)</Label>
                <Input
                  id="width"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="height">Height (mm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                />
              </div>
            </>
          )}
          {(beamCrossSection === 'I Beam' || beamCrossSection === 'C Channel') && (
            <>
              <div>
                <Label htmlFor="flangeWidth">Flange Width (mm)</Label>
                <Input
                  id="flangeWidth"
                  type="number"
                  value={flangeWidth}
                  onChange={(e) => setFlangeWidth(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="flangeThickness">Flange Thickness (mm)</Label>
                <Input
                  id="flangeThickness"
                  type="number"
                  value={flangeThickness}
                  onChange={(e) => setFlangeThickness(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="webThickness">Web Thickness (mm)</Label>
                <Input
                  id="webThickness"
                  type="number"
                  value={webThickness}
                  onChange={(e) => setWebThickness(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="height">Total Height (mm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                />
              </div>
            </>
          )}
          {beamCrossSection === 'Circular' && (
            <div>
              <Label htmlFor="diameter">Diameter (mm)</Label>
              <Input
                id="diameter"
                type="number"
                value={diameter}
                onChange={(e) => setDiameter(Number(e.target.value))}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

