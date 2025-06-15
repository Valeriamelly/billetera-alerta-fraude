
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Search, AlertTriangle, Shield, TrendingUp, MapPin, Calendar, DollarSign } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const UserProfileMonitor = () => {
  const [searchUser, setSearchUser] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Mock user data
  const users = [
    {
      id: "USR-001234",
      email: "usuario.sospechoso@email.com",
      name: "Juan Pérez",
      registrationDate: "2024-01-10",
      riskScore: 92,
      riskLevel: "high",
      status: "flagged",
      totalTransactions: 45,
      totalAmount: 15750.00,
      flaggedTransactions: 8,
      devices: 3,
      locations: ["Ciudad de México", "Guadalajara", "Ubicación desconocida"],
      lastActivity: "2024-01-15 14:32:15",
      flags: ["Velocidad inusual", "Dispositivos múltiples", "Geolocalización"],
      transactionHistory: [
        { date: "2024-01-10", amount: 100, risk: 20 },
        { date: "2024-01-11", amount: 500, risk: 35 },
        { date: "2024-01-12", amount: 1200, risk: 45 },
        { date: "2024-01-13", amount: 2500, risk: 70 },
        { date: "2024-01-14", amount: 3000, risk: 85 },
        { date: "2024-01-15", amount: 5000, risk: 92 }
      ]
    },
    {
      id: "USR-001235",
      email: "cliente.regular@empresa.com",
      name: "María García",
      registrationDate: "2023-08-15",
      riskScore: 25,
      riskLevel: "low",
      status: "verified",
      totalTransactions: 234,
      totalAmount: 45320.00,
      flaggedTransactions: 2,
      devices: 2,
      locations: ["Monterrey"],
      lastActivity: "2024-01-15 13:45:22",
      flags: [],
      transactionHistory: [
        { date: "2024-01-10", amount: 200, risk: 15 },
        { date: "2024-01-11", amount: 300, risk: 18 },
        { date: "2024-01-12", amount: 250, risk: 20 },
        { date: "2024-01-13", amount: 400, risk: 22 },
        { date: "2024-01-14", amount: 350, risk: 25 },
        { date: "2024-01-15", amount: 300, risk: 20 }
      ]
    },
    {
      id: "USR-001236",
      email: "nuevo.usuario@temp.com",
      name: "Carlos Ruiz",
      registrationDate: "2024-01-14",
      riskScore: 78,
      riskLevel: "medium",
      status: "under_review",
      totalTransactions: 12,
      totalAmount: 8950.00,
      flaggedTransactions: 4,
      devices: 4,
      locations: ["Puebla", "Tijuana"],
      lastActivity: "2024-01-15 14:28:45",
      flags: ["Usuario nuevo", "Dispositivos múltiples"],
      transactionHistory: [
        { date: "2024-01-14", amount: 500, risk: 60 },
        { date: "2024-01-14", amount: 800, risk: 65 },
        { date: "2024-01-15", amount: 1200, risk: 70 },
        { date: "2024-01-15", amount: 2000, risk: 78 }
      ]
    }
  ];

  const getRiskBadge = (level: string, score: number) => {
    switch (level) {
      case "high":
        return <Badge variant="destructive" className="font-medium">{score}/100</Badge>;
      case "medium":
        return <Badge variant="default" className="bg-orange-500 hover:bg-orange-600">{score}/100</Badge>;
      case "low":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">{score}/100</Badge>;
      default:
        return <Badge variant="outline">{score}/100</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "flagged":
        return <Badge variant="destructive">Marcado</Badge>;
      case "under_review":
        return <Badge variant="default" className="bg-orange-500 hover:bg-orange-600">En Revisión</Badge>;
      case "verified":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Verificado</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const filteredUsers = users.filter(user => 
    searchUser === "" || 
    user.email.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.id.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Usuarios de Alto Riesgo</p>
                <p className="text-2xl font-bold text-red-600">
                  {users.filter(u => u.riskLevel === 'high').length}
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
                <p className="text-2xl font-bold text-orange-600">
                  {users.filter(u => u.status === 'under_review').length}
                </p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Verificados</p>
                <p className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.status === 'verified').length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Usuarios</p>
                <p className="text-2xl font-bold text-blue-600">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar usuarios por email, nombre o ID..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Perfiles de Usuario Monitoreados
            <Badge variant="outline" className="ml-auto">
              {filteredUsers.length} usuarios
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Registro</TableHead>
                  <TableHead>Actividad</TableHead>
                  <TableHead>Riesgo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-400 font-mono">{user.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{user.registrationDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          {user.totalTransactions} transacciones
                        </div>
                        <div className="text-xs text-gray-500">
                          ${user.totalAmount.toLocaleString()}
                        </div>
                        {user.flaggedTransactions > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {user.flaggedTransactions} marcadas
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getRiskBadge(user.riskLevel, user.riskScore)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.status)}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedUser(user)}
                          >
                            Ver Perfil
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Users className="h-5 w-5" />
                              Perfil Detallado del Usuario
                            </DialogTitle>
                            <DialogDescription>
                              {selectedUser?.name} - {selectedUser?.email}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedUser && (
                            <div className="space-y-6">
                              {/* User Overview */}
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <h4 className="font-medium">Información General</h4>
                                  <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">ID Usuario:</span>
                                      <span className="font-mono">{selectedUser.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Fecha de Registro:</span>
                                      <span>{selectedUser.registrationDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Última Actividad:</span>
                                      <span>{selectedUser.lastActivity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Dispositivos:</span>
                                      <Badge variant="outline">{selectedUser.devices}</Badge>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <h4 className="font-medium">Evaluación de Riesgo</h4>
                                  <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-center">
                                      <span className="text-gray-600">Puntuación:</span>
                                      {getRiskBadge(selectedUser.riskLevel, selectedUser.riskScore)}
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div 
                                        className={`h-2 rounded-full ${
                                          selectedUser.riskLevel === 'high' ? 'bg-red-500' :
                                          selectedUser.riskLevel === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                                        }`}
                                        style={{ width: `${selectedUser.riskScore}%` }}
                                      ></div>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Estado:</span>
                                      {getStatusBadge(selectedUser.status)}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Transaction Statistics */}
                              <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 bg-blue-50 rounded-lg text-center">
                                  <div className="text-2xl font-bold text-blue-600">{selectedUser.totalTransactions}</div>
                                  <div className="text-sm text-blue-700">Total Transacciones</div>
                                </div>
                                <div className="p-4 bg-green-50 rounded-lg text-center">
                                  <div className="text-2xl font-bold text-green-600">${selectedUser.totalAmount.toLocaleString()}</div>
                                  <div className="text-sm text-green-700">Monto Total</div>
                                </div>
                                <div className="p-4 bg-red-50 rounded-lg text-center">
                                  <div className="text-2xl font-bold text-red-600">{selectedUser.flaggedTransactions}</div>
                                  <div className="text-sm text-red-700">Transacciones Marcadas</div>
                                </div>
                              </div>

                              {/* Risk Trend Chart */}
                              <div className="space-y-2">
                                <h4 className="font-medium">Tendencia de Riesgo (Últimos 6 días)</h4>
                                <div className="h-48 w-full">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={selectedUser.transactionHistory}>
                                      <XAxis dataKey="date" />
                                      <YAxis />
                                      <Tooltip />
                                      <Line 
                                        type="monotone" 
                                        dataKey="risk" 
                                        stroke="#ef4444" 
                                        strokeWidth={2}
                                        dot={{ fill: '#ef4444' }}
                                      />
                                    </LineChart>
                                  </ResponsiveContainer>
                                </div>
                              </div>

                              {/* Location and Flags */}
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <h4 className="font-medium flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    Ubicaciones Detectadas
                                  </h4>
                                  <div className="space-y-1">
                                    {selectedUser.locations.map((location, index) => (
                                      <Badge key={index} variant="outline" className="mr-2">
                                        {location}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                {selectedUser.flags.length > 0 && (
                                  <div className="space-y-2">
                                    <h4 className="font-medium text-red-600">Banderas de Riesgo</h4>
                                    <div className="space-y-1">
                                      {selectedUser.flags.map((flag, index) => (
                                        <Badge key={index} variant="destructive" className="mr-2">
                                          {flag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2 pt-4 border-t">
                                <Button variant="destructive" size="sm">
                                  Suspender Cuenta
                                </Button>
                                <Button variant="default" size="sm">
                                  Solicitar Verificación
                                </Button>
                                <Button variant="outline" size="sm">
                                  Marcar como Seguro
                                </Button>
                                <Button variant="outline" size="sm">
                                  Ver Historial Completo
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileMonitor;
