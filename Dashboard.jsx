import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Package, 
  Users, 
  AlertTriangle, 
  Calendar,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

export function Dashboard() {
  const [stats, setStats] = useState({
    total_unidades: 0,
    total_produtos: 0,
    total_fornecedores: 0,
    produtos_estoque_baixo: 0,
    produtos_vencimento: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Unidades Escolares',
      value: stats.total_unidades,
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Produtos Cadastrados',
      value: stats.total_produtos,
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Fornecedores Ativos',
      value: stats.total_fornecedores,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Estoque Baixo',
      value: stats.produtos_estoque_baixo,
      icon: TrendingDown,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      alert: true
    },
    {
      title: 'Próximos ao Vencimento',
      value: stats.produtos_vencimento,
      icon: Calendar,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      alert: true
    }
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
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
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Visão geral do Sistema de Alimentação Escolar
          </p>
        </div>
        <Badge variant="outline" className="text-green-700 border-green-300">
          Sistema Ativo
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className={stat.alert && stat.value > 0 ? 'border-orange-200' : ''}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                {stat.alert && stat.value > 0 && (
                  <div className="flex items-center mt-2 text-orange-600">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    <span className="text-xs font-medium">Requer atenção</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2 text-green-600" />
              Ações Rápidas - Estoque
            </CardTitle>
            <CardDescription>
              Operações frequentes de gestão de estoque
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Registrar Entrada</div>
              <div className="text-sm text-gray-600">Adicionar produtos ao estoque</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Registrar Consumo</div>
              <div className="text-sm text-gray-600">Lançar consumo diário</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Verificar Validades</div>
              <div className="text-sm text-gray-600">Produtos próximos ao vencimento</div>
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Avaliações e Relatórios
            </CardTitle>
            <CardDescription>
              Monitoramento e avaliação do programa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Nova Avaliação FAD</div>
              <div className="text-sm text-gray-600">Ficha de Avaliação de Distribuição</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Relatório de Consumo</div>
              <div className="text-sm text-gray-600">Análise de consumo por período</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Indicadores de Qualidade</div>
              <div className="text-sm text-gray-600">Métricas de desempenho</div>
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
          <CardDescription>
            Últimas movimentações no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Entrada de estoque registrada - UE-01
                </p>
                <p className="text-xs text-gray-600">
                  200kg de Arroz Parboilizado • há 2 horas
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Avaliação FAD enviada - UE-03
                </p>
                <p className="text-xs text-gray-600">
                  1ª Distribuição • Avaliação: 5/5 • há 4 horas
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Alerta de estoque baixo - UE-02
                </p>
                <p className="text-xs text-gray-600">
                  Óleo de Soja abaixo do limite mínimo • há 6 horas
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

