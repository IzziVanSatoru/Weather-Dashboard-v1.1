// src/components/TimeNow.jsx
import { useEffect, useState } from 'preact/hooks'

export default function TimeNow() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n) => n.toString().padStart(2, '0')

  return (
    <div style={{
      fontSize: '1.5rem',
      textAlign: 'center',
      margin: '1rem 0',
      fontFamily: 'monospace',
      color: '#0f172a'
    }}>
      🕒 {pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
    </div>
  )
}
