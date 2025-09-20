import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import Icon from '@/components/ui/icon'

export function Logs() {
  const [filterLevel, setFilterLevel] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const logEntries = [
    {
      id: 1,
      timestamp: '2024-09-20 14:32:15',
      level: 'info',
      source: 'inbound',
      message: 'New connection from 192.168.1.100:45234',
      details: 'VMess protocol, user: user1@example.com'
    },
    {
      id: 2,
      timestamp: '2024-09-20 14:31:58',
      level: 'warning',
      source: 'routing',
      message: 'High latency detected on proxy-us',
      details: 'Latency: 850ms, threshold: 500ms'
    },
    {
      id: 3,
      timestamp: '2024-09-20 14:31:42',
      level: 'error',
      source: 'outbound',
      message: 'Connection failed to proxy-eu',
      details: 'Connection timeout after 30s'
    },
    {
      id: 4,
      timestamp: '2024-09-20 14:31:25',
      level: 'info',
      source: 'dns',
      message: 'DNS query resolved: google.com',
      details: 'IP: 142.250.191.14, cache: miss'
    },
    {
      id: 5,
      timestamp: '2024-09-20 14:31:08',
      level: 'debug',
      source: 'api',
      message: 'API request received',
      details: 'GET /api/stats from 127.0.0.1'
    },
    {
      id: 6,
      timestamp: '2024-09-20 14:30:55',
      level: 'info',
      source: 'routing',
      message: 'Rule matched: block ads',
      details: 'Domain: doubleclick.net, action: block'
    }
  ]

  const logStats = [
    { label: 'Всего записей', value: '15,847', icon: 'FileText', color: 'text-primary' },
    { label: 'Ошибки', value: '23', icon: 'AlertCircle', color: 'text-error' },
    { label: 'Предупреждения', value: '156', icon: 'AlertTriangle', color: 'text-warning' },
    { label: 'Размер логов', value: '2.3 МБ', icon: 'HardDrive', color: 'text-info' }
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'destructive'
      case 'warning': return 'secondary'
      case 'info': return 'default'
      case 'debug': return 'outline'
      default: return 'outline'
    }
  }

  const filteredLogs = logEntries.filter(log => {
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel
    const matchesSearch = searchTerm === '' || 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesLevel && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Журналы событий</h1>
          <p className="text-muted-foreground">Мониторинг и анализ логов системы</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт
          </Button>
          <Button variant="outline">
            <Icon name="Trash2" size={16} className="mr-2" />
            Очистить
          </Button>
          <Button>
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Обновить
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {logStats.map((stat, index) => (
          <Card key={index} className="glass">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <Icon name={stat.icon as any} size={24} className={stat.color} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Filter" size={20} />
            Фильтры
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium">Поиск</label>
              <Input
                placeholder="Поиск по сообщениям и источникам..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="w-48">
              <label className="text-sm font-medium">Уровень</label>
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все уровни</SelectItem>
                  <SelectItem value="error">Ошибки</SelectItem>
                  <SelectItem value="warning">Предупреждения</SelectItem>
                  <SelectItem value="info">Информация</SelectItem>
                  <SelectItem value="debug">Отладка</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-48">
              <label className="text-sm font-medium">Источник</label>
              <Select defaultValue="all">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все источники</SelectItem>
                  <SelectItem value="inbound">Входящие</SelectItem>
                  <SelectItem value="outbound">Исходящие</SelectItem>
                  <SelectItem value="routing">Маршрутизация</SelectItem>
                  <SelectItem value="dns">DNS</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="List" size={20} />
              Журнал событий
            </div>
            <Badge variant="outline">{filteredLogs.length} записей</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <div key={log.id} className="border border-border/50 rounded-lg p-4 bg-card/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge variant={getLevelColor(log.level)}>
                        {log.level.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">{log.source}</Badge>
                      <span className="font-mono text-sm text-muted-foreground">
                        {log.timestamp}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{log.message}</p>
                    <p className="text-xs text-muted-foreground">{log.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}