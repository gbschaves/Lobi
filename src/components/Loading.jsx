import React, { useEffect, useRef, useState } from 'react'

// Renderiza letras uma a uma com stagger via CSS custom property --i
// reverseStagger: a última letra (visualmente mais próxima de Bi) aparece primeiro
function AnimatedLetters({ text, className, start = 0, reverseStagger = false, onDone }) {
  const len = text.length
  return (
    <span className={className}>
      {text.split('').map((ch, i) => {
        const staggerIndex = reverseStagger ? start + (len - 1 - i) : start + i
        const isLast = i === len - 1
        return (
          <span
            key={i}
            className="char"
            style={{ '--i': staggerIndex }}
            onAnimationEnd={isLast ? onDone : undefined}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        )
      })}
    </span>
  )
}

const LOBI_HOLD_MS = 1000   // tempo que só "LoBi" fica visível antes das letras nascerem

export default function Loading({ onComplete }) {
  const [phase, setPhase] = useState(0)
  const calledRef = useRef(false)

  function finish() {
    if (calledRef.current) return
    calledRef.current = true
    onComplete?.()
  }

  useEffect(() => {
    const t = setTimeout(() => setPhase(1), LOBI_HOLD_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="loader-wrap">
      <div className="logo-stage">
        <div className={`logo-word ${phase === 1 ? 'run' : ''}`}>
          {/* Lo → desliza para esquerda; cação nasce saindo de Lo */}
          <span className="accent lo-anchor">Lo</span>
          <AnimatedLetters text="cação" className="letters lo-tail" start={0} />

          {/* imo fica à esquerda de Bi; nasce de trás para frente (o primeiro, i por último) */}
          <AnimatedLetters text="imo" className="letters bi-left" start={5} reverseStagger />

          {/* Bi → desliza para direita; liaria nasce saindo de Bi */}
          <span className="accent bi-anchor">Bi</span>
          <AnimatedLetters text="liaria" className="letters bi-right" start={8} onDone={finish} />
        </div>
      </div>
    </div>
  )
}
