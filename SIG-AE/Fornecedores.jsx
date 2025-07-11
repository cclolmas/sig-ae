import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Plus, Phone, Mail, MapPin } from 'lucide-react'

export function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFornecedores()
  }, [])

  const fetchFornecedores = async () => {
    try {
      const response = await fetch('/api/fornecedores')
      if (response.ok) {
        const data = await response.json()
        setFornecedores(data)
      }
    } catch (error) {
      console.error('Erro ao carregar fornecedores:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Fornecedores</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Fornecedores</h1>
          <p className="text-gray-600 mt-1">Gestão de fornecedores e parceiros</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Fornecedor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fornecedores.map((fornecedor) => (
          <Card key={fornecedor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{fornecedor.nome}</span>
                <Users className="w-5 h-5 text-gray-400" />
              </CardTitle>
              <CardDescription>
                CNPJ: {fornecedor.cnpj || 'Não informado'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {fornecedor.endereco && (
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-600">{fornecedor.endereco}</span>
                  </div>
                )}
                {fornecedor.telefone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{fornecedor.telefone}</span>
                  </div>
                )}
                {fornecedor.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{fornecedor.email}</span>
                  </div>
                )}
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Produtos
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

