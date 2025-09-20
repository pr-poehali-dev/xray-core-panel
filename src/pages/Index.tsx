import { useState } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { Dashboard } from '@/components/Dashboard'
import { Inbound } from '@/components/Inbound'
import { Outbound } from '@/components/Outbound'
import { Routing } from '@/components/Routing'
import { NetworkMap } from '@/components/NetworkMap'
import { Settings } from '@/components/Settings'
import { Logs } from '@/components/Logs'
import { Users } from '@/components/Users'

type TabType = 'dashboard' | 'inbound' | 'outbound' | 'routing' | 'network' | 'settings' | 'logs' | 'users'

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'inbound':
        return <Inbound />
      case 'outbound':
        return <Outbound />
      case 'routing':
        return <Routing />
      case 'network':
        return <NetworkMap />
      case 'settings':
        return <Settings />
      case 'logs':
        return <Logs />
      case 'users':
        return <Users />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="dark min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default Index