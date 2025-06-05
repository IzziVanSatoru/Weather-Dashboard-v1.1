import { useState, useEffect } from 'preact/hooks'
import Swal from 'sweetalert2'
import { supabase } from '../supabase/client'  // <<== ini harus ditambah

export default function Edit({ city, onClose, onUpdated }) {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (city) {
      setName(city.name)
      setCountry(city.country)
    }
  }, [city])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !country.trim()) {
      Swal.fire('Error', 'City name and country cannot be empty', 'error')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase  // <<== ganti disini
        .from('cities')
        .update({ name: name.trim(), country: country.trim() })
        .eq('id', city.id)

      if (error) throw error

      Swal.fire('Success', 'City updated successfully', 'success')
      onUpdated()
      onClose()
    } catch (err) {
      Swal.fire('Error', err.message, 'error')
    }
    setLoading(false)
  }

  return (
    <>
      <style>{`
        form {
          max-width: 320px;
          margin: 0 auto;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 10px;
          box-shadow: 0 0 10px rgb(0 0 0 / 0.1);
          font-family: Arial, sans-serif;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }
        input {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 1rem;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 1rem;
          box-sizing: border-box;
        }
        button {
          background: #4f46e5;
          color: white;
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: background 0.3s ease;
        }
        button:disabled {
          background: #a5b4fc;
          cursor: not-allowed;
        }
        .btn-close {
          background: #ef4444;
          margin-left: 10px;
        }
      `}</style>

      <form onSubmit={handleSubmit}>
        <label htmlFor="city-name">City Name</label>
        <input
          id="city-name"
          type="text"
          value={name}
          onInput={e => setName(e.target.value)}
          disabled={loading}
        />

        <label htmlFor="city-country">Country</label>
        <input
          id="city-country"
          type="text"
          value={country}
          onInput={e => setCountry(e.target.value)}
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update City'}
        </button>
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
      </form>
    </>
  )
}
