import { standardMaterials } from './materials'

export function calculateResults(params: any) {
  const {
    beamType,
    beamCrossSection,
    beamLength,
    leftSupport,
    rightSupport,
    loadType,
    loadMagnitude,
    loadStartPosition,
    loadEndPosition,
    material,
    customMaterial,
    width,
    height,
    flangeWidth,
    flangeThickness,
    webThickness,
    diameter,
  } = params

  const newShearForceData: Array<{ x: number; shearForce: number }> = []
  const newBendingMomentData: Array<{ x: number; bendingMoment: number }> = []
  let maxShearForce = 0
  let maxBendingMoment = 0

  // Convert mm to m for calculations
  const beamLengthM = beamLength / 1000
  const leftSupportM = leftSupport / 1000
  const rightSupportM = rightSupport / 1000
  const loadStartPositionM = loadStartPosition / 1000
  const loadEndPositionM = loadEndPosition / 1000
  const widthM = width / 1000
  const heightM = height / 1000
  const flangeWidthM = flangeWidth / 1000
  const flangeThicknessM = flangeThickness / 1000
  const webThicknessM = webThickness / 1000
  const diameterM = diameter / 1000

  // Calculate center of gravity based on the applied load
  function calculateCenterOfGravity(params: any): number {
    const {
      beamType,
      beamLength,
      loadType,
      loadMagnitude,
      loadStartPosition,
      loadEndPosition,
    } = params;

    const beamLengthM = beamLength / 1000;
    const loadStartPositionM = loadStartPosition / 1000;
    const loadEndPositionM = loadEndPosition / 1000;

    if (beamType === 'Simple Beam') {
      if (loadType === 'Point Load') {
        return loadStartPositionM;
      } else if (loadType === 'Uniform Load') {
        return (loadStartPositionM + loadEndPositionM) / 2;
      }
    } else if (beamType === 'Cantilever Beam') {
      if (loadType === 'Point Load') {
        return loadStartPositionM;
      } else if (loadType === 'Uniform Load') {
        const loadLengthM = loadEndPositionM - loadStartPositionM;
        return loadStartPositionM + (loadLengthM / 2);
      }
    }

    // Default to the middle of the beam if no specific calculation applies
    return beamLengthM / 2;
  }

  const centerOfGravity = calculateCenterOfGravity(params)

  if (beamType === 'Simple Beam') {
    if (loadType === 'Point Load') {
      const a = loadStartPositionM - leftSupportM
      const b = rightSupportM - loadStartPositionM
      const L = rightSupportM - leftSupportM

      const reactionA = (loadMagnitude * b) / L

      for (let x = 0; x <= L; x += L / 100) {
        let shearForce = reactionA
        if (x > a) shearForce -= loadMagnitude

        let bendingMoment = reactionA * x
        if (x > a) bendingMoment -= loadMagnitude * (x - a)

        newShearForceData.push({ x: Number(x.toFixed(3)), shearForce: Number(shearForce.toFixed(2)) })
        newBendingMomentData.push({ x: Number(x.toFixed(3)), bendingMoment: Number(bendingMoment.toFixed(2)) })

        maxShearForce = Math.max(maxShearForce, Math.abs(shearForce))
        maxBendingMoment = Math.max(maxBendingMoment, Math.abs(bendingMoment))
      }
    } else if (loadType === 'Uniform Load') {
      const L = rightSupportM - leftSupportM
      const loadLength = loadEndPositionM - loadStartPositionM
      const w = loadMagnitude / loadLength // Load per unit length

      for (let x = 0; x <= L; x += L / 100) {
        let shearForce = 0
        let bendingMoment = 0

        if (x < loadStartPositionM) {
          shearForce = (w * loadLength * (L - loadStartPositionM - loadLength / 2)) / L
          bendingMoment = shearForce * x
        } else if (x >= loadStartPositionM && x <= loadEndPositionM) {
          shearForce = (w * loadLength * (L - loadStartPositionM - loadLength / 2)) / L - w * (x - loadStartPositionM)
          bendingMoment = (w * loadLength * (L - loadStartPositionM - loadLength / 2) * x) / L - (w * (x - loadStartPositionM) ** 2) / 2
        } else {
          shearForce = -(w * loadLength * (loadStartPositionM + loadLength / 2)) / L
          bendingMoment = (w * loadLength * (loadStartPositionM + loadLength / 2) * (L - x)) / L
        }

        newShearForceData.push({ x: Number(x.toFixed(3)), shearForce: Number(shearForce.toFixed(2)) })
        newBendingMomentData.push({ x: Number(x.toFixed(3)), bendingMoment: Number(bendingMoment.toFixed(2)) })

        maxShearForce = Math.max(maxShearForce, Math.abs(shearForce))
        maxBendingMoment = Math.max(maxBendingMoment, Math.abs(bendingMoment))
      }
    }
  } else if (beamType === 'Cantilever Beam') {
    if (loadType === 'Point Load') {
      for (let x = 0; x <= beamLengthM; x += beamLengthM / 100) {
        const shearForce = x <= loadStartPositionM ? loadMagnitude : 0
        const bendingMoment = x <= loadStartPositionM ? loadMagnitude * (loadStartPositionM - x) : 0

        newShearForceData.push({ x: Number(x.toFixed(3)), shearForce: Number(shearForce.toFixed(2)) })
        newBendingMomentData.push({ x: Number(x.toFixed(3)), bendingMoment: Number(bendingMoment.toFixed(2)) })

        maxShearForce = Math.max(maxShearForce, Math.abs(shearForce))
        maxBendingMoment = Math.max(maxBendingMoment, Math.abs(bendingMoment))
      }
    } else if (loadType === 'Uniform Load') {
      const loadLength = loadEndPositionM - loadStartPositionM
      const w = loadMagnitude / loadLength // Load per unit length

      for (let x = 0; x <= beamLengthM; x += beamLengthM / 100) {
        let shearForce = 0
        let bendingMoment = 0

        if (x <= loadStartPositionM) {
          shearForce = w * loadLength
          bendingMoment = w * loadLength * (loadStartPositionM + loadLength / 2 - x)
        } else if (x > loadStartPositionM && x <= loadEndPositionM) {
          shearForce = w * (loadEndPositionM - x)
          bendingMoment = (w * (loadEndPositionM - x) ** 2) / 2
        }

        newShearForceData.push({ x: Number(x.toFixed(3)), shearForce: Number(shearForce.toFixed(2)) })
        newBendingMomentData.push({ x: Number(x.toFixed(3)), bendingMoment: Number(bendingMoment.toFixed(2)) })

        maxShearForce = Math.max(maxShearForce, Math.abs(shearForce))
        maxBendingMoment = Math.max(maxBendingMoment, Math.abs(bendingMoment))
      }
    }
  }

  const materialProps = material === 'Custom' ? customMaterial : (standardMaterials[material] ?? standardMaterials['ASTM A36 Structural Steel'])
  let area = 0, momentOfInertia = 0, sectionModulus = 0

  switch (beamCrossSection) {
    case 'Rectangular':
      area = widthM * heightM
      momentOfInertia = (widthM * Math.pow(heightM, 3)) / 12
      sectionModulus = momentOfInertia / (heightM / 2)
      break
    case 'I Beam':
      area = 2 * flangeWidthM * flangeThicknessM + (heightM - 2 * flangeThicknessM) * webThicknessM
      const I_flange = (flangeWidthM * Math.pow(flangeThicknessM, 3)) / 6 + 2 * flangeWidthM * flangeThicknessM * Math.pow((heightM - flangeThicknessM) / 2, 2)
      const I_web = (webThicknessM * Math.pow(heightM - 2 * flangeThicknessM, 3)) / 12
      momentOfInertia = 2 * I_flange + I_web
      sectionModulus = momentOfInertia / (heightM / 2)
      break
    case 'C Channel':
      area = 2 * flangeWidthM * flangeThicknessM + (heightM - 2 * flangeThicknessM) * webThicknessM
      const I_flange_c = (flangeWidthM * Math.pow(flangeThicknessM, 3)) / 12 + flangeWidthM * flangeThicknessM * Math.pow((heightM - flangeThicknessM) / 2, 2)
      const I_web_c = (webThicknessM * Math.pow(heightM - 2 * flangeThicknessM, 3)) / 12
      momentOfInertia = 2 * I_flange_c + I_web_c
      sectionModulus = momentOfInertia / (heightM / 2)
      break
    case 'Circular':
      area = Math.PI * Math.pow(diameterM / 2, 2)
      momentOfInertia = (Math.PI * Math.pow(diameterM, 4)) / 64
      sectionModulus = momentOfInertia / (diameterM / 2)
      break
    default:
      area = widthM * heightM
      momentOfInertia = (widthM * Math.pow(heightM, 3)) / 12
      sectionModulus = momentOfInertia / (heightM / 2)
  }

  const maxNormalStress = (maxBendingMoment / sectionModulus) / 1e6 // Convert to MPa
  const maxShearStress = (1.5 * maxShearForce / area) / 1e6 // Convert to MPa

  return {
    results: {
      maxShearForce: Number(maxShearForce?.toFixed(2) ?? 0),
      maxBendingMoment: Number(maxBendingMoment?.toFixed(2) ?? 0),
      maxNormalStress: Number(maxNormalStress?.toFixed(2) ?? 0),
      maxShearStress: Number(maxShearStress?.toFixed(2) ?? 0),
      safetyFactor: Number((materialProps?.yieldStrength / maxNormalStress)?.toFixed(2) ?? 0),
      centerOfGravityLoad: Number(centerOfGravity?.toFixed(3) ?? 0),
      momentOfInertia: Number(momentOfInertia?.toFixed(6) ?? 0),
      sectionModulus: Number(sectionModulus?.toFixed(6) ?? 0),
    },
    shearForceData: newShearForceData,
    bendingMomentData: newBendingMomentData,
  }
}

