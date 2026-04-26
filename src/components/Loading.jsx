import React, { useEffect, useRef, useState } from 'react'

function AnimatedLetters({ text, className, start = 0, onDone }) {
  const len = text.length
  return (
    <span className={className}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="char"
          style={{ '--i': start + i }}
          onAnimationEnd={i === len - 1 ? onDone : undefined}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  )
}

const LOBI_HOLD_MS = 1200

export default function Loading({ onComplete }) {
  const [phase, setPhase]       = useState(0)
  const [exiting, setExiting]   = useState(false)
  const calledRef               = useRef(false)

  function startExit() {
    if (calledRef.current) return
    calledRef.current = true
    // pausa 800ms com texto completo visível → fade-out de 500ms → desmonta
    setTimeout(() => {
      setExiting(true)
      setTimeout(() => onComplete?.(), 500)
    }, 800)
  }

  useEffect(() => {
    const t = setTimeout(() => setPhase(1), LOBI_HOLD_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`loader-wrap${exiting ? ' loader-exit' : ''}`}>
      <div className="logo-stage">
        {/* cação (0-5 com espaço), imo (6-8), liaria (9-14) */}
        <div className={`logo-word ${phase === 1 ? 'run' : ''}`}>
          <span className="accent lo-anchor">Lo</span>
          <AnimatedLetters text="cação " className="letters lo-tail" start={0} />
          <AnimatedLetters text="imo"    className="letters bi-left"  start={6} />
          <span className="accent bi-anchor">Bi</span>
          <AnimatedLetters text="liaria" className="letters bi-right" start={9} onDone={startExit} />
        </div>
      </div>
    </div>
  )
}
