import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Icon from '@/components/ui/icon'

export function Inbound() {
  const inboundRules = [
    {
      id: 1,
      tag: 'vmess-in',
      protocol: 'VMess',
      port: 443,
      clients: 15,
      traffic: '2.3 ГБ',
      status: 'active'
    },
    {
      id: 2,
      tag: 'vless-in',
      protocol: 'VLESS',
      port: 8443,
      clients: 8,
      traffic: '1.8 ГБ',
      status: 'active'
    },
    {
      id: 3,
      tag: 'trojan-in',
      protocol: 'Trojan',
      port: 9443,
      clients: 3,
      traffic: '456 МБ',
      status: 'inactive'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Входящие соединения</h1>
          <p className="text-muted-foreground">Управление входящими подключениями</p>
        </div>
        <Button>
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить правило
        </Button>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Активные правила</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Тег</TableHead>
                <TableHead>Протокол</TableHead>
                <TableHead>Порт</TableHead>
                <TableHead>Клиенты</TableHead>
                <TableHead>Трафик</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inboundRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-mono">{rule.tag}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{rule.protocol}</Badge>
                  </TableCell>
                  <TableCell className="font-mono">{rule.port}</TableCell>
                  <TableCell>{rule.clients}</TableCell>
                  <TableCell>{rule.traffic}</TableCell>
                  <TableCell>
                    <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                      {rule.status === 'active' ? 'Активно' : 'Неактивно'}
                    </Badge>
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