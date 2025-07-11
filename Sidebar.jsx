import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  ClipboardList, 
  Building2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard'
  },
  {
    title: 'Estoque',
    icon: Package,
    href: '/estoque'
  },
  {
    title: 'Produtos',
    icon: ShoppingCart,
    href: '/produtos'
  },
  {
    title: 'Consumo',
    icon: TrendingUp,
    href: '/consumo'
  },
  {
    title: 'Fornecedores',
    icon: Users,
    href: '/fornecedores'
  },
  {
    title: 'Avaliações FAD',
    icon: ClipboardList,
    href: '/avaliacoes-fad'
  },
  {
    title: 'Unidades',
    icon: Building2,
    href: '/unidades'
  }
]

export function Sidebar({ open, setOpen }) {
  const location = useLocation()

  return (
    <div className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300",
      open ? "w-64" : "w-16"
    )}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          {open && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SIG</span>
              </div>
              <span className="font-semibold text-gray-900">SIG-AE</span>
            </div>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {open ? (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {open && (
                  <span className="ml-3">{item.title}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {open && (
            <div className="text-xs text-gray-500">
              <p>Sistema de Informação</p>
              <p>Gerencial de Alimentação Escolar</p>
              <p className="mt-1 font-medium">UNIAE - Plano Piloto/Cruzeiro</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

