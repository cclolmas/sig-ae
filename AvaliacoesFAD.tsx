import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ClipboardList, Plus, Star, Calendar } from 'lucide-react'
import { AvaliacaoFAD } from '@/types'

export function AvaliacoesFAD() {
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoFAD[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchAvaliacoes()
  }, [])

  const fetchAvaliacoes = async (): Promise<void> => {
    try {
      const response = await fetch('/api/avaliacoes-fad')
      if (response.ok) {
        const data: AvaliacaoFAD[] = await response.json()
        setAvaliacoes(data)
      }
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getAvaliacaoColor = (nota: number): string => {
    if (nota >= 4) return 'bg-green-100 text-green-800'
    if (nota >= 3) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const renderStars = (rating: number): JSX.Element[] => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Avaliações FAD</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Avaliações FAD</h1>
          <p className="text-gray-600 mt-1">Fichas de Avaliação de Distribuição</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Nova Avaliação
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {avaliacoes.map((avaliacao) => (
          <Card key={avaliacao.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{avaliacao.unidade_nome}</span>
                <ClipboardList className="w-5 h-5 text-gray-400" />
              </CardTitle>
              <CardDescription>
                {avaliacao.periodo_distribuicao} • {formatDate(avaliacao.data_avaliacao)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Qualidade</p>
                    <div className="flex justify-center mb-1">
                      {renderStars(avaliacao.avaliacao_qualidade)}
                    </div>
                    <Badge className={getAvaliacaoColor(avaliacao.avaliacao_qualidade)}>
                      {avaliacao.avaliacao_qualidade}/5
                    </Badge>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Prazo</p>
                    <div className="flex justify-center mb-1">
                      {renderStars(avaliacao.avaliacao_prazo)}
                    </div>
                    <Badge className={getAvaliacaoColor(avaliacao.avaliacao_prazo)}>
                      {avaliacao.avaliacao_prazo}/5
                    </Badge>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Preparações</p>
                    <div className="flex justify-center mb-1">
                      {renderStars(avaliacao.avaliacao_novas_preparacoes)}
                    </div>
                    <Badge className={getAvaliacaoColor(avaliacao.avaliacao_novas_preparacoes)}>
                      {avaliacao.avaliacao_novas_preparacoes}/5
                    </Badge>
                  </div>
                </div>
                
                {avaliacao.comentarios && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 font-medium mb-1">Comentários:</p>
                    <p className="text-sm text-gray-800">{avaliacao.comentarios}</p>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Detalhes
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

