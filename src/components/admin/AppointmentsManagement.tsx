import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { 
  Search, Filter, Calendar, Clock, User, Phone, UserX, CheckCircle, 
  AlertCircle, PauseCircle, XCircle, RotateCcw, Plus, Eye, Edit3, Trash2,
  AlertTriangle, TrendingUp, Activity, FileText
} from 'lucide-react';

// 환자 상태 타입 정의
type PatientStatus = 
  | '예약접수' | '확정' | '승인대기' | '진찰중' | '치료중' 
  | '완료' | '취소' | '노쇼' | '연기' | '보류' | '대기';

// 예약 데이터 타입
interface Appointment {
  id: number;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  service: string;
  date: string;
  time: string;
  status: PatientStatus;
  type: '상담' | '일반' | '치료' | '응급';
  notes: string;
  createdAt: string;
  noShowCount?: number;
  lastNoShowDate?: string | null;
}

interface AppointmentsManagementProps {
  appointments?: Appointment[];
  onUpdate?: (appointments: Appointment[]) => void;
}

// AppointmentsManagement 컴포넌트
const AppointmentsManagement: React.FC<AppointmentsManagementProps> = ({ 
  appointments = [],
  onUpdate = () => {}
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('전체');
  const [dateFilter, setDateFilter] = useState<string>('전체');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNoShowModal, setShowNoShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    patientName: '',
    patientPhone: '',
    doctorName: '',
    service: '',
    date: '',
    time: '',
    status: '예약접수',
    type: '일반',
    notes: ''
  });

  // 병원 프로세스에 맞는 환자 상태 옵션
  const statusOptions: { value: PatientStatus; label: string; color: string; icon: React.ComponentType<any> }[] = [
    { value: '예약접수', label: '예약접수', color: 'bg-blue-100 text-blue-800', icon: Calendar },
    { value: '확정', label: '확정', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    { value: '승인대기', label: '승인대기', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    { value: '대기', label: '대기', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    { value: '진찰중', label: '진찰중', color: 'bg-purple-100 text-purple-800', icon: Activity },
    { value: '치료중', label: '치료중', color: 'bg-indigo-100 text-indigo-800', icon: Activity },
    { value: '완료', label: '완료', color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle },
    { value: '취소', label: '취소', color: 'bg-gray-100 text-gray-800', icon: XCircle },
    { value: '노쇼', label: '노쇼', color: 'bg-red-100 text-red-800', icon: UserX },
    { value: '연기', label: '연기', color: 'bg-orange-100 text-orange-800', icon: RotateCcw },
    { value: '보류', label: '보류', color: 'bg-slate-100 text-slate-800', icon: PauseCircle }
  ];

  // 상태별 통계 계산
  const statusStats = useMemo(() => {
    const stats = statusOptions.map(option => {
      const count = appointments.filter(apt => apt.status === option.value).length;
      const percentage = appointments.length > 0 ? Math.round((count / appointments.length) * 100) : 0;
      return {
        ...option,
        count,
        percentage
      };
    });
    return stats;
  }, [appointments]);

  // 노쇼 관련 통계
  const noShowStats = useMemo(() => {
    const noShowAppointments = appointments.filter(apt => apt.status === '노쇼');
    const totalNoShows = noShowAppointments.length;
    const uniqueNoShowPatients = new Set(noShowAppointments.map(apt => apt.patientPhone)).size;
    const repeatNoShowPatients = appointments.filter(apt => (apt.noShowCount || 0) > 1).length;
    
    return {
      totalNoShows,
      uniqueNoShowPatients,
      repeatNoShowPatients,
      noShowRate: appointments.length > 0 ? Math.round((totalNoShows / appointments.length) * 100) : 0
    };
  }, [appointments]);

  // 필터링된 예약 목록
  const filteredAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      const matchesSearch = 
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.patientPhone.includes(searchTerm) ||
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.service.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === '전체' || appointment.status === statusFilter;
      
      const matchesDate = dateFilter === '전체' || appointment.date === dateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [appointments, searchTerm, statusFilter, dateFilter]);

  // 상태 변경 핸들러
  const handleStatusChange = (appointmentId: number, newStatus: PatientStatus) => {
    const updatedAppointments = appointments.map(apt => {
      if (apt.id === appointmentId) {
        const updatedApt = { ...apt, status: newStatus };
        
        // 노쇼 처리시 노쇼 카운트 증가
        if (newStatus === '노쇼') {
          updatedApt.noShowCount = (apt.noShowCount || 0) + 1;
          updatedApt.lastNoShowDate = new Date().toISOString().split('T')[0];
          updatedApt.notes = apt.notes + ' [노쇼 처리됨]';
        }
        
        return updatedApt;
      }
      return apt;
    });
    
    onUpdate(updatedAppointments);
    toast.success(`${newStatus}로 상태가 변경되었습니다.`);
  };

  // 노쇼 환자 재예약 핸들러
  const handleNoShowReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNewAppointment({
      ...appointment,
      id: undefined,
      status: '예약접수',
      date: '',
      time: '',
      notes: `[노쇼 재예약] ${appointment.notes}`
    });
    setShowAddModal(true);
  };

  // 예약 추가
  const handleAddAppointment = () => {
    if (!newAppointment.patientName || !newAppointment.patientPhone || 
        !newAppointment.date || !newAppointment.time) {
      toast.error('필수 정보를 모두 입력해주세요.');
      return;
    }

    const appointment: Appointment = {
      id: Math.max(...appointments.map(a => a.id), 0) + 1,
      patientName: newAppointment.patientName!,
      patientPhone: newAppointment.patientPhone!,
      doctorName: newAppointment.doctorName || '미정',
      service: newAppointment.service || '상담',
      date: newAppointment.date!,
      time: newAppointment.time!,
      status: newAppointment.status as PatientStatus || '예약접수',
      type: newAppointment.type as any || '일반',
      notes: newAppointment.notes || '',
      createdAt: new Date().toLocaleString(),
      noShowCount: 0,
      lastNoShowDate: null
    };

    onUpdate([...appointments, appointment]);
    setShowAddModal(false);
    setNewAppointment({
      patientName: '',
      patientPhone: '',
      doctorName: '',
      service: '',
      date: '',
      time: '',
      status: '예약접수',
      type: '일반',
      notes: ''
    });
    toast.success('예약이 추가되었습니다.');
  };

  // 예약 삭제
  const handleDeleteAppointment = (appointmentId: number) => {
    const updatedAppointments = appointments.filter(apt => apt.id !== appointmentId);
    onUpdate(updatedAppointments);
    toast.success('예약이 삭제되었습니다.');
  };

  // 상태별 색상 가져오기
  const getStatusColor = (status: PatientStatus) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption?.color || 'bg-gray-100 text-gray-800';
  };

  // 상태별 아이콘 가져오기
  const getStatusIcon = (status: PatientStatus) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption?.icon || AlertCircle;
  };

  // 날짜 옵션 생성
  const dateOptions = useMemo(() => {
    const dates = [...new Set(appointments.map(apt => apt.date))].sort();
    return ['전체', ...dates];
  }, [appointments]);

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="bg-white rounded-2xl shadow-lg border border-cyan-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-800 bg-clip-text text-transparent">
              예약 관리
            </h2>
            <p className="text-gray-600 mt-2">환자 예약 현황 및 상태 관리</p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            새 예약 등록
          </Button>
        </div>
      </div>

      {/* 상태별 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statusStats.slice(0, 5).map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.value} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                      <span className="text-xs text-gray-500">{stat.percentage}%</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color.replace('text-', 'bg-').replace('800', '600')} bg-opacity-20`}>
                    <IconComponent className={`w-6 h-6 ${stat.color.replace('bg-', 'text-').replace('100', '600')}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 노쇼 관리 통계 */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-xl">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-red-800">노쇼 관리 현황</CardTitle>
              <p className="text-red-600 text-sm">환자 노쇼 패턴 및 관리</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-700">{noShowStats.totalNoShows}</p>
              <p className="text-sm text-red-600">총 노쇼 건수</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-700">{noShowStats.uniqueNoShowPatients}</p>
              <p className="text-sm text-orange-600">노쇼 환자 수</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-700">{noShowStats.repeatNoShowPatients}</p>
              <p className="text-sm text-red-600">재 노쇼 환자</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-700">{noShowStats.noShowRate}%</p>
              <p className="text-sm text-red-600">노쇼율</p>
            </div>
          </div>
          {noShowStats.totalNoShows > 0 && (
            <div className="mt-4 p-4 bg-orange-100 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <p className="text-orange-800 font-medium">노쇼 관리 알림</p>
              </div>
              <p className="text-orange-700 text-sm mt-1">
                노쇼율이 높습니다. 예약 확인 시스템을 점검하고 재예약 프로세스를 개선해주세요.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 검색 및 필터 */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="환자명, 전화번호, 의료진, 진료과목으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="상태 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="전체">모든 상태</SelectItem>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="날짜 선택" />
                </SelectTrigger>
                <SelectContent>
                  {dateOptions.map(date => (
                    <SelectItem key={date} value={date}>
                      {date}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 예약 목록 */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>예약 목록 ({filteredAppointments.length}건)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">등록된 예약이 없습니다.</p>
              </div>
            ) : (
              filteredAppointments.map((appointment) => {
                const StatusIcon = getStatusIcon(appointment.status);
                const isNoShow = appointment.status === '노쇼';
                const hasRepeatNoShow = (appointment.noShowCount || 0) > 1;
                
                return (
                  <div
                    key={appointment.id}
                    className={`p-6 border-2 rounded-xl transition-all duration-300 hover:shadow-lg ${
                      isNoShow ? 'border-red-200 bg-red-50' : 
                      hasRepeatNoShow ? 'border-orange-200 bg-orange-50' : 
                      'border-gray-200 bg-white hover:border-cyan-200'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold text-gray-900 text-lg">
                                {appointment.patientName}
                              </h3>
                              <Badge className={`${getStatusColor(appointment.status)} border-0`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {appointment.status}
                              </Badge>
                              {hasRepeatNoShow && (
                                <Badge className="bg-orange-100 text-orange-800 border-0">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  재노쇼
                                </Badge>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>{appointment.patientPhone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4" />
                                <span>{appointment.doctorName}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4" />
                                <span>{appointment.date} {appointment.time}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <FileText className="w-4 h-4" />
                                <span>{appointment.service}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {appointment.notes && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-700">{appointment.notes}</p>
                          </div>
                        )}

                        {(appointment.noShowCount || 0) > 0 && (
                          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                            <div className="flex items-center space-x-2">
                              <UserX className="w-4 h-4 text-red-600" />
                              <span className="text-red-800 font-medium">
                                노쇼 이력: {appointment.noShowCount}회
                              </span>
                              {appointment.lastNoShowDate && (
                                <span className="text-red-600 text-sm">
                                  (최근: {appointment.lastNoShowDate})
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col space-y-2">
                        <div className="flex space-x-2">
                          <Select
                            value={appointment.status}
                            onValueChange={(value) => handleStatusChange(appointment.id, value as PatientStatus)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          {isNoShow && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleNoShowReschedule(appointment)}
                              className="border-orange-300 text-orange-700 hover:bg-orange-50"
                            >
                              <RotateCcw className="w-4 h-4 mr-1" />
                              재예약
                            </Button>
                          )}
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteAppointment(appointment.id)}
                            className="border-red-300 text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <p className="text-xs text-gray-500 text-right">
                          등록: {appointment.createdAt}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* 예약 추가 모달 */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>새 예약 등록</DialogTitle>
            <DialogDescription>
              새로운 환자 예약을 등록합니다.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patientName">환자명 *</Label>
              <Input
                id="patientName"
                value={newAppointment.patientName || ''}
                onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                placeholder="환자명을 입력하세요"
              />
            </div>
            
            <div>
              <Label htmlFor="patientPhone">연락처 *</Label>
              <Input
                id="patientPhone"
                value={newAppointment.patientPhone || ''}
                onChange={(e) => setNewAppointment({...newAppointment, patientPhone: e.target.value})}
                placeholder="010-0000-0000"
              />
            </div>
            
            <div>
              <Label htmlFor="doctorName">담당의</Label>
              <Select value={newAppointment.doctorName || ''} onValueChange={(value) => setNewAppointment({...newAppointment, doctorName: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="담당의 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="오진수">오진수 원장</SelectItem>
                  <SelectItem value="김민지">김민지 부원장</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="service">진료과목</Label>
              <Input
                id="service"
                value={newAppointment.service || ''}
                onChange={(e) => setNewAppointment({...newAppointment, service: e.target.value})}
                placeholder="임플란트, 교정, 스케일링 등"
              />
            </div>
            
            <div>
              <Label htmlFor="date">예약날짜 *</Label>
              <Input
                id="date"
                type="date"
                value={newAppointment.date || ''}
                onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="time">예약시간 *</Label>
              <Input
                id="time"
                type="time"
                value={newAppointment.time || ''}
                onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="status">상태</Label>
              <Select value={newAppointment.status || '예약접수'} onValueChange={(value) => setNewAppointment({...newAppointment, status: value as PatientStatus})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="type">예약 유형</Label>
              <Select value={newAppointment.type || '일반'} onValueChange={(value) => setNewAppointment({...newAppointment, type: value as any})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="상담">상담</SelectItem>
                  <SelectItem value="일반">일반 진료</SelectItem>
                  <SelectItem value="치료">치료</SelectItem>
                  <SelectItem value="응급">응급</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes">메모</Label>
            <Textarea
              id="notes"
              value={newAppointment.notes || ''}
              onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
              placeholder="특이사항이나 메모를 입력하세요"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              취소
            </Button>
            <Button onClick={handleAddAppointment}>
              예약 등록
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentsManagement;