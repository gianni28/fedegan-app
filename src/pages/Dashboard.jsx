import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Vacunaciones() {
  const [fincas, setFincas] = useState([])
  const [animales, setAnimales] = useState([])
  const [animalId, setAnimalId] = useState('')
  const [form, setForm] = useState({ fecha: '', tipo_vacuna: '' })

  useEffect(() => {
    obtenerFincas()
  }, [])

  const obtenerFincas = async () => {
    try {
      const res = await axios.get('http://TU_BACKEND/fincas')
      setFincas(res.data)
    } catch (err) {
      console.error('Error al obtener fincas:', err)
    }
  }

  const obtenerAnimales = async (fincaId) => {
    try {
      const res = await axios.get(`http://TU_BACKEND/finca/${fincaId}/animales`)
      setAnimales(res.data)
    } catch (err) {
      console.error('Error al obtener animales:', err)
    }
  }

  const registrarVacunacion = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://TU_BACKEND/vacunacion', {
        ...form,
        animal_id: animalId
      })
      setForm({ fecha: '', tipo_vacuna: '' })
      alert('Vacunación registrada')
    } catch (err) {
      console.error('Error al registrar vacunación:', err)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Registro de Vacunación</h2>

      <div className="max-w-md space-y-4">
        <select
          onChange={(e) => obtenerAnimales(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option value="">Selecciona una finca</option>
          {fincas.map(f => (
            <option key={f.id} value={f.id}>{f.nombre}</option>
          ))}
        </select>

        <select
          value={animalId}
          onChange={(e) => setAnimalId(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option value="">Selecciona un animal</option>
          {animales.map(a => (
            <option key={a.id} value={a.id}>{a.nombre}</option>
          ))}
        </select>

        {animalId && (
          <form onSubmit={registrarVacunacion} className="bg-white shadow p-4 rounded-xl space-y-4">
            <input
              type="date"
              className="w-full border px-3 py-2 rounded-lg"
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Tipo de vacuna"
              className="w-full border px-3 py-2 rounded-lg"
              value={form.tipo_vacuna}
              onChange={(e) => setForm({ ...form, tipo_vacuna: e.target.value })}
              required
            />
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700">
              Registrar Vacunación
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
