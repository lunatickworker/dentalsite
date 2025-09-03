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
import { 
  Users, Calendar, FileText, Star, Settings, Plus, Edit, Trash2, Eye,
  TrendingUp, Clock, CheckCircle, AlertCircle, Home, Upload, Image,
  BarChart3, Activity, UserCheck, MessageSquare, Search, Filter,
  Download, RefreshCw, Bell, HelpCircle, Phone, Mail, MapPin,
  Award, Heart, Stethoscope, Shield, Sparkles, User, XCircle,
  AlertTriangle, BookOpen, MoreHorizontal, Smile, LogOut, Package,
  Pill, Calendar as CalendarIcon, AlertTriangleIcon, ShoppingCart,
  Clipboard, TrendingDown, MessageCircle, RotateCcw
} from 'lucide-react';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
  onGoHome?: () => void;
  onDataUpdate?: () => void;
}

export default function AdminDashboard({ user, onLogout, onGoHome, onDataUpdate }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

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

  // 모달 핸들러들
  const handleMemberAdd = () => {
    setModalType('member-add');
    setShowModal(true);
  };

  const handleMemberEdit = (member: any) => {
    setSelectedItem(member);
    setModalType('member-edit');
    setShowModal(true);
  };

  const handleMemberView = (member: any) => {
    setSelectedItem(member);
    setModalType('member-view');
    setShowModal(true);
  };

  const handleAppointmentApprove = (appointmentId: number) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: '예약확인' }
        : apt
    ));
  };

  const handleInquiryAnswer = (inquiry: any) => {
    setSelectedItem(inquiry);
    setModalType('inquiry-answer');
    setShowModal(true);
  };

  const handleReviewApprove = (reviewId: number) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, status: '승인완료', isPublic: true }
        : review
    ));
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

      {/* Enhanced Professional Navigation Bar */}
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 border-b border-blue-200/30 shadow-lg relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-50">
          <div className="w-full h-full bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
        </div>
        
        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        
        <div className="px-6 py-6 relative z-10">
          <div className="flex flex-wrap gap-2">
            {[
              { 
                id: 'dashboard', 
                label: '대시보드', 
                icon: BarChart3, 
                description: '전체 현황 및 통계',
                color: 'text-blue-600',
                bgColor: 'bg-blue-50',
                hoverColor: 'hover:bg-blue-100'
              },
              { 
                id: 'members', 
                label: '회원관리', 
                icon: Users, 
                description: '환자 정보 관리',
                color: 'text-emerald-600',
                bgColor: 'bg-emerald-50',
                hoverColor: 'hover:bg-emerald-100'
              },
              { 
                id: 'doctors', 
                label: '의료진관리', 
                icon: UserCheck, 
                description: '의료진 정보 관리',
                color: 'text-purple-600',
                bgColor: 'bg-purple-50',
                hoverColor: 'hover:bg-purple-100'
              },
              { 
                id: 'schedules', 
                label: '스케줄관리', 
                icon: CalendarIcon, 
                description: '진료 일정 관리',
                color: 'text-orange-600',
                bgColor: 'bg-orange-50',
                hoverColor: 'hover:bg-orange-100'
              },
              { 
                id: 'appointments', 
                label: '예약관리', 
                icon: Calendar, 
                description: '환자 예약 관리',
                color: 'text-cyan-600',
                bgColor: 'bg-cyan-50',
                hoverColor: 'hover:bg-cyan-100'
              },
              { 
                id: 'inquiries', 
                label: '문의관리', 
                icon: MessageSquare, 
                description: '고객 문의 답변',
                color: 'text-pink-600',
                bgColor: 'bg-pink-50',
                hoverColor: 'hover:bg-pink-100'
              },
              { 
                id: 'categories', 
                label: '진료과목', 
                icon: Heart, 
                description: '진료 분야 관리',
                color: 'text-red-600',
                bgColor: 'bg-red-50',
                hoverColor: 'hover:bg-red-100'
              },
              { 
                id: 'treatments', 
                label: '세부진료', 
                icon: Stethoscope, 
                description: '세부 치료 항목',
                color: 'text-indigo-600',
                bgColor: 'bg-indigo-50',
                hoverColor: 'hover:bg-indigo-100'
              },
              { 
                id: 'reviews', 
                label: '후기관리', 
                icon: Star, 
                description: '고객 후기 승인',
                color: 'text-yellow-600',
                bgColor: 'bg-yellow-50',
                hoverColor: 'hover:bg-yellow-100'
              },
              { 
                id: 'inventory', 
                label: '약품재고', 
                icon: Package, 
                description: '의료 용품 관리',
                color: 'text-teal-600',
                bgColor: 'bg-teal-50',
                hoverColor: 'hover:bg-teal-100'
              }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const IconComponent = tab.icon;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    group relative flex items-center px-4 py-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                    ${isActive 
                      ? `${tab.bgColor} ${tab.color} border-current font-semibold ring-2 ring-white/50 ${
                          tab.id === 'dashboard' ? 'shadow-lg shadow-blue-200/50' :
                          tab.id === 'members' ? 'shadow-lg shadow-emerald-200/50' :
                          tab.id === 'doctors' ? 'shadow-lg shadow-purple-200/50' :
                          tab.id === 'schedules' ? 'shadow-lg shadow-orange-200/50' :
                          tab.id === 'appointments' ? 'shadow-lg shadow-cyan-200/50' :
                          tab.id === 'inquiries' ? 'shadow-lg shadow-pink-200/50' :
                          tab.id === 'categories' ? 'shadow-lg shadow-red-200/50' :
                          tab.id === 'treatments' ? 'shadow-lg shadow-indigo-200/50' :
                          tab.id === 'reviews' ? 'shadow-lg shadow-yellow-200/50' :
                          tab.id === 'inventory' ? 'shadow-lg shadow-teal-200/50' :
                          'shadow-lg shadow-gray-200/50'
                        }` 
                      : `bg-white/80 backdrop-blur-sm text-gray-600 border-white/60 ${tab.hoverColor} hover:shadow-md hover:border-white hover:bg-white/90`
                    }
                    min-w-[140px] justify-center backdrop-blur-sm
                  `}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <div className={`p-2.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/80 shadow-sm' : 'bg-white/40 group-hover:bg-white/60'}`}>
                      <IconComponent className={`w-5 h-5 transition-all duration-300 ${isActive ? tab.color : 'text-gray-500 group-hover:text-gray-700'}`} />
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-medium ${isActive ? tab.color : 'text-gray-700 group-hover:text-gray-900'}`}>
                        {tab.label}
                      </div>
                      <div className={`text-xs ${isActive ? 'text-opacity-80' : 'text-gray-500'} ${isActive ? tab.color : ''}`}>
                        {tab.description}
                      </div>
                    </div>
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className={`w-3 h-3 rounded-full shadow-lg animate-pulse ${
                        tab.id === 'dashboard' ? 'bg-blue-600' :
                        tab.id === 'members' ? 'bg-emerald-600' :
                        tab.id === 'doctors' ? 'bg-purple-600' :
                        tab.id === 'schedules' ? 'bg-orange-600' :
                        tab.id === 'appointments' ? 'bg-cyan-600' :
                        tab.id === 'inquiries' ? 'bg-pink-600' :
                        tab.id === 'categories' ? 'bg-red-600' :
                        tab.id === 'treatments' ? 'bg-indigo-600' :
                        tab.id === 'reviews' ? 'bg-yellow-600' :
                        tab.id === 'inventory' ? 'bg-teal-600' :
                        'bg-gray-600'
                      }`}></div>
                      <div className={`absolute inset-0 w-3 h-3 rounded-full opacity-30 animate-ping ${
                        tab.id === 'dashboard' ? 'bg-blue-600' :
                        tab.id === 'members' ? 'bg-emerald-600' :
                        tab.id === 'doctors' ? 'bg-purple-600' :
                        tab.id === 'schedules' ? 'bg-orange-600' :
                        tab.id === 'appointments' ? 'bg-cyan-600' :
                        tab.id === 'inquiries' ? 'bg-pink-600' :
                        tab.id === 'categories' ? 'bg-red-600' :
                        tab.id === 'treatments' ? 'bg-indigo-600' :
                        tab.id === 'reviews' ? 'bg-yellow-600' :
                        tab.id === 'inventory' ? 'bg-teal-600' :
                        'bg-gray-600'
                      }`}></div>
                    </div>
                  )}
                  
                  {/* Notification badges for pending items */}
                  {tab.id === 'appointments' && appointments.filter(apt => apt.status === '승인대기').length > 0 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg ring-2 ring-white animate-bounce">
                      {appointments.filter(apt => apt.status === '승인대기').length}
                    </div>
                  )}
                  {tab.id === 'inquiries' && inquiries.filter(inq => inq.status === '답변대기').length > 0 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg ring-2 ring-white animate-bounce">
                      {inquiries.filter(inq => inq.status === '답변대기').length}
                    </div>
                  )}
                  {tab.id === 'reviews' && reviews.filter(review => review.status === '승인대기').length > 0 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg ring-2 ring-white animate-bounce">
                      {reviews.filter(review => review.status === '승인대기').length}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>

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
                    <div 
                      className="flex items-center justify-between p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
                      onClick={() => setActiveTab('appointments')}
                    >
                      <span>승인 대기 예약</span>
                      <Badge className="bg-orange-100 text-orange-800">
                        {appointments.filter(apt => apt.status === '승인대기').length}건
                      </Badge>
                    </div>
                    <div 
                      className="flex items-center justify-between p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors"
                      onClick={() => setActiveTab('inquiries')}
                    >
                      <span>답변 대기 문의</span>
                      <Badge className="bg-purple-100 text-purple-800">
                        {inquiries.filter(inq => inq.status === '답변대기').length}건
                      </Badge>
                    </div>
                    <div 
                      className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                      onClick={() => setActiveTab('reviews')}
                    >
                      <span>승인 대기 후기</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        {reviews.filter(review => review.status === '승인대기').length}건
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 약품재고 관리 */}
          <TabsContent value="inventory" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-teal-800">약품재고 관리</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="약품명, 코드로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button onClick={() => {
                  setModalType('inventory-add');
                  setShowModal(true);
                }}>
                  <Plus className="w-4 h-4 mr-2" />
                  약품 등록
                </Button>
              </div>
            </div>

            {/* 재고 현황 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-teal-100">
                <div className="flex items-center mb-2">
                  <Package className="w-5 h-5 text-teal-600 mr-2" />
                  <span className="font-semibold text-gray-700">총 약품 종류</span>
                </div>
                <div className="text-2xl font-bold text-teal-600">156개</div>
                <p className="text-sm text-gray-500 mt-1">전체 등록 약품</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-red-100">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  <span className="font-semibold text-gray-700">재고 부족</span>
                </div>
                <div className="text-2xl font-bold text-red-600">8건</div>
                <p className="text-sm text-gray-500 mt-1">최소재고 미달</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-orange-100">
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 text-orange-600 mr-2" />
                  <span className="font-semibold text-gray-700">유통기한 임박</span>
                </div>
                <div className="text-2xl font-bold text-orange-600">3건</div>
                <p className="text-sm text-gray-500 mt-1">30일 이내 만료</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-purple-100">
                <div className="flex items-center mb-2">
                  <ShoppingCart className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-semibold text-gray-700">진행중 발주</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">2건</div>
                <p className="text-sm text-gray-500 mt-1">배송 대기중</p>
              </div>
            </div>

            {/* 재고 현황 테이블 */}
            <Card className="shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-teal-800 flex items-center">
                  <Package className="w-6 h-6 mr-3" />
                  재고 현황
                </CardTitle>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    필터
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    엑셀 다운로드
                  </Button>
                </div>
              </CardHeader>
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
                    <TableRow>
                      <TableCell className="font-mono">MED-001</TableCell>
                      <TableCell className="font-medium">리도카인 HCl 2%</TableCell>
                      <TableCell>
                        <Badge variant="outline">마취제</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-gray-900">25 바이알</span>
                      </TableCell>
                      <TableCell className="text-gray-600">10 / 50</TableCell>
                      <TableCell>₩12,000</TableCell>
                      <TableCell>대한약품</TableCell>
                      <TableCell className="text-gray-600">2025-06-15</TableCell>
                      <TableCell>A-01</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">정상</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" onClick={() => {
                            setSelectedItem({
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
                              status: '정상'
                            });
                            setModalType('inventory-view');
                            setShowModal(true);
                          }}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => {
                            setSelectedItem({
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
                              status: '정상'
                            });
                            setModalType('inventory-edit');
                            setShowModal(true);
                          }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono">MED-002</TableCell>
                      <TableCell className="font-medium">아목시실린 500mg</TableCell>
                      <TableCell>
                        <Badge variant="outline">항생제</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-red-600">5 정</span>
                      </TableCell>
                      <TableCell className="text-gray-600">15 / 100</TableCell>
                      <TableCell>₩500</TableCell>
                      <TableCell>한국제약</TableCell>
                      <TableCell className="text-gray-600">2025-03-20</TableCell>
                      <TableCell>B-03</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800">부족</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" onClick={() => {
                            setSelectedItem({
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
                              status: '부족'
                            });
                            setModalType('inventory-view');
                            setShowModal(true);
                          }}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => {
                            setSelectedItem({
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
                              status: '부족'
                            });
                            setModalType('inventory-edit');
                            setShowModal(true);
                          }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono">MED-003</TableCell>
                      <TableCell className="font-medium">프로포폴 1%</TableCell>
                      <TableCell>
                        <Badge variant="outline">진정제</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-orange-600">8 바이알</span>
                      </TableCell>
                      <TableCell className="text-gray-600">5 / 20</TableCell>
                      <TableCell>₩25,000</TableCell>
                      <TableCell>메디칸</TableCell>
                      <TableCell className="text-orange-600 font-medium">2025-01-10</TableCell>
                      <TableCell>C-02</TableCell>
                      <TableCell>
                        <Badge className="bg-orange-100 text-orange-800">임박</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" onClick={() => {
                            setSelectedItem({
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
                              status: '임박'
                            });
                            setModalType('inventory-view');
                            setShowModal(true);
                          }}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => {
                            setSelectedItem({
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
                              status: '임박'
                            });
                            setModalType('inventory-edit');
                            setShowModal(true);
                          }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono">MED-004</TableCell>
                      <TableCell className="font-medium">NaCl 0.9% 생리식염수</TableCell>
                      <TableCell>
                        <Badge variant="outline">소독제</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-gray-900">45 병</span>
                      </TableCell>
                      <TableCell className="text-gray-600">20 / 60</TableCell>
                      <TableCell>₩1,500</TableCell>
                      <TableCell>대웅제약</TableCell>
                      <TableCell className="text-gray-600">2026-12-31</TableCell>
                      <TableCell>A-05</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">정상</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" onClick={() => {
                            setSelectedItem({
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
                              status: '정상'
                            });
                            setModalType('inventory-view');
                            setShowModal(true);
                          }}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => {
                            setSelectedItem({
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
                              status: '정상'
                            });
                            setModalType('inventory-edit');
                            setShowModal(true);
                          }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono">MED-005</TableCell>
                      <TableCell className="font-medium">포비돈 요오드 10%</TableCell>
                      <TableCell>
                        <Badge variant="outline">소독제</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-gray-900">12 병</span>
                      </TableCell>
                      <TableCell className="text-gray-600">8 / 30</TableCell>
                      <TableCell>₩8,000</TableCell>
                      <TableCell>동화약품</TableCell>
                      <TableCell className="text-gray-600">2025-08-15</TableCell>
                      <TableCell>B-01</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">정상</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" onClick={() => {
                            setSelectedItem({
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
                              status: '정상'
                            });
                            setModalType('inventory-view');
                            setShowModal(true);
                          }}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => {
                            setSelectedItem({
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
                              status: '정상'
                            });
                            setModalType('inventory-edit');
                            setShowModal(true);
                          }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* 알림 및 빠른 작업 */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* 재고 부족 알림 */}
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    재고 부족 알림
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-red-200">
                      <div>
                        <p className="font-medium text-gray-900">아목시실린 500mg</p>
                        <p className="text-sm text-gray-600">현재고: 5정 / 최소재고: 15정</p>
                      </div>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        발주하기
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-red-200">
                      <div>
                        <p className="font-medium text-gray-900">케토롤 10mg</p>
                        <p className="text-sm text-gray-600">현재고: 3정 / 최소재고: 10정</p>
                      </div>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        발주하기
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 유통기한 임박 알림 */}
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-800 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    유통기한 임박 알림
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-orange-200">
                      <div>
                        <p className="font-medium text-gray-900">프로포폴 1%</p>
                        <p className="text-sm text-gray-600">유통기한: 2025-01-10 (12일 남음)</p>
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        처리
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-orange-200">
                      <div>
                        <p className="font-medium text-gray-900">플루오르 겔</p>
                        <p className="text-sm text-gray-600">유통기한: 2025-01-15 (17일 남음)</p>
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        처리
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 최근 입출고 기록 */}
            <Card className="bg-teal-50 border-teal-200">
              <CardHeader>
                <CardTitle className="text-teal-800 flex items-center">
                  <Clipboard className="w-5 h-5 mr-2" />
                  최근 입출고 기록
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => {
                  setModalType('inventory-history');
                  setShowModal(true);
                }}>
                  전체 보기
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <div>
                      <span className="font-medium">리도카인 HCl 2%</span>
                      <Badge className="ml-2 bg-green-100 text-green-800">입고</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">+20 바이알</p>
                      <p className="text-xs text-gray-500">2024-12-28 10:30</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <div>
                      <span className="font-medium">아목시실린 500mg</span>
                      <Badge className="ml-2 bg-red-100 text-red-800">출고</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">-10 정</p>
                      <p className="text-xs text-gray-500">2024-12-27 14:20</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <div>
                      <span className="font-medium">포비돈 요오드 10%</span>
                      <Badge className="ml-2 bg-green-100 text-green-800">입고</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">+15 병</p>
                      <p className="text-xs text-gray-500">2024-12-26 09:15</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 다른 TabsContent들은 약품재고와 동일한 포맷으로 구현하거나 기존 내용 유지 */}

        </Tabs>

        {/* 모달들 */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {modalType === 'inventory-add' && '새 약품 등록'}
                {modalType === 'inventory-edit' && '약품 정보 수정'}
                {modalType === 'inventory-view' && '약품 상세 정보'}
                {modalType === 'inventory-history' && '입출고 기록'}
              </DialogTitle>
              <DialogDescription>
                {modalType === 'inventory-add' && '새로운 약품을 등록합니다.'}
                {modalType === 'inventory-edit' && '약품 정보를 수정합니다.'}
                {modalType === 'inventory-view' && '약품의 상세 정보를 확인합니다.'}
                {modalType === 'inventory-history' && '약품의 입출고 기록을 확인합니다.'}
              </DialogDescription>
            </DialogHeader>
            
            {modalType === 'inventory-add' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-teal-700 font-medium">약품코드 *</Label>
                    <Input 
                      placeholder="MED-006"
                      className="border-teal-200 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <Label className="text-teal-700 font-medium">약품명 *</Label>
                    <Input 
                      placeholder="약품명을 입력하세요"
                      className="border-teal-200 focus:border-teal-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-teal-700 font-medium">분류 *</Label>
                    <Select>
                      <SelectTrigger className="border-teal-200 focus:border-teal-500">
                        <SelectValue placeholder="분류를 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anesthesia">마취제</SelectItem>
                        <SelectItem value="antibiotic">항생제</SelectItem>
                        <SelectItem value="antiseptic">소독제</SelectItem>
                        <SelectItem value="sedative">진정제</SelectItem>
                        <SelectItem value="analgesic">진통제</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-teal-700 font-medium">단위 *</Label>
                    <Select>
                      <SelectTrigger className="border-teal-200 focus:border-teal-500">
                        <SelectValue placeholder="단위를 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vial">바이알</SelectItem>
                        <SelectItem value="tablet">정</SelectItem>
                        <SelectItem value="bottle">병</SelectItem>
                        <SelectItem value="ampoule">앰플</SelectItem>
                        <SelectItem value="tube">튜브</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-teal-700 font-medium">현재고 *</Label>
                    <Input 
                      type="number"
                      placeholder="0"
                      className="border-teal-200 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <Label className="text-teal-700 font-medium">최소재고 *</Label>
                    <Input 
                      type="number"
                      placeholder="0"
                      className="border-teal-200 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <Label className="text-teal-700 font-medium">최대재고 *</Label>
                    <Input 
                      type="number"
                      placeholder="0"
                      className="border-teal-200 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-teal-700 font-medium">단가 *</Label>
                    <Input 
                      type="number"
                      placeholder="0"
                      className="border-teal-200 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <Label className="text-teal-700 font-medium">공급업체 *</Label>
                    <Input 
                      placeholder="공급업체명"
                      className="border-teal-200 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-teal-700 font-medium">유통기한 *</Label>
                    <Input 
                      type="date"
                      className="border-teal-200 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <Label className="text-teal-700 font-medium">보관위치 *</Label>
                    <Input 
                      placeholder="A-01"
                      className="border-teal-200 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-teal-700 font-medium">메모</Label>
                  <Textarea 
                    placeholder="추가 정보나 메모를 입력하세요"
                    className="border-teal-200 focus:border-teal-500"
                  />
                </div>

                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-teal-300 text-teal-700 hover:bg-teal-50"
                    onClick={() => setShowModal(false)}
                  >
                    취소
                  </Button>
                  <Button 
                    className="flex-1 bg-teal-600 hover:bg-teal-700"
                    onClick={() => {
                      alert('약품이 성공적으로 등록되었습니다.');
                      setShowModal(false);
                    }}
                  >
                    등록하기
                  </Button>
                </div>
              </div>
            )}

            {modalType === 'inventory-view' && selectedItem && (
              <div className="space-y-6">
                <div className="bg-teal-50 p-6 rounded-lg border border-teal-200">
                  <h3 className="text-lg font-semibold text-teal-800 mb-4">{selectedItem.name}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">약품코드</p>
                      <p className="font-medium">{selectedItem.code}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">분류</p>
                      <Badge variant="outline">{selectedItem.category}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">현재고</p>
                      <p className="font-bold text-lg">{selectedItem.currentStock} {selectedItem.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">최소/최대 재고</p>
                      <p className="font-medium">{selectedItem.minStock} / {selectedItem.maxStock}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">단가</p>
                      <p className="font-medium">₩{selectedItem.unitPrice?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">공급업체</p>
                      <p className="font-medium">{selectedItem.supplier}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">유통기한</p>
                      <p className="font-medium">{selectedItem.expiryDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">보관위치</p>
                      <p className="font-medium">{selectedItem.location}</p>
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  onClick={() => setShowModal(false)}
                >
                  확인
                </Button>
              </div>
            )}

            {modalType === 'inventory-edit' && selectedItem && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-teal-700 font-medium">약품코드 *</Label>
                    <Input 
                      defaultValue={selectedItem.code}
                      className="border-teal-200 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <Label className="text-teal-700 font-medium">약품명 *</Label>
                    <Input 
                      defaultValue={selectedItem.name}
                      className="border-teal-200 focus:border-teal-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-teal-700 font-medium">현재고 *</Label>
                    <Input 
                      type="number"
                      defaultValue={selectedItem.currentStock}
                      className="border-teal-200 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <Label className="text-teal-700 font-medium">최소재고 *</Label>
                    <Input 
                      type="number"
                      defaultValue={selectedItem.minStock}
                      className="border-teal-200 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <Label className="text-teal-700 font-medium">최대재고 *</Label>
                    <Input 
                      type="number"
                      defaultValue={selectedItem.maxStock}
                      className="border-teal-200 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-teal-700 font-medium">단가 *</Label>
                    <Input 
                      type="number"
                      defaultValue={selectedItem.unitPrice}
                      className="border-teal-200 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <Label className="text-teal-700 font-medium">공급업체 *</Label>
                    <Input 
                      defaultValue={selectedItem.supplier}
                      className="border-teal-200 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-teal-700 font-medium">유통기한 *</Label>
                    <Input 
                      type="date"
                      defaultValue={selectedItem.expiryDate}
                      className="border-teal-200 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <Label className="text-teal-700 font-medium">보관위치 *</Label>
                    <Input 
                      defaultValue={selectedItem.location}
                      className="border-teal-200 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-teal-300 text-teal-700 hover:bg-teal-50"
                    onClick={() => setShowModal(false)}
                  >
                    취소
                  </Button>
                  <Button 
                    className="flex-1 bg-teal-600 hover:bg-teal-700"
                    onClick={() => {
                      alert('약품 정보가 성공적으로 수정되었습니다.');
                      setShowModal(false);
                    }}
                  >
                    수정하기
                  </Button>
                </div>
              </div>
            )}

            {modalType === 'inventory-history' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-teal-800">입출고 기록</h3>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    엑셀 다운로드
                  </Button>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>일시</TableHead>
                        <TableHead>약품명</TableHead>
                        <TableHead>구분</TableHead>
                        <TableHead>수량</TableHead>
                        <TableHead>재고 변화</TableHead>
                        <TableHead>담당자</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2024-12-28 10:30</TableCell>
                        <TableCell>리도카인 HCl 2%</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">입고</Badge>
                        </TableCell>
                        <TableCell>+20 바이알</TableCell>
                        <TableCell>15 → 35</TableCell>
                        <TableCell>관리자</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2024-12-27 14:20</TableCell>
                        <TableCell>아목시실린 500mg</TableCell>
                        <TableCell>
                          <Badge className="bg-red-100 text-red-800">출고</Badge>
                        </TableCell>
                        <TableCell>-10 정</TableCell>
                        <TableCell>15 → 5</TableCell>
                        <TableCell>김민지</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2024-12-26 09:15</TableCell>
                        <TableCell>포비돈 요오드 10%</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">입고</Badge>
                        </TableCell>
                        <TableCell>+15 병</TableCell>
                        <TableCell>8 → 23</TableCell>
                        <TableCell>관리자</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <Button 
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  onClick={() => setShowModal(false)}
                >
                  확인
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}