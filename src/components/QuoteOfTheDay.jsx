// src/components/QuoteOfTheDay.jsx
import { useEffect, useState } from 'preact/hooks'

const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Success is not in what you have, but who you are.", author: "Bo Bennett" },
  { text: "Your time is limited, don’t waste it living someone else’s life.", author: "Steve Jobs" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" }
]

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState(null)

  useEffect(() => {
    const index = new Date().getDate() % quotes.length
    setQuote(quotes[index])
  }, [])

  if (!quote) return null

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f1f5f9',
      borderRadius: '10px',
      margin: '1rem auto',
      maxWidth: '600px',
      fontFamily: 'sans-serif',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <blockquote style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>"{quote.text}"</blockquote>
      <cite style={{ fontWeight: 'bold', color: '#334155' }}>— {quote.author}</cite>
    </div>
  )
}
