import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar'
import Icon from '@/components/ui/icon'

type TabType = 'dashboard' | 'inbound' | 'outbound' | 'routing' | 'network' | 'settings' | 'logs' | 'users'

interface AppSidebarProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const menuItems = [
  { id: 'dashboard', label: 'Дашборд', icon: 'BarChart3' },
  { id: 'inbound', label: 'Входящие', icon: 'ArrowDown' },
  { id: 'outbound', label: 'Исходящие', icon: 'ArrowUp' },
  { id: 'routing', label: 'Маршрутизация', icon: 'Route' },
  { id: 'network', label: 'Карта сети', icon: 'Network' },
  { id: 'settings', label: 'Настройки', icon: 'Settings' },
  { id: 'logs', label: 'Журналы', icon: 'FileText' },
  { id: 'users', label: 'Пользователи', icon: 'Users' },
]

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Xray Core</h1>
            <p className="text-sm text-muted-foreground">Панель управления</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => onTabChange(item.id as TabType)}
                isActive={activeTab === item.id}
                className="w-full justify-start gap-3 py-3"
              >
                <Icon name={item.icon as any} size={20} />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-6">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-card">
          <div className="status-dot status-online animate-pulse-slow"></div>
          <div className="text-sm">
            <div className="font-medium">Статус системы</div>
            <div className="text-muted-foreground">Работает нормально</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}