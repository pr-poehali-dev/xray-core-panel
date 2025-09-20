import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Icon from '@/components/ui/icon'

export function Routing() {
  const routingRules = [
    {
      id: 1,
      name: 'Блокировка рекламы',
      type: 'domain',
      pattern: 'geosite:category-ads-all',
      outboundTag: 'block',
      enabled: true,
      priority: 1
    },
    {
      id: 2,
      name: 'Локальный трафик',
      type: 'ip',
      pattern: 'geoip:private',
      outboundTag: 'direct',
      enabled: true,
      priority: 2
    },
    {
      id: 3,
      name: 'Китайские сайты',
      type: 'domain',
      pattern: 'geosite:cn',
      outboundTag: 'direct',
      enabled: true,
      priority: 3
    },
    {
      id: 4,
      name: 'VPN трафик',
      type: 'domain',
      pattern: 'geosite:geolocation-!cn',
      outboundTag: 'proxy-us',
      enabled: true,
      priority: 4
    }
  ]

  const domainRules = [
    { domain: 'google.com', action: 'proxy-us', hits: 1247 },
    { domain: 'youtube.com', action: 'proxy-us', hits: 892 },
    { domain: 'baidu.com', action: 'direct', hits: 456 },
    { domain: 'doubleclick.net', action: 'block', hits: 2134 }
  ]

  const ipRules = [
    { cidr: '192.168.0.0/16', action: 'direct', hits: 3456 },
    { cidr: '10.0.0.0/8', action: 'direct', hits: 1890 },
    { cidr: '8.8.8.8/32', action: 'proxy-us', hits: 234 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Маршрутизация</h1>
          <p className="text-muted-foreground">Конфигурация правил маршрутизации трафика</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт правил
          </Button>
          <Button>
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить правило
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Активные правила</p>
                <p className="text-2xl font-bold">{routingRules.filter(r => r.enabled).length}</p>
              </div>
              <Icon name="Route" size={24} className="text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Обработано сегодня</p>
                <p className="text-2xl font-bold">8.4K</p>
              </div>
              <Icon name="Activity" size={24} className="text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Заблокировано</p>
                <p className="text-2xl font-bold">2.1K</p>
              </div>
              <Icon name="Shield" size={24} className="text-error" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Через прокси</p>
                <p className="text-2xl font-bold">6.3K</p>
              </div>
              <Icon name="Globe" size={24} className="text-info" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rules" className="space-y-6">
        <TabsList>
          <TabsTrigger value="rules">Правила маршрутизации</TabsTrigger>
          <TabsTrigger value="domains">Домены</TabsTrigger>
          <TabsTrigger value="ips">IP адреса</TabsTrigger>
          <TabsTrigger value="stats">Статистика</TabsTrigger>
        </TabsList>

        <TabsContent value="rules">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Route" size={20} />
                Правила маршрутизации
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Приоритет</TableHead>
                    <TableHead>Название</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Шаблон</TableHead>
                    <TableHead>Исходящий тег</TableHead>
                    <TableHead>Включено</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routingRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-mono">{rule.priority}</TableCell>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{rule.type}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm max-w-xs truncate">{rule.pattern}</TableCell>
                      <TableCell>
                        <Badge variant={rule.outboundTag === 'block' ? 'destructive' : rule.outboundTag === 'direct' ? 'secondary' : 'default'}>
                          {rule.outboundTag}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Switch checked={rule.enabled} />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Icon name="ArrowUp" size={14} />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="ArrowDown" size={14} />
                          </Button>
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
        </TabsContent>

        <TabsContent value="domains">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Globe" size={20} />
                Правила доменов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Домен</TableHead>
                    <TableHead>Действие</TableHead>
                    <TableHead>Попадания</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {domainRules.map((rule, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{rule.domain}</TableCell>
                      <TableCell>
                        <Badge variant={rule.action === 'block' ? 'destructive' : rule.action === 'direct' ? 'secondary' : 'default'}>
                          {rule.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">{rule.hits}</TableCell>
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
        </TabsContent>

        <TabsContent value="ips">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Server" size={20} />
                Правила IP адресов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>CIDR</TableHead>
                    <TableHead>Действие</TableHead>
                    <TableHead>Попадания</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ipRules.map((rule, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{rule.cidr}</TableCell>
                      <TableCell>
                        <Badge variant={rule.action === 'block' ? 'destructive' : rule.action === 'direct' ? 'secondary' : 'default'}>
                          {rule.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">{rule.hits}</TableCell>
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
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Топ доменов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {domainRules.sort((a, b) => b.hits - a.hits).map((rule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-mono text-sm">{rule.domain}</span>
                      <span className="font-mono text-sm">{rule.hits}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader>
                <CardTitle>Распределение по действиям</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Прокси</span>
                    <span className="text-info">67%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Прямое соединение</span>
                    <span className="text-success">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Заблокировано</span>
                    <span className="text-error">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}