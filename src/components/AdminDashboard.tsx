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
import { ImageWithFallback } from './figma/ImageWithFallback';
import InventoryManagement from './InventoryManagement';
import { 
  Users, Calendar, FileText, Star, Settings, Plus, Edit, Trash2, Eye,
  TrendingUp, Clock, CheckCircle, AlertCircle, Home, Upload, Image,
  BarChart3, Activity, UserCheck, MessageSquare, Search, Filter,
  Download, RefreshCw, Bell, HelpCircle, Phone, Mail, MapPin,
  Award, Heart, Stethoscope, Shield, Sparkles, User, XCircle,
  AlertTriangle, BookOpen, MoreHorizontal, Smile, LogOut, Package,
  Pill, Calendar as CalendarIcon, AlertTriangleIcon, ShoppingCart,
  Clipboard, TrendingDown
} from 'lucide-react';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
  onGoHome?: () => void;
}

export default function AdminDashboard({ user, onLogout, onGoHome }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<any>(null);

  // 실시간 대시보드 통계
  const dashboardStats = [
    { title: '오늘 예약', value: '12', change: '+3', icon: Calendar, color: 'bg-blue-500' },
    { title: '대기 중인 예약', value: '8', change: '+2', icon: Clock, color: 'bg-orange-500' },
    { title: '승인 대기 후기', value: '5', change: '+1', icon: MessageSquare, color: 'bg-purple-500' },
    { title: '신규 회원', value: '23', change: '+7', icon: Users, color: 'bg-green-500' },
  ];

  // 회원 관리 데이터
  const [members, setMembers] = useState([
    {
      id: 1,
      name: '김미영',
      email: 'kim@example.com',
      phone: '010-1234-5678',
      birthDate: '1985-03-15',
      gender: '여성',
      joinDate: '2024-01-15',
      lastVisit: '2024-12-20',
      status: '활성',
      totalVisits: 8,
      treatments: ['임플란트', '스케일링'],
      notes: '정기 검진 환자',
    },
    {
      id: 2,
      name: '이철수',
      email: 'lee@example.com', 
      phone: '010-2345-6789',
      birthDate: '1978-07-22',
      gender: '남성',
      joinDate: '2024-02-10',
      lastVisit: '2024-12-25',
      status: '활성',
      totalVisits: 15,
      treatments: ['교정치료', '치아미백'],
      notes: '교정치료 진행 중',
    }
  ]);

  // 의료진 관리 데이터
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: '오진수',
      position: '대표원장', 
      specialty: '임플란트·구강외과',
      phone: '010-1111-1111',
      email: 'oh@faith-dental.com',
      experience: '20년',
      status: '활성',
      schedule: {
        monday: ['09:00-18:00'],
        tuesday: ['09:00-18:00'],
        wednesday: ['09:00-18:00'],
        thursday: ['09:00-18:00'],
        friday: ['09:00-18:00'],
        saturday: ['09:00-13:00'],
        sunday: ['휴진']
      },
      certifications: ['구강외과 전문의', '임플란트 인정의'],
      bio: '20년 경력의 구강외과 전문의로 정확하고 안전한 임플란트 치료를 제공합니다.',
    },
    {
      id: 2,
      name: '김민지',
      position: '부원장',
      specialty: '교정치료·심미치료',
      phone: '010-2222-2222',
      email: 'kim@faith-dental.com',
      experience: '15년',
      status: '활성',
      schedule: {
        monday: ['09:00-18:00'],
        tuesday: ['09:00-18:00'],
        wednesday: ['휴진'],
        thursday: ['09:00-18:00'],
        friday: ['09:00-18:00'],
        saturday: ['09:00-13:00'],
        sunday: ['휴진']
      },
      certifications: ['교정과 전문의', '인비절라인 인증의'],
      bio: '환자 개개인에 맞는 맞춤형 교정치료와 심미치료를 제공합니다.',
    }
  ]);

  // 진료 스케줄 관리
  const [schedules, setSchedules] = useState([
    { id: 1, date: '2024-12-30', dayOfWeek: '월요일', doctorId: 1, doctorName: '오진수', timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'], bookedSlots: ['10:00', '15:00'], status: '정상' },
    { id: 2, date: '2024-12-30', dayOfWeek: '월요일', doctorId: 2, doctorName: '김민지', timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'], bookedSlots: ['09:00'], status: '정상' },
    { id: 3, date: '2024-12-31', dayOfWeek: '화요일', doctorId: 1, doctorName: '오진수', timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'], bookedSlots: ['11:00'], status: '정상' },
  ]);

  // 예약 관리 데이터
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: '김미영',
      patientPhone: '010-1234-5678',
      doctorName: '오진수',
      service: '임플란트 상담',
      date: '2024-12-30',
      time: '10:00',
      status: '예약확인',
      type: '상담',
      notes: '하악 어금니 임플란트 상담 희망',
      createdAt: '2024-12-28 14:30'
    },
    {
      id: 2,
      patientName: '이철수',
      patientPhone: '010-2345-6789', 
      doctorName: '김민지',
      service: '투명교정 검진',
      date: '2024-12-30',
      time: '15:00',
      status: '진료중',
      type: '치료',
      notes: '투명교정 3개월차 정기검진',
      createdAt: '2024-12-27 09:15'
    },
    {
      id: 3,
      patientName: '박영희',
      patientPhone: '010-3456-7890',
      doctorName: '오진수', 
      service: '스케일링',
      date: '2024-12-31',
      time: '11:00',
      status: '승인대기',
      type: '일반',
      notes: '정기 스케일링 예약',
      createdAt: '2024-12-29 16:45'
    }
  ]);

  // 문의 관리 데이터
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      name: '정민수',
      phone: '010-4567-8901',
      email: 'jeong@example.com',
      subject: '임플란트 비용 문의',
      content: '임플란트 1개 비용과 치료 기간이 궁금합니다.',
      category: '치료문의',
      status: '답변완료',
      createdAt: '2024-12-28 10:30',
      answeredAt: '2024-12-28 14:20',
      answer: '임플란트 비용은 개인의 구강 상태에 따라 달라집니다. 정확한 상담을 위해 내원해주시면 자세히 안내드리겠습니다.',
    },
    {
      id: 2,
      name: '최수진',
      phone: '010-5678-9012',
      email: 'choi@example.com', 
      subject: '교정치료 상담 예약',
      content: '투명교정 상담을 받고 싶습니다. 언제 방문하면 될까요?',
      category: '예약문의',
      status: '답변대기',
      createdAt: '2024-12-29 15:20',
      answeredAt: null,
      answer: null,
    }
  ]);

  // 진료과목 관리
  const [treatmentCategories, setTreatmentCategories] = useState([
    {
      id: 'implant',
      name: '임플란트',
      icon: 'Stethoscope',
      description: '자연치아와 같은 기능 회복',
      order: 1,
      status: '활성',
      color: 'text-blue-600'
    },
    {
      id: 'orthodontics', 
      name: '교정치료',
      icon: 'Sparkles',
      description: '아름다운 미소를 위한 치아교정',
      order: 2,
      status: '활성',
      color: 'text-purple-600'
    },
    {
      id: 'aesthetic',
      name: '심미치료',
      icon: 'Smile', 
      description: '자연스럽고 아름다운 치아',
      order: 3,
      status: '활성',
      color: 'text-pink-600'
    },
    {
      id: 'general',
      name: '일반진료',
      icon: 'Heart',
      description: '건강한 치아 관리',
      order: 4,
      status: '활성',
      color: 'text-emerald-600'
    }
  ]);

  // 세부 진료과목 관리
  const [treatmentDetails, setTreatmentDetails] = useState([
    {
      id: 'implant-general',
      categoryId: 'implant',
      categoryName: '임플란트',
      name: '일반 임플란트',
      description: '자연치아와 같은 기능을 회복하는 대표적인 치료법',
      price: '1,500,000원부터',
      duration: '3-6개월',
      order: 1,
      status: '활성'
    },
    {
      id: 'implant-immediate',
      categoryId: 'implant', 
      categoryName: '임플란트',
      name: '즉시 임플란트',
      description: '발치와 동시에 임플란트를 식립하는 혁신적인 치료법',
      price: '1,800,000원부터',
      duration: '2-4개월',
      order: 2,
      status: '활성'
    },
    {
      id: 'ortho-invisible',
      categoryId: 'orthodontics',
      categoryName: '교정치료', 
      name: '투명교정',
      description: '눈에 띄지 않는 투명한 장치로 진행하는 치아교정',
      price: '3,500,000원부터',
      duration: '12-24개월',
      order: 1,
      status: '활성'
    }
  ]);

  // 후기 관리 데이터
  const [reviews, setReviews] = useState([
    {
      id: 1,
      patientName: '김○○',
      patientInfo: '50대 남성',
      service: '임플란트',
      rating: 5,
      content: '정말 만족스러운 치료였습니다. 자연치아와 같은 느낌이에요!',
      doctorName: '오진수',
      createdAt: '2024-12-28',
      status: '승인완료',
      isPublic: true,
      adminNotes: '우수 후기로 선정'
    },
    {
      id: 2,
      patientName: '이○○',
      patientInfo: '30대 여성', 
      service: '투명교정',
      rating: 5,
      content: '투명교정으로 불편함 없이 치료받았어요. 결과도 완벽해요.',
      doctorName: '김민지',
      createdAt: '2024-12-27',
      status: '승인대기',
      isPublic: false,
      adminNotes: ''
    }
  ]);

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

  // 모달 상태
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

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

  const getStatusColor = (status: string) => {
    const colors = {
      '활성': 'bg-green-100 text-green-800',
      '비활성': 'bg-gray-100 text-gray-800', 
      '예약확인': 'bg-blue-100 text-blue-800',
      '진료중': 'bg-yellow-100 text-yellow-800',
      '완료': 'bg-green-100 text-green-800',
      '취소': 'bg-red-100 text-red-800',
      '승인대기': 'bg-orange-100 text-orange-800',
      '답변완료': 'bg-green-100 text-green-800',
      '답변대기': 'bg-orange-100 text-orange-800',
      '승인완료': 'bg-green-100 text-green-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">믿음치과 관리자</h1>
              <p className="text-gray-600 text-sm">병원 관리 시스템</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-gray-700">안녕하세요, {user?.name || '관리자'}님</span>
            {onGoHome && (
              <Button variant="outline" onClick={onGoHome}>
                <Home className="w-4 h-4 mr-2" />
                홈페이지
              </Button>
            )}
            <Button onClick={onLogout} variant="destructive">
              <LogOut className="w-4 h-4 mr-2" />
              로그아웃
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-9 w-full mb-6">
            <TabsTrigger value="dashboard">대시보드</TabsTrigger>
            <TabsTrigger value="members">회원관리</TabsTrigger>
            <TabsTrigger value="doctors">의료진관리</TabsTrigger>
            <TabsTrigger value="schedules">스케줄관리</TabsTrigger>
            <TabsTrigger value="inquiries">문의관리</TabsTrigger>
            <TabsTrigger value="appointments">예약관리</TabsTrigger>
            <TabsTrigger value="categories">진료과목</TabsTrigger>
            <TabsTrigger value="treatments">세부진료과목</TabsTrigger>
            <TabsTrigger value="reviews">후기관리</TabsTrigger>
            <TabsTrigger value="inventory">약품재고</TabsTrigger>
          </TabsList>

          {/* 대시보드 */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold">{stat.value}</span>
                          <span className="text-sm text-green-600">{stat.change}</span>
                        </div>
                      </div>
                      <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 오늘의 예약 미리보기 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>오늘의 예약</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {appointments.filter(apt => apt.date === '2024-12-30').map(appointment => (
                      <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{appointment.patientName}</p>
                          <p className="text-sm text-gray-600">{appointment.service}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{appointment.time}</p>
                          <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>대기 중인 업무</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <span>승인 대기 예약</span>
                      <Badge className="bg-orange-100 text-orange-800">3건</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span>답변 대기 문의</span>
                      <Badge className="bg-purple-100 text-purple-800">2건</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span>승인 대기 후기</span>
                      <Badge className="bg-blue-100 text-blue-800">1건</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 회원 관리 */}
          <TabsContent value="members" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">회원 관리</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="이름, 연락처로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  회원 등록
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>이름</TableHead>
                      <TableHead>연락처</TableHead>
                      <TableHead>생년월일</TableHead>
                      <TableHead>가입일</TableHead>
                      <TableHead>최근 방문</TableHead>
                      <TableHead>방문횟수</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.phone}</TableCell>
                        <TableCell>{member.birthDate}</TableCell>
                        <TableCell>{member.joinDate}</TableCell>
                        <TableCell>{member.lastVisit}</TableCell>
                        <TableCell>{member.totalVisits}회</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
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
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 의료진 관리 */}
          <TabsContent value="doctors" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">의료진 관리</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                의료진 등록
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doctors.map((doctor) => (
                <Card key={doctor.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold">{doctor.name}</h3>
                            <p className="text-sm text-gray-600">{doctor.position}</p>
                          </div>
                        </CardTitle>
                      </div>
                      <Badge className={getStatusColor(doctor.status)}>{doctor.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">전문분야</p>
                        <p className="font-medium">{doctor.specialty}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">경력</p>
                        <p className="font-medium">{doctor.experience}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">연락처</p>
                        <p className="font-medium">{doctor.phone}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="w-4 h-4 mr-2" />
                          수정
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="w-4 h-4 mr-2" />
                          스케줄
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 진료 스케줄 관리 */}
          <TabsContent value="schedules" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">진료 스케줄 관리</h2>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  캘린더 보기
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  스케줄 추가
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>날짜</TableHead>
                      <TableHead>의료진</TableHead>
                      <TableHead>진료 시간</TableHead>
                      <TableHead>예약 현황</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedules.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{schedule.date}</p>
                            <p className="text-sm text-gray-600">{schedule.dayOfWeek}</p>
                          </div>
                        </TableCell>
                        <TableCell>{schedule.doctorName}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            총 {schedule.timeSlots.length}개 슬롯
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <span className="text-blue-600">{schedule.bookedSlots.length}예약</span>
                            <span className="text-gray-400"> / </span>
                            <span>{schedule.timeSlots.length}전체</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(schedule.status)}>{schedule.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
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

          {/* 문의 관리 */}
          <TabsContent value="inquiries" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">문의 관리</h2>
              <div className="flex space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="상태 필터" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="pending">답변대기</SelectItem>
                    <SelectItem value="completed">답변완료</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {inquiries.map((inquiry) => (
                <Card key={inquiry.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-3">
                          <span>{inquiry.subject}</span>
                          <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {inquiry.name} | {inquiry.phone} | {inquiry.createdAt}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        답변하기
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">문의 내용</p>
                        <p className="mt-1">{inquiry.content}</p>
                      </div>
                      {inquiry.answer && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600">답변 ({inquiry.answeredAt})</p>
                          <p className="mt-1">{inquiry.answer}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 예약 관리 */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">예약 관리</h2>
              <div className="flex space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="상태 필터" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="pending">승인대기</SelectItem>
                    <SelectItem value="confirmed">예약확인</SelectItem>
                    <SelectItem value="progress">진료중</SelectItem>
                    <SelectItem value="completed">완료</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  예약 등록
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>환자명</TableHead>
                      <TableHead>연락처</TableHead>
                      <TableHead>담당의</TableHead>
                      <TableHead>진료항목</TableHead>
                      <TableHead>예약일시</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.patientName}</TableCell>
                        <TableCell>{appointment.patientPhone}</TableCell>
                        <TableCell>{appointment.doctorName}</TableCell>
                        <TableCell>{appointment.service}</TableCell>
                        <TableCell>
                          <div>
                            <p>{appointment.date}</p>
                            <p className="text-sm text-gray-600">{appointment.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <XCircle className="w-4 h-4" />
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

          {/* 진료과목 관리 */}
          <TabsContent value="categories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">진료과목 관리</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                카테고리 추가
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {treatmentCategories.map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center`}>
                          <Heart className={`w-6 h-6 ${category.color}`} />
                        </div>
                        <div>
                          <CardTitle>{category.name}</CardTitle>
                          <p className="text-sm text-gray-600">순서: {category.order}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(category.status)}>{category.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-gray-700">{category.description}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="w-4 h-4 mr-2" />
                          수정
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 세부 진료과목 관리 */}
          <TabsContent value="treatments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">세부 진료과목 관리</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                세부 진료 추가
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>카테고리</TableHead>
                      <TableHead>치료명</TableHead>
                      <TableHead>설명</TableHead>
                      <TableHead>가격</TableHead>
                      <TableHead>소요시간</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {treatmentDetails.map((treatment) => (
                      <TableRow key={treatment.id}>
                        <TableCell>
                          <Badge variant="outline">{treatment.categoryName}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{treatment.name}</TableCell>
                        <TableCell className="max-w-xs truncate">{treatment.description}</TableCell>
                        <TableCell>{treatment.price}</TableCell>
                        <TableCell>{treatment.duration}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(treatment.status)}>{treatment.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4" />
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

          {/* 후기 관리 */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">후기 관리</h2>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="상태 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="pending">승인대기</SelectItem>
                  <SelectItem value="approved">승인완료</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{review.patientName}</span>
                            <div className="flex text-yellow-400">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                              ))}
                            </div>
                          </CardTitle>
                          <p className="text-sm text-gray-600">
                            {review.service} | {review.doctorName} | {review.createdAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(review.status)}>{review.status}</Badge>
                        {review.status === '승인대기' && (
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">{review.content}</p>
                    {review.adminNotes && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">관리자 메모</p>
                        <p className="text-sm">{review.adminNotes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}