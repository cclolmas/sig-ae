import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, Plus, Phone, Mail, MapPin, Users } from 'lucide-react'
import { UnidadeEscolar } from '@/types'

export function Unidades() {
  const [unidades, setUnidades] = useState<UnidadeEscolar[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchUnidades()
  }, [])

  const fetchUnidades = async (): Promise<void> => {
    try {
      const response = await fetch('/api/unidades')
      if (response.ok) {
        const data: UnidadeEscolar[] = await response.json()
        setUnidades(data)
      }
    } catch (error) {
      console.error('Erro ao carregar unidades:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Unidades Escolares</h1>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Unidades Escolares</h1>
          <p className="text-gray-600 mt-1">Gestão das unidades escolares da rede</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Nova Unidade
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {unidades.map((unidade) => (
          <Card key={unidade.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{unidade.nome}</span>
                <Building2 className="w-5 h-5 text-gray-400" />
              </CardTitle>
              <CardDescription>
                ID: {unidade.id}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {unidade.endereco && (
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-600">{unidade.endereco}</span>
                  </div>
                )}
                {unidade.telefone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{unidade.telefone}</span>
                  </div>
                )}
                {unidade.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{unidade.email}</span>
                  </div>
                )}
                {unidade.modalidades && (
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Modalidades: {unidade.modalidades}
                    </span>
                  </div>
                )}
                
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Estoque
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Relatórios
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Editar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

