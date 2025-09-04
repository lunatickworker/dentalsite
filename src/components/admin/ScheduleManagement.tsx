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
  CalendarIcon, Clock, Plus, Edit3, Trash2, Save, X, 
  UserCheck, AlertCircle, CheckCircle, Calendar, 
  ChevronLeft, ChevronRight, Settings, RefreshCw,
  Filter, Search, Eye, Copy, Download
} from 'lucide-react';

// 스케줄 상태 타입 정의
type ScheduleStatus = '정상' | '휴진' | '특별진료' | '점심시간' | '연수참석';

// 요일 타입 정의
type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

// 시간 슬롯 타입
interface TimeSlot {
  time: string;
  available: boolean;
  booked: boolean;
  patient?: string;
  service?: string;
  notes?: string;
}

// 스케줄 데이터 타입
interface Schedule {
  id: number;
  date: string;
  dayOfWeek: string;
  doctorId: number;
  doctorName: string;
  timeSlots: string[];
  bookedSlots: string[];
  status: ScheduleStatus;
  notes?: string;
  specialHours?: {
    start: string;
    end: string;
  };
}

// 의료진 타입
interface Doctor {
  id: number;
  name: string;
  position: string;
  specialty: string;
  status: string;
  schedule: Record<DayOfWeek, string[]>;
}

interface ScheduleManagementProps {
  schedules: Schedule[];
  doctors: Doctor[];
  onUpdate: (schedules: Schedule[]) => void;
}

const ScheduleManagement: React.FC<ScheduleManagementProps> = ({ 
  schedules = [],
  doctors = [],
  onUpdate 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<string>('전체');
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [newSchedule, setNewSchedule] = useState<Partial<Schedule>>({
    date: '',
    doctorId: 0,
    doctorName: '',
    timeSlots: [],
    bookedSlots: [],
    status: '정상',
    notes: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // 기본 시간 슬롯 (30분 단위)
  const defaultTimeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // 상태 옵션
  const statusOptions: { value: ScheduleStatus; label: string; color: string; icon: React.ComponentType<any> }[] = [
    { value: '정상', label: '정상 진료', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    { value: '휴진', label: '휴진', color: 'bg-red-100 text-red-800', icon: X },
    { value: '특별진료', label: '특별 진료', color: 'bg-blue-100 text-blue-800', icon: Settings },
    { value: '점심시간', label: '점심시간', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    { value: '연수참석', label: '연수 참석', color: 'bg-purple-100 text-purple-800', icon: AlertCircle }
  ];

  // 주간 날짜 계산
  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(startOfWeek);
      weekDate.setDate(startOfWeek.getDate() + i);
      week.push(weekDate);
    }
    return week;
  };

  // 월간 날짜 계산
  const getMonthDates = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const dates = [];

    for (let d = 1; d <= lastDay.getDate(); d++) {
      dates.push(new Date(year, month, d));
    }
    return dates;
  };

  // 현재 표시할 날짜들
  const displayDates = viewMode === 'week' ? getWeekDates(currentDate) : getMonthDates(currentDate);

  // 필터링된 스케줄
  const filteredSchedules = useMemo(() => {
    return schedules.filter(schedule => {
      const matchesDoctor = selectedDoctor === '전체' || schedule.doctorName === selectedDoctor;
      const matchesSearch = searchTerm === '' || 
        schedule.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.notes?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesDoctor && matchesSearch;
    });
  }, [schedules, selectedDoctor, searchTerm]);

  // 특정 날짜의 스케줄 가져오기
  const getScheduleForDate = (date: Date, doctorId?: number) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredSchedules.filter(schedule => {
      const matchesDate = schedule.date === dateStr;
      const matchesDoctor = !doctorId || schedule.doctorId === doctorId;
      return matchesDate && matchesDoctor;
    });
  };

  // 스케줄 추가
  const handleAddSchedule = () => {
    if (!newSchedule.date || !newSchedule.doctorId) {
      toast.error('필수 정보를 모두 입력해주세요.');
      return;
    }

    const selectedDoctorData = doctors.find(d => d.id === newSchedule.doctorId);
    if (!selectedDoctorData) {
      toast.error('의료진 정보를 찾을 수 없습니다.');
      return;
    }

    const schedule: Schedule = {
      id: Math.max(...schedules.map(s => s.id), 0) + 1,
      date: newSchedule.date!,
      dayOfWeek: new Date(newSchedule.date!).toLocaleDateString('ko-KR', { weekday: 'long' }),
      doctorId: newSchedule.doctorId!,
      doctorName: selectedDoctorData.name,
      timeSlots: newSchedule.timeSlots?.length ? newSchedule.timeSlots : defaultTimeSlots,
      bookedSlots: [],
      status: newSchedule.status as ScheduleStatus || '정상',
      notes: newSchedule.notes || ''
    };

    onUpdate([...schedules, schedule]);
    setShowAddModal(false);
    resetNewSchedule();
    toast.success('스케줄이 추가되었습니다.');
  };

  // 스케줄 수정
  const handleEditSchedule = () => {
    if (!selectedSchedule) return;

    const updatedSchedules = schedules.map(schedule =>
      schedule.id === selectedSchedule.id ? selectedSchedule : schedule
    );

    onUpdate(updatedSchedules);
    setShowEditModal(false);
    setSelectedSchedule(null);
    toast.success('스케줄이 수정되었습니다.');
  };

  // 스케줄 삭제
  const handleDeleteSchedule = (scheduleId: number) => {
    const updatedSchedules = schedules.filter(schedule => schedule.id !== scheduleId);
    onUpdate(updatedSchedules);
    toast.success('스케줄이 삭제되었습니다.');
  };

  // 스케줄 복사
  const handleCopySchedule = (schedule: Schedule) => {
    const today = new Date().toISOString().split('T')[0];
    setNewSchedule({
      date: today,
      doctorId: schedule.doctorId,
      doctorName: schedule.doctorName,
      timeSlots: [...schedule.timeSlots],
      bookedSlots: [],
      status: schedule.status,
      notes: schedule.notes
    });
    setShowAddModal(true);
  };

  // 새 스케줄 초기화
  const resetNewSchedule = () => {
    setNewSchedule({
      date: '',
      doctorId: 0,
      doctorName: '',
      timeSlots: [],
      bookedSlots: [],
      status: '정상',
      notes: ''
    });
  };

  // 상태별 색상 가져오기
  const getStatusColor = (status: ScheduleStatus) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption?.color || 'bg-gray-100 text-gray-800';
  };

  // 상태별 아이콘 가져오기
  const getStatusIcon = (status: ScheduleStatus) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption?.icon || AlertCircle;
  };

  // 달력 네비게이션
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  // 오늘로 이동
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              스케줄 관리
            </h2>
            <p className="text-gray-600 mt-2">의료진 진료 일정 및 시간 관리</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={goToToday} className="border-orange-200 hover:bg-orange-50">
              <Calendar className="w-4 h-4 mr-2" />
              오늘
            </Button>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              스케줄 추가
            </Button>
          </div>
        </div>
      </div>

      {/* 컨트롤 패널 */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* 검색 및 필터 */}
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="의료진명, 메모로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="의료진 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="전체">전체 의료진</SelectItem>
                  {doctors.map(doctor => (
                    <SelectItem key={doctor.id} value={doctor.name}>
                      {doctor.name} {doctor.position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 뷰 모드 선택 */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'week' ? 'default' : 'outline'}
                onClick={() => setViewMode('week')}
                size="sm"
              >
                주간뷰
              </Button>
              <Button
                variant={viewMode === 'month' ? 'default' : 'outline'}
                onClick={() => setViewMode('month')}
                size="sm"
              >
                월간뷰
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 캘린더 헤더 */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigateDate('prev')} size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h3 className="text-xl font-semibold">
                {viewMode === 'week' 
                  ? `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${getWeekDates(currentDate)[0].getDate()}일 - ${getWeekDates(currentDate)[6].getDate()}일`
                  : `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`
                }
              </h3>
              <Button variant="outline" onClick={() => navigateDate('next')} size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                내보내기
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                새로고침
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* 캘린더 그리드 */}
          <div className={`grid gap-4 ${viewMode === 'week' ? 'grid-cols-7' : 'grid-cols-7'}`}>
            {/* 요일 헤더 */}
            {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
              <div key={day} className="text-center font-semibold p-2 bg-gray-50 rounded-lg">
                <span className={index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : 'text-gray-700'}>
                  {day}
                </span>
              </div>
            ))}

            {/* 날짜 및 스케줄 */}
            {viewMode === 'week' ? (
              // 주간 뷰
              getWeekDates(currentDate).map((date, index) => {
                const daySchedules = getScheduleForDate(date);
                const isToday = date.toDateString() === new Date().toDateString();
                const isWeekend = index === 0 || index === 6;

                return (
                  <div key={date.toISOString()} className={`min-h-[200px] p-3 border-2 rounded-xl transition-all duration-200 hover:shadow-lg ${
                    isToday ? 'border-orange-300 bg-orange-50' : 'border-gray-200 bg-white'
                  }`}>
                    <div className={`text-center mb-3 ${isWeekend ? 'text-red-600' : 'text-gray-700'}`}>
                      <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-semibold ${
                        isToday ? 'bg-orange-600 text-white' : ''
                      }`}>
                        {date.getDate()}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {daySchedules.map(schedule => {
                        const StatusIcon = getStatusIcon(schedule.status);
                        return (
                          <div
                            key={schedule.id}
                            className="p-2 rounded-lg bg-gray-50 border border-gray-200 hover:shadow-sm transition-all cursor-pointer"
                            onClick={() => {
                              setSelectedSchedule(schedule);
                              setShowEditModal(true);
                            }}
                          >
                            <div className="flex items-center space-x-2 mb-1">
                              <StatusIcon className="w-3 h-3" />
                              <span className="text-xs font-medium truncate">{schedule.doctorName}</span>
                            </div>
                            <Badge className={`${getStatusColor(schedule.status)} text-xs`}>
                              {schedule.status}
                            </Badge>
                            {schedule.bookedSlots.length > 0 && (
                              <div className="text-xs text-gray-600 mt-1">
                                예약: {schedule.bookedSlots.length}건
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              // 월간 뷰
              getMonthDates(currentDate).map((date) => {
                const daySchedules = getScheduleForDate(date);
                const isToday = date.toDateString() === new Date().toDateString();
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;

                return (
                  <div key={date.toISOString()} className={`min-h-[120px] p-2 border rounded-lg transition-all duration-200 hover:shadow-sm ${
                    isToday ? 'border-orange-300 bg-orange-50' : 'border-gray-200 bg-white'
                  }`}>
                    <div className={`text-center mb-2 ${isWeekend ? 'text-red-600' : 'text-gray-700'}`}>
                      <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-xs font-semibold ${
                        isToday ? 'bg-orange-600 text-white' : ''
                      }`}>
                        {date.getDate()}
                      </div>
                    </div>

                    <div className="space-y-1">
                      {daySchedules.slice(0, 2).map(schedule => (
                        <div
                          key={schedule.id}
                          className={`text-xs p-1 rounded ${getStatusColor(schedule.status)} cursor-pointer`}
                          onClick={() => {
                            setSelectedSchedule(schedule);
                            setShowEditModal(true);
                          }}
                        >
                          {schedule.doctorName}
                        </div>
                      ))}
                      {daySchedules.length > 2 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{daySchedules.length - 2}개 더
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* 스케줄 추가 모달 */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>새 스케줄 추가</DialogTitle>
            <DialogDescription>
              의료진의 새로운 진료 스케줄을 등록합니다.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="doctor">담당 의료진 *</Label>
              <Select 
                value={newSchedule.doctorId?.toString() || ''} 
                onValueChange={(value) => {
                  const doctorId = parseInt(value);
                  const doctor = doctors.find(d => d.id === doctorId);
                  setNewSchedule({
                    ...newSchedule, 
                    doctorId,
                    doctorName: doctor?.name || ''
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="의료진 선택" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map(doctor => (
                    <SelectItem key={doctor.id} value={doctor.id.toString()}>
                      {doctor.name} {doctor.position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date">날짜 *</Label>
              <Input
                id="date"
                type="date"
                value={newSchedule.date || ''}
                onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="status">상태</Label>
              <Select 
                value={newSchedule.status || '정상'} 
                onValueChange={(value) => setNewSchedule({...newSchedule, status: value as ScheduleStatus})}
              >
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
              <Label>진료 시간</Label>
              <div className="flex items-center space-x-2">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setNewSchedule({...newSchedule, timeSlots: defaultTimeSlots})}
                  size="sm"
                >
                  기본 시간 적용
                </Button>
                <span className="text-xs text-gray-500">
                  {newSchedule.timeSlots?.length || 0}개 시간대
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">메모</Label>
            <Textarea
              id="notes"
              value={newSchedule.notes || ''}
              onChange={(e) => setNewSchedule({...newSchedule, notes: e.target.value})}
              placeholder="특이사항이나 메모를 입력하세요"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              취소
            </Button>
            <Button onClick={handleAddSchedule}>
              스케줄 추가
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 스케줄 수정 모달 */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>스케줄 수정</DialogTitle>
            <DialogDescription>
              선택한 스케줄의 정보를 수정합니다.
            </DialogDescription>
          </DialogHeader>

          {selectedSchedule && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>담당 의료진</Label>
                  <Input value={selectedSchedule.doctorName} disabled />
                </div>

                <div>
                  <Label>날짜</Label>
                  <Input value={selectedSchedule.date} disabled />
                </div>

                <div>
                  <Label htmlFor="editStatus">상태</Label>
                  <Select 
                    value={selectedSchedule.status} 
                    onValueChange={(value) => setSelectedSchedule({
                      ...selectedSchedule, 
                      status: value as ScheduleStatus
                    })}
                  >
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
                  <Label>예약 현황</Label>
                  <div className="text-sm text-gray-600">
                    {selectedSchedule.timeSlots.length}개 시간대 중 {selectedSchedule.bookedSlots.length}개 예약됨
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="editNotes">메모</Label>
                <Textarea
                  id="editNotes"
                  value={selectedSchedule.notes || ''}
                  onChange={(e) => setSelectedSchedule({
                    ...selectedSchedule, 
                    notes: e.target.value
                  })}
                  placeholder="특이사항이나 메모를 입력하세요"
                  rows={3}
                />
              </div>

              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleCopySchedule(selectedSchedule)}
                    size="sm"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    복사
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDeleteSchedule(selectedSchedule.id)}
                    className="border-red-300 text-red-700 hover:bg-red-50"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    삭제
                  </Button>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setShowEditModal(false)}>
                    취소
                  </Button>
                  <Button onClick={handleEditSchedule}>
                    <Save className="w-4 h-4 mr-2" />
                    저장
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduleManagement;