import React, { useEffect, useState } from 'react'

export default function Loading() {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setExpanded(true), 800)
    return () => { clearTimeout(t1) }
  }, [])

  return (
    <div className="loader-wrap">
      <div style={{display:'flex', alignItems:'center'}}>
        <div className="logo-small">Lobi</div>
        <div className={"logo-expanded " + (expanded ? 'show' : '')}>Locação imobiliária</div>
      </div>
    </div>
  )
}
