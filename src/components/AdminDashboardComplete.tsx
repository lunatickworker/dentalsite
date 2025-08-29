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
      status: '대기승인',
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
      '대기승인': 'bg-orange-100 text-orange-800',
      '답변완료': 'bg-green-100 text-green-800',
      '답변대기': 'bg-orange-100 text-orange-800',
      '승인완료': 'bg-green-100 text-green-800',
      '승인대기': 'bg-orange-100 text-orange-800'
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
                    <div 
                      className="flex items-center justify-between p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
                      onClick={() => setActiveTab('appointments')}
                    >
                      <span>승인 대기 예약</span>
                      <Badge className="bg-orange-100 text-orange-800">
                        {appointments.filter(apt => apt.status === '대기승인').length}건
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
                <Button onClick={handleMemberAdd}>
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
                    {members
                      .filter(member => 
                        searchTerm === '' || 
                        member.name.includes(searchTerm) || 
                        member.phone.includes(searchTerm)
                      )
                      .map((member) => (
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* 의료진 관리 */}
          <TabsContent value="doctors" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">의료진 관리</h2>
              <Button onClick={() => {
                setModalType('doctor-add');
                setShowModal(true);
              }}>
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
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => {
                          setSelectedItem(doctor);
                          setModalType('doctor-edit');
                          setShowModal(true);
                        }}>
                          <Edit className="w-4 h-4 mr-2" />
                          수정
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => {
                          setSelectedItem(doctor);
                          setModalType('doctor-schedule');
                          setShowModal(true);
                        }}>
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
                <Button variant="outline" onClick={() => {
                  setModalType('schedule-calendar');
                  setShowModal(true);
                }}>
                  <Calendar className="w-4 h-4 mr-2" />
                  캘린더 보기
                </Button>
                <Button onClick={() => {
                  setModalType('schedule-add');
                  setShowModal(true);
                }}>
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
                            <Button size="sm" variant="outline" onClick={() => {
                              setSelectedItem(schedule);
                              setModalType('schedule-edit');
                              setShowModal(true);
                            }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => {
                              setSelectedItem(schedule);
                              setModalType('schedule-view');
                              setShowModal(true);
                            }}>
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
                      <Button size="sm" variant="outline" onClick={() => handleInquiryAnswer(inquiry)}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {inquiry.status === '답변대기' ? '답변하기' : '답변보기'}
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
                    <SelectItem value="pending">대기승인</SelectItem>
                    <SelectItem value="confirmed">예약확인</SelectItem>
                    <SelectItem value="progress">진료중</SelectItem>
                    <SelectItem value="completed">완료</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => {
                  setModalType('appointment-add');
                  setShowModal(true);
                }}>
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
                            <p className="font-medium">{appointment.date}</p>
                            <p className="text-sm text-gray-600">{appointment.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline" onClick={() => {
                              setSelectedItem(appointment);
                              setModalType('appointment-view');
                              setShowModal(true);
                            }}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => {
                              setSelectedItem(appointment);
                              setModalType('appointment-edit');
                              setShowModal(true);
                            }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            {appointment.status === '대기승인' && (
                              <Button size="sm" onClick={() => handleAppointmentApprove(appointment.id)}>
                                승인
                              </Button>
                            )}
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
              <Button onClick={() => {
                setModalType('category-add');
                setShowModal(true);
              }}>
                <Plus className="w-4 h-4 mr-2" />
                진료과목 추가
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {treatmentCategories.map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center`}>
                          <Stethoscope className={`w-5 h-5 ${category.color}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{category.name}</h3>
                          <p className="text-sm text-gray-600">순서: {category.order}</p>
                        </div>
                      </CardTitle>
                      <Badge className={getStatusColor(category.status)}>{category.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => {
                        setSelectedItem(category);
                        setModalType('category-edit');
                        setShowModal(true);
                      }}>
                        <Edit className="w-4 h-4 mr-2" />
                        수정
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => {
                        setSelectedItem(category);
                        setModalType('category-view');
                        setShowModal(true);
                      }}>
                        <Eye className="w-4 h-4 mr-2" />
                        상세
                      </Button>
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
              <Button onClick={() => {
                setModalType('treatment-add');
                setShowModal(true);
              }}>
                <Plus className="w-4 h-4 mr-2" />
                세부 진료과목 추가
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
                      <TableHead>기간</TableHead>
                      <TableHead>순서</TableHead>
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
                        <TableCell>{treatment.order}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(treatment.status)}>{treatment.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline" onClick={() => {
                              setSelectedItem(treatment);
                              setModalType('treatment-edit');
                              setShowModal(true);
                            }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => {
                              setSelectedItem(treatment);
                              setModalType('treatment-view');
                              setShowModal(true);
                            }}>
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

          {/* 후기 관리 */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">후기 관리</h2>
              <div className="flex space-x-2">
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
            </div>

            <div className="grid grid-cols-1 gap-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-3">
                          <span>{review.patientName} - {review.service}</span>
                          <Badge className={getStatusColor(review.status)}>{review.status}</Badge>
                          <div className="flex text-yellow-400">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {review.patientInfo} | 담당의: {review.doctorName} | {review.createdAt}
                        </p>
                      </div>
                      {review.status === '승인대기' && (
                        <Button size="sm" onClick={() => handleReviewApprove(review.id)}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          승인
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">후기 내용</p>
                        <p className="mt-1 italic">"{review.content}"</p>
                      </div>
                      {review.adminNotes && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600">관리자 메모</p>
                          <p className="mt-1">{review.adminNotes}</p>
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => {
                          setSelectedItem(review);
                          setModalType('review-edit');
                          setShowModal(true);
                        }}>
                          <Edit className="w-4 h-4 mr-2" />
                          수정
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => {
                          setSelectedItem(review);
                          setModalType('review-view');
                          setShowModal(true);
                        }}>
                          <Eye className="w-4 h-4 mr-2" />
                          상세보기
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 약품 재고 관리 */}
          <TabsContent value="inventory" className="space-y-6">
            <InventoryManagement />
          </TabsContent>
        </Tabs>
      </div>

      {/* 통합 모달 */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {modalType === 'member-add' && '회원 등록'}
              {modalType === 'member-edit' && '회원 정보 수정'}
              {modalType === 'member-view' && '회원 상세 정보'}
              {modalType === 'doctor-add' && '의료진 등록'}
              {modalType === 'doctor-edit' && '의료진 정보 수정'}
              {modalType === 'doctor-schedule' && '의료진 스케줄 관리'}
              {modalType === 'schedule-add' && '스케줄 추가'}
              {modalType === 'schedule-edit' && '스케줄 수정'}
              {modalType === 'schedule-view' && '스케줄 상세보기'}
              {modalType === 'schedule-calendar' && '캘린더 보기'}
              {modalType === 'inquiry-answer' && '문의 답변'}
              {modalType === 'appointment-add' && '예약 등록'}
              {modalType === 'appointment-edit' && '예약 수정'}
              {modalType === 'appointment-view' && '예약 상세보기'}
              {modalType === 'category-add' && '진료과목 추가'}
              {modalType === 'category-edit' && '진료과목 수정'}
              {modalType === 'category-view' && '진료과목 상세보기'}
              {modalType === 'treatment-add' && '세부 진료과목 추가'}
              {modalType === 'treatment-edit' && '세부 진료과목 수정'}
              {modalType === 'treatment-view' && '세부 진료과목 상세보기'}
              {modalType === 'review-edit' && '후기 수정'}
              {modalType === 'review-view' && '후기 상세보기'}
            </DialogTitle>
            <DialogDescription>
              {modalType.includes('member') && '회원 정보를 관리합니다.'}
              {modalType.includes('doctor') && '의료진 정보를 관리합니다.'}
              {modalType.includes('schedule') && '진료 스케줄을 관리합니다.'}
              {modalType.includes('inquiry') && '고객 문의를 관리합니다.'}
              {modalType.includes('appointment') && '예약 정보를 관리합니다.'}
              {modalType.includes('category') && '진료과목을 관리합니다.'}
              {modalType.includes('treatment') && '세부 진료과목을 관리합니다.'}
              {modalType.includes('review') && '환자 후기를 관리합니다.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* 회원 정보 보기 */}
            {modalType === 'member-view' && selectedItem && (
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">기본 정보</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-600">이름</Label>
                      <p className="font-medium">{selectedItem.name}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">연락처</Label>
                      <p className="font-medium">{selectedItem.phone}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">이메일</Label>
                      <p className="font-medium">{selectedItem.email}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">생년월일</Label>
                      <p className="font-medium">{selectedItem.birthDate}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">성별</Label>
                      <p className="font-medium">{selectedItem.gender}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">진료 정보</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-600">가입일</Label>
                      <p className="font-medium">{selectedItem.joinDate}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">최근 방문일</Label>
                      <p className="font-medium">{selectedItem.lastVisit}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">총 방문횟수</Label>
                      <p className="font-medium">{selectedItem.totalVisits}회</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">받은 치료</Label>
                      <div className="flex space-x-2 mt-1">
                        {selectedItem.treatments.map((treatment: string, index: number) => (
                          <Badge key={index} variant="outline">{treatment}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-600">메모</Label>
                      <p className="font-medium">{selectedItem.notes}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 문의 답변 */}
            {modalType === 'inquiry-answer' && selectedItem && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">문의 내용</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">제목:</span> {selectedItem.subject}</p>
                    <p><span className="font-medium">문의자:</span> {selectedItem.name} ({selectedItem.phone})</p>
                    <p><span className="font-medium">접수일:</span> {selectedItem.createdAt}</p>
                    <div className="mt-3">
                      <span className="font-medium">내용:</span>
                      <p className="mt-1 p-3 bg-white rounded border">{selectedItem.content}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="font-semibold">답변 작성</Label>
                  <Textarea 
                    placeholder="문의에 대한 답변을 작성해주세요..."
                    className="mt-2 h-32"
                    defaultValue={selectedItem.answer || ''}
                  />
                </div>

                <div className="flex space-x-2 justify-end">
                  <Button variant="outline" onClick={() => setShowModal(false)}>
                    취소
                  </Button>
                  <Button onClick={() => {
                    // 답변 저장 로직
                    setInquiries(inquiries.map(inq => 
                      inq.id === selectedItem.id 
                        ? { ...inq, status: '답변완료', answeredAt: new Date().toLocaleString() }
                        : inq
                    ));
                    setShowModal(false);
                  }}>
                    답변 저장
                  </Button>
                </div>
              </div>
            )}

            {/* 예약 상세보기 */}
            {modalType === 'appointment-view' && selectedItem && (
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">예약 정보</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-600">환자명</Label>
                      <p className="font-medium">{selectedItem.patientName}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">연락처</Label>
                      <p className="font-medium">{selectedItem.patientPhone}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">담당의</Label>
                      <p className="font-medium">{selectedItem.doctorName}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">진료항목</Label>
                      <p className="font-medium">{selectedItem.service}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">예약일시</Label>
                      <p className="font-medium">{selectedItem.date} {selectedItem.time}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">추가 정보</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-600">예약 유형</Label>
                      <p className="font-medium">{selectedItem.type}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">현재 상태</Label>
                      <Badge className={getStatusColor(selectedItem.status)}>{selectedItem.status}</Badge>
                    </div>
                    <div>
                      <Label className="text-gray-600">접수일시</Label>
                      <p className="font-medium">{selectedItem.createdAt}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">특이사항</Label>
                      <p className="font-medium">{selectedItem.notes}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 기본 폼들 */}
            {(modalType.includes('add') || modalType.includes('edit')) && (
              <div className="space-y-4">
                <div className="text-center py-8 text-gray-500">
                  <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>이 기능은 개발 중입니다.</p>
                  <p className="text-sm">상세한 폼과 기능이 곧 추가될 예정입니다.</p>
                </div>
                <div className="flex space-x-2 justify-end">
                  <Button variant="outline" onClick={() => setShowModal(false)}>
                    취소
                  </Button>
                  <Button onClick={() => setShowModal(false)}>
                    저장
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}