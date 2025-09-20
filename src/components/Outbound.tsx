import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Icon from '@/components/ui/icon'

export function Outbound() {
  const outboundRules = [
    {
      id: 1,
      tag: 'proxy-us',
      protocol: 'VMess',
      address: 'us-server.example.com',
      port: 443,
      enabled: true,
      latency: '45ms',
      status: 'online'
    },
    {
      id: 2,
      tag: 'proxy-eu',
      protocol: 'VLESS',
      address: 'eu-server.example.com',
      port: 8443,
      enabled: true,
      latency: '78ms',
      status: 'online'
    },
    {
      id: 3,
      tag: 'direct',
      protocol: 'Freedom',
      address: 'direct',
      port: 0,
      enabled: true,
      latency: '0ms',
      status: 'online'
    }
  ]

  const proxyStats = [
    { name: 'Активные прокси', value: '3', icon: 'Server' },
    { name: 'Общий трафик', value: '847 ГБ', icon: 'Activity' },
    { name: 'Средняя задержка', value: '61ms', icon: 'Clock' },
    { name: 'Успешность', value: '99.2%', icon: 'CheckCircle' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Исходящие соединения</h1>
          <p className="text-muted-foreground">Настройка исходящих подключений и прокси-серверов</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Проверить соединения
          </Button>
          <Button>
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить прокси
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {proxyStats.map((stat, index) => (
          <Card key={index} className="glass">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <Icon name={stat.icon as any} size={24} className="text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="ArrowUp" size={20} />
            Конфигурация прокси
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Тег</TableHead>
                <TableHead>Протокол</TableHead>
                <TableHead>Адрес</TableHead>
                <TableHead>Порт</TableHead>
                <TableHead>Задержка</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Включен</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {outboundRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-mono">{rule.tag}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{rule.protocol}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{rule.address}</TableCell>
                  <TableCell className="font-mono">{rule.port || '-'}</TableCell>
                  <TableCell className="font-mono">{rule.latency}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`status-dot status-${rule.status}`}></div>
                      <span className="text-sm">{rule.status === 'online' ? 'Онлайн' : 'Офлайн'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch checked={rule.enabled} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Icon name="Edit" size={14} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}