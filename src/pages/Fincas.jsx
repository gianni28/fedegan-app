import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Fincas() {
  const [fincas, setFincas] = useState([])
  const [form, setForm] = useState({ nombre: '', ubicacion: '' })

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

  const registrarFinca = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://TU_BACKEND/finca', form)
      setForm({ nombre: '', ubicacion: '' })
      obtenerFincas()
    } catch (err) {
      console.error('Error al registrar finca:', err)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Registrar Finca</h2>

      <form onSubmit={registrarFinca} className="bg-white shadow p-4 rounded-xl space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Nombre"
          className="w-full border px-3 py-2 rounded-lg"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Ubicación"
          className="w-full border px-3 py-2 rounded-lg"
          value={form.ubicacion}
          onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
          Registrar
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-2">Fincas Registradas</h3>
        <table className="w-full bg-white shadow rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Nombre</th>
              <th className="text-left px-4 py-2">Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {fincas.map((finca) => (
              <tr key={finca.id} className="border-t">
                <td className="px-4 py-2">{finca.id}</td>
                <td className="px-4 py-2">{finca.nombre}</td>
                <td className="px-4 py-2">{finca.ubicacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
