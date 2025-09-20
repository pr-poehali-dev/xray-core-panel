import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'

export function Dashboard() {
  const stats = [
    {
      title: 'Активные соединения',
      value: '1,247',
      change: '+12%',
      icon: 'Activity',
      color: 'text-success'
    },
    {
      title: 'Пропускная способность',
      value: '847 Мб/с',
      change: '+5%',
      icon: 'Zap',
      color: 'text-xray-400'
    },
    {
      title: 'Подключенные узлы',
      value: '24',
      change: '+2',
      icon: 'Server',
      color: 'text-info'
    },
    {
      title: 'Время работы',
      value: '15д 4ч',
      change: '99.9%',
      icon: 'Clock',
      color: 'text-warning'
    }
  ]

  const recentConnections = [
    { id: 1, ip: '192.168.1.100', protocol: 'VMess', status: 'online', traffic: '245 МБ' },
    { id: 2, ip: '10.0.0.15', protocol: 'VLESS', status: 'online', traffic: '156 МБ' },
    { id: 3, ip: '172.16.0.8', protocol: 'Trojan', status: 'warning', traffic: '89 МБ' },
    { id: 4, ip: '192.168.2.45', protocol: 'Shadowsocks', status: 'online', traffic: '312 МБ' },
    { id: 5, ip: '10.1.1.22', protocol: 'VMess', status: 'offline', traffic: '0 МБ' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Дашборд</h1>
          <p className="text-muted-foreground">Обзор системы Xray Core</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="RefreshCw" size={16} />
          Обновлено 2 минуты назад
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon name={stat.icon as any} size={20} className={stat.color} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">{stat.change}</span> от предыдущего периода
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="BarChart3" size={20} />
              Загрузка системы
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>CPU</span>
                <span>34%</span>
              </div>
              <Progress value={34} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>RAM</span>
                <span>67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Сеть</span>
                <span>23%</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Диск</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Users" size={20} />
              Последние подключения
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentConnections.map((conn) => (
                <div key={conn.id} className="flex items-center justify-between p-3 rounded-lg bg-card/50">
                  <div className="flex items-center gap-3">
                    <div className={`status-dot status-${conn.status}`}></div>
                    <div>
                      <div className="font-mono text-sm">{conn.ip}</div>
                      <div className="text-xs text-muted-foreground">{conn.protocol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{conn.traffic}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Activity" size={20} />
            График трафика в реальном времени
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-card/30 rounded-lg flex items-center justify-center border border-border/50">
            <div className="text-center">
              <Icon name="TrendingUp" size={48} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">График загружается...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}