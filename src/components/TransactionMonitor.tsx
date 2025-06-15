
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Eye, Shield, DollarSign, Clock, MapPin, Smartphone } from "lucide-react";

interface TransactionMonitorProps {
  searchTerm: string;
  riskFilter: string;
}

const TransactionMonitor = ({ searchTerm, riskFilter }: TransactionMonitorProps) => {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  // Mock transaction data
  const transactions = [
    {
      id: "TXN-2024-001234",
      timestamp: "2024-01-15 14:32:15",
      sender: "usuario@email.com",
      receiver: "destino@email.com",
      amount: 2500.00,
      currency: "USD",
      riskScore: 95,
      riskLevel: "high",
      status: "blocked",
      flags: ["Velocidad inusual", "Dispositivo nuevo", "Monto atípico"],
      location: "Ciudad de México, MX",
      device: "iPhone 15 Pro",
      ip: "192.168.1.100"
    },
    {
      id: "TXN-2024-001235",
      timestamp: "2024-01-15 14:28:42",
      sender: "juan.perez@mail.com",
      receiver: "maria.garcia@email.com",
      amount: 150.00,
      currency: "USD",
      riskScore: 65,
      riskLevel: "medium",
      status: "under_review",
      flags: ["Horario inusual"],
      location: "Guadalajara, MX",
      device: "Samsung Galaxy S24",
      ip: "10.0.0.45"
    },
    {
      id: "TXN-2024-001236",
      timestamp: "2024-01-15 14:25:18",
      sender: "cliente@empresa.com",
      receiver: "proveedor@negocio.com",
      amount: 750.00,
      currency: "USD",
      riskScore: 25,
      riskLevel: "low",
      status: "approved",
      flags: [],
      location: "Monterrey, MX",
      device: "MacBook Pro",
      ip: "172.16.0.12"
    },
    {
      id: "TXN-2024-001237",
      timestamp: "2024-01-15 14:22:03",
      sender: "sospechoso@temp.com",
      receiver: "cuenta.nueva@mail.com",
      amount: 5000.00,
      currency: "USD",
      riskScore: 88,
      riskLevel: "high",
      status: "blocked",
      flags: ["Geolocalización", "Patrón repetitivo", "Monto atípico"],
      location: "Ubicación desconocida",
      device: "Navegador web",
      ip: "Unknown"
    },
    {
      id: "TXN-2024-001238",
      timestamp: "2024-01-15 14:18:56",
      sender: "regular@usuario.com",
      receiver: "amigo@email.com",
      amount: 50.00,
      currency: "USD",
      riskScore: 15,
      riskLevel: "low",
      status: "approved",
      flags: [],
      location: "Puebla, MX",
      device: "Android Phone",
      ip: "192.168.0.55"
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
      case "blocked":
        return <Badge variant="destructive">Bloqueada</Badge>;
      case "under_review":
        return <Badge variant="default" className="bg-orange-500 hover:bg-orange-600">En Revisión</Badge>;
      case "approved":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Aprobada</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = searchTerm === "" || 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.receiver.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRisk = riskFilter === "all" || transaction.riskLevel === riskFilter;
    
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Monitor de Transacciones P2P
            <Badge variant="outline" className="ml-auto">
              {filteredTransactions.length} resultados
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Transacción</TableHead>
                  <TableHead>Fecha/Hora</TableHead>
                  <TableHead>Emisor → Receptor</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Riesgo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-gray-50">
                    <TableCell className="font-mono text-sm">
                      {transaction.id}
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        {transaction.timestamp}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{transaction.sender}</div>
                        <div className="text-xs text-gray-500">→ {transaction.receiver}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-gray-400" />
                        <span className="font-medium">
                          ${transaction.amount.toLocaleString()} {transaction.currency}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getRiskBadge(transaction.riskLevel, transaction.riskScore)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transaction.status)}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedTransaction(transaction)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Ver Detalles
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Shield className="h-5 w-5" />
                              Análisis Detallado de Transacción
                            </DialogTitle>
                            <DialogDescription>
                              ID: {selectedTransaction?.id}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedTransaction && (
                            <div className="space-y-6">
                              {/* Risk Assessment */}
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <h4 className="font-medium flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4" />
                                    Evaluación de Riesgo
                                  </h4>
                                  <div className="p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                      <span>Puntuación de Riesgo</span>
                                      {getRiskBadge(selectedTransaction.riskLevel, selectedTransaction.riskScore)}
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div 
                                        className={`h-2 rounded-full ${
                                          selectedTransaction.riskLevel === 'high' ? 'bg-red-500' :
                                          selectedTransaction.riskLevel === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                                        }`}
                                        style={{ width: `${selectedTransaction.riskScore}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <h4 className="font-medium">Estado Actual</h4>
                                  <div className="p-3 bg-gray-50 rounded-lg">
                                    {getStatusBadge(selectedTransaction.status)}
                                  </div>
                                </div>
                              </div>

                              {/* Transaction Details */}
                              <div className="space-y-2">
                                <h4 className="font-medium">Detalles de la Transacción</h4>
                                <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                                  <div>
                                    <span className="text-sm text-gray-600">Emisor:</span>
                                    <div className="font-medium">{selectedTransaction.sender}</div>
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-600">Receptor:</span>
                                    <div className="font-medium">{selectedTransaction.receiver}</div>
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-600">Monto:</span>
                                    <div className="font-medium">${selectedTransaction.amount.toLocaleString()} {selectedTransaction.currency}</div>
                                  </div>
                                  <div>
                                    <span className="text-sm text-gray-600">Fecha/Hora:</span>
                                    <div className="font-medium">{selectedTransaction.timestamp}</div>
                                  </div>
                                </div>
                              </div>

                              {/* Device and Location Info */}
                              <div className="space-y-2">
                                <h4 className="font-medium">Información del Dispositivo</h4>
                                <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    <div>
                                      <span className="text-sm text-gray-600">Ubicación:</span>
                                      <div className="font-medium">{selectedTransaction.location}</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Smartphone className="h-4 w-4 text-gray-500" />
                                    <div>
                                      <span className="text-sm text-gray-600">Dispositivo:</span>
                                      <div className="font-medium">{selectedTransaction.device}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Risk Flags */}
                              {selectedTransaction.flags.length > 0 && (
                                <div className="space-y-2">
                                  <h4 className="font-medium text-red-600">Banderas de Riesgo Detectadas</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedTransaction.flags.map((flag, index) => (
                                      <Badge key={index} variant="destructive" className="text-xs">
                                        {flag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Actions */}
                              <div className="flex gap-2 pt-4">
                                <Button variant="destructive" size="sm">
                                  Bloquear Definitivamente
                                </Button>
                                <Button variant="default" size="sm">
                                  Marcar como Falso Positivo
                                </Button>
                                <Button variant="outline" size="sm">
                                  Solicitar Revisión Manual
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

export default TransactionMonitor;
