import React, { useEffect, useState } from 'react'

function AnimatedLetters({ text, className, start = 0 }) {
  return (
    <span className={className}>
      {text.split('').map((ch, i) => (
        <span key={`${className}-${i}-${ch}`} className="char" style={{ '--i': i + start }}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  )
}

export default function Loading() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 700)

    return () => {
      clearTimeout(t1)
    }
  }, [])

  return (
    <div className="loader-wrap">
      <div className={`logo-stage phase-${phase}`}>
        <div className={`logo-word ${phase >= 1 ? 'run' : ''}`}>
          <span className="accent lo-anchor">Lo</span>
          <AnimatedLetters text="cação " className="letters lo-tail" start={0} />
          <AnimatedLetters text="imo" className="letters bi-left" start={3} />
          <span className="accent bi-anchor">Bi</span>
          <AnimatedLetters text="liaria" className="letters bi-right" start={6} />
        </div>
      </div>
    </div>
  )
}
