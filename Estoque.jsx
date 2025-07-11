import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Package, 
  Plus, 
  Search, 
  Filter,
  AlertTriangle,
  Calendar,
  Building2
} from 'lucide-react'

export function Estoque() {
  const [estoques, setEstoques] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroUnidade, setFiltroUnidade] = useState('')
  const [unidades, setUnidades] = useState([])

  useEffect(() => {
    fetchEstoques()
    fetchUnidades()
  }, [])

  const fetchEstoques = async () => {
    try {
      const response = await fetch('/api/estoque')
      if (response.ok) {
        const data = await response.json()
        setEstoques(data)
      }
    } catch (error) {
      console.error('Erro ao carregar estoques:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUnidades = async () => {
    try {
      const response = await fetch('/api/unidades')
      if (response.ok) {
        const data = await response.json()
        setUnidades(data)
      }
    } catch (error) {
      console.error('Erro ao carregar unidades:', error)
    }
  }

  const getStatusEstoque = (saldo) => {
    if (saldo <= 0) return { label: 'Esgotado', color: 'bg-red-100 text-red-800' }
    if (saldo < 10) return { label: 'Baixo', color: 'bg-orange-100 text-orange-800' }
    if (saldo < 50) return { label: 'Médio', color: 'bg-yellow-100 text-yellow-800' }
    return { label: 'Alto', color: 'bg-green-100 text-green-800' }
  }

  const getStatusValidade = (dataValidade) => {
    if (!dataValidade) return null
    
    const hoje = new Date()
    const validade = new Date(dataValidade)
    const diasRestantes = Math.ceil((validade - hoje) / (1000 * 60 * 60 * 24))
    
    if (diasRestantes < 0) return { label: 'Vencido', color: 'bg-red-100 text-red-800' }
    if (diasRestantes <= 7) return { label: 'Vence em breve', color: 'bg-orange-100 text-orange-800' }
    if (diasRestantes <= 30) return { label: 'Atenção', color: 'bg-yellow-100 text-yellow-800' }
    return null
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const estoquesFiltrados = estoques.filter(estoque => 
    !filtroUnidade || estoque.unidade_nome.includes(filtroUnidade)
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Estoque</h1>
        </div>
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Estoque</h1>
          <p className="text-gray-600 mt-1">
            Controle de entrada, saída e saldo de produtos
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Nova Entrada
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-full"
              />
            </div>
            <select
              value={filtroUnidade}
              onChange={(e) => setFiltroUnidade(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Todas as unidades</option>
              {unidades.map(unidade => (
                <option key={unidade.id} value={unidade.nome}>
                  {unidade.nome}
                </option>
              ))}
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estoque Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Estoque Atual
          </CardTitle>
          <CardDescription>
            {estoquesFiltrados.length} itens em estoque
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Produto</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Unidade</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Lote</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Saldo</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Validade</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Ações</th>
                </tr>
              </thead>
              <tbody>
                {estoquesFiltrados.map((estoque) => {
                  const statusEstoque = getStatusEstoque(estoque.saldo_atual)
                  const statusValidade = getStatusValidade(estoque.data_validade)
                  
                  return (
                    <tr key={estoque.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{estoque.produto_nome}</div>
                          <div className="text-sm text-gray-600">
                            Recebido em {formatDate(estoque.data_recebimento)}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-900">{estoque.unidade_nome}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-mono text-gray-600">{estoque.lote}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <span className="font-medium text-gray-900">{estoque.saldo_atual}</span>
                          <div className="text-xs text-gray-500">
                            de {estoque.quantidade_recebida} recebidos
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {estoque.data_validade ? (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {formatDate(estoque.data_validade)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Não informado</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <Badge className={statusEstoque.color}>
                            {statusEstoque.label}
                          </Badge>
                          {statusValidade && (
                            <Badge className={statusValidade.color}>
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              {statusValidade.label}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                          <Button variant="outline" size="sm">
                            Transferir
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

