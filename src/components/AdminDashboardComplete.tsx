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
import { ImageWithFallback } from './figma/ImageWithFallback';
import InventoryManagement from './InventoryManagement';
import AdminDashboardScheduleAppointment from './AdminDashboardScheduleAppointment';
import { 
  Users, Calendar, FileText, Star, Settings, Plus, Edit, Trash2, Eye,
  TrendingUp, Clock, CheckCircle, AlertCircle, Home, Upload, Image,
  BarChart3, Activity, UserCheck, MessageSquare, Search, Filter,
  Download, RefreshCw, Bell, HelpCircle, Phone, Mail, MapPin,
  Award, Heart, Stethoscope, Shield, Sparkles, User, XCircle,
  AlertTriangle, BookOpen, MoreHorizontal, Smile, LogOut, Package,
  Pill, Calendar as CalendarIcon, AlertTriangleIcon, ShoppingCart,
  Clipboard, TrendingDown, MessageCircle, RotateCcw, ChevronDown,
  ChevronRight, ArrowUp, ArrowDown, ExternalLink, Calendar as CalIcon
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
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  
  // 진료과목 필터 상태
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [categoryFilterStatus, setCategoryFilterStatus] = useState('all');
  const [categorySortBy, setCategorySortBy] = useState('order');
  
  // 세부진료 필터 상태
  const [treatmentSearchTerm, setTreatmentSearchTerm] = useState('');
  const [treatmentFilterCategory, setTreatmentFilterCategory] = useState('all');
  const [treatmentFilterStatus, setTreatmentFilterStatus] = useState('all');
  const [treatmentSortBy, setTreatmentSortBy] = useState('order');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // 실시간 대시보드 통계 - 개선된 버전
  const dashboardStats = [
    { 
      title: '오늘 예약', 
      value: '12', 
      change: '+3', 
      percentage: 25,
      icon: Calendar, 
      gradient: 'from-blue-500 to-blue-600',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600',
      trend: 'up'
    },
    { 
      title: '대기 중인 예약', 
      value: '8', 
      change: '+2', 
      percentage: 15,
      icon: Clock, 
      gradient: 'from-orange-500 to-orange-600',
      lightBg: 'bg-orange-50',
      textColor: 'text-orange-600',
      trend: 'up'
    },
    { 
      title: '승인 대기 후기', 
      value: '5', 
      change: '+1', 
      percentage: 10,
      icon: MessageSquare, 
      gradient: 'from-purple-500 to-purple-600',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600',
      trend: 'up'
    },
    { 
      title: '신규 회원', 
      value: '23', 
      change: '+7', 
      percentage: 35,
      icon: Users, 
      gradient: 'from-emerald-500 to-emerald-600',
      lightBg: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      trend: 'up'
    },
  ];

  // 회원 관리 데이터 - 확장된 버전
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
      totalAmount: 850000,
      treatments: ['임플란트', '스케일링'],
      notes: '정기 검진 환자',
      priority: 'normal',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
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
      totalAmount: 1200000,
      treatments: ['교정치료', '치아미백'],
      notes: '교정치료 진행 중',
      priority: 'high',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: '박영희',
      email: 'park@example.com',
      phone: '010-3456-7890',
      birthDate: '1990-11-08',
      gender: '여성',
      joinDate: '2024-03-20',
      lastVisit: '2024-11-15',
      status: '비활성',
      totalVisits: 3,
      totalAmount: 320000,
      treatments: ['스케일링'],
      notes: '장기 미방문 환자',
      priority: 'low',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face'
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

  const getPriorityColor = (priority: string) => {
    const colors = {
      'high': 'bg-red-100 text-red-800',
      'normal': 'bg-gray-100 text-gray-800',
      'low': 'bg-blue-100 text-blue-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityText = (priority: string) => {
    const texts = {
      'high': '높음',
      'normal': '보통',
      'low': '낮음'
    };
    return texts[priority as keyof typeof texts] || '보통';
  };

  // 필터링된 회원 목록
  const filteredMembers = members.filter(member => {
    const matchesSearch = searchTerm === '' || 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || member.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // 필터링된 진료과목 목록
  const filteredTreatmentCategories = treatmentCategories
    .filter(category => {
      const matchesSearch = categorySearchTerm === '' || 
        category.name.toLowerCase().includes(categorySearchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(categorySearchTerm.toLowerCase());
      
      const matchesFilter = categoryFilterStatus === 'all' || category.status === categoryFilterStatus;
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (categorySortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'order':
        default:
          return a.order - b.order;
      }
    });

  // 필터링된 세부진료 목록
  const filteredTreatmentDetails = treatmentDetails
    .filter(treatment => {
      const matchesSearch = treatmentSearchTerm === '' || 
        treatment.name.toLowerCase().includes(treatmentSearchTerm.toLowerCase()) ||
        treatment.description.toLowerCase().includes(treatmentSearchTerm.toLowerCase());
      
      const matchesCategory = treatmentFilterCategory === 'all' || treatment.categoryId === treatmentFilterCategory;
      const matchesStatus = treatmentFilterStatus === 'all' || treatment.status === treatmentFilterStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (treatmentSortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.categoryName.localeCompare(b.categoryName);
        case 'price':
          // 가격 문자열에서 숫자 추출하여 비교
          const priceA = parseInt(a.price.replace(/[^\d]/g, '')) || 0;
          const priceB = parseInt(b.price.replace(/[^\d]/g, '')) || 0;
          return priceA - priceB;
        case 'order':
        default:
          return a.order - b.order;
      }
    });

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

  // 빈 상태 컴포넌트
  const EmptyState = ({ icon: Icon, title, description, action }: any) => (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">{description}</p>
      {action}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b border-blue-100">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Stethoscope className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                믿음치과 관리자
              </h1>
              <p className="text-gray-600 text-sm">병원 통합 관리 시스템</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-gray-700 font-medium">{user?.name || '관리자'}님</span>
            </div>
            
            {onGoHome && (
              <Button variant="outline" onClick={onGoHome} className="border-blue-200 hover:bg-blue-50">
                <Home className="w-4 h-4 mr-2" />
                홈페이지
              </Button>
            )}
            
            <Button onClick={onLogout} variant="destructive" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
              <LogOut className="w-4 h-4 mr-2" />
              로그아웃
            </Button>
          </div>
        </div>
      </header>

      {/* Enhanced Professional Navigation Bar */}
      <nav className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 border-b border-blue-200/30 shadow-lg relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
        </div>
        
        <div className="px-6 py-6 relative z-10">
          <div className="flex flex-wrap gap-3">
            {[
              { 
                id: 'dashboard', 
                label: '대시보드', 
                icon: BarChart3, 
                description: '전체 현황 및 통계',
                color: 'text-blue-600',
                bgColor: 'bg-blue-50',
                hoverColor: 'hover:bg-blue-100',
                gradient: 'from-blue-500 to-blue-600'
              },
              { 
                id: 'members', 
                label: '회원관리', 
                icon: Users, 
                description: '환자 정보 관리',
                color: 'text-emerald-600',
                bgColor: 'bg-emerald-50',
                hoverColor: 'hover:bg-emerald-100',
                gradient: 'from-emerald-500 to-emerald-600'
              },
              { 
                id: 'doctors', 
                label: '의료진관리', 
                icon: UserCheck, 
                description: '의료진 정보 관리',
                color: 'text-purple-600',
                bgColor: 'bg-purple-50',
                hoverColor: 'hover:bg-purple-100',
                gradient: 'from-purple-500 to-purple-600'
              },
              { 
                id: 'schedules', 
                label: '스케줄관리', 
                icon: CalendarIcon, 
                description: '진료 일정 관리',
                color: 'text-orange-600',
                bgColor: 'bg-orange-50',
                hoverColor: 'hover:bg-orange-100',
                gradient: 'from-orange-500 to-orange-600'
              },
              { 
                id: 'appointments', 
                label: '예약관리', 
                icon: Calendar, 
                description: '환자 예약 관리',
                color: 'text-cyan-600',
                bgColor: 'bg-cyan-50',
                hoverColor: 'hover:bg-cyan-100',
                gradient: 'from-cyan-500 to-cyan-600'
              },
              { 
                id: 'inquiries', 
                label: '문의관리', 
                icon: MessageSquare, 
                description: '고객 문의 답변',
                color: 'text-pink-600',
                bgColor: 'bg-pink-50',
                hoverColor: 'hover:bg-pink-100',
                gradient: 'from-pink-500 to-pink-600'
              },
              { 
                id: 'categories', 
                label: '진료과목', 
                icon: Heart, 
                description: '진료 분야 관리',
                color: 'text-red-600',
                bgColor: 'bg-red-50',
                hoverColor: 'hover:bg-red-100',
                gradient: 'from-red-500 to-red-600'
              },
              { 
                id: 'treatments', 
                label: '세부진료', 
                icon: Stethoscope, 
                description: '세부 치료 항목',
                color: 'text-indigo-600',
                bgColor: 'bg-indigo-50',
                hoverColor: 'hover:bg-indigo-100',
                gradient: 'from-indigo-500 to-indigo-600'
              },
              { 
                id: 'reviews', 
                label: '후기관리', 
                icon: Star, 
                description: '고객 후기 승인',
                color: 'text-yellow-600',
                bgColor: 'bg-yellow-50',
                hoverColor: 'hover:bg-yellow-100',
                gradient: 'from-yellow-500 to-yellow-600'
              },
              { 
                id: 'inventory', 
                label: '약품재고', 
                icon: Package, 
                description: '의료 용품 관리',
                color: 'text-teal-600',
                bgColor: 'bg-teal-50',
                hoverColor: 'hover:bg-teal-100',
                gradient: 'from-teal-500 to-teal-600'
              }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const IconComponent = tab.icon;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    group relative flex items-center px-5 py-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105
                    ${isActive 
                      ? `${tab.bgColor} ${tab.color} border-current font-semibold ring-2 ring-white/60 shadow-xl bg-gradient-to-br ${tab.gradient} text-white` 
                      : `bg-white/90 backdrop-blur-sm text-gray-600 border-white/60 ${tab.hoverColor} hover:shadow-lg hover:border-white`
                    }
                    min-w-[160px] justify-center backdrop-blur-sm
                  `}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/20 shadow-sm' : 'bg-white/60 group-hover:bg-white/80'}`}>
                      <IconComponent className={`w-6 h-6 transition-all duration-300 ${isActive ? 'text-white' : `${tab.color} group-hover:scale-110`}`} />
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-semibold ${isActive ? 'text-white' : `${tab.color} group-hover:text-gray-900`}`}>
                        {tab.label}
                      </div>
                      <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                        {tab.description}
                      </div>
                    </div>
                  </div>
                  
                  {/* Notification badges for pending items */}
                  {tab.id === 'appointments' && appointments.filter(apt => apt.status === '승인대기').length > 0 && (
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg ring-2 ring-white animate-bounce">
                      {appointments.filter(apt => apt.status === '승인대기').length}
                    </div>
                  )}
                  {tab.id === 'inquiries' && inquiries.filter(inq => inq.status === '답변대기').length > 0 && (
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg ring-2 ring-white animate-bounce">
                      {inquiries.filter(inq => inq.status === '답변대기').length}
                    </div>
                  )}
                  {tab.id === 'reviews' && reviews.filter(review => review.status === '승인대기').length > 0 && (
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg ring-2 ring-white animate-bounce">
                      {reviews.filter(review => review.status === '승인대기').length}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>

          {/* 향상된 대시보드 */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Professional Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    관리자 대시보드
                  </h2>
                  <p className="text-gray-600 mt-2">병원 운영 현황을 한눈에 확인하세요</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                    <Download className="w-4 h-4 mr-2" />
                    리포트 다운로드
                  </Button>
                  <Button onClick={() => onDataUpdate?.()} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    새로고침
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`}></div>
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 ${stat.lightBg} rounded-2xl flex items-center justify-center`}>
                        <stat.icon className={`w-7 h-7 ${stat.textColor}`} />
                      </div>
                      <div className="flex items-center space-x-1">
                        {stat.trend === 'up' ? (
                          <ArrowUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <div className="flex items-center justify-between">
                        <Progress value={stat.percentage} className="h-2 flex-1 mr-3" />
                        <span className="text-xs text-gray-500">{stat.percentage}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enhanced Dashboard Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Appointments */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-blue-900">오늘의 예약</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {appointments.filter(apt => apt.date === '2024-12-30').length}건
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {appointments.filter(apt => apt.date === '2024-12-30').length > 0 ? (
                      appointments.filter(apt => apt.date === '2024-12-30').map(appointment => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{appointment.patientName}</p>
                              <p className="text-sm text-gray-600">{appointment.service}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">{appointment.time}</p>
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <EmptyState
                        icon={Calendar}
                        title="오늘 예약이 없습니다"
                        description="새로운 예약을 등록하거나 내일 일정을 확인해보세요"
                        action={
                          <Button onClick={() => setActiveTab('appointments')} className="bg-blue-600 hover:bg-blue-700">
                            예약 관리로 이동
                          </Button>
                        }
                      />
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Pending Tasks */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="text-orange-900">대기 중인 업무</span>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">
                      {appointments.filter(apt => apt.status === '승인대기').length + 
                       inquiries.filter(inq => inq.status === '답변대기').length +
                       reviews.filter(review => review.status === '승인대기').length}건
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div 
                      className="flex items-center justify-between p-4 bg-orange-50 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors group"
                      onClick={() => setActiveTab('appointments')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-orange-600" />
                        </div>
                        <span className="font-medium text-orange-900">승인 대기 예약</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-orange-100 text-orange-800">
                          {appointments.filter(apt => apt.status === '승인대기').length}건
                        </Badge>
                        <ChevronRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    
                    <div 
                      className="flex items-center justify-between p-4 bg-purple-50 rounded-xl cursor-pointer hover:bg-purple-100 transition-colors group"
                      onClick={() => setActiveTab('inquiries')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium text-purple-900">답변 대기 문의</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-purple-100 text-purple-800">
                          {inquiries.filter(inq => inq.status === '답변대기').length}건
                        </Badge>
                        <ChevronRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    
                    <div 
                      className="flex items-center justify-between p-4 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors group"
                      onClick={() => setActiveTab('reviews')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Star className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-blue-900">승인 대기 후기</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          {reviews.filter(review => review.status === '승인대기').length}건
                        </Badge>
                        <ChevronRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 향상된 회원 관리 */}
          <TabsContent value="members" className="space-y-6">
            {/* Professional Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                    회원 관리
                  </h2>
                  <p className="text-gray-600 mt-2">환자 정보와 치료 이력을 관리하세요</p>
                </div>
                
                {/* Enhanced Search and Filter Section */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder="이름, 연락처, 이메일로 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-80 border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40 border-emerald-200">
                      <SelectValue placeholder="상태 필터" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="활성">활성</SelectItem>
                      <SelectItem value="비활성">비활성</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 border-emerald-200">
                      <SelectValue placeholder="정렬" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">이름순</SelectItem>
                      <SelectItem value="date">가입일순</SelectItem>
                      <SelectItem value="visit">최근방문순</SelectItem>
                      <SelectItem value="amount">진료비순</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button onClick={handleMemberAdd} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    회원 등록
                  </Button>
                </div>
              </div>
            </div>

            {/* Member Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-emerald-100">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">총 회원</p>
                      <p className="text-xl font-bold text-emerald-600">{members.length}명</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-blue-100">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">활성 회원</p>
                      <p className="text-xl font-bold text-blue-600">{members.filter(m => m.status === '활성').length}명</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-purple-100">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">VIP 회원</p>
                      <p className="text-xl font-bold text-purple-600">{members.filter(m => m.priority === 'high').length}명</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-orange-100">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">신규 회원</p>
                      <p className="text-xl font-bold text-orange-600">
                        {members.filter(m => new Date(m.joinDate).getMonth() === new Date().getMonth()).length}명
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Members List */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-0">
                {filteredMembers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="w-16"></TableHead>
                          <TableHead>환자 정보</TableHead>
                          <TableHead>연락처</TableHead>
                          <TableHead>생년월일</TableHead>
                          <TableHead>성별</TableHead>
                          <TableHead>가입일</TableHead>
                          <TableHead>최근 방문</TableHead>
                          <TableHead>방문 횟수</TableHead>
                          <TableHead>총 진료비</TableHead>
                          <TableHead>우선순위</TableHead>
                          <TableHead>상태</TableHead>
                          <TableHead>관리</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMembers.map((member) => (
                          <TableRow key={member.id} className="hover:bg-gray-50 transition-colors">
                            <TableCell>
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                                <ImageWithFallback 
                                  src={member.avatar} 
                                  alt={member.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-semibold text-gray-900">{member.name}</p>
                                <p className="text-sm text-gray-600">{member.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>{member.phone}</TableCell>
                            <TableCell>{member.birthDate}</TableCell>
                            <TableCell>{member.gender}</TableCell>
                            <TableCell>{member.joinDate}</TableCell>
                            <TableCell>{member.lastVisit}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                {member.totalVisits}회
                              </Badge>
                            </TableCell>
                            <TableCell className="font-semibold">
                              ₩{member.totalAmount.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge className={getPriorityColor(member.priority)}>
                                {getPriorityText(member.priority)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(member.status)}>
                                {member.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-1">
                                <Button size="sm" variant="outline" onClick={() => handleMemberView(member)}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleMemberEdit(member)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="p-8">
                    <EmptyState
                      icon={Users}
                      title="회원이 없습니다"
                      description="검색 조건을 변경하거나 새로운 회원을 등록해보세요"
                      action={
                        <div className="flex space-x-3">
                          <Button variant="outline" onClick={() => {setSearchTerm(''); setFilterStatus('all');}}>
                            필터 초기화
                          </Button>
                          <Button onClick={handleMemberAdd} className="bg-emerald-600 hover:bg-emerald-700">
                            회원 등록
                          </Button>
                        </div>
                      }
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 약품재고 - InventoryManagement 컴포넌트 활용 */}
          <TabsContent value="inventory" className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-teal-100 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
                    약품 재고 관리
                  </h2>
                  <p className="text-gray-600 mt-2">의료용품과 약품 재고를 체계적으로 관리하세요</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-teal-100 text-teal-800 px-3 py-1">
                    실시간 동기화
                  </Badge>
                  <Button variant="outline" className="border-teal-200 hover:bg-teal-50">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    상세 관리
                  </Button>
                </div>
              </div>
            </div>
            
            {/* InventoryManagement 컴포넌트를 임베드 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <InventoryManagement />
            </div>
          </TabsContent>

          {/* 의료진 관리 */}
          <TabsContent value="doctors" className="space-y-6">
            {/* Professional Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                    의료진 관리
                  </h2>
                  <p className="text-gray-600 mt-2">의료진 정보와 스케줄을 관리하세요</p>
                </div>
                <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  의료진 등록
                </Button>
              </div>
            </div>

            {/* Doctor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doctors.map((doctor) => (
                <Card key={doctor.id} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg">
                    <CardTitle className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                        <UserCheck className="w-8 h-8 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-purple-900">{doctor.name}</h3>
                        <p className="text-purple-700">{doctor.position}</p>
                        <Badge className="bg-purple-100 text-purple-800 mt-1">{doctor.specialty}</Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">경력</p>
                          <p className="font-semibold">{doctor.experience}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">상태</p>
                          <Badge className={getStatusColor(doctor.status)}>{doctor.status}</Badge>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">자격증</p>
                        <div className="flex flex-wrap gap-1">
                          {doctor.certifications.map((cert, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
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

          {/* 스케줄 관리 */}
          <TabsContent value="schedules" className="space-y-6">
            {/* Professional Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                    스케줄 관리
                  </h2>
                  <p className="text-gray-600 mt-2">의료진 진료 일정을 관리하세요</p>
                </div>
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  스케줄 추가
                </Button>
              </div>
            </div>

            <Card className="shadow-lg border-0">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>날짜</TableHead>
                      <TableHead>요일</TableHead>
                      <TableHead>담당의</TableHead>
                      <TableHead>전체 시간</TableHead>
                      <TableHead>예약된 시간</TableHead>
                      <TableHead>가용률</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedules.map((schedule) => (
                      <TableRow key={schedule.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{schedule.date}</TableCell>
                        <TableCell>{schedule.dayOfWeek}</TableCell>
                        <TableCell>{schedule.doctorName}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            {schedule.timeSlots.map((time, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {time}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            {schedule.bookedSlots.map((time, index) => (
                              <Badge key={index} className="bg-red-100 text-red-800 text-xs">
                                {time}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress 
                              value={(schedule.bookedSlots.length / schedule.timeSlots.length) * 100} 
                              className="h-2 w-16" 
                            />
                            <span className="text-sm text-gray-600">
                              {Math.round((schedule.bookedSlots.length / schedule.timeSlots.length) * 100)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(schedule.status)}>{schedule.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 예약 관리 */}
          <TabsContent value="appointments" className="space-y-6">
            {/* Professional Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-cyan-100 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-800 bg-clip-text text-transparent">
                    예약 관리
                  </h2>
                  <p className="text-gray-600 mt-2">환자 예약을 효율적으로 관리하세요</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-red-100 text-red-800">
                    승인 대기: {appointments.filter(apt => apt.status === '승인대기').length}건
                  </Badge>
                </div>
              </div>
            </div>

            <Card className="shadow-lg border-0">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>환자명</TableHead>
                      <TableHead>연락처</TableHead>
                      <TableHead>담당의</TableHead>
                      <TableHead>진료내용</TableHead>
                      <TableHead>예약일시</TableHead>
                      <TableHead>구분</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{appointment.patientName}</TableCell>
                        <TableCell>{appointment.patientPhone}</TableCell>
                        <TableCell>{appointment.doctorName}</TableCell>
                        <TableCell>{appointment.service}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{appointment.date}</p>
                            <p className="text-sm text-gray-600">{appointment.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{appointment.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            {appointment.status === '승인대기' && (
                              <Button 
                                size="sm" 
                                onClick={() => handleAppointmentApprove(appointment.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            )}
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
            {/* Professional Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
                    문의 관리
                  </h2>
                  <p className="text-gray-600 mt-2">고객 문의에 신속하게 답변하세요</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-orange-100 text-orange-800">
                    답변 대기: {inquiries.filter(inq => inq.status === '답변대기').length}건
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    답변률: {Math.round((inquiries.filter(inq => inq.status === '답변완료').length / inquiries.length) * 100)}%
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <Card key={inquiry.id} className={`shadow-lg border-0 ${inquiry.status === '답변대기' ? 'ring-2 ring-orange-200' : ''}`}>
                  <CardHeader className={inquiry.status === '답변대기' ? 'bg-orange-50' : 'bg-gray-50'}>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${inquiry.status === '답변대기' ? 'bg-orange-100' : 'bg-green-100'} rounded-lg flex items-center justify-center`}>
                          <MessageSquare className={`w-5 h-5 ${inquiry.status === '답변대기' ? 'text-orange-600' : 'text-green-600'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{inquiry.subject}</h3>
                          <p className="text-sm text-gray-600">{inquiry.name} • {inquiry.category}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-800">{inquiry.content}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <p>연락처: {inquiry.phone}</p>
                        <p>등록일: {inquiry.createdAt}</p>
                        <p>이메일: {inquiry.email}</p>
                        {inquiry.answeredAt && <p>답변일: {inquiry.answeredAt}</p>}
                      </div>
                      {inquiry.answer && (
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-900 mb-2">답변 내용</h4>
                          <p className="text-green-800">{inquiry.answer}</p>
                        </div>
                      )}
                      <div className="flex space-x-2">
                        {inquiry.status === '답변대기' && (
                          <Button 
                            onClick={() => handleInquiryAnswer(inquiry)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            답변하기
                          </Button>
                        )}
                        <Button variant="outline">
                          <Phone className="w-4 h-4 mr-2" />
                          전화걸기
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 진료과목 관리 */}
          <TabsContent value="categories" className="space-y-6">
            {/* Professional Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                    진료과목 관리
                  </h2>
                  <p className="text-gray-600 mt-2">병원의 진료 분야를 관리하세요</p>
                </div>
                
                {/* Enhanced Search and Filter Section for Categories */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder="진료과목명으로 검색..."
                      value={categorySearchTerm}
                      onChange={(e) => setCategorySearchTerm(e.target.value)}
                      className="pl-10 w-80 border-red-200 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  
                  <Select value={categoryFilterStatus} onValueChange={setCategoryFilterStatus}>
                    <SelectTrigger className="w-40 border-red-200">
                      <SelectValue placeholder="상태 필터" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="활성">활성</SelectItem>
                      <SelectItem value="비활성">비활성</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={categorySortBy} onValueChange={setCategorySortBy}>
                    <SelectTrigger className="w-40 border-red-200">
                      <SelectValue placeholder="정렬" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order">순서순</SelectItem>
                      <SelectItem value="name">이름순</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    진료과목 추가
                  </Button>
                </div>
              </div>
            </div>

            {/* Category Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-red-100">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">총 진료과목</p>
                      <p className="text-xl font-bold text-red-600">{treatmentCategories.length}개</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-green-100">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">활성 과목</p>
                      <p className="text-xl font-bold text-green-600">
                        {treatmentCategories.filter(c => c.status === '활성').length}개
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-blue-100">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Eye className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">세부 항목</p>
                      <p className="text-xl font-bold text-blue-600">{treatmentDetails.length}개</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filtered Categories */}
            {filteredTreatmentCategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTreatmentCategories.map((category) => (
                  <Card key={category.id} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 ${category.color === 'text-blue-600' ? 'bg-blue-100' : 
                            category.color === 'text-purple-600' ? 'bg-purple-100' :
                            category.color === 'text-pink-600' ? 'bg-pink-100' :
                            'bg-emerald-100'} rounded-lg flex items-center justify-center`}>
                            {category.icon === 'Stethoscope' && <Stethoscope className={`w-6 h-6 ${category.color}`} />}
                            {category.icon === 'Sparkles' && <Sparkles className={`w-6 h-6 ${category.color}`} />}
                            {category.icon === 'Smile' && <Smile className={`w-6 h-6 ${category.color}`} />}
                            {category.icon === 'Heart' && <Heart className={`w-6 h-6 ${category.color}`} />}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{category.name}</h3>
                            <p className="text-sm text-gray-600">순서: {category.order}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(category.status)}>{category.status}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-gray-700 mb-4">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-2" />
                            수정
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            세부항목
                          </Button>
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {treatmentDetails.filter(t => t.categoryId === category.id).length}개 세부항목
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="p-8">
                <EmptyState
                  icon={Heart}
                  title="진료과목을 찾을 수 없습니다"
                  description="검색 조건을 변경하거나 새로운 진료과목을 등록해보세요"
                  action={
                    <div className="flex space-x-3">
                      <Button variant="outline" onClick={() => {setCategorySearchTerm(''); setCategoryFilterStatus('all');}}>
                        필터 초기화
                      </Button>
                      <Button className="bg-red-600 hover:bg-red-700">
                        진료과목 추가
                      </Button>
                    </div>
                  }
                />
              </div>
            )}
          </TabsContent>

          {/* 세부진료 관리 */}
          <TabsContent value="treatments" className="space-y-6">
            {/* Professional Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                    세부진료 관리
                  </h2>
                  <p className="text-gray-600 mt-2">각 진료과목별 세부 치료 항목을 관리하세요</p>
                </div>
                
                {/* Enhanced Search and Filter Section for Treatments */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder="세부진료명으로 검색..."
                      value={treatmentSearchTerm}
                      onChange={(e) => setTreatmentSearchTerm(e.target.value)}
                      className="pl-10 w-80 border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <Select value={treatmentFilterCategory} onValueChange={setTreatmentFilterCategory}>
                    <SelectTrigger className="w-44 border-indigo-200">
                      <SelectValue placeholder="진료과목" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체 과목</SelectItem>
                      <SelectItem value="implant">임플란트</SelectItem>
                      <SelectItem value="orthodontics">교정치료</SelectItem>
                      <SelectItem value="aesthetic">심미치료</SelectItem>
                      <SelectItem value="general">일반진료</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={treatmentFilterStatus} onValueChange={setTreatmentFilterStatus}>
                    <SelectTrigger className="w-40 border-indigo-200">
                      <SelectValue placeholder="상태" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="활성">활성</SelectItem>
                      <SelectItem value="비활성">비활성</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={treatmentSortBy} onValueChange={setTreatmentSortBy}>
                    <SelectTrigger className="w-40 border-indigo-200">
                      <SelectValue placeholder="정렬" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order">순서순</SelectItem>
                      <SelectItem value="name">이름순</SelectItem>
                      <SelectItem value="category">과목순</SelectItem>
                      <SelectItem value="price">가격순</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700">
                    <Plus className="w-4 h-4 mr-2" />
                    세부진료 추가
                  </Button>
                </div>
              </div>
            </div>

            {/* Treatment Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-indigo-100">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">총 세부진료</p>
                      <p className="text-xl font-bold text-indigo-600">{treatmentDetails.length}개</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-blue-100">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">임플란트</p>
                      <p className="text-xl font-bold text-blue-600">
                        {treatmentDetails.filter(t => t.categoryId === 'implant').length}개
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-purple-100">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">교정치료</p>
                      <p className="text-xl font-bold text-purple-600">
                        {treatmentDetails.filter(t => t.categoryId === 'orthodontics').length}개
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-green-100">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">활성 항목</p>
                      <p className="text-xl font-bold text-green-600">
                        {treatmentDetails.filter(t => t.status === '활성').length}개
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filtered Treatments Table */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-0">
                {filteredTreatmentDetails.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>진료과목</TableHead>
                          <TableHead>세부진료명</TableHead>
                          <TableHead>설명</TableHead>
                          <TableHead>가격</TableHead>
                          <TableHead>치료기간</TableHead>
                          <TableHead>순서</TableHead>
                          <TableHead>상태</TableHead>
                          <TableHead>관리</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTreatmentDetails.map((treatment) => (
                          <TableRow key={treatment.id} className="hover:bg-gray-50">
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className={`${
                                  treatment.categoryId === 'implant' ? 'bg-blue-50 text-blue-700' :
                                  treatment.categoryId === 'orthodontics' ? 'bg-purple-50 text-purple-700' :
                                  treatment.categoryId === 'aesthetic' ? 'bg-pink-50 text-pink-700' :
                                  'bg-emerald-50 text-emerald-700'
                                }`}
                              >
                                {treatment.categoryName}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">{treatment.name}</TableCell>
                            <TableCell className="max-w-xs">
                              <p className="text-sm text-gray-600 truncate" title={treatment.description}>
                                {treatment.description}
                              </p>
                            </TableCell>
                            <TableCell className="font-semibold text-green-600">{treatment.price}</TableCell>
                            <TableCell>{treatment.duration}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-gray-50 text-gray-700">
                                {treatment.order}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(treatment.status)}>{treatment.status}</Badge>
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
                  </div>
                ) : (
                  <div className="p-8">
                    <EmptyState
                      icon={Stethoscope}
                      title="세부진료를 찾을 수 없습니다"
                      description="검색 조건을 변경하거나 새로운 세부진료를 등록해보세요"
                      action={
                        <div className="flex space-x-3">
                          <Button variant="outline" onClick={() => {
                            setTreatmentSearchTerm(''); 
                            setTreatmentFilterCategory('all'); 
                            setTreatmentFilterStatus('all');
                          }}>
                            필터 초기화
                          </Button>
                          <Button className="bg-indigo-600 hover:bg-indigo-700">
                            세부진료 추가
                          </Button>
                        </div>
                      }
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 후기 관리 */}
          <TabsContent value="reviews" className="space-y-6">
            {/* Professional Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-yellow-100 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
                    후기 관리
                  </h2>
                  <p className="text-gray-600 mt-2">고객 후기를 검토하고 승인하세요</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-orange-100 text-orange-800">
                    승인 대기: {reviews.filter(review => review.status === '승인대기').length}건
                  </Badge>
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">평균 5.0</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className={`shadow-lg border-0 ${review.status === '승인대기' ? 'ring-2 ring-orange-200' : ''}`}>
                  <CardHeader className={review.status === '승인대기' ? 'bg-orange-50' : 'bg-green-50'}>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${review.status === '승인대기' ? 'bg-orange-100' : 'bg-green-100'} rounded-full flex items-center justify-center`}>
                          <User className={`w-6 h-6 ${review.status === '승인대기' ? 'text-orange-600' : 'text-green-600'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{review.patientName}</h3>
                          <p className="text-sm text-gray-600">{review.patientInfo} • {review.service}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            {[1,2,3,4,5].map((star) => (
                              <Star 
                                key={star} 
                                className={`w-3 h-3 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(review.status)}>{review.status}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-800">{review.content}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                        <p>담당의: {review.doctorName}</p>
                        <p>작성일: {review.createdAt}</p>
                        <p>공개여부: {review.isPublic ? '공개' : '비공개'}</p>
                      </div>
                      {review.adminNotes && (
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-800">{review.adminNotes}</p>
                        </div>
                      )}
                      <div className="flex space-x-2">
                        {review.status === '승인대기' && (
                          <Button 
                            onClick={() => handleReviewApprove(review.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            승인
                          </Button>
                        )}
                        <Button variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          편집
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

        </Tabs>

        {/* Enhanced Modal */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {modalType === 'member-add' && '새 회원 등록'}
                {modalType === 'member-edit' && '회원 정보 수정'}
                {modalType === 'member-view' && '회원 상세 정보'}
                {modalType === 'inquiry-answer' && '문의 답변'}
              </DialogTitle>
              <DialogDescription>
                {modalType === 'member-add' && '새로운 회원의 정보를 입력해주세요.'}
                {modalType === 'member-edit' && '회원 정보를 수정해주세요.'}
                {modalType === 'member-view' && '회원의 상세 정보를 확인할 수 있습니다.'}
                {modalType === 'inquiry-answer' && '고객 문의에 대한 답변을 작성해주세요.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="p-6">
              {modalType === 'member-view' && selectedItem && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                      <ImageWithFallback 
                        src={selectedItem.avatar} 
                        alt={selectedItem.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedItem.name}</h3>
                      <p className="text-gray-600">{selectedItem.email}</p>
                      <Badge className={getStatusColor(selectedItem.status)}>
                        {selectedItem.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">기본 정보</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-600">연락처:</span> {selectedItem.phone}</p>
                        <p><span className="text-gray-600">생년월일:</span> {selectedItem.birthDate}</p>
                        <p><span className="text-gray-600">성별:</span> {selectedItem.gender}</p>
                        <p><span className="text-gray-600">가입일:</span> {selectedItem.joinDate}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">진료 정보</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-600">총 방문:</span> {selectedItem.totalVisits}회</p>
                        <p><span className="text-gray-600">총 진료비:</span> ₩{selectedItem.totalAmount.toLocaleString()}</p>
                        <p><span className="text-gray-600">최근 방문:</span> {selectedItem.lastVisit}</p>
                        <p><span className="text-gray-600">우선순위:</span> {getPriorityText(selectedItem.priority)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">치료 이력</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.treatments.map((treatment: string, index: number) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                          {treatment}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {selectedItem.notes && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">메모</h4>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedItem.notes}</p>
                    </div>
                  )}
                </div>
              )}
              
              {modalType === 'member-add' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">이름</Label>
                      <Input id="name" placeholder="환자 이름" />
                    </div>
                    <div>
                      <Label htmlFor="email">이메일</Label>
                      <Input id="email" type="email" placeholder="이메일 주소" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">연락처</Label>
                      <Input id="phone" placeholder="휴대폰 번호" />
                    </div>
                    <div>
                      <Label htmlFor="birthDate">생년월일</Label>
                      <Input id="birthDate" type="date" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">메모</Label>
                    <Textarea id="notes" placeholder="특이사항이나 메모를 입력하세요" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                취소
              </Button>
              {modalType !== 'member-view' && (
                <Button onClick={() => setShowModal(false)} className="bg-blue-600 hover:bg-blue-700">
                  저장
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}