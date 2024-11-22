'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import BeamConfiguration from './BeamConfiguration'
import LoadConfiguration from './LoadConfiguration'
import MaterialProperties from './MaterialProperties'
import BeamDimensions from './BeamDimensions'
import Results from './Results'
import BeamDiagram from './BeamDiagram'
import ShearForceChart from './ShearForceChart'
import BendingMomentChart from './BendingMomentChart'
import { calculateResults } from '../utils/calculations'
import { generatePDF } from '../utils/pdfGenerator'
import { standardMaterials } from '../utils/materials'

export default function BeamLoadCalculator() {
  const [beamType, setBeamType] = useState('Simple Beam')
  const [beamCrossSection, setBeamCrossSection] = useState('Rectangular')
  const [beamLength, setBeamLength] = useState(1000)
  const [leftSupport, setLeftSupport] = useState(0)
  const [rightSupport, setRightSupport] = useState(1000)
  const [loadType, setLoadType] = useState('Point Load')
  const [loadMagnitude, setLoadMagnitude] = useState(1000)
  const [loadStartPosition, setLoadStartPosition] = useState(500)
  const [loadEndPosition, setLoadEndPosition] = useState(500)
  const [shearForceData, setShearForceData] = useState([])
  const [bendingMomentData, setBendingMomentData] = useState([])
  const [material, setMaterial] = useState('ASTM A36 Structural Steel')
  const [customMaterial, setCustomMaterial] = useState({...standardMaterials['Custom']})
  const [width, setWidth] = useState(100)
  const [height, setHeight] = useState(200)
  const [flangeWidth, setFlangeWidth] = useState(100)
  const [flangeThickness, setFlangeThickness] = useState(10)
  const [webThickness, setWebThickness] = useState(6)
  const [diameter, setDiameter] = useState(100)
  const [results, setResults] = useState({
    maxShearForce: 0,
    maxBendingMoment: 0,
    maxNormalStress: 0,
    maxShearStress: 0,
    safetyFactor: 0,
    centerOfGravity: 0,
    momentOfInertia: 0,
    sectionModulus: 0,
  })

  const handleCalculate = useCallback(() => {
    const newResults = calculateResults({
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
    })
    setResults(newResults.results)
    setShearForceData(newResults.shearForceData)
    setBendingMomentData(newResults.bendingMomentData)
  }, [beamType, beamCrossSection, beamLength, leftSupport, rightSupport, loadType, loadMagnitude, loadStartPosition, loadEndPosition, material, customMaterial, width, height, flangeWidth, flangeThickness, webThickness, diameter])

  useEffect(() => {
    handleCalculate()
  }, [handleCalculate])

  const handleDownloadPDF = () => {
    generatePDF({
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
      results,
      shearForceData,
      bendingMomentData,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Beam Load Calculator</h1>
        <Button onClick={handleDownloadPDF}>Download PDF Report</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BeamConfiguration
          beamType={beamType}
          setBeamType={setBeamType}
          beamCrossSection={beamCrossSection}
          setBeamCrossSection={setBeamCrossSection}
          beamLength={beamLength}
          setBeamLength={setBeamLength}
          leftSupport={leftSupport}
          setLeftSupport={setLeftSupport}
          rightSupport={rightSupport}
          setRightSupport={setRightSupport}
        />
        <LoadConfiguration
          loadType={loadType}
          setLoadType={setLoadType}
          loadMagnitude={loadMagnitude}
          setLoadMagnitude={setLoadMagnitude}
          loadStartPosition={loadStartPosition}
          setLoadStartPosition={setLoadStartPosition}
          loadEndPosition={loadEndPosition}
          setLoadEndPosition={setLoadEndPosition}
        />
        <MaterialProperties
          material={material}
          setMaterial={setMaterial}
          customMaterial={customMaterial}
          setCustomMaterial={setCustomMaterial}
        />
        <BeamDimensions
          beamCrossSection={beamCrossSection}
          width={width}
          setWidth={setWidth}
          height={height}
          setHeight={setHeight}
          flangeWidth={flangeWidth}
          setFlangeWidth={setFlangeWidth}
          flangeThickness={flangeThickness}
          setFlangeThickness={setFlangeThickness}
          webThickness={webThickness}
          setWebThickness={setWebThickness}
          diameter={diameter}
          setDiameter={setDiameter}
        />
      </div>
      <Results results={results} />
      <BeamDiagram
        beamLength={beamLength}
        leftSupport={leftSupport}
        rightSupport={rightSupport}
        loadType={loadType}
        loadStartPosition={loadStartPosition}
        loadEndPosition={loadEndPosition}
        loadMagnitude={loadMagnitude}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ShearForceChart data={shearForceData} />
        <BendingMomentChart data={bendingMomentData} />
      </div>
    </div>
  )
}

