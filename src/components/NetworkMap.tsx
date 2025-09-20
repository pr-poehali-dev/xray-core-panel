import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

export function NetworkMap() {
  const nodes = [
    { id: 1, name: 'Main Server', ip: '192.168.1.1', status: 'online', type: 'server', x: 50, y: 30 },
    { id: 2, name: 'Node Moscow', ip: '10.0.1.5', status: 'online', type: 'node', x: 20, y: 60 },
    { id: 3, name: 'Node London', ip: '10.0.2.8', status: 'online', type: 'node', x: 80, y: 60 },
    { id: 4, name: 'Node Tokyo', ip: '10.0.3.12', status: 'warning', type: 'node', x: 90, y: 20 },
    { id: 5, name: 'Backup Server', ip: '192.168.1.2', status: 'offline', type: 'server', x: 50, y: 90 }
  ]

  const connections = [
    { from: 1, to: 2, status: 'active', bandwidth: '250 Мб/с' },
    { from: 1, to: 3, status: 'active', bandwidth: '180 Мб/с' },
    { from: 1, to: 4, status: 'warning', bandwidth: '95 Мб/с' },
    { from: 1, to: 5, status: 'inactive', bandwidth: '0 Мб/с' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Карта сети</h1>
          <p className="text-muted-foreground">Визуализация сетевой топологии</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Обновить
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить узел
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="glass h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Network" size={20} />
                Топология сети
              </CardTitle>
            </CardHeader>
            <CardContent className="relative h-full">
              <div className="absolute inset-4 bg-card/20 rounded-lg border border-border/50 overflow-hidden">
                <svg className="w-full h-full">
                  {/* Connections */}
                  {connections.map((conn, index) => {
                    const fromNode = nodes.find(n => n.id === conn.from)
                    const toNode = nodes.find(n => n.id === conn.to)
                    if (!fromNode || !toNode) return null
                    
                    return (
                      <line
                        key={index}
                        x1={`${fromNode.x}%`}
                        y1={`${fromNode.y}%`}
                        x2={`${toNode.x}%`}
                        y2={`${toNode.y}%`}
                        stroke={conn.status === 'active' ? '#10b981' : conn.status === 'warning' ? '#f59e0b' : '#6b7280'}
                        strokeWidth="2"
                        strokeDasharray={conn.status === 'inactive' ? '5,5' : 'none'}
                        className="transition-all duration-300"
                      />
                    )
                  })}
                  
                  {/* Nodes */}
                  {nodes.map((node) => (
                    <g key={node.id}>
                      <circle
                        cx={`${node.x}%`}
                        cy={`${node.y}%`}
                        r={node.type === 'server' ? '20' : '15'}
                        fill={node.status === 'online' ? '#10b981' : node.status === 'warning' ? '#f59e0b' : '#ef4444'}
                        stroke="currentColor"
                        strokeWidth="2"
                        className="transition-all duration-300 cursor-pointer hover:scale-110"
                      />
                      <text
                        x={`${node.x}%`}
                        y={`${node.y + 8}%`}
                        textAnchor="middle"
                        className="fill-white text-xs font-medium pointer-events-none"
                      >
                        {node.type === 'server' ? '🖥️' : '📡'}
                      </text>
                    </g>
                  ))}
                </svg>
                
                {/* Node labels */}
                {nodes.map((node) => (
                  <div
                    key={`label-${node.id}`}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ left: `${node.x}%`, top: `${node.y - 12}%` }}
                  >
                    <div className="bg-background/90 border rounded px-2 py-1 text-xs font-medium">
                      {node.name}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Server" size={20} />
                Статус узлов
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {nodes.map((node) => (
                <div key={node.id} className="flex items-center justify-between p-3 rounded-lg bg-card/50">
                  <div className="flex items-center gap-3">
                    <div className={`status-dot status-${node.status}`}></div>
                    <div>
                      <div className="font-medium text-sm">{node.name}</div>
                      <div className="font-mono text-xs text-muted-foreground">{node.ip}</div>
                    </div>
                  </div>
                  <Badge variant={node.status === 'online' ? 'default' : node.status === 'warning' ? 'secondary' : 'destructive'}>
                    {node.status === 'online' ? 'Онлайн' : node.status === 'warning' ? 'Предупреждение' : 'Офлайн'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Activity" size={20} />
                Статистика соединений
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {connections.map((conn, index) => {
                const fromNode = nodes.find(n => n.id === conn.from)
                const toNode = nodes.find(n => n.id === conn.to)
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-mono">{fromNode?.name} → {toNode?.name}</span>
                      <Badge variant={conn.status === 'active' ? 'default' : conn.status === 'warning' ? 'secondary' : 'outline'}>
                        {conn.bandwidth}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Settings" size={20} />
                Быстрые действия
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить сервер
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Icon name="RefreshCw" size={16} className="mr-2" />
                Перезапустить узел
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт конфигурации
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}