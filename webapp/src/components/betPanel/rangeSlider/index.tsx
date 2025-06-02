import { useEffect, useRef, useState } from 'react'
import './index.css'

export type RangeSliderProps = {
  min: number
  max: number
  defaultValue: number
  step: number
  onChange: (value: number) => void
}

export default function RangeSlider({ min, max, defaultValue, step, onChange }: RangeSliderProps) {
  const [input, setInput] = useState(defaultValue)
  const rangeRef = useRef<HTMLInputElement>(null)

  const handleOnChange = (value: string) => {
    const newValue = parseFloat(value)
    setInput(newValue)
    onChange(newValue)
  }

  useEffect(() => {
    setInput(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (rangeRef.current) {
      const progress = ((input - min) / (max - min)) * 100
      rangeRef.current.style.setProperty('--progress', `${progress}%`)
    }
  }, [input, min, max])

  return (
    <div>
      <input
        ref={rangeRef}
        type="range"
        min={min}
        max={max}
        value={input}
        step={step}
        onChange={(e) => handleOnChange(e.target.value)}
        className="custom-range"
      />
    </div>
  )
}
