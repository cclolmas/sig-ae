// Tipos para o sistema SIG-AE

export interface UnidadeEscolar {
  id: number
  nome: string
  endereco?: string
  telefone?: string
  email?: string
  modalidades?: string
}

export interface Categoria {
  id: number
  nome: string
  descricao?: string
}

export interface Fornecedor {
  id: number
  nome: string
  cnpj?: string
  endereco?: string
  telefone?: string
  email?: string
}

export interface Produto {
  id: number
  nome: string
  categoria: string
  fornecedor: string
  unidade_medida: string
  marca: string
  is_vegano: boolean
  is_sem_gluten: boolean
}

export interface Estoque {
  id: number
  produto_nome: string
  unidade_nome: string
  lote: string
  quantidade_recebida: number
  saldo_atual: number
  data_recebimento: string
  data_validade?: string
}

export interface Consumo {
  id: number
  produto_nome: string
  unidade_nome: string
  data_consumo: string
  quantidade_consumida: number
  tipo_refeicao: string
  alunos_atendidos: number
}

export interface AvaliacaoFAD {
  id: number
  unidade_nome: string
  periodo_distribuicao: string
  data_avaliacao: string
  avaliacao_qualidade: number
  avaliacao_prazo: number
  avaliacao_novas_preparacoes: number
  comentarios?: string
}

export interface DashboardStats {
  total_unidades: number
  total_produtos: number
  total_fornecedores: number
  produtos_estoque_baixo: number
  produtos_vencimento: number
}

// Props para componentes
export interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export interface HeaderProps {
  setSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void
}

