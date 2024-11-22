import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Results({ results }) {
  const formatValue = (value: number | undefined, unit: string) => {
    return value !== undefined ? `${value.toFixed(2)} ${unit}` : 'N/A';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>Max Shear Force: {formatValue(results.maxShearForce, 'N')}</p>
          <p>Max Bending Moment: {formatValue(results.maxBendingMoment, 'N⋅m')}</p>
          <p>Max Normal Stress: {formatValue(results.maxNormalStress, 'MPa')}</p>
          <p>Max Shear Stress: {formatValue(results.maxShearStress, 'MPa')}</p>
          <p>Safety Factor: {formatValue(results.safetyFactor, '')}</p>
          <p>Center of Gravity (Load): {formatValue(results.centerOfGravityLoad, 'm')}</p>
          <p>Moment of Inertia: {formatValue(results.momentOfInertia, 'm⁴')}</p>
          <p>Section Modulus: {formatValue(results.sectionModulus, 'm³')}</p>
        </div>
      </CardContent>
    </Card>
  );
}

