import { useEffect, useState } from 'preact/hooks'
import WeatherCard from './WeatherCard.jsx'
import Edit from './Edit.jsx'
import { supabase } from '../supabase/client'
import Swal from 'sweetalert2'

export default function CityList() {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingCity, setEditingCity] = useState(null)

  // Fetch data dari Supabase
  async function fetchCities() {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      setError(error.message)
      setCities([])
    } else {
      setCities(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCities()
  }, [])

  // Hapus kota dengan konfirmasi SweetAlert2
  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: `Delete ${name}?`,
      text: "Are you sure you want to delete this city?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      const { error } = await supabase.from('cities').delete().eq('id', id)
      if (error) {
        Swal.fire('Error', error.message, 'error')
      } else {
        Swal.fire('Deleted!', `${name} has been deleted.`, 'success')
        fetchCities()
      }
    }
  }

  // Buka modal edit
  const handleEdit = (city) => {
    setEditingCity(city)
  }

  // Tutup modal edit
  const closeEdit = () => {
    setEditingCity(null)
  }

  // Callback setelah update berhasil, reload data & tutup modal
  const onUpdated = () => {
    fetchCities()
    closeEdit()
  }

  return (
    <>
      <style>{`
        .list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          padding: 10px;
        }
        .loading, .error {
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-weight: 600;
          color: #555;
          margin: 30px 0;
          user-select: none;
        }
        .card-wrapper {
          position: relative;
          display: inline-block;
        }
        .btn-group {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 6px;
        }
        button {
          cursor: pointer;
          font-size: 0.75rem;
          padding: 4px 8px;
          border-radius: 6px;
          border: none;
          user-select: none;
          transition: background-color 0.2s ease;
        }
        .btn-edit {
          background-color: #3b82f6;
          color: white;
        }
        .btn-edit:hover {
          background-color: #2563eb;
        }
        .btn-delete {
          background-color: #ef4444;
          color: white;
        }
        .btn-delete:hover {
          background-color: #b91c1c;
        }
        /* Modal overlay */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
      `}</style>

      {loading && <p className="loading">Loading cities...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && cities.length === 0 && (
        <p className="error">No cities found. Add some!</p>
      )}

      <div className="list" role="list" aria-label="List of cities">
        {cities.map((city) => (
          <div className="card-wrapper" role="listitem" key={city.id}>
            <WeatherCard city={city.name} country={city.country} />
            <div className="btn-group">
              <button className="btn-edit" onClick={() => handleEdit(city)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(city.id, city.name)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Edit */}
      {editingCity && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <Edit city={editingCity} onClose={closeEdit} onUpdated={onUpdated} />
        </div>
      )}
    </>
  )
}
