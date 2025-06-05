import { useState } from 'preact/hooks'
import Swal from 'sweetalert2'
import { supabase } from '../supabase/client'

export default function CityForm({ onCityAdded }) {
  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!cityName.trim() || !country.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Input Kosong',
        text: 'Nama kota dan negara tidak boleh kosong!',
        confirmButtonColor: '#d33',
      })
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from('cities')
      .insert([{ name: cityName.trim(), country: country.trim() }])

    setLoading(false)

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menambahkan',
        text: error.message,
        confirmButtonColor: '#d33',
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: `${cityName}, ${country} ditambahkan!`,
        confirmButtonColor: '#3085d6',
      })

      setCityName('')
      setCountry('')
      if (onCityAdded) onCityAdded()
    }
  }

  return (
    <div class="form-container">
      <h2>Tambah Kota Baru</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={cityName}
          placeholder="Nama Kota"
          onInput={(e) => setCityName(e.currentTarget.value)}
        />
        <input
          type="text"
          value={country}
          placeholder="Negara"
          onInput={(e) => setCountry(e.currentTarget.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Tambah Kota'}
        </button>
      </form>

      <style>{`
        .form-container {
          background: linear-gradient(135deg, #fff, #f3f3f3);
          padding: 20px;
          max-width: 420px;
          margin: auto;
          border-radius: 10px;
          box-shadow: 0 0 12px rgba(0,0,0,0.1);
          font-family: 'Segoe UI', sans-serif;
        }

        h2 {
          text-align: center;
          margin-bottom: 15px;
          color: #333;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        input {
          padding: 12px;
          margin-bottom: 14px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 6px;
          background: #fff;
          color: #222;
          transition: all 0.3s ease;
        }

        input:focus {
          border-color: #007bff;
          outline: none;
          background: #f9f9ff;
        }

        button {
          padding: 12px;
          background-color: #007bff;
          color: #fff;
          font-weight: bold;
          font-size: 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:disabled {
          background-color: #aaa;
          cursor: not-allowed;
        }

        button:hover:not(:disabled) {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  )
}
