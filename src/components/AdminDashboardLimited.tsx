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

  // 실시간 대시보드 통계
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
      '정상': 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleAppointmentApprove = (appointmentId: number) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: '예약확인' }
        : apt
    ));
  };

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
                <Card key={index} className={`relative overflow-hidden border-0 shadow-lg ${stat.lightBg} hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className={`text-sm font-medium ${stat.textColor.replace('text-', 'text-').replace('-600', '-700')}`}>
                          {stat.title}
                        </p>
                        <div className="flex items-center space-x-2">
                          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                          <span className={`text-sm font-medium px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {stat.change}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${stat.gradient} transition-all duration-300`}
                              style={{ width: `${stat.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{stat.percentage}%</span>
                        </div>
                      </div>
                      
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                        <stat.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity Card */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
                <CardTitle className="text-gray-800 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  최근 활동 현황
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">새로운 예약 접수</p>
                      <p className="text-sm text-gray-600">박영희님 스케일링 예약 - 방금 전</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">치료 완료</p>
                      <p className="text-sm text-gray-600">김미영님 임플란트 시술 완료 - 2시간 전</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                    <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">새로운 후기 등록</p>
                      <p className="text-sm text-gray-600">이철수님 교정치료 후기 - 1일 전</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 스케줄 및 예약 관리 - 분리된 컴포넌트 사용 */}
          <AdminDashboardScheduleAppointment
            schedules={schedules}
            appointments={appointments}
            getStatusColor={getStatusColor}
            handleAppointmentApprove={handleAppointmentApprove}
          />

        </Tabs>
      </main>
    </div>
  );
}