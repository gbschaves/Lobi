import React, { useEffect, useRef, useState } from 'react'

function AnimatedLetters({ text, className, start = 0, reverseStagger = false, onLastCharAnimationEnd }) {
  const len = text.length
  return (
    <span className={className}>
      {text.split('').map((ch, i) => {
        const idx = reverseStagger ? start + (len - 1 - i) : start + i
        return (
          <span
            key={`${className}-${i}-${ch}`}
            className="char"
            style={{ '--i': idx }}
            onAnimationEnd={i === len - 1 ? onLastCharAnimationEnd : undefined}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        )
      })}
    </span>
  )
}

const LOBI_HOLD_MS       = 1200
const LETTER_STAGGER_MS  = 52
const LETTER_DURATION_MS = 380
const LETTER_DELAY_BASE  = 30
const LAST_LETTER_I      = 14   // "cação "(0-5) + "imo"(6-8) + "liaria"(9-14) → último --i = 14
// Tempo exato em que a última letra termina de animar, a partir do mount
const LETTERS_DONE_MS    = LOBI_HOLD_MS + (LAST_LETTER_I * LETTER_STAGGER_MS + LETTER_DELAY_BASE) + LETTER_DURATION_MS
const FALLBACK_COMPLETE_MS = LETTERS_DONE_MS + 80  // dispara 80ms após o fim real → sem pausa morta

export default function Loading({ onComplete }) {
  const [phase, setPhase] = useState(0)
  const finishedRef = useRef(false)

  function completeIntro() {
    if (finishedRef.current) return
    finishedRef.current = true
    onComplete?.()
  }

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), LOBI_HOLD_MS)
    const t2 = setTimeout(() => completeIntro(), FALLBACK_COMPLETE_MS)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onComplete])

  return (
    <div className="loader-wrap">
      <div className={`logo-stage phase-${phase}`}>
        <div className={`logo-word ${phase >= 1 ? 'run' : ''}`}>
          <span className="accent lo-anchor">Lo</span>
          <AnimatedLetters text="cação " className="letters lo-tail" start={0} />
          <AnimatedLetters text="imo" className="letters bi-left" start={6} reverseStagger />
          <span className="accent bi-anchor">Bi</span>
          <AnimatedLetters text="liaria" className="letters bi-right" start={9} onLastCharAnimationEnd={completeIntro} />
        </div>
      </div>
    </div>
  )
}
