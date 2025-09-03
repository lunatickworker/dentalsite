import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Plus, Edit, Trash2, Eye, Package, Pill, AlertTriangle, ShoppingCart,
  Clipboard, TrendingDown, Search, Filter, Download, RefreshCw, 
  Calendar, AlertCircle, CheckCircle, Clock, XCircle, Stethoscope,
  Activity, Shield, Heart, Sparkles, Users, UserCheck, Star,
  BarChart3, TrendingUp, Archive, Zap, FileText, MapPin
} from 'lucide-react';

interface InventoryManagementProps {
  onClose?: () => void;
}

export default function InventoryManagement({ onClose }: InventoryManagementProps) {
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // 약품 불출/사용 관련 상태
  const [dispensingRequests, setDispensingRequests] = useState([
    {
      id: 1,
      requestId: 'DISP-2024-001',
      medicineId: 1,
      medicineName: '리도카인 HCl 2%',
      requestedQuantity: 3,
      approvedQuantity: 3,
      patientName: '김○○',
      patientId: 'P-2024-0125',
      treatment: '임플란트 식립술',
      requestDate: '2024-12-29 09:00',
      requestedBy: '김민지',
      approvedBy: '오진수',
      approvedDate: '2024-12-29 09:15',
      dispensedDate: '2024-12-29 10:00',
      returnedQuantity: 0,
      notes: '임플란트 수술용 국소마취',
      status: '불출완료',
      priority: 'high'
    },
    {
      id: 2,
      requestId: 'DISP-2024-002',
      medicineId: 7,
      medicineName: '임플란트 피쳐 4.0x10mm',
      requestedQuantity: 1,
      approvedQuantity: 1,
      patientName: '이○○',
      patientId: 'P-2024-0126',
      treatment: '단일 임플란트',
      requestDate: '2024-12-29 13:30',
      requestedBy: '오진수',
      approvedBy: '오진수',
      approvedDate: '2024-12-29 13:30',
      dispensedDate: '2024-12-29 14:00',
      returnedQuantity: 0,
      notes: '하악 우측 대구치 임플란트',
      status: '사용완료',
      priority: 'normal'
    },
    {
      id: 3,
      requestId: 'DISP-2024-003',
      medicineId: 9,
      medicineName: '나노 하이브리드 컴포지트 레진',
      requestedQuantity: 2,
      approvedQuantity: 2,
      patientName: '박○○',
      patientId: 'P-2024-0127',
      treatment: '충치치료',
      requestDate: '2024-12-29 15:00',
      requestedBy: '김민지',
      approvedBy: null,
      approvedDate: null,
      dispensedDate: null,
      returnedQuantity: 0,
      notes: '상악 전치부 충전',
      status: '승인대기',
      priority: 'normal'
    },
    {
      id: 4,
      requestId: 'DISP-2024-004',
      medicineId: 3,
      medicineName: '아목시실린 500mg',
      requestedQuantity: 21,
      approvedQuantity: 21,
      patientName: '최○○',
      patientId: 'P-2024-0128',
      treatment: '임플란트 수술 후 처방',
      requestDate: '2024-12-29 16:00',
      requestedBy: '오진수',
      approvedBy: '오진수',
      approvedDate: '2024-12-29 16:00',
      dispensedDate: '2024-12-29 16:15',
      returnedQuantity: 0,
      notes: '7일분 처방 (1일 3회, 식후)',
      status: '처방완료',
      priority: 'normal'
    }
  ]);

  const [newDispensing, setNewDispensing] = useState({
    medicineId: '',
    requestedQuantity: '',
    patientName: '',
    patientId: '',
    treatment: '',
    notes: '',
    priority: 'normal'
  });

  // 치과 전용 약품 및 의료기기 재고 데이터
  const [inventory, setInventory] = useState([
    {
      id: 1,
      code: 'ANES-001',
      name: '리도카인 HCl 2% (에피네프린 1:100,000 함유)',
      category: '국소마취제',
      currentStock: 24,
      minStock: 15,
      maxStock: 50,
      unit: '카트리지',
      unitPrice: 18000,
      supplier: '대한덴탈',
      expiryDate: '2025-08-15',
      location: '마취제 보관함 A-1',
      lastUpdated: '2024-12-28',
      status: '정상',
      description: '치과 시술시 국소마취용',
      riskLevel: 'medium'
    },
    {
      id: 2,
      code: 'ANES-002',
      name: '아티카인 HCl 4% (에피네프린 1:100,000)',
      category: '국소마취제',
      currentStock: 8,
      minStock: 12,
      maxStock: 40,
      unit: '카트리지',
      unitPrice: 22000,
      supplier: '덴탈매딕스',
      expiryDate: '2025-06-20',
      location: '마취제 보관함 A-2',
      lastUpdated: '2024-12-27',
      status: '부족',
      description: '장시간 마취 필요시 사용',
      riskLevel: 'high'
    },
    {
      id: 3,
      code: 'ANTI-001',
      name: '아목시실린 500mg',
      category: '항생제',
      currentStock: 3,
      minStock: 20,
      maxStock: 100,
      unit: '정',
      unitPrice: 800,
      supplier: '한국제약',
      expiryDate: '2025-03-15',
      location: '약품 보관함 B-3',
      lastUpdated: '2024-12-29',
      status: '부족',
      description: '임플란트/발치 후 감염예방',
      riskLevel: 'low'
    },
    {
      id: 4,
      code: 'ANTI-002',
      name: '클린다마이신 150mg',
      category: '항생제',
      currentStock: 45,
      minStock: 25,
      maxStock: 80,
      unit: '캡슐',
      unitPrice: 1200,
      supplier: '덴탈파마',
      expiryDate: '2025-11-30',
      location: '약품 보관함 B-4',
      lastUpdated: '2024-12-26',
      status: '정상',
      description: '페니실린 알레르기 환자용',
      riskLevel: 'medium'
    },
    {
      id: 5,
      code: 'PAIN-001',
      name: '이부프로펜 400mg',
      category: '진통제',
      currentStock: 55,
      minStock: 30,
      maxStock: 100,
      unit: '정',
      unitPrice: 400,
      supplier: '코스메디',
      expiryDate: '2025-09-10',
      location: '약품 보관함 C-1',
      lastUpdated: '2024-12-28',
      status: '정상',
      description: '시술 후 통증 및 염증 완화',
      riskLevel: 'low'
    },
    {
      id: 6,
      code: 'FLUOR-001',
      name: '불소 바니시 5% (Duraphat)',
      category: '예방재료',
      currentStock: 6,
      minStock: 8,
      maxStock: 20,
      unit: '튜브',
      unitPrice: 35000,
      supplier: '프로덴트',
      expiryDate: '2025-04-30',
      location: '예방재료 보관함 D-1',
      lastUpdated: '2024-12-25',
      status: '부족',
      description: '충치 예방 불소 도포용',
      riskLevel: 'low'
    },
    {
      id: 7,
      code: 'IMPL-001',
      name: '임플란트 피쳐 4.0x10mm (오스템)',
      category: '임플란트',
      currentStock: 12,
      minStock: 10,
      maxStock: 30,
      unit: '개',
      unitPrice: 280000,
      supplier: '오스템코리아',
      expiryDate: '2027-12-31',
      location: '임플란트 보관함 E-1',
      lastUpdated: '2024-12-29',
      status: '정상',
      description: '일반적인 임플란트 식립용',
      riskLevel: 'high'
    },
    {
      id: 8,
      code: 'ORTH-001',
      name: '브라켓 세트 (메탈, 상하악)',
      category: '교정재료',
      currentStock: 4,
      minStock: 6,
      maxStock: 15,
      unit: '세트',
      unitPrice: 150000,
      supplier: '오르토클래식',
      expiryDate: '2026-12-31',
      location: '교정재료 보관함 F-1',
      lastUpdated: '2024-12-27',
      status: '부족',
      description: '성인 교정치료용 메탈 브라켓',
      riskLevel: 'medium'
    },
    {
      id: 9,
      code: 'COMPOSITE-001',
      name: '나노 하이브리드 컴포지트 레진 (A2)',
      category: '충전재료',
      currentStock: 15,
      minStock: 8,
      maxStock: 25,
      unit: '시린지',
      unitPrice: 45000,
      supplier: '3M ESPE',
      expiryDate: '2025-10-15',
      location: '충전재료 보관함 G-1',
      lastUpdated: '2024-12-28',
      status: '정상',
      description: '전치부/구치부 심미 충전용',
      riskLevel: 'low'
    },
    {
      id: 10,
      code: 'ENDO-001',
      name: '근관치료 파일 세트 (ProTaper Gold)',
      category: '근관치료재료',
      currentStock: 2,
      minStock: 5,
      maxStock: 12,
      unit: '세트',
      unitPrice: 120000,
      supplier: '덴츠플라이',
      expiryDate: '2026-06-30',
      location: '근관치료재료 보관함 H-1',
      lastUpdated: '2024-12-24',
      status: '부족',
      description: '근관 성형 및 확대용',
      riskLevel: 'medium'
    },
    {
      id: 11,
      code: 'DISINFECT-001',
      name: '치과용 소독제 (글루타랄데하이드 2%)',
      category: '소독제',
      currentStock: 28,
      minStock: 20,
      maxStock: 50,
      unit: '병(1L)',
      unitPrice: 25000,
      supplier: '메디칸',
      expiryDate: '2025-07-20',
      location: '소독제 보관함 I-1',
      lastUpdated: '2024-12-29',
      status: '정상',
      description: '기구 고수준 소독용',
      riskLevel: 'high'
    },
    {
      id: 12,
      code: 'IMPRESSION-001',
      name: '인상재 (폴리비닐실록산)',
      category: '인상재료',
      currentStock: 9,
      minStock: 10,
      maxStock: 20,
      unit: '세트',
      unitPrice: 85000,
      supplier: '덴탈임프레션',
      expiryDate: '2025-05-10',
      location: '인상재료 보관함 J-1',
      lastUpdated: '2024-12-26',
      status: '부족',
      description: '정밀 인상채득용',
      riskLevel: 'low'
    }
  ]);

  // 발주 관리 데이터 (치과 특화)
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'ORD-2025-001',
      supplier: '대한덴탈',
      items: [
        { name: '리도카인 HCl 2%', quantity: 20, unitPrice: 18000 },
        { name: '아티카인 HCl 4%', quantity: 15, unitPrice: 22000 }
      ],
      totalAmount: 690000,
      orderDate: '2024-12-28',
      expectedDate: '2024-12-30',
      status: '배송중',
      notes: '마취제 긴급 발주',
      priority: 'urgent'
    },
    {
      id: 2,
      orderNumber: 'ORD-2025-002',
      supplier: '오스템코리아',
      items: [
        { name: '임플란트 피쳐 4.0x10mm', quantity: 10, unitPrice: 280000 },
        { name: '임플란트 피쳐 4.5x12mm', quantity: 5, unitPrice: 300000 }
      ],
      totalAmount: 4300000,
      orderDate: '2024-12-29',
      expectedDate: '2025-01-03',
      status: '주문완료',
      notes: '1월 임플란트 시술 대비',
      priority: 'normal'
    },
    {
      id: 3,
      orderNumber: 'ORD-2025-003',
      supplier: '3M ESPE',
      items: [
        { name: '나노 하이브리드 컴포지트 레진 A2', quantity: 12, unitPrice: 45000 },
        { name: '나노 하이브리드 컴포지트 레진 A3', quantity: 8, unitPrice: 45000 }
      ],
      totalAmount: 900000,
      orderDate: '2024-12-27',
      expectedDate: '2025-01-02',
      status: '배송완료',
      notes: '충전재료 정기 보충',
      priority: 'normal'
    }
  ]);

  // 입출고 기록
  const [stockHistory, setStockHistory] = useState([
    {
      id: 1,
      medicineId: 1,
      medicineName: '리도카인 HCl 2%',
      type: '출고',
      quantity: 3,
      beforeStock: 27,
      afterStock: 24,
      reason: '임플란트 시술 (김○○)',
      date: '2024-12-29 14:30',
      user: '오진수'
    },
    {
      id: 2,
      medicineId: 7,
      medicineName: '임플란트 피쳐 4.0x10mm',
      type: '출고',
      quantity: 1,
      beforeStock: 13,
      afterStock: 12,
      reason: '임플란트 식립 (이○○)',
      date: '2024-12-29 10:15',
      user: '오진수'
    },
    {
      id: 3,
      medicineId: 9,
      medicineName: '나노 하이브리드 컴포지트 레진',
      type: '입고',
      quantity: 5,
      beforeStock: 10,
      afterStock: 15,
      reason: '정기 발주 입고',
      date: '2024-12-28 09:00',
      user: '김민지'
    }
  ]);

  // 재고 관련 함수들
  const getStockStatus = (item: any) => {
    if (item.currentStock <= item.minStock) return 'low';
    if (item.currentStock >= item.maxStock) return 'high';
    
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry <= 60 && daysUntilExpiry > 0) return 'expiring';
    if (daysUntilExpiry <= 0) return 'expired';
    
    return 'normal';
  };

  const getStockStatusColor = (status: string) => {
    const colors = {
      'low': 'bg-red-100 text-red-800 border-red-200',
      'high': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'expiring': 'bg-orange-100 text-orange-800 border-orange-200',
      'expired': 'bg-red-100 text-red-800 border-red-200',
      'normal': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStockStatusText = (status: string) => {
    const texts = {
      'low': '재고부족',
      'high': '과다보유',
      'expiring': '유통기한임박',
      'expired': '유통기한만료',
      'normal': '정상'
    };
    return texts[status as keyof typeof texts] || '알 수 없음';
  };

  const getRiskLevelColor = (riskLevel: string) => {
    const colors = {
      'high': 'bg-red-50 text-red-700 border-red-200',
      'medium': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'low': 'bg-blue-50 text-blue-700 border-blue-200'
    };
    return colors[riskLevel as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getRiskLevelText = (riskLevel: string) => {
    const texts = {
      'high': '고위험',
      'medium': '중위험',
      'low': '저위험'
    };
    return texts[riskLevel as keyof typeof texts] || '미분류';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      '국소마취제': Pill,
      '항생제': Shield,
      '진통제': Heart,
      '예방재료': Sparkles,
      '임플란트': Stethoscope,
      '교정재료': Activity,
      '충전재료': Package,
      '근관치료재료': AlertTriangle,
      '소독제': RefreshCw,
      '인상재료': FileText
    };
    return icons[category as keyof typeof icons] || Package;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      '국소마취제': 'text-red-600 bg-red-50',
      '항생제': 'text-purple-600 bg-purple-50',
      '진통제': 'text-pink-600 bg-pink-50',
      '예방재료': 'text-emerald-600 bg-emerald-50',
      '임플란트': 'text-blue-600 bg-blue-50',
      '교정재료': 'text-indigo-600 bg-indigo-50',
      '충전재료': 'text-orange-600 bg-orange-50',
      '근관치료재료': 'text-cyan-600 bg-cyan-50',
      '소독제': 'text-green-600 bg-green-50',
      '인상재료': 'text-gray-600 bg-gray-50'
    };
    return colors[category as keyof typeof colors] || 'text-gray-600 bg-gray-50';
  };

  const getOrderStatusColor = (status: string) => {
    const colors = {
      '주문완료': 'bg-blue-100 text-blue-800 border-blue-200',
      '배송중': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      '배송완료': 'bg-green-100 text-green-800 border-green-200',
      '취소': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'urgent': 'bg-red-100 text-red-800 border-red-200',
      'high': 'bg-red-100 text-red-800 border-red-200',
      'normal': 'bg-gray-100 text-gray-800 border-gray-200',
      'low': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getDispensingStatusColor = (status: string) => {
    const colors = {
      '승인대기': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      '승인거부': 'bg-red-100 text-red-800 border-red-200',
      '불출완료': 'bg-blue-100 text-blue-800 border-blue-200',
      '사용완료': 'bg-green-100 text-green-800 border-green-200',
      '처방완료': 'bg-purple-100 text-purple-800 border-purple-200',
      '반납완료': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getDispensingStatusIcon = (status: string) => {
    const icons = {
      '승인대기': Clock,
      '승인거부': XCircle,
      '불출완료': CheckCircle,
      '사용완료': Star,
      '처방완료': FileText,
      '반납완료': Archive
    };
    return icons[status as keyof typeof icons] || Clock;
  };

  // 불출 승인 함수
  const handleApproveDispensing = (requestId: number, approvedQuantity: number) => {
    setDispensingRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            status: '불출완료', 
            approvedQuantity,
            approvedBy: '오진수',
            approvedDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
            dispensedDate: new Date().toISOString().slice(0, 16).replace('T', ' ')
          }
        : req
    ));
    
    // 재고에서 차감
    const request = dispensingRequests.find(req => req.id === requestId);
    if (request) {
      setInventory(prev => prev.map(item => 
        item.id === request.medicineId 
          ? { ...item, currentStock: item.currentStock - approvedQuantity }
          : item
      ));
      
      // 입출고 기록 추가
      const newRecord = {
        id: stockHistory.length + 1,
        medicineId: request.medicineId,
        medicineName: request.medicineName,
        type: '출고',
        quantity: approvedQuantity,
        beforeStock: inventory.find(item => item.id === request.medicineId)?.currentStock || 0,
        afterStock: (inventory.find(item => item.id === request.medicineId)?.currentStock || 0) - approvedQuantity,
        reason: `${request.treatment} (${request.patientName})`,
        date: new Date().toISOString().slice(0, 16).replace('T', ' '),
        user: '오진수'
      };
      setStockHistory(prev => [newRecord, ...prev]);
    }
  };

  // 불출 거부 함수
  const handleRejectDispensing = (requestId: number, reason: string) => {
    setDispensingRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            status: '승인거부', 
            notes: `${req.notes} [거부사유: ${reason}]`,
            approvedBy: '오진수',
            approvedDate: new Date().toISOString().slice(0, 16).replace('T', ' ')
          }
        : req
    ));
  };

  // 사용 완료 처리 함수
  const handleCompleteUsage = (requestId: number, actualUsed: number, returnedQuantity: number) => {
    setDispensingRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            status: returnedQuantity > 0 ? '반납완료' : '사용완료',
            returnedQuantity,
            notes: `${req.notes} [실사용: ${actualUsed}개, 반납: ${returnedQuantity}개]`
          }
        : req
    ));

    // 반납이 있는 경우 재고 복구
    if (returnedQuantity > 0) {
      const request = dispensingRequests.find(req => req.id === requestId);
      if (request) {
        setInventory(prev => prev.map(item => 
          item.id === request.medicineId 
            ? { ...item, currentStock: item.currentStock + returnedQuantity }
            : item
        ));
        
        // 입고 기록 추가
        const newRecord = {
          id: stockHistory.length + 1,
          medicineId: request.medicineId,
          medicineName: request.medicineName,
          type: '입고',
          quantity: returnedQuantity,
          beforeStock: inventory.find(item => item.id === request.medicineId)?.currentStock || 0,
          afterStock: (inventory.find(item => item.id === request.medicineId)?.currentStock || 0) + returnedQuantity,
          reason: `${request.treatment} 사용 후 반납 (${request.patientName})`,
          date: new Date().toISOString().slice(0, 16).replace('T', ' '),
          user: '오진수'
        };
        setStockHistory(prev => [newRecord, ...prev]);
      }
    }
  };

  // 필터링된 재고 목록
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || getStockStatus(item) === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // 통계 계산
  const totalItems = inventory.length;
  const lowStockItems = inventory.filter(item => getStockStatus(item) === 'low').length;
  const expiringItems = inventory.filter(item => getStockStatus(item) === 'expiring').length;
  const normalItems = inventory.filter(item => getStockStatus(item) === 'normal').length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.unitPrice), 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Statistics Cards - Full Width */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="w-full px-6">
          {onClose && (
            <div className="flex justify-end mb-6">
              <Button variant="outline" onClick={onClose} className="border-teal-200 hover:bg-teal-50">
                <XCircle className="w-4 h-4 mr-2" />
                닫기
              </Button>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center">
                    <Package className="w-7 h-7 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">총 품목 수</p>
                    <p className="text-3xl font-bold text-teal-600">{totalItems}</p>
                    <p className="text-xs text-gray-500">종류별 관리</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center">
                    <AlertTriangle className="w-7 h-7 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">재고 부족</p>
                    <p className="text-3xl font-bold text-red-600">{lowStockItems}</p>
                    <p className="text-xs text-gray-500">즉시 발주 필요</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center">
                    <Clock className="w-7 h-7 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">유통기한 임박</p>
                    <p className="text-3xl font-bold text-orange-600">{expiringItems}</p>
                    <p className="text-xs text-gray-500">60일 이내 만료</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <BarChart3 className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">총 재고 가치</p>
                    <p className="text-2xl font-bold text-blue-600">₩{(totalValue / 1000000).toFixed(1)}M</p>
                    <p className="text-xs text-gray-500">백만원 단위</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content - Full Width */}
      <section className="py-8 bg-white">
        <div className="w-full px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 mb-8 bg-white border border-gray-200 shadow-sm max-w-none">
              <TabsTrigger 
                value="inventory" 
                className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 data-[state=active]:border-teal-200"
              >
                <Package className="w-4 h-4 mr-2" />
                재고 현황
              </TabsTrigger>
              <TabsTrigger 
                value="dispensing" 
                className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 data-[state=active]:border-emerald-200"
              >
                <UserCheck className="w-4 h-4 mr-2" />
                약품 불출/사용
              </TabsTrigger>
              <TabsTrigger 
                value="orders" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                발주 관리
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:border-purple-200"
              >
                <Clipboard className="w-4 h-4 mr-2" />
                입출고 기록
              </TabsTrigger>
              <TabsTrigger 
                value="alerts" 
                className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 data-[state=active]:border-orange-200"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                알림 관리
              </TabsTrigger>
            </TabsList>

            {/* 약품 불출/사용 탭 */}
            <TabsContent value="dispensing" className="space-y-6 w-full">
              <div className="flex justify-between items-center w-full">
                <div>
                  <h3 className="text-2xl font-bold text-emerald-900">약품 불출 및 사용 관리</h3>
                  <p className="text-gray-600 mt-1">의료진의 약품 불출 요청과 사용 현황을 관리합니다</p>
                </div>
                <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  불출 요청
                </Button>
              </div>

              {/* 불출 현황 통계 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-yellow-700 font-medium">승인 대기</p>
                        <p className="text-2xl font-bold text-yellow-800">
                          {dispensingRequests.filter(req => req.status === '승인대기').length}
                        </p>
                      </div>
                      <Clock className="w-8 h-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-700 font-medium">금일 불출</p>
                        <p className="text-2xl font-bold text-blue-800">
                          {dispensingRequests.filter(req => 
                            req.dispensedDate && req.dispensedDate.startsWith('2024-12-29')
                          ).length}
                        </p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-700 font-medium">사용 완료</p>
                        <p className="text-2xl font-bold text-green-800">
                          {dispensingRequests.filter(req => req.status === '사용완료').length}
                        </p>
                      </div>
                      <Star className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-purple-700 font-medium">처방 완료</p>
                        <p className="text-2xl font-bold text-purple-800">
                          {dispensingRequests.filter(req => req.status === '처방완료').length}
                        </p>
                      </div>
                      <FileText className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 불출 요청 목록 */}
              <Card className="shadow-lg border-0 bg-white w-full">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
                  <CardTitle className="text-emerald-800 flex items-center">
                    <UserCheck className="w-5 h-5 mr-2" />
                    약품 불출 요청 현황
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto w-full">
                    <Table>
                      <TableHeader className="bg-emerald-50">
                        <TableRow>
                          <TableHead className="font-semibold text-emerald-800">요청ID</TableHead>
                          <TableHead className="font-semibold text-emerald-800">약품명</TableHead>
                          <TableHead className="font-semibold text-emerald-800">환자정보</TableHead>
                          <TableHead className="font-semibold text-emerald-800">시술내용</TableHead>
                          <TableHead className="font-semibold text-emerald-800">요청수량</TableHead>
                          <TableHead className="font-semibold text-emerald-800">승인수량</TableHead>
                          <TableHead className="font-semibold text-emerald-800">요청자</TableHead>
                          <TableHead className="font-semibold text-emerald-800">승인자</TableHead>
                          <TableHead className="font-semibold text-emerald-800">상태</TableHead>
                          <TableHead className="font-semibold text-emerald-800">우선순위</TableHead>
                          <TableHead className="font-semibold text-emerald-800">관리</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dispensingRequests.map((request) => {
                          const StatusIcon = getDispensingStatusIcon(request.status);
                          const statusColor = getDispensingStatusColor(request.status);
                          const priorityColor = getPriorityColor(request.priority);
                          
                          return (
                            <TableRow key={request.id} className="hover:bg-emerald-50/30">
                              <TableCell>
                                <code className="bg-emerald-100 px-2 py-1 rounded text-sm font-mono text-emerald-700">
                                  {request.requestId}
                                </code>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium text-gray-900">{request.medicineName}</p>
                                  <p className="text-sm text-gray-600 truncate max-w-xs">
                                    {request.notes}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium text-gray-900">{request.patientName}</p>
                                  <p className="text-sm text-gray-600">{request.patientId}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
                                  {request.treatment}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <span className="font-bold text-lg text-emerald-600">
                                  {request.requestedQuantity}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className="font-bold text-lg text-blue-600">
                                  {request.approvedQuantity || '-'}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium text-gray-900">{request.requestedBy}</p>
                                  <p className="text-sm text-gray-600">{request.requestDate}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium text-gray-900">{request.approvedBy || '-'}</p>
                                  <p className="text-sm text-gray-600">{request.approvedDate || '-'}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={`${statusColor} border-current flex items-center space-x-1`}>
                                  <StatusIcon className="w-3 h-3" />
                                  <span>{request.status}</span>
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge className={`${priorityColor} border-current`}>
                                  {request.priority === 'high' ? '높음' : 
                                   request.priority === 'normal' ? '보통' : '낮음'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  {request.status === '승인대기' && (
                                    <>
                                      <Button
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                        onClick={() => handleApproveDispensing(request.id, request.requestedQuantity)}
                                      >
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        승인
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-red-200 text-red-600 hover:bg-red-50"
                                        onClick={() => handleRejectDispensing(request.id, '재고 부족')}
                                      >
                                        <XCircle className="w-3 h-3 mr-1" />
                                        거부
                                      </Button>
                                    </>
                                  )}
                                  {request.status === '불출완료' && (
                                    <Button
                                      size="sm"
                                      className="bg-blue-600 hover:bg-blue-700 text-white"
                                      onClick={() => handleCompleteUsage(request.id, request.approvedQuantity, 0)}
                                    >
                                      <Star className="w-3 h-3 mr-1" />
                                      사용완료
                                    </Button>
                                  )}
                                  <Button size="sm" variant="outline">
                                    <Eye className="w-3 h-3" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 재고 현황 탭 */}
            <TabsContent value="inventory" className="space-y-6 w-full">
              {/* Enhanced Search and Filter Section */}
              <Card className="shadow-lg border-0 bg-white w-full">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 w-full">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 flex-1">
                      <div className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                        <Input
                          placeholder="약품명, 코드, 분류로 검색..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 border-teal-200 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                      
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-48 border-teal-200">
                          <SelectValue placeholder="분류별 필터" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">전체 분류</SelectItem>
                          <SelectItem value="국소마취제">국소마취제</SelectItem>
                          <SelectItem value="항생제">항생제</SelectItem>
                          <SelectItem value="진통제">진통제</SelectItem>
                          <SelectItem value="예방재료">예방재료</SelectItem>
                          <SelectItem value="임플란트">임플란트</SelectItem>
                          <SelectItem value="교정재료">교정재료</SelectItem>
                          <SelectItem value="충전재료">충전재료</SelectItem>
                          <SelectItem value="근관치료재료">근관치료재료</SelectItem>
                          <SelectItem value="소독제">소독제</SelectItem>
                          <SelectItem value="인상재료">인상재료</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40 border-teal-200">
                          <SelectValue placeholder="상태 필터" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">전체 상태</SelectItem>
                          <SelectItem value="low">재고부족</SelectItem>
                          <SelectItem value="expiring">유통기한임박</SelectItem>
                          <SelectItem value="normal">정상</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Button variant="outline" className="border-teal-200 hover:bg-teal-50">
                        <Download className="w-4 h-4 mr-2" />
                        엑셀 다운로드
                      </Button>
                      <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">
                        <Plus className="w-4 h-4 mr-2" />
                        의료용품 등록
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Inventory Table */}
              <Card className="shadow-lg border-0 bg-white w-full">
                <CardContent className="p-0">
                  <div className="overflow-x-auto w-full">
                    <Table>
                      <TableHeader className="bg-gradient-to-r from-teal-50 to-blue-50">
                        <TableRow className="border-b-2 border-teal-100">
                          <TableHead className="font-semibold text-teal-800">분류</TableHead>
                          <TableHead className="font-semibold text-teal-800">의료용품명</TableHead>
                          <TableHead className="font-semibold text-teal-800">코드</TableHead>
                          <TableHead className="font-semibold text-teal-800">현재고</TableHead>
                          <TableHead className="font-semibold text-teal-800">적정재고</TableHead>
                          <TableHead className="font-semibold text-teal-800">위험도</TableHead>
                          <TableHead className="font-semibold text-teal-800">유통기한</TableHead>
                          <TableHead className="font-semibold text-teal-800">보관위치</TableHead>
                          <TableHead className="font-semibold text-teal-800">상태</TableHead>
                          <TableHead className="font-semibold text-teal-800">관리</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredInventory.map((item) => {
                          const status = getStockStatus(item);
                          const CategoryIcon = getCategoryIcon(item.category);
                          const categoryColorClass = getCategoryColor(item.category);
                          const statusColorClass = getStockStatusColor(status);
                          const riskColorClass = getRiskLevelColor(item.riskLevel);
                          
                          return (
                            <TableRow key={item.id} className="hover:bg-teal-50/50 border-b border-gray-100">
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${categoryColorClass}`}>
                                    <CategoryIcon className="w-4 h-4" />
                                  </div>
                                  <Badge variant="outline" className={`${categoryColorClass} border-current`}>
                                    {item.category}
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-semibold text-gray-900">{item.name}</p>
                                  <p className="text-sm text-gray-600 truncate max-w-xs" title={item.description}>
                                    {item.description}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-700">
                                  {item.code}
                                </code>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <div>
                                    <span className={`font-bold text-lg ${
                                      status === 'low' ? 'text-red-600' : 
                                      status === 'high' ? 'text-yellow-600' : 'text-teal-600'
                                    }`}>
                                      {item.currentStock}
                                    </span>
                                    <span className="text-gray-600 text-sm ml-1">{item.unit}</span>
                                  </div>
                                  <div className="w-16">
                                    <Progress 
                                      value={(item.currentStock / item.maxStock) * 100}
                                      className="h-2"
                                    />
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm text-gray-600">
                                  <span className="text-red-600 font-medium">{item.minStock}</span>
                                  <span className="mx-1">~</span>
                                  <span className="text-blue-600 font-medium">{item.maxStock}</span>
                                  <div className="text-xs text-gray-500 mt-1">{item.unit}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={`${riskColorClass} border`}>
                                  {getRiskLevelText(item.riskLevel)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <span className={
                                    status === 'expiring' || status === 'expired' 
                                      ? 'text-orange-600 font-semibold' 
                                      : 'text-gray-700'
                                  }>
                                    {item.expiryDate}
                                  </span>
                                  {(status === 'expiring' || status === 'expired') && (
                                    <div className="text-xs text-orange-600 font-medium mt-1">
                                      {Math.ceil((new Date(item.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}일 남음
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-1 text-sm text-gray-600">
                                  <MapPin className="w-3 h-3" />
                                  <span className="truncate max-w-32" title={item.location}>
                                    {item.location}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={`${statusColorClass} border font-medium`}>
                                  {getStockStatusText(status)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-1">
                                  <Button size="sm" variant="outline" className="hover:bg-teal-50 border-teal-200">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="hover:bg-blue-50 border-blue-200">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="hover:bg-orange-50 border-orange-200">
                                    <Clipboard className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 발주 관리 탭 */}
            <TabsContent value="orders" className="space-y-6 w-full">
              <div className="flex justify-between items-center w-full">
                <div>
                  <h3 className="text-2xl font-bold text-blue-900">발주 관리</h3>
                  <p className="text-gray-600 mt-1">의료용품 발주 현황과 배송 상태를 관리합니다</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  새 발주 요청
                </Button>
              </div>

              <div className="grid gap-6 w-full">
                {orders.map((order) => (
                  <Card key={order.id} className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 w-full">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b border-blue-100">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <ShoppingCart className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-xl text-blue-900">{order.orderNumber}</CardTitle>
                            <p className="text-blue-700 font-medium">{order.supplier}</p>
                            <p className="text-sm text-gray-600 mt-1">{order.notes}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(order.priority)}>
                            {order.priority === 'urgent' ? '긴급' : '일반'}
                          </Badge>
                          <Badge className={getOrderStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Package className="w-4 h-4 mr-2 text-blue-600" />
                            주문 내역
                          </h4>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-gray-900">{item.name}</span>
                                  <span className="text-blue-600 font-semibold">
                                    ₩{(item.quantity * item.unitPrice).toLocaleString()}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                  {item.quantity}개 × ₩{item.unitPrice.toLocaleString()}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                            주문 정보
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">주문일:</span>
                              <span className="font-medium">{order.orderDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">예상 도착일:</span>
                              <span className="font-medium">{order.expectedDate}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-t border-gray-200">
                              <span className="text-lg font-semibold text-gray-900">총 금액:</span>
                              <span className="text-xl font-bold text-blue-600">
                                ₩{order.totalAmount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="border-blue-200 hover:bg-blue-50">
                            <Edit className="w-4 h-4 mr-2" />
                            수정
                          </Button>
                          <Button size="sm" variant="outline" className="border-blue-200 hover:bg-blue-50">
                            <Eye className="w-4 h-4 mr-2" />
                            상세보기
                          </Button>
                        </div>
                        {order.status === '배송완료' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
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
            <TabsContent value="history" className="space-y-6 w-full">
              <div className="flex justify-between items-center w-full">
                <div>
                  <h3 className="text-2xl font-bold text-purple-900">입출고 기록</h3>
                  <p className="text-gray-600 mt-1">모든 의료용품의 입출고 내역을 추적합니다</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="border-purple-200 hover:bg-purple-50">
                    <Download className="w-4 h-4 mr-2" />
                    기록 다운로드
                  </Button>
                  <Button variant="outline" className="border-purple-200 hover:bg-purple-50">
                    <Filter className="w-4 h-4 mr-2" />
                    기간별 조회
                  </Button>
                </div>
              </div>

              <Card className="shadow-lg border-0 bg-white w-full">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
                      <TableRow className="border-b-2 border-purple-100">
                        <TableHead className="font-semibold text-purple-800">일시</TableHead>
                        <TableHead className="font-semibold text-purple-800">의료용품명</TableHead>
                        <TableHead className="font-semibold text-purple-800">구분</TableHead>
                        <TableHead className="font-semibold text-purple-800">수량</TableHead>
                        <TableHead className="font-semibold text-purple-800">재고 변화</TableHead>
                        <TableHead className="font-semibold text-purple-800">사유</TableHead>
                        <TableHead className="font-semibold text-purple-800">담당자</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stockHistory.map((record) => (
                        <TableRow key={record.id} className="hover:bg-purple-50/50 border-b border-gray-100">
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">
                                {new Date(record.date).toLocaleDateString()}
                              </div>
                              <div className="text-gray-600">
                                {new Date(record.date).toLocaleTimeString()}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">{record.medicineName}</TableCell>
                          <TableCell>
                            <Badge className={
                              record.type === '입고' 
                                ? 'bg-green-100 text-green-800 border-green-200' 
                                : 'bg-red-100 text-red-800 border-red-200'
                            }>
                              <div className="flex items-center">
                                {record.type === '입고' ? (
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                ) : (
                                  <TrendingDown className="w-3 h-3 mr-1" />
                                )}
                                {record.type}
                              </div>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-lg">
                              {record.type === '입고' ? '+' : '-'}{record.quantity}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-600">{record.beforeStock}</span>
                              <span className="text-gray-400">→</span>
                              <span className="font-semibold text-purple-600">{record.afterStock}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-gray-700 bg-gray-50 px-2 py-1 rounded text-sm">
                              {record.reason}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <Users className="w-4 h-4 text-purple-600" />
                              </div>
                              <span className="font-medium text-gray-900">{record.user}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 알림 관리 탭 */}
            <TabsContent value="alerts" className="space-y-6 w-full">
              <div className="w-full">
                <h3 className="text-2xl font-bold text-orange-900 mb-2">알림 및 경고 관리</h3>
                <p className="text-gray-600">재고 상태와 유통기한을 모니터링하여 안전한 진료 환경을 유지합니다</p>
              </div>
              
              <div className="grid gap-6 w-full">
                {/* 재고 부족 알림 */}
                <Card className="border-red-200 bg-red-50/30 shadow-lg">
                  <CardHeader className="border-b border-red-200">
                    <CardTitle className="text-red-800 flex items-center text-xl">
                      <AlertTriangle className="w-6 h-6 mr-3" />
                      재고 부족 경고
                      <Badge className="ml-3 bg-red-100 text-red-800">{lowStockItems}건</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {inventory.filter(item => getStockStatus(item) === 'low').map(item => (
                        <div key={item.id} className="flex justify-between items-center p-4 bg-white rounded-lg border border-red-200">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                              {React.createElement(getCategoryIcon(item.category), { className: "w-5 h-5 text-red-600" })}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{item.name}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                <span>현재고: <strong className="text-red-600">{item.currentStock}{item.unit}</strong></span>
                                <span>최소재고: {item.minStock}{item.unit}</span>
                                <Badge variant="outline" className="text-xs">{item.category}</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                              <ShoppingCart className="w-4 h-4 mr-1" />
                              즉시발주
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-200">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {lowStockItems === 0 && (
                        <div className="text-center py-8">
                          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                          <p className="text-green-700 font-medium text-lg">재고 부족 품목이 없습니다</p>
                          <p className="text-gray-600 mt-1">모든 의료용품이 적정 수준을 유지하고 있습니다</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* 유통기한 임박 알림 */}
                <Card className="border-orange-200 bg-orange-50/30 shadow-lg">
                  <CardHeader className="border-b border-orange-200">
                    <CardTitle className="text-orange-800 flex items-center text-xl">
                      <Clock className="w-6 h-6 mr-3" />
                      유통기한 임박 경고
                      <Badge className="ml-3 bg-orange-100 text-orange-800">{expiringItems}건</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {inventory.filter(item => getStockStatus(item) === 'expiring').map(item => {
                        const daysLeft = Math.ceil((new Date(item.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                        return (
                          <div key={item.id} className="flex justify-between items-center p-4 bg-white rounded-lg border border-orange-200">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                {React.createElement(getCategoryIcon(item.category), { className: "w-5 h-5 text-orange-600" })}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{item.name}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                  <span>유통기한: <strong className="text-orange-600">{item.expiryDate}</strong></span>
                                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                                    {daysLeft}일 남음
                                  </span>
                                  <Badge variant="outline" className="text-xs">{item.category}</Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                                <RefreshCw className="w-4 h-4 mr-1" />
                                교체처리
                              </Button>
                              <Button size="sm" variant="outline" className="border-orange-200">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                      {expiringItems === 0 && (
                        <div className="text-center py-8">
                          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                          <p className="text-green-700 font-medium text-lg">유통기한 임박 품목이 없습니다</p>
                          <p className="text-gray-600 mt-1">모든 의료용품이 안전한 유통기한을 유지하고 있습니다</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* 정상 재고 현황 */}
                <Card className="border-green-200 bg-green-50/30 shadow-lg">
                  <CardHeader className="border-b border-green-200">
                    <CardTitle className="text-green-800 flex items-center text-xl">
                      <CheckCircle className="w-6 h-6 mr-3" />
                      정상 재고 현황
                      <Badge className="ml-3 bg-green-100 text-green-800">{normalItems}건</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center py-6">
                      <div className="inline-flex items-center space-x-4 bg-white p-6 rounded-xl border border-green-200">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                          <Shield className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="text-left">
                          <p className="text-2xl font-bold text-green-700">{normalItems}개 품목</p>
                          <p className="text-green-600">안전한 재고 수준 유지</p>
                          <p className="text-sm text-gray-600 mt-1">전체 {totalItems}개 중 {Math.round((normalItems/totalItems)*100)}%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}