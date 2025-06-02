import { useEffect, useRef, useState } from 'react'
import { playSound } from '../../lib/soundManager'
import css from './input.module.scss'

interface Segment {
  label: string
  color: string
}

const numSegments = 10
const segments: Segment[] = Array.from({ length: numSegments }, (_, i) => ({
  label: `0.${i + 1}`,
  color: i % 2 === 0 ? 'red' : 'white',
}))

const radius = 150
const center = { x: radius, y: radius }
const segmentAngle = 360 / numSegments

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180)
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
  return ['M', x, y, 'L', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y, 'Z'].join(' ')
}

export default function WheelOfFortune() {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef<SVGSVGElement>(null)
  const spinDuration = 8

  const prevSegmentRef = useRef<number | null>(null)

  useEffect(() => {
    if (!spinning) {
      return
    }

    let animationFrame: number

    const trackRotation = () => {
      if (!wheelRef.current) {
        return
      }

      const style = getComputedStyle(wheelRef.current)
      const matrix = new DOMMatrixReadOnly(style.transform)
      const currentAngle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI)

      const normalizedAngle = (currentAngle + 360) % 360
      const currentSegment = Math.floor((360 - normalizedAngle) / segmentAngle) % numSegments

      if (prevSegmentRef.current !== currentSegment) {
        playSound('wheelTik')
        prevSegmentRef.current = currentSegment
      }

      animationFrame = requestAnimationFrame(trackRotation)
    }

    trackRotation()

    return () => cancelAnimationFrame(animationFrame)
  }, [spinning])

  const spinWheel = () => {
    if (spinning) {
      return
    }
    setSpinning(true)
    setResult(null)

    const randomSpin = Math.floor(Math.random() * 360) + 360 * 3
    const newRotation = rotation + randomSpin
    setRotation(newRotation)

    if (wheelRef.current) {
      wheelRef.current.style.transition = `transform ${spinDuration}s cubic-bezier(.67,-0.43,0,1)`
      wheelRef.current.style.transform = `rotate(${newRotation}deg)`
    }

    setTimeout(() => {
      playSound('wheelTok')
      const normalizedAngle = newRotation % 360
      const winningIndex = Math.floor((360 - normalizedAngle) / segmentAngle) % numSegments
      setResult(segments[winningIndex].label)

      if (wheelRef.current) {
        wheelRef.current.style.transition = 'none'
      }
      setSpinning(false)
    }, spinDuration * 1000)
  }

  return (
    <div className={css.wheel_container}>
      <div className={css.wheel_wrapper}>
        <svg
          ref={wheelRef}
          className={css.wheel_svg}
          width={radius * 2}
          height={radius * 2}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {segments.map((segment, index) => {
            const startAngle = index * segmentAngle
            const endAngle = startAngle + segmentAngle
            const pathData = describeArc(center.x, center.y, radius, startAngle, endAngle)
            const midAngle = startAngle + segmentAngle / 2
            const textPos = polarToCartesian(center.x, center.y, radius * 0.65, midAngle)
            return (
              <g key={index}>
                <path d={pathData} fill={segment.color} />
                <text
                  x={textPos.x}
                  y={textPos.y}
                  fill={segment.color === 'red' ? 'white' : 'black'}
                  fontSize="18"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${midAngle + 90} ${textPos.x} ${textPos.y})`}
                  style={{ userSelect: 'none' }}
                >
                  {segment.label}
                </text>
              </g>
            )
          })}
        </svg>
        <div className={css.pointer}></div>
      </div>

      <button className={css.spin_button} onClick={spinWheel} disabled={spinning}>
        Spin
      </button>

      {result ? <div className={css.result_text}>You win: {result}</div> : <div className={css.result_text}>~</div>}
    </div>
  )
}
