import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function BeamDiagram({
  beamLength,
  leftSupport,
  rightSupport,
  loadType,
  loadStartPosition,
  loadEndPosition,
  loadMagnitude,
}) {
  const svgWidth = 500
  const svgHeight = 200
  const margin = 40
  const beamY = svgHeight / 2
  const supportSize = 30

  const leftSupportX = margin + (leftSupport / beamLength) * (svgWidth - 2 * margin)
  const rightSupportX = margin + (rightSupport / beamLength) * (svgWidth - 2 * margin)

  const loadStartX = margin + (loadStartPosition / beamLength) * (svgWidth - 2 * margin)
  const loadEndX = margin + (loadEndPosition / beamLength) * (svgWidth - 2 * margin)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Beam Diagram</CardTitle>
      </CardHeader>
      <CardContent>
        <svg width={svgWidth} height={svgHeight} className="mx-auto">
          {/* Beam */}
          <line
            x1={margin}
            y1={beamY}
            x2={svgWidth - margin}
            y2={beamY}
            stroke="black"
            strokeWidth="4"
          />

          {/* Left Support */}
          <polygon
            points={`${leftSupportX},${beamY} ${leftSupportX - supportSize / 2},${
              beamY + supportSize
            } ${leftSupportX + supportSize / 2},${beamY + supportSize}`}
            fill="none"
            stroke="black"
            strokeWidth="2"
          />

          {/* Right Support */}
          <polygon
            points={`${rightSupportX},${beamY} ${rightSupportX - supportSize / 2},${
              beamY + supportSize
            } ${rightSupportX + supportSize / 2},${beamY + supportSize}`}
            fill="none"
            stroke="black"
            strokeWidth="2"
          />

          {/* Load Arrow(s) */}
          {loadType === 'Point Load' ? (
            <line
              x1={loadStartX}
              y1={beamY - 60}
              x2={loadStartX}
              y2={beamY}
              stroke="red"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          ) : (
            <>
              <line
                x1={loadStartX}
                y1={beamY - 40}
                x2={loadEndX}
                y2={beamY - 40}
                stroke="red"
                strokeWidth="2"
              />
              {Array.from({ length: 5 }).map((_, index) => {
                const x = loadStartX + ((loadEndX - loadStartX) / 4) * index
                return (
                  <line
                    key={index}
                    x1={x}
                    y1={beamY - 40}
                    x2={x}
                    y2={beamY}
                    stroke="red"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                )
              })}
            </>
          )}

          {/* Arrow definition */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="0"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="red" />
            </marker>
          </defs>

          {/* Labels */}
          <text x={margin} y={beamY + supportSize + 20} textAnchor="middle" fontSize="12">
            0
          </text>
          <text x={svgWidth - margin} y={beamY + supportSize + 20} textAnchor="middle" fontSize="12">
            {beamLength}
          </text>
          <text x={(loadStartX + loadEndX) / 2} y={beamY - 70} textAnchor="middle" fontSize="12" fill="red">
            {loadMagnitude.toFixed(2)} N
          </text>
          <text x={svgWidth / 2} y={svgHeight - 10} textAnchor="middle" fontSize="12">
            Beam Length: {beamLength} mm
          </text>
        </svg>
      </CardContent>
    </Card>
  )
}

