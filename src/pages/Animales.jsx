import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Animales() {
  const [fincas, setFincas] = useState([])
  const [animales, setAnimales] = useState([])
  const [fincaId, setFincaId] = useState('')
  const [form, setForm] = useState({ nombre: '', especie: '' })

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

  const obtenerAnimales = async (id) => {
    try {
      const res = await axios.get(`http://TU_BACKEND/finca/${id}/animales`)
      setAnimales(res.data)
    } catch (err) {
      console.error('Error al obtener animales:', err)
    }
  }

  const registrarAnimal = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://TU_BACKEND/animal', {
        ...form,
        finca_id: fincaId
      })
      setForm({ nombre: '', especie: '' })
      obtenerAnimales(fincaId)
    } catch (err) {
      console.error('Error al registrar animal:', err)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Registro de Animales</h2>

      <div className="max-w-md space-y-4">
        <select
          value={fincaId}
          onChange={(e) => {
            setFincaId(e.target.value)
            obtenerAnimales(e.target.value)
          }}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option value="">Selecciona una finca</option>
          {fincas.map(f => (
            <option key={f.id} value={f.id}>{f.nombre}</option>
          ))}
        </select>

        {fincaId && (
          <form onSubmit={registrarAnimal} className="bg-white shadow p-4 rounded-xl space-y-4">
            <input
              type="text"
              placeholder="Nombre del animal"
              className="w-full border px-3 py-2 rounded-lg"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Especie"
              className="w-full border px-3 py-2 rounded-lg"
              value={form.especie}
              onChange={(e) => setForm({ ...form, especie: e.target.value })}
              required
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700">
              Registrar Animal
            </button>
          </form>
        )}
      </div>

      {fincaId && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Animales en finca seleccionada</h3>
          <table className="w-full bg-white shadow rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2">ID</th>
                <th className="text-left px-4 py-2">Nombre</th>
                <th className="text-left px-4 py-2">Especie</th>
              </tr>
            </thead>
            <tbody>
              {animales.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="px-4 py-2">{a.id}</td>
                  <td className="px-4 py-2">{a.nombre}</td>
                  <td className="px-4 py-2">{a.especie}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}