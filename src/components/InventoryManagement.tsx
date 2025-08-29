import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Plus, Edit, Trash2, Eye, Package, Pill, AlertTriangle, ShoppingCart,
  Clipboard, TrendingDown, Search, Filter, Download, RefreshCw, 
  Calendar, AlertCircle, CheckCircle, Clock, XCircle
} from 'lucide-react';

interface InventoryManagementProps {
  onClose?: () => void;
}

export default function InventoryManagement({ onClose }: InventoryManagementProps) {
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // 약품 재고 관리 데이터
  const [inventory, setInventory] = useState([
    {
      id: 1,
      code: 'MED-001',
      name: '리도카인 HCl 2%',
      category: '마취제',
      currentStock: 25,
      minStock: 10,
      maxStock: 50,
      unit: '바이알',
      unitPrice: 12000,
      supplier: '대한약품',
      expiryDate: '2025-06-15',
      location: 'A-01',
      lastUpdated: '2024-12-28',
      status: '정상'
    },
    {
      id: 2,
      code: 'MED-002',
      name: '아목시실린 500mg',
      category: '항생제',
      currentStock: 5,
      minStock: 15,
      maxStock: 100,
      unit: '정',
      unitPrice: 500,
      supplier: '한국제약',
      expiryDate: '2025-03-20',
      location: 'B-03',
      lastUpdated: '2024-12-27',
      status: '부족'
    },
    {
      id: 3,
      code: 'MED-003',
      name: '프로포폴 1%',
      category: '진정제',
      currentStock: 8,
      minStock: 5,
      maxStock: 20,
      unit: '바이알',
      unitPrice: 25000,
      supplier: '메디칸',
      expiryDate: '2025-01-10',
      location: 'C-02',
      lastUpdated: '2024-12-29',
      status: '임박'
    },
    {
      id: 4,
      code: 'MED-004',
      name: 'NaCl 0.9% 생리식염수',
      category: '소독제',
      currentStock: 45,
      minStock: 20,
      maxStock: 60,
      unit: '병',
      unitPrice: 1500,
      supplier: '대웅제약',
      expiryDate: '2026-12-31',
      location: 'A-05',
      lastUpdated: '2024-12-28',
      status: '정상'
    },
    {
      id: 5,
      code: 'MED-005',
      name: '포비돈 요오드 10%',
      category: '소독제',
      currentStock: 12,
      minStock: 8,
      maxStock: 30,
      unit: '병',
      unitPrice: 8000,
      supplier: '동화약품',
      expiryDate: '2025-08-15',
      location: 'B-01',
      lastUpdated: '2024-12-26',
      status: '정상'
    }
  ]);

  // 발주 관리 데이터
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'ORD-2024-001',
      supplier: '대한약품',
      items: [
        { name: '리도카인 HCl 2%', quantity: 20, unitPrice: 12000 },
        { name: '에피네프린 1:100,000', quantity: 10, unitPrice: 15000 }
      ],
      totalAmount: 390000,
      orderDate: '2024-12-28',
      expectedDate: '2024-12-30',
      status: '배송중',
      notes: '응급 발주건'
    },
    {
      id: 2,
      orderNumber: 'ORD-2024-002',
      supplier: '한국제약',
      items: [
        { name: '아목시실린 500mg', quantity: 100, unitPrice: 500 }
      ],
      totalAmount: 50000,
      orderDate: '2024-12-29',
      expectedDate: '2025-01-02',
      status: '주문완료',
      notes: '정기 발주'
    }
  ]);

  // 입출고 기록
  const [stockHistory, setStockHistory] = useState([
    {
      id: 1,
      medicineId: 1,
      medicineName: '리도카인 HCl 2%',
      type: '입고',
      quantity: 20,
      beforeStock: 15,
      afterStock: 35,
      reason: '정기 발주',
      date: '2024-12-28 10:30',
      user: '관리자'
    },
    {
      id: 2,
      medicineId: 2,
      medicineName: '아목시실린 500mg',
      type: '출고',
      quantity: 10,
      beforeStock: 15,
      afterStock: 5,
      reason: '환자 처방',
      date: '2024-12-27 14:20',
      user: '김민지'
    }
  ]);

  // 재고 관련 함수들
  const getStockStatus = (item: any) => {
    if (item.currentStock <= item.minStock) return 'low';
    if (item.currentStock >= item.maxStock) return 'high';
    
    // 유통기한 체크 (30일 이내)
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry <= 30 && daysUntilExpiry > 0) return 'expiring';
    if (daysUntilExpiry <= 0) return 'expired';
    
    return 'normal';
  };

  const getStockStatusColor = (status: string) => {
    const colors = {
      'low': 'bg-red-100 text-red-800',
      'high': 'bg-yellow-100 text-yellow-800',
      'expiring': 'bg-orange-100 text-orange-800',
      'expired': 'bg-red-100 text-red-800',
      'normal': 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStockStatusText = (status: string) => {
    const texts = {
      'low': '부족',
      'high': '과다',
      'expiring': '임박',
      'expired': '만료',
      'normal': '정상'
    };
    return texts[status as keyof typeof texts] || '알 수 없음';
  };

  const getOrderStatusColor = (status: string) => {
    const colors = {
      '주문완료': 'bg-blue-100 text-blue-800',
      '배송중': 'bg-yellow-100 text-yellow-800',
      '배송완료': 'bg-green-100 text-green-800',
      '취소': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // 새 약품 등록 폼
  const [newMedicine, setNewMedicine] = useState({
    code: '',
    name: '',
    category: '',
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    unit: '',
    unitPrice: 0,
    supplier: '',
    expiryDate: '',
    location: '',
    notes: ''
  });

  // 발주 폼
  const [newOrder, setNewOrder] = useState({
    supplier: '',
    items: [{ medicineId: '', quantity: 0, unitPrice: 0 }],
    notes: ''
  });

  // 입출고 폼
  const [stockMovement, setStockMovement] = useState({
    medicineId: '',
    type: 'in',
    quantity: 0,
    reason: '',
    notes: ''
  });

  const handleAddMedicine = () => {
    const newId = Math.max(...inventory.map(item => item.id)) + 1;
    const newItem = {
      ...newMedicine,
      id: newId,
      lastUpdated: new Date().toISOString().split('T')[0],
      status: '정상'
    };
    setInventory([...inventory, newItem]);
    setNewMedicine({
      code: '',
      name: '',
      category: '',
      currentStock: 0,
      minStock: 0,
      maxStock: 0,
      unit: '',
      unitPrice: 0,
      supplier: '',
      expiryDate: '',
      location: '',
      notes: ''
    });
    setShowModal(false);
  };

  const handleStockMovement = () => {
    const medicine = inventory.find(item => item.id === parseInt(stockMovement.medicineId));
    if (!medicine) return;

    const beforeStock = medicine.currentStock;
    const afterStock = stockMovement.type === 'in' 
      ? beforeStock + stockMovement.quantity 
      : beforeStock - stockMovement.quantity;

    // 재고 업데이트
    setInventory(inventory.map(item => 
      item.id === parseInt(stockMovement.medicineId) 
        ? { ...item, currentStock: afterStock, lastUpdated: new Date().toISOString().split('T')[0] }
        : item
    ));

    // 입출고 기록 추가
    const newHistory = {
      id: Math.max(...stockHistory.map(h => h.id)) + 1,
      medicineId: parseInt(stockMovement.medicineId),
      medicineName: medicine.name,
      type: stockMovement.type === 'in' ? '입고' : '출고',
      quantity: stockMovement.quantity,
      beforeStock,
      afterStock,
      reason: stockMovement.reason,
      date: new Date().toLocaleString(),
      user: '관리자'
    };
    setStockHistory([newHistory, ...stockHistory]);

    setStockMovement({
      medicineId: '',
      type: 'in',
      quantity: 0,
      reason: '',
      notes: ''
    });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="mb-6">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  관리 시스템
                </Badge>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                약품 재고 관리
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                약품 재고 현황과 발주 관리를 체계적으로 관리할 수 있습니다
              </p>

              {/* Key Info */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-2">
                    <Package className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-semibold">총 약품 종류</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{inventory.length}개</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                    <span className="font-semibold">재고 부족</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600">
                    {inventory.filter(item => getStockStatus(item) === 'low').length}건
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-orange-600 mr-2" />
                    <span className="font-semibold">유통기한 임박</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {inventory.filter(item => getStockStatus(item) === 'expiring').length}건
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-2">
                    <ShoppingCart className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="font-semibold">진행중 발주</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {orders.filter(order => order.status === '배송중').length}건
                  </div>
                </div>
              </div>
            </div>
            {onClose && (
              <Button variant="outline" onClick={onClose} className="shrink-0">
                <XCircle className="w-4 h-4 mr-2" />
                닫기
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="inventory">재고 현황</TabsTrigger>
              <TabsTrigger value="orders">발주 관리</TabsTrigger>
              <TabsTrigger value="history">입출고 기록</TabsTrigger>
              <TabsTrigger value="alerts">알림 관리</TabsTrigger>
            </TabsList>

            {/* 재고 현황 탭 */}
            <TabsContent value="inventory" className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder="약품명으로 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="상태 필터" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="low">재고 부족</SelectItem>
                      <SelectItem value="expiring">유통기한 임박</SelectItem>
                      <SelectItem value="normal">정상</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setModalType('stock-movement');
                      setShowModal(true);
                    }}
                  >
                    <Clipboard className="w-4 h-4 mr-2" />
                    입출고
                  </Button>
                  <Button
                    onClick={() => {
                      setModalType('add-medicine');
                      setShowModal(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    약품 등록
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>약품코드</TableHead>
                        <TableHead>약품명</TableHead>
                        <TableHead>분류</TableHead>
                        <TableHead>현재고</TableHead>
                        <TableHead>최소/최대</TableHead>
                        <TableHead>단가</TableHead>
                        <TableHead>공급업체</TableHead>
                        <TableHead>유통기한</TableHead>
                        <TableHead>위치</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>관리</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventory
                        .filter(item => 
                          searchTerm === '' || 
                          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.code.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((item) => {
                          const status = getStockStatus(item);
                          return (
                            <TableRow key={item.id}>
                              <TableCell className="font-mono">{item.code}</TableCell>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{item.category}</Badge>
                              </TableCell>
                              <TableCell>
                                <span className={`font-bold ${
                                  status === 'low' ? 'text-red-600' : 
                                  status === 'high' ? 'text-yellow-600' : 'text-gray-900'
                                }`}>
                                  {item.currentStock} {item.unit}
                                </span>
                              </TableCell>
                              <TableCell className="text-gray-600">
                                {item.minStock} / {item.maxStock}
                              </TableCell>
                              <TableCell>₩{item.unitPrice.toLocaleString()}</TableCell>
                              <TableCell>{item.supplier}</TableCell>
                              <TableCell>
                                <span className={
                                  status === 'expiring' || status === 'expired' 
                                    ? 'text-orange-600 font-medium' 
                                    : 'text-gray-600'
                                }>
                                  {item.expiryDate}
                                </span>
                              </TableCell>
                              <TableCell>{item.location}</TableCell>
                              <TableCell>
                                <Badge className={getStockStatusColor(status)}>
                                  {getStockStatusText(status)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-1">
                                  <Button size="sm" variant="outline">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 발주 관리 탭 */}
            <TabsContent value="orders" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">발주 관리</h3>
                <Button
                  onClick={() => {
                    setModalType('create-order');
                    setShowModal(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  새 발주
                </Button>
              </div>

              <div className="grid gap-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                          <p className="text-gray-600">{order.supplier}</p>
                        </div>
                        <Badge className={getOrderStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">주문 내역</h4>
                          <ul className="space-y-1">
                            {order.items.map((item, index) => (
                              <li key={index} className="text-sm">
                                {item.name} - {item.quantity}개 × ₩{item.unitPrice.toLocaleString()}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">주문 정보</h4>
                          <div className="space-y-1 text-sm">
                            <p>주문일: {order.orderDate}</p>
                            <p>예상 도착일: {order.expectedDate}</p>
                            <p className="font-bold">총 금액: ₩{order.totalAmount.toLocaleString()}</p>
                            {order.notes && <p>비고: {order.notes}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          수정
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          상세보기
                        </Button>
                        {order.status === '배송완료' && (
                          <Button size="sm">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            입고 처리
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* 입출고 기록 탭 */}
            <TabsContent value="history" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">입출고 기록</h3>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    엑셀 다운로드
                  </Button>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    필터
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>일시</TableHead>
                        <TableHead>약품명</TableHead>
                        <TableHead>구분</TableHead>
                        <TableHead>수량</TableHead>
                        <TableHead>재고 변화</TableHead>
                        <TableHead>사유</TableHead>
                        <TableHead>담당자</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stockHistory.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.date}</TableCell>
                          <TableCell className="font-medium">{record.medicineName}</TableCell>
                          <TableCell>
                            <Badge className={
                              record.type === '입고' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }>
                              {record.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{record.quantity}</TableCell>
                          <TableCell>
                            <span className="text-gray-600">
                              {record.beforeStock} → <span className="font-medium">{record.afterStock}</span>
                            </span>
                          </TableCell>
                          <TableCell>{record.reason}</TableCell>
                          <TableCell>{record.user}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 알림 관리 탭 */}
            <TabsContent value="alerts" className="space-y-6">
              <h3 className="text-xl font-semibold">알림 및 보고서</h3>
              
              <div className="grid gap-4">
                {/* 재고 부족 알림 */}
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-800 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      재고 부족 알림
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {inventory.filter(item => getStockStatus(item) === 'low').map(item => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            현재고: {item.currentStock}{item.unit} / 최소재고: {item.minStock}{item.unit}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          발주하기
                        </Button>
                      </div>
                    ))}
                    {inventory.filter(item => getStockStatus(item) === 'low').length === 0 && (
                      <p className="text-gray-500">재고 부족 약품이 없습니다.</p>
                    )}
                  </CardContent>
                </Card>

                {/* 유통기한 임박 알림 */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-800 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      유통기한 임박 알림
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {inventory.filter(item => getStockStatus(item) === 'expiring').map(item => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            유통기한: {item.expiryDate} ({Math.ceil((new Date(item.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}일 남음)
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          처리
                        </Button>
                      </div>
                    ))}
                    {inventory.filter(item => getStockStatus(item) === 'expiring').length === 0 && (
                      <p className="text-gray-500">유통기한 임박 약품이 없습니다.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* 모달들 */}
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {modalType === 'add-medicine' && '새 약품 등록'}
                  {modalType === 'stock-movement' && '입출고 처리'}
                  {modalType === 'create-order' && '새 발주 생성'}
                </DialogTitle>
                <DialogDescription>
                  {modalType === 'add-medicine' && '새로운 약품을 재고 관리 시스템에 등록합니다.'}
                  {modalType === 'stock-movement' && '약품의 입고 또는 출고를 처리합니다.'}
                  {modalType === 'create-order' && '공급업체에 새로운 발주를 생성합니다.'}
                </DialogDescription>
              </DialogHeader>

              {/* 약품 등록 폼 */}
              {modalType === 'add-medicine' && (
                <div className="space-y-6 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>약품 코드</Label>
                      <Input
                        value={newMedicine.code}
                        onChange={(e) => setNewMedicine({...newMedicine, code: e.target.value})}
                        placeholder="MED-001"
                      />
                    </div>
                    <div>
                      <Label>약품명</Label>
                      <Input
                        value={newMedicine.name}
                        onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                        placeholder="리도카인 HCl 2%"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>분류</Label>
                      <Select value={newMedicine.category} onValueChange={(value) => setNewMedicine({...newMedicine, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="분류 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="마취제">마취제</SelectItem>
                          <SelectItem value="항생제">항생제</SelectItem>
                          <SelectItem value="진정제">진정제</SelectItem>
                          <SelectItem value="소독제">소독제</SelectItem>
                          <SelectItem value="진통제">진통제</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>단위</Label>
                      <Input
                        value={newMedicine.unit}
                        onChange={(e) => setNewMedicine({...newMedicine, unit: e.target.value})}
                        placeholder="바이알, 정, 병 등"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>현재고</Label>
                      <Input
                        type="number"
                        value={newMedicine.currentStock}
                        onChange={(e) => setNewMedicine({...newMedicine, currentStock: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div>
                      <Label>최소재고</Label>
                      <Input
                        type="number"
                        value={newMedicine.minStock}
                        onChange={(e) => setNewMedicine({...newMedicine, minStock: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div>
                      <Label>최대재고</Label>
                      <Input
                        type="number"
                        value={newMedicine.maxStock}
                        onChange={(e) => setNewMedicine({...newMedicine, maxStock: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>단가</Label>
                      <Input
                        type="number"
                        value={newMedicine.unitPrice}
                        onChange={(e) => setNewMedicine({...newMedicine, unitPrice: parseInt(e.target.value) || 0})}
                        placeholder="12000"
                      />
                    </div>
                    <div>
                      <Label>공급업체</Label>
                      <Input
                        value={newMedicine.supplier}
                        onChange={(e) => setNewMedicine({...newMedicine, supplier: e.target.value})}
                        placeholder="대한약품"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>유통기한</Label>
                      <Input
                        type="date"
                        value={newMedicine.expiryDate}
                        onChange={(e) => setNewMedicine({...newMedicine, expiryDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>보관 위치</Label>
                      <Input
                        value={newMedicine.location}
                        onChange={(e) => setNewMedicine({...newMedicine, location: e.target.value})}
                        placeholder="A-01"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>비고</Label>
                    <Textarea
                      value={newMedicine.notes}
                      onChange={(e) => setNewMedicine({...newMedicine, notes: e.target.value})}
                      placeholder="추가 정보나 특이사항"
                    />
                  </div>

                  <div className="flex space-x-2 justify-end">
                    <Button variant="outline" onClick={() => setShowModal(false)}>
                      취소
                    </Button>
                    <Button onClick={handleAddMedicine}>
                      등록하기
                    </Button>
                  </div>
                </div>
              )}

              {/* 입출고 처리 폼 */}
              {modalType === 'stock-movement' && (
                <div className="space-y-6 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>약품 선택</Label>
                      <Select value={stockMovement.medicineId} onValueChange={(value) => setStockMovement({...stockMovement, medicineId: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="약품 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {inventory.map(item => (
                            <SelectItem key={item.id} value={item.id.toString()}>
                              {item.name} (현재고: {item.currentStock}{item.unit})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>구분</Label>
                      <Select value={stockMovement.type} onValueChange={(value) => setStockMovement({...stockMovement, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in">입고</SelectItem>
                          <SelectItem value="out">출고</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>수량</Label>
                    <Input
                      type="number"
                      value={stockMovement.quantity}
                      onChange={(e) => setStockMovement({...stockMovement, quantity: parseInt(e.target.value) || 0})}
                      placeholder="수량 입력"
                    />
                  </div>

                  <div>
                    <Label>사유</Label>
                    <Input
                      value={stockMovement.reason}
                      onChange={(e) => setStockMovement({...stockMovement, reason: e.target.value})}
                      placeholder="입출고 사유"
                    />
                  </div>

                  <div>
                    <Label>비고</Label>
                    <Textarea
                      value={stockMovement.notes}
                      onChange={(e) => setStockMovement({...stockMovement, notes: e.target.value})}
                      placeholder="추가 메모"
                    />
                  </div>

                  <div className="flex space-x-2 justify-end">
                    <Button variant="outline" onClick={() => setShowModal(false)}>
                      취소
                    </Button>
                    <Button onClick={handleStockMovement}>
                      처리하기
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}