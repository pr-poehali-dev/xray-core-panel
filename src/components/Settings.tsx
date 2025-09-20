import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import Icon from '@/components/ui/icon'

export function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Настройки</h1>
          <p className="text-muted-foreground">Конфигурация системы и параметры Xray Core</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Сбросить
          </Button>
          <Button>
            <Icon name="Save" size={16} className="mr-2" />
            Сохранить
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Основные</TabsTrigger>
          <TabsTrigger value="logging">Логирование</TabsTrigger>
          <TabsTrigger value="dns">DNS</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Общие параметры</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="server-name">Имя сервера</Label>
                  <Input id="server-name" defaultValue="Xray-Core-Panel" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="listen-port">Порт управления</Label>
                  <Input id="listen-port" type="number" defaultValue="8080" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Автозапуск</Label>
                    <p className="text-sm text-muted-foreground">Запускать сервис при старте системы</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Темная тема</Label>
                    <p className="text-sm text-muted-foreground">Использовать темную тему интерфейса</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>Язык интерфейса</Label>
                  <Select defaultValue="ru">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Производительность</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Максимум соединений</Label>
                  <Input type="number" defaultValue="10000" />
                </div>

                <div className="space-y-2">
                  <Label>Размер буфера (КБ)</Label>
                  <Input type="number" defaultValue="512" />
                </div>

                <div className="space-y-2">
                  <Label>Таймаут соединения (сек)</Label>
                  <Input type="number" defaultValue="30" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Сжатие gzip</Label>
                    <p className="text-sm text-muted-foreground">Сжимать HTTP трафик</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Кэширование DNS</Label>
                    <p className="text-sm text-muted-foreground">Кэшировать DNS запросы</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logging">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Настройки логирования</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Уровень логирования</Label>
                  <Select defaultValue="warning">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debug">Debug</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="none">Отключить</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Путь к файлу логов</Label>
                  <Input defaultValue="/var/log/xray/access.log" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Логировать доступ</Label>
                  <p className="text-sm text-muted-foreground">Записывать все подключения</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Логировать ошибки</Label>
                  <p className="text-sm text-muted-foreground">Записывать ошибки соединений</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Максимальный размер лога (МБ)</Label>
                <Input type="number" defaultValue="100" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dns">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Настройки DNS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Основной DNS</Label>
                  <Input defaultValue="8.8.8.8" />
                </div>

                <div className="space-y-2">
                  <Label>Резервный DNS</Label>
                  <Input defaultValue="1.1.1.1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Пользовательские серверы</Label>
                <Textarea 
                  placeholder="223.5.5.5&#10;114.114.114.114"
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>DNS через HTTPS</Label>
                  <p className="text-sm text-muted-foreground">Использовать DoH для запросов</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Блокировка рекламы</Label>
                  <p className="text-sm text-muted-foreground">Блокировать рекламные домены</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="glass">
            <CardHeader>
              <CardTitle>API настройки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>API порт</Label>
                  <Input type="number" defaultValue="8081" />
                </div>

                <div className="space-y-2">
                  <Label>API ключ</Label>
                  <div className="flex gap-2">
                    <Input type="password" defaultValue="••••••••••••••••" />
                    <Button variant="outline" size="sm">
                      <Icon name="RefreshCw" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Включить API</Label>
                  <p className="text-sm text-muted-foreground">Разрешить внешние API запросы</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>CORS</Label>
                  <p className="text-sm text-muted-foreground">Разрешить межсайтовые запросы</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Разрешенные IP</Label>
                <Textarea 
                  placeholder="127.0.0.1&#10;192.168.1.0/24"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Настройки безопасности</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Двухфакторная аутентификация</Label>
                  <p className="text-sm text-muted-foreground">Требовать 2FA для входа</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Автоблокировка IP</Label>
                  <p className="text-sm text-muted-foreground">Блокировать подозрительные IP</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Максимум попыток входа</Label>
                <Input type="number" defaultValue="5" />
              </div>

              <div className="space-y-2">
                <Label>Время блокировки (мин)</Label>
                <Input type="number" defaultValue="30" />
              </div>

              <div className="space-y-2">
                <Label>SSL сертификат</Label>
                <div className="flex gap-2">
                  <Input placeholder="Путь к сертификату" />
                  <Button variant="outline">Обзор</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>SSL ключ</Label>
                <div className="flex gap-2">
                  <Input placeholder="Путь к ключу" />
                  <Button variant="outline">Обзор</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}