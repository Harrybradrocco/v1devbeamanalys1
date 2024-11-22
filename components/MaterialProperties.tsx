import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { standardMaterials } from '../utils/materials'

export default function MaterialProperties({
  material,
  setMaterial,
  customMaterial,
  setCustomMaterial,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Material Properties</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="material">Material</Label>
            <Select value={material} onValueChange={setMaterial}>
              <SelectTrigger id="material">
                <SelectValue placeholder="Select material" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(standardMaterials).map((mat) => (
                  <SelectItem key={mat} value={mat}>
                    {mat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {material === 'Custom' && (
            <>
              <div>
                <Label htmlFor="yieldStrength">Yield Strength (MPa)</Label>
                <Input
                  id="yieldStrength"
                  type="number"
                  value={customMaterial.yieldStrength}
                  onChange={(e) =>
                    setCustomMaterial({ ...customMaterial, yieldStrength: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <Label htmlFor="elasticModulus">Elastic Modulus (GPa)</Label>
                <Input
                  id="elasticModulus"
                  type="number"
                  value={customMaterial.elasticModulus}
                  onChange={(e) =>
                    setCustomMaterial({ ...customMaterial, elasticModulus: Number(e.target.value) })
                  }
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

