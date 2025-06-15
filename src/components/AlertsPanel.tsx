
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Bell, Shield, Clock, CheckCircle, XCircle, Eye } from "lucide-react";

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([
    {
      id: "ALT-001",
      type: "high_risk_transaction",
      title: "Transacción de Alto Riesgo Detectada",
      description: "Usuario intenta transferir $5,000 desde dispositivo nuevo",
      timestamp: "2024-01-15 14:35:22",
      severity: "critical",
      status: "active",
      transactionId: "TXN-2024-001234",
      userId: "usuario@email.com",
      riskScore: 95,
      actions: ["block", "review", "approve"]
    },
    {
      id: "ALT-002",
      type: "velocity_check",
      title: "Velocidad de Transacciones Inusual",
      description: "Usuario ha realizado 15 transferencias en los últimos 30 minutos",
      timestamp: "2024-01-15 14:32:18",
      severity: "high",
      status: "active",
      transactionId: "TXN-2024-001235",
      userId: "juan.perez@mail.com",
      riskScore: 82,
      actions: ["limit", "review", "monitor"]
    },
    {
      id: "ALT-003",
      type: "geolocation_anomaly",
      title: "Anomalía de Geolocalización",
      description: "Transacción desde ubicación inusual (3000km de distancia)",
      timestamp: "2024-01-15 14:28:45",
      severity: "medium",
      status: "under_review",
      transactionId: "TXN-2024-001236",
      userId: "cliente@empresa.com",
      riskScore: 65,
      actions: ["verify", "approve", "block"]
    },
    {
      id: "ALT-004",
      type: "false_positive",
      title: "Posible Falso Positivo",
      description: "Transacción legítima marcada incorrectamente como fraude",
      timestamp: "2024-01-15 14:15:30",
      severity: "low",
      status: "resolved",
      transactionId: "TXN-2024-001230",
      userId: "regular@usuario.com",
      riskScore: 25,
      actions: ["approve"]
    },
    {
      id: "ALT-005",
      type: "device_fingerprint",
      title: "Dispositivo No Reconocido",
      description: "Acceso desde dispositivo sin historial previo",
      timestamp: "2024-01-15 14:10:15",
      severity: "medium",
      status: "active",
      transactionId: "TXN-2024-001231",
      userId: "nuevo@usuario.com",
      riskScore: 58,
      actions: ["verify", "monitor", "approve"]
    }
  ]);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive" className="bg-red-600">Crítica</Badge>;
      case "high":
        return <Badge variant="destructive">Alta</Badge>;
      case "medium":
        return <Badge variant="default" className="bg-orange-500 hover:bg-orange-600">Media</Badge>;
      case "low":
        return <Badge variant="secondary">Baja</Badge>;
      default:
        return <Badge variant="outline">Desconocida</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="destructive" className="animate-pulse">Activa</Badge>;
      case "under_review":
        return <Badge variant="default" className="bg-orange-500 hover:bg-orange-600">En Revisión</Badge>;
      case "resolved":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Resuelta</Badge>;
      default:
        return <Badge variant="outline">Desconocida</Badge>;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "medium":
        return <Bell className="h-5 w-5 text-orange-500" />;
      case "low":
        return <Shield className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleAlertAction = (alertId: string, action: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: action === 'resolve' ? 'resolved' : 'under_review' }
          : alert
      )
    );
  };

  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const reviewAlerts = alerts.filter(alert => alert.status === 'under_review');
  const resolvedAlerts = alerts.filter(alert => alert.status === 'resolved');

  const AlertCard = ({ alert }: { alert: any }) => (
    <Card className={`transition-all hover:shadow-md ${
      alert.severity === 'critical' ? 'border-red-200 bg-red-50' :
      alert.severity === 'high' ? 'border-red-100 bg-red-25' :
      alert.severity === 'medium' ? 'border-orange-100 bg-orange-25' :
      'border-gray-100'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {getSeverityIcon(alert.severity)}
            <div>
              <h4 className="font-medium text-gray-900">{alert.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {getSeverityBadge(alert.severity)}
            {getStatusBadge(alert.status)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500">ID Transacción:</span>
            <div className="font-mono">{alert.transactionId}</div>
          </div>
          <div>
            <span className="text-gray-500">Usuario:</span>
            <div>{alert.userId}</div>
          </div>
          <div>
            <span className="text-gray-500">Riesgo:</span>
            <div className="font-medium text-red-600">{alert.riskScore}/100</div>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-gray-400" />
            <span className="text-gray-500">{alert.timestamp}</span>
          </div>
        </div>

        {alert.status === 'active' && (
          <div className="flex gap-2 pt-3 border-t">
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => handleAlertAction(alert.id, 'block')}
            >
              <XCircle className="h-3 w-3 mr-1" />
              Bloquear
            </Button>
            <Button 
              size="sm" 
              variant="default"
              onClick={() => handleAlertAction(alert.id, 'review')}
            >
              <Eye className="h-3 w-3 mr-1" />
              Revisar
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleAlertAction(alert.id, 'resolve')}
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Aprobar
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Alertas Críticas</p>
                <p className="text-2xl font-bold text-red-600">
                  {alerts.filter(a => a.severity === 'critical' && a.status === 'active').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">En Revisión</p>
                <p className="text-2xl font-bold text-orange-600">{reviewAlerts.length}</p>
              </div>
              <Eye className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Resueltas Hoy</p>
                <p className="text-2xl font-bold text-green-600">{resolvedAlerts.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Alertas</p>
                <p className="text-2xl font-bold text-blue-600">{alerts.length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Alertas Activas ({activeAlerts.length})
          </TabsTrigger>
          <TabsTrigger value="review" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            En Revisión ({reviewAlerts.length})
          </TabsTrigger>
          <TabsTrigger value="resolved" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Resueltas ({resolvedAlerts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeAlerts.length > 0 ? (
            activeAlerts.map(alert => (
              <AlertCard key={alert.id} alert={alert} />
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hay alertas activas
                </h3>
                <p className="text-gray-600">
                  Todas las transacciones están siendo procesadas sin problemas.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="review" className="space-y-4">
          {reviewAlerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          {resolvedAlerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlertsPanel;
