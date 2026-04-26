import React, { useEffect, useState } from 'react'

export default function Loading() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1700)
    const t2 = setTimeout(() => setPhase(2), 3200)

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
          <span className="neutral">cação</span>
          <span className="neutral"> imo</span>
          <span className="accent bi-final">Bi</span>
          <span className="neutral">liaria</span>
        </div>
      </div>
    </div>
  )
}
