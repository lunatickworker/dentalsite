import React, { Suspense, lazy, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent } from './ui/tabs';
import { 
  BarChart3, Users, UserCheck, CalendarIcon, Calendar, MessageSquare,
  Heart, Stethoscope, Star, Package, Home, LogOut, User, Download, RefreshCw,
  Activity, CheckCircle, Clock, TrendingUp, Heart as HeartIcon, Settings,
  UserX
} from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import ErrorBoundary from './ErrorBoundary';
import AdminDashboardScheduleAppointment from './AdminDashboardScheduleAppointment';
import AdminModals from './admin/AdminModals';

// Lazy load components for code splitting
const MembersManagement = lazy(() => import('./admin/MembersManagement'));
const DoctorsManagement = lazy(() => import('./admin/DoctorsManagement'));
const TreatmentCategoriesManagement = lazy(() => import('./admin/TreatmentCategoriesManagement'));
const TreatmentDetailsManagement = lazy(() => import('./admin/TreatmentDetailsManagement'));
const InquiriesManagement = lazy(() => import('./admin/InquiriesManagement'));
const ReviewsManagement = lazy(() => import('./admin/ReviewsManagement'));
const AppointmentsManagement = lazy(() => import('./admin/AppointmentsManagement'));
const ScheduleManagement = lazy(() => import('./admin/ScheduleManagement'));
const InventoryManagement = lazy(() => import('./InventoryManagement'));

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <span className="ml-3 text-gray-600">로딩 중...</span>
    </div>
  );
}

// Dashboard content component
function DashboardContent({ user, onLogout, onGoHome, onDataUpdate }: {
  user: any;
  onLogout: () => void;
  onGoHome?: () => void;
  onDataUpdate?: () => void;
}) {
  const { state, dispatch } = useAdmin();
  const { activeTab, loading, error } = state;

  // Initialize data
  useEffect(() => {
    // Load initial data
    const loadInitialData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        
        // Mock data loading - replace with actual API calls
        const mockMembers = [
          {
            id: 1,
            name: '김미영',
            email: 'kim@example.com',
            phone: '010-1234-5678',
            birthDate: '1985-03-15',
            gender: '여성',
            joinDate: '2024-01-15',
            lastVisit: '2024-12-20',
            status: '활성' as const,
            totalVisits: 8,
            totalAmount: 850000,
            treatments: ['임플란트', '스케일링'],
            notes: '정기 검진 환자',
            priority: 'normal' as const,
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
            status: '활성' as const,
            totalVisits: 15,
            totalAmount: 1200000,
            treatments: ['교정치료', '치아미백'],
            notes: '교정치료 진행 중',
            priority: 'high' as const,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
          }
        ];

        const mockDoctors = [
          {
            id: 1,
            name: '오진수',
            position: '대표원장', 
            specialty: '임플란트·구강외과',
            phone: '010-1111-1111',
            email: 'oh@faith-dental.com',
            experience: '20년',
            status: '활성' as const,
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
            bio: '20년 경력의 구강외과 전문의로 정확하고 안전한 임플란트 치료를 제공합니다.'
          },
          {
            id: 2,
            name: '김민지',
            position: '부원장',
            specialty: '교정치료·심미치료',
            phone: '010-2222-2222',
            email: 'kim@faith-dental.com',
            experience: '15년',
            status: '활성' as const,
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
            bio: '환자 개개인에 맞는 맞춤형 교정치료와 심미치료를 제공합니다.'
          }
        ];

        const mockSchedules = [
          { id: 1, date: '2024-12-30', dayOfWeek: '월요일', doctorId: 1, doctorName: '오진수', timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'], bookedSlots: ['10:00', '15:00'], status: '정상' as const },
          { id: 2, date: '2024-12-30', dayOfWeek: '월요일', doctorId: 2, doctorName: '김민지', timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'], bookedSlots: ['09:00'], status: '정상' as const },
          { id: 3, date: '2024-12-31', dayOfWeek: '화요일', doctorId: 1, doctorName: '오진수', timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'], bookedSlots: ['11:00'], status: '정상' as const },
          { id: 4, date: '2024-12-31', dayOfWeek: '화요일', doctorId: 2, doctorName: '김민지', timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'], bookedSlots: ['10:30'], status: '정상' as const },
          { id: 5, date: '2025-01-01', dayOfWeek: '수요일', doctorId: 1, doctorName: '오진수', timeSlots: [], bookedSlots: [], status: '휴진' as const },
          { id: 6, date: '2025-01-02', dayOfWeek: '목요일', doctorId: 1, doctorName: '오진수', timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'], bookedSlots: [], status: '정상' as const }
        ];

        const mockAppointments = [
          {
            id: 1,
            patientName: '김미영',
            patientPhone: '010-1234-5678',
            doctorName: '오진수',
            service: '임플란트 상담',
            date: '2024-12-30',
            time: '10:00',
            status: '진찰중' as const,
            type: '상담' as const,
            notes: '하악 어금니 임플란트 상담 희망',
            createdAt: '2024-12-28 14:30',
            noShowCount: 0,
            lastNoShowDate: null
          },
          {
            id: 2,
            patientName: '박영희',
            patientPhone: '010-3456-7890',
            doctorName: '오진수', 
            service: '스케일링',
            date: '2024-12-31',
            time: '11:00',
            status: '확정' as const,
            type: '일반' as const,
            notes: '정기 스케일링 예약',
            createdAt: '2024-12-29 16:45',
            noShowCount: 0,
            lastNoShowDate: null
          },
          {
            id: 3,
            patientName: '이철수',
            patientPhone: '010-2345-6789',
            doctorName: '김민지',
            service: '교정 상담',
            date: '2024-12-30',
            time: '14:00',
            status: '치료중' as const,
            type: '상담' as const,
            notes: '투명교정 상담',
            createdAt: '2024-12-29 09:15',
            noShowCount: 0,
            lastNoShowDate: null
          },
          {
            id: 4,
            patientName: '최수진',
            patientPhone: '010-4567-8901',
            doctorName: '김민지',
            service: '치아미백',
            date: '2024-12-29',
            time: '15:00',
            status: '완료' as const,
            type: '치료' as const,
            notes: '홈 미백 시술',
            createdAt: '2024-12-27 11:30',
            noShowCount: 0,
            lastNoShowDate: null
          },
          {
            id: 5,
            patientName: '정민호',
            patientPhone: '010-5678-9012',
            doctorName: '오진수',
            service: '정기검진',
            date: '2024-12-29',
            time: '09:00',
            status: '노쇼' as const,
            type: '일반' as const,
            notes: '6개월 정기검진 - 연락 불가로 노쇼 처리',
            createdAt: '2024-12-28 16:20',
            noShowCount: 1,
            lastNoShowDate: '2024-12-29'
          },
          {
            id: 6,
            patientName: '한지민',
            patientPhone: '010-6789-0123',
            doctorName: '김민지',
            service: '충치치료',
            date: '2024-12-31',
            time: '16:00',
            status: '연기' as const,
            type: '치료' as const,
            notes: '우측 어금니 충치치료 - 개인 사정으로 연기',
            createdAt: '2024-12-29 13:45',
            noShowCount: 0,
            lastNoShowDate: null
          },
          {
            id: 7,
            patientName: '강민수',
            patientPhone: '010-7890-1234',
            doctorName: '오진수',
            service: '신경치료',
            date: '2024-12-30',
            time: '13:00',
            status: '대기' as const,
            type: '치료' as const,
            notes: '근관치료 2차',
            createdAt: '2024-12-29 10:10',
            noShowCount: 0,
            lastNoShowDate: null
          },
          {
            id: 8,
            patientName: '윤서연',
            patientPhone: '010-8901-2345',
            doctorName: '김민지',
            service: '라미네이트 상담',
            date: '2024-12-31',
            time: '10:30',
            status: '예약접수' as const,
            type: '상담' as const,
            notes: '앞니 4개 라미네이트 상담',
            createdAt: '2024-12-29 17:55',
            noShowCount: 0,
            lastNoShowDate: null
          }
        ];

        const mockInquiries = [
          {
            id: 1,
            name: '정민수',
            phone: '010-4567-8901',
            email: 'jeong@example.com',
            subject: '임플란트 비용 문의',
            content: '임플란트 1개 비용과 치료 기간이 궁금합니다.',
            category: '치료문의' as const,
            status: '답변완료' as const,
            createdAt: '2024-12-28 10:30',
            answeredAt: '2024-12-28 14:20',
            answer: '임플란트 비용은 개인의 구강 상태에 따라 달라집니다.'
          },
          {
            id: 2,
            name: '최수진',
            phone: '010-5678-9012',
            email: 'choi@example.com', 
            subject: '교정치료 상담 예약',
            content: '투명교정 상담을 받고 싶습니다.',
            category: '예약문의' as const,
            status: '답변대기' as const,
            createdAt: '2024-12-29 15:20',
            answeredAt: null,
            answer: null
          }
        ];

        const mockReviews = [
          {
            id: 1,
            patientName: '김○○',
            patientInfo: '50대 남성',
            service: '임플란트',
            rating: 5,
            content: '정말 만족스러운 치료였습니다. 자연치아와 같은 느낌이에요!',
            doctorName: '오진수',
            createdAt: '2024-12-28',
            status: '승인완료' as const,
            isPublic: true,
            adminNotes: '우수 후기로 선정'
          },
          {
            id: 2,
            patientName: '이○○',
            patientInfo: '30대 여성', 
            service: '투명교정',
            rating: 5,
            content: '투명교정으로 불편함 없이 치료받았어요.',
            doctorName: '김민지',
            createdAt: '2024-12-27',
            status: '승인대기' as const,
            isPublic: false,
            adminNotes: ''
          }
        ];

        // Dispatch data to context
        dispatch({ type: 'SET_MEMBERS', payload: mockMembers });
        dispatch({ type: 'SET_DOCTORS', payload: mockDoctors });
        dispatch({ type: 'SET_SCHEDULES', payload: mockSchedules });
        dispatch({ type: 'SET_APPOINTMENTS', payload: mockAppointments });
        dispatch({ type: 'SET_INQUIRIES', payload: mockInquiries });
        dispatch({ type: 'SET_REVIEWS', payload: mockReviews });
        dispatch({ type: 'SET_INVENTORY', payload: [] });

        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        console.error('Data loading error:', error);
        dispatch({ type: 'SET_ERROR', payload: '데이터를 불러오는 중 오류가 발생했습니다.' });
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadInitialData();
  }, [dispatch]);

  // Dashboard statistics
  const todayAppointments = state.appointments.filter(apt => apt.date === '2024-12-30');
  const waitingPatients = state.appointments.filter(apt => apt.status === '대기');
  const inProgressPatients = state.appointments.filter(apt => ['진찰중', '치료중'].includes(apt.status));
  const noShowCount = state.appointments.filter(apt => apt.status === '노쇼').length;
  
  const dashboardStats = [
    { 
      title: '오늘 예약', 
      value: todayAppointments.length.toString(), 
      change: '+3', 
      percentage: 25,
      icon: Calendar, 
      gradient: 'from-blue-500 to-blue-600',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600',
      trend: 'up'
    },
    { 
      title: '진행 중인 진료', 
      value: inProgressPatients.length.toString(), 
      change: '+1', 
      percentage: 15,
      icon: Activity, 
      gradient: 'from-purple-500 to-purple-600',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600',
      trend: 'up'
    },
    { 
      title: '대기실 환자', 
      value: waitingPatients.length.toString(), 
      change: '-1', 
      percentage: 10,
      icon: Clock, 
      gradient: 'from-orange-500 to-orange-600',
      lightBg: 'bg-orange-50',
      textColor: 'text-orange-600',
      trend: 'down'
    },
    { 
      title: '이번 달 노쇼', 
      value: noShowCount.toString(), 
      change: noShowCount > 0 ? `+${noShowCount}` : '0', 
      percentage: state.appointments.length > 0 ? Math.round((noShowCount / state.appointments.length) * 100) : 0,
      icon: UserX, 
      gradient: 'from-red-500 to-red-600',
      lightBg: 'bg-red-50',
      textColor: 'text-red-600',
      trend: noShowCount > 0 ? 'up' : 'down'
    }
  ];

  const handleTabChange = (tabId: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tabId });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      '활성': 'bg-green-100 text-green-800',
      '비활성': 'bg-gray-100 text-gray-800',
      '정상': 'bg-green-100 text-green-800',
      '예약접수': 'bg-blue-100 text-blue-800',
      '확정': 'bg-green-100 text-green-800',
      '대기': 'bg-yellow-100 text-yellow-800',
      '진찰중': 'bg-purple-100 text-purple-800',
      '치료중': 'bg-indigo-100 text-indigo-800',
      '완료': 'bg-emerald-100 text-emerald-800',
      '취소': 'bg-gray-100 text-gray-800',
      '노쇼': 'bg-red-100 text-red-800',
      '연기': 'bg-orange-100 text-orange-800',
      '보류': 'bg-slate-100 text-slate-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleAppointmentApprove = (appointmentId: number) => {
    const updatedAppointments = state.appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: '확정' as const }
        : apt
    );
    dispatch({ type: 'SET_APPOINTMENTS', payload: updatedAppointments });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">오류가 발생했습니다</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => dispatch({ type: 'SET_ERROR', payload: null })}>
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

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

      {/* Navigation Bar */}
      <nav className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 border-b border-blue-200/30 shadow-lg relative overflow-hidden">
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
                id: 'treatment-categories', 
                label: '진료과목', 
                icon: HeartIcon, 
                description: '진료 카테고리 관리',
                color: 'text-red-600',
                bgColor: 'bg-red-50',
                hoverColor: 'hover:bg-red-100',
                gradient: 'from-red-500 to-red-600'
              },
              { 
                id: 'treatment-details', 
                label: '세부진료과목', 
                icon: Settings, 
                description: '세부 치료 항목 관리',
                color: 'text-indigo-600',
                bgColor: 'bg-indigo-50',
                hoverColor: 'hover:bg-indigo-100',
                gradient: 'from-indigo-500 to-indigo-600'
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
                  onClick={() => handleTabChange(tab.id)}
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
                  
                  {/* Notification badges */}
                  {tab.id === 'appointments' && state.appointments.filter(apt => apt.status === '예약접수').length > 0 && (
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg ring-2 ring-white animate-bounce">
                      {state.appointments.filter(apt => apt.status === '예약접수').length}
                    </div>
                  )}
                  {tab.id === 'inquiries' && state.inquiries.filter(inq => inq.status === '답변대기').length > 0 && (
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg ring-2 ring-white animate-bounce">
                      {state.inquiries.filter(inq => inq.status === '답변대기').length}
                    </div>
                  )}
                  {tab.id === 'reviews' && state.reviews.filter(review => review.status === '승인대기').length > 0 && (
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg ring-2 ring-white animate-bounce">
                      {state.reviews.filter(review => review.status === '승인대기').length}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="p-6">
        <Tabs value={activeTab} onValueChange={handleTabChange}>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-8">
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
                          <div className={`flex items-center text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            <TrendingUp className={`w-4 h-4 mr-1 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                            <span>{stat.change}</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-gradient-to-r ${stat.gradient}`}
                            style={{ width: `${stat.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-lg`}>
                        <stat.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Action Schedule Component */}
            <AdminDashboardScheduleAppointment 
              schedules={state.schedules || []}
              appointments={state.appointments || []}
              getStatusColor={getStatusColor}
              handleAppointmentApprove={handleAppointmentApprove}
            />
          </TabsContent>

          {/* Members Management */}
          <TabsContent value="members">
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <MembersManagement 
                  members={state.members}
                  onUpdate={(members: any) => dispatch({ type: 'SET_MEMBERS', payload: members })}
                />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          {/* Doctors Management */}
          <TabsContent value="doctors">
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <DoctorsManagement 
                  doctors={state.doctors}
                  onUpdate={(doctors: any) => dispatch({ type: 'SET_DOCTORS', payload: doctors })}
                />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          {/* Treatment Categories */}
          <TabsContent value="treatment-categories">
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <TreatmentCategoriesManagement />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          {/* Treatment Details */}
          <TabsContent value="treatment-details">
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <TreatmentDetailsManagement />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          {/* Schedule Management - NEW COMPLETED FEATURE */}
          <TabsContent value="schedules">
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <ScheduleManagement 
                  schedules={state.schedules}
                  doctors={state.doctors}
                  onUpdate={(schedules) => dispatch({ type: 'SET_SCHEDULES', payload: schedules })}
                />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          {/* Appointments Management */}
          <TabsContent value="appointments">
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <AppointmentsManagement 
                  appointments={state.appointments}
                  onUpdate={(appointments) => dispatch({ type: 'SET_APPOINTMENTS', payload: appointments })}
                />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          {/* Inquiries Management */}
          <TabsContent value="inquiries">
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <InquiriesManagement 
                  inquiries={state.inquiries}
                  onUpdate={(inquiries: any) => dispatch({ type: 'SET_INQUIRIES', payload: inquiries })}
                />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          {/* Reviews Management */}
          <TabsContent value="reviews">
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <ReviewsManagement 
                  reviews={state.reviews}
                  onUpdate={(reviews: any) => dispatch({ type: 'SET_REVIEWS', payload: reviews })}
                />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          {/* Inventory Management */}
          <TabsContent value="inventory">
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <InventoryManagement />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

        </Tabs>
      </main>

      {/* Admin Modals */}
      <AdminModals />
    </div>
  );
}

// Main component wrapper
function AdminDashboard({ user, onLogout, onGoHome, onDataUpdate }: {
  user: any;
  onLogout: () => void;
  onGoHome?: () => void;
  onDataUpdate?: () => void;
}) {
  return (
    <DashboardContent 
      user={user} 
      onLogout={onLogout} 
      onGoHome={onGoHome}
      onDataUpdate={onDataUpdate}
    />
  );
}

export default AdminDashboard;