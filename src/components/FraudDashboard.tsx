
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

const FraudDashboard = () => {
  // Mock data for charts
  const hourlyData = [
    { time: '00:00', transactions: 45, fraud: 2 },
    { time: '02:00', transactions: 32, fraud: 1 },
    { time: '04:00', transactions: 28, fraud: 0 },
    { time: '06:00', transactions: 67, fraud: 3 },
    { time: '08:00', transactions: 156, fraud: 8 },
    { time: '10:00', transactions: 234, fraud: 12 },
    { time: '12:00', transactions: 289, fraud: 15 },
    { time: '14:00', transactions: 267, fraud: 11 },
    { time: '16:00', transactions: 312, fraud: 18 },
    { time: '18:00', transactions: 278, fraud: 14 },
    { time: '20:00', transactions: 189, fraud: 9 },
    { time: '22:00', transactions: 123, fraud: 6 }
  ];

  const riskDistribution = [
    { name: 'Bajo Riesgo', value: 78, color: '#22c55e' },
    { name: 'Riesgo Medio', value: 18, color: '#f59e0b' },
    { name: 'Alto Riesgo', value: 4, color: '#ef4444' }
  ];

  const fraudTypes = [
    { type: 'Velocidad Inusual', count: 23, trend: 'up' },
    { type: 'Dispositivo Nuevo', count: 18, trend: 'down' },
    { type: 'Geolocalización', count: 15, trend: 'up' },
    { type: 'Monto Atípico', count: 12, trend: 'up' },
    { type: 'Horario Inusual', count: 8, trend: 'down' },
    { type: 'Patrón Repetitivo', count: 6, trend: 'up' }
  ];

  const weeklyTrend = [
    { day: 'Lun', fraudRate: 0.8 },
    { day: 'Mar', fraudRate: 0.6 },
    { day: 'Mié', fraudRate: 0.9 },
    { day: 'Jue', fraudRate: 0.7 },
    { day: 'Vie', fraudRate: 1.2 },
    { day: 'Sáb', fraudRate: 0.5 },
    { day: 'Dom', fraudRate: 0.4 }
  ];

  return (
    <div className="space-y-6">
      {/* Real-time Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Actividad de Transacciones vs Fraude (Últimas 24h)
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </CardTitle>
            <CardDescription>
              Comparación en tiempo real entre volumen de transacciones y detecciones de fraude
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="transactions" 
                  stackId="1" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6}
                  name="Transacciones"
                />
                <Area 
                  type="monotone" 
                  dataKey="fraud" 
                  stackId="2" 
                  stroke="#ef4444" 
                  fill="#ef4444" 
                  fillOpacity={0.8}
                  name="Fraudes Detectados"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Riesgo</CardTitle>
            <CardDescription>Clasificación actual de transacciones</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx={120}
                  cy={100}
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {riskDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fraud Types */}
        <Card>
          <CardHeader>
            <CardTitle>Tipos de Fraude Detectados</CardTitle>
            <CardDescription>Categorías más frecuentes hoy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fraudTypes.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.type}</span>
                      {item.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 text-red-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-green-500" />
                      )}
                    </div>
                  </div>
                  <Badge variant={item.count > 15 ? "destructive" : item.count > 10 ? "default" : "secondary"}>
                    {item.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tendencia Semanal</CardTitle>
            <CardDescription>Tasa de fraude por día (%)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="fraudRate" 
                  fill="#ef4444" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Risk Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Indicadores de Riesgo Principales</CardTitle>
          <CardDescription>Métricas clave que requieren atención inmediata</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg bg-red-50 border-red-200">
              <div className="text-2xl font-bold text-red-600">12</div>
              <div className="text-sm text-red-700">Usuarios de alto riesgo</div>
            </div>
            <div className="p-4 border rounded-lg bg-orange-50 border-orange-200">
              <div className="text-2xl font-bold text-orange-600">34</div>
              <div className="text-sm text-orange-700">Dispositivos nuevos</div>
            </div>
            <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">67</div>
              <div className="text-sm text-yellow-700">IPs sospechosas</div>
            </div>
            <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
              <div className="text-2xl font-bold text-blue-600">89</div>
              <div className="text-sm text-blue-700">Reglas activadas</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FraudDashboard;
