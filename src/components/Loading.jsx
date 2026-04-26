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
    const t1 = setTimeout(() => setPhase(1), 1275)
    const t2 = setTimeout(() => setPhase(2), 2400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="loader-wrap">
      <div className={`logo-stage phase-${phase}`}>
        <div className={`logo-initial ${phase > 0 ? 'out' : ''}`}>Lobi</div>

        <div className={`logo-split ${phase >= 1 ? 'show' : ''} ${phase === 2 ? 'fade' : ''}`}>
          <span className="accent lo">Lo</span>
          <span className="accent bi">Bi</span>
        </div>

        <div className={`logo-final ${phase === 2 ? 'show' : ''}`}>
          <span className="accent lo-final">Lo</span>
          <AnimatedLetters text="cação " className="letters lo-tail" start={0} />
          <AnimatedLetters text="imo" className="letters bi-left" start={6} />
          <span className="accent bi-final">Bi</span>
          <AnimatedLetters text="liaria" className="letters bi-right" start={9} />
        </div>
      </div>
    </div>
  )
}
