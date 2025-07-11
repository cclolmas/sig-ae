import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Plus, Calendar, Users } from 'lucide-react'

export function Consumo() {
  const [consumos, setConsumos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConsumos()
  }, [])

  const fetchConsumos = async () => {
    try {
      const response = await fetch('/api/consumo')
      if (response.ok) {
        const data = await response.json()
        setConsumos(data)
      }
    } catch (error) {
      console.error('Erro ao carregar consumos:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Controle de Consumo</h1>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Controle de Consumo</h1>
          <p className="text-gray-600 mt-1">Registro de consumo diário de alimentos</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Registrar Consumo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Registros de Consumo
          </CardTitle>
          <CardDescription>
            {consumos.length} registros encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Data</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Produto</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Unidade</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Quantidade</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Refeição</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Alunos</th>
                </tr>
              </thead>
              <tbody>
                {consumos.map((consumo) => (
                  <tr key={consumo.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {formatDate(consumo.data_consumo)}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{consumo.produto_nome}</td>
                    <td className="py-3 px-4">{consumo.unidade_nome}</td>
                    <td className="py-3 px-4">{consumo.quantidade_consumida}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {consumo.tipo_refeicao}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1 text-gray-400" />
                        {consumo.alunos_atendidos}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

