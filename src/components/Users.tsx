import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Icon from '@/components/ui/icon'

export function Users() {
  const users = [
    {
      id: 1,
      email: 'admin@example.com',
      name: 'Администратор',
      role: 'admin',
      status: 'active',
      lastSeen: '2 мин назад',
      traffic: { used: 15.2, limit: 100 },
      connections: 3,
      protocols: ['VMess', 'VLESS']
    },
    {
      id: 2,
      email: 'user1@example.com',
      name: 'Пользователь 1',
      role: 'user',
      status: 'active',
      lastSeen: '15 мин назад',
      traffic: { used: 45.8, limit: 50 },
      connections: 2,
      protocols: ['VMess']
    },
    {
      id: 3,
      email: 'user2@example.com',
      name: 'Пользователь 2',
      role: 'user',
      status: 'inactive',
      lastSeen: '2 часа назад',
      traffic: { used: 8.3, limit: 25 },
      connections: 0,
      protocols: ['Trojan']
    },
    {
      id: 4,
      email: 'guest@example.com',
      name: 'Гость',
      role: 'guest',
      status: 'blocked',
      lastSeen: 'Никогда',
      traffic: { used: 0, limit: 5 },
      connections: 0,
      protocols: []
    }
  ]

  const userStats = [
    { label: 'Всего пользователей', value: '24', icon: 'Users', color: 'text-primary' },
    { label: 'Активных', value: '18', icon: 'UserCheck', color: 'text-success' },
    { label: 'Заблокированных', value: '3', icon: 'UserX', color: 'text-error' },
    { label: 'Новых за месяц', value: '5', icon: 'UserPlus', color: 'text-info' }
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive'
      case 'user': return 'default'
      case 'guest': return 'secondary'
      default: return 'outline'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'status-online'
      case 'inactive': return 'status-warning'
      case 'blocked': return 'status-offline'
      default: return 'status-offline'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Управление пользователями</h1>
          <p className="text-muted-foreground">Администрирование учетных записей и прав доступа</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт
          </Button>
          <Button>
            <Icon name="UserPlus" size={16} className="mr-2" />
            Добавить пользователя
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {userStats.map((stat, index) => (
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

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">Пользователи</TabsTrigger>
          <TabsTrigger value="roles">Роли и права</TabsTrigger>
          <TabsTrigger value="activity">Активность</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Users" size={20} />
                Список пользователей
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Пользователь</TableHead>
                    <TableHead>Роль</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Трафик</TableHead>
                    <TableHead>Соединения</TableHead>
                    <TableHead>Последний вход</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground font-mono">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleColor(user.role)}>
                          {user.role === 'admin' ? 'Админ' : user.role === 'user' ? 'Пользователь' : 'Гость'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`status-dot ${getStatusColor(user.status)}`}></div>
                          <span className="text-sm">
                            {user.status === 'active' ? 'Активен' : user.status === 'inactive' ? 'Неактивен' : 'Заблокирован'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{user.traffic.used} ГБ</span>
                            <span className="text-muted-foreground">/ {user.traffic.limit} ГБ</span>
                          </div>
                          <Progress value={(user.traffic.used / user.traffic.limit) * 100} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">{user.connections}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{user.lastSeen}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Edit" size={14} />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="Ban" size={14} />
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

        <TabsContent value="roles">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-red-400">Администратор</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Управление пользователями</span>
                  <Switch defaultChecked disabled />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Изменение настроек</span>
                  <Switch defaultChecked disabled />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Просмотр логов</span>
                  <Switch defaultChecked disabled />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Управление сервером</span>
                  <Switch defaultChecked disabled />
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Пользователь</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Просмотр статистики</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Изменение пароля</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Просмотр конфигурации</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Управление сервером</span>
                  <Switch disabled />
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-muted-foreground">Гость</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Просмотр статистики</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Изменение пароля</span>
                  <Switch disabled />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Просмотр конфигурации</span>
                  <Switch disabled />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Управление сервером</span>
                  <Switch disabled />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Activity" size={20} />
                Активность пользователей
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.filter(u => u.status === 'active').map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-card/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.protocols.join(', ')} • {user.connections} соединений
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{user.traffic.used} ГБ</div>
                      <div className="text-xs text-muted-foreground">{user.lastSeen}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}