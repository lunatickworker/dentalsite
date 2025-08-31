import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Calendar, Plus, Edit, Trash2, Eye, Clock, CheckCircle, 
  Download, Filter, UserCheck, BarChart3, Search, Phone,
  Calendar as CalendarIcon, Users, MapPin, MessageCircle
} from 'lucide-react';

interface ScheduleAppointmentProps {
  schedules: any[];
  appointments: any[];
  getStatusColor: (status: string) => string;
  handleAppointmentApprove: (id: number) => void;
}

export default function ScheduleAppointmentTabs({ 
  schedules, 
  appointments, 
  getStatusColor, 
  handleAppointmentApprove 
}: ScheduleAppointmentProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <>
      {/* 향상된 스케줄 관리 탭 */}
      <TabsContent value="schedules" className="space-y-6">
        {/* 스케줄 관리 헤더 */}
        <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center">
                <CalendarIcon className="w-6 h-6 mr-3 text-orange-600" />
                진료 스케줄 관리
              </h2>
              <p className="text-gray-600 mt-2">의료진별 진료 일정을 효율적으로 관리하세요</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="border-orange-200 hover:bg-orange-50">
                <Download className="w-4 h-4 mr-2" />
                스케줄 내보내기
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                <Plus className="w-4 h-4 mr-2" />
                스케줄 추가
              </Button>
            </div>
          </div>
        </div>

        {/* 스케줄 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 font-medium">오늘 진료</p>
                  <p className="text-2xl font-bold text-blue-800">8시간</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 font-medium">예약 가능</p>
                  <p className="text-2xl font-bold text-green-800">12슬롯</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-700 font-medium">예약 완료</p>
                  <p className="text-2xl font-bold text-red-800">5슬롯</p>
                </div>
                <Calendar className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700 font-medium">이번 주</p>
                  <p className="text-2xl font-bold text-purple-800">42시간</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 스케줄 목록 */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
            <CardTitle className="text-orange-800 flex items-center justify-between">
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                주간 스케줄 현황
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="border-orange-200">
                  <Filter className="w-4 h-4 mr-1" />
                  필터
                </Button>
                <Select defaultValue="week">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">이번 주</SelectItem>
                    <SelectItem value="month">이번 달</SelectItem>
                    <SelectItem value="quarter">분기</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                          <CalendarIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">
                            {schedule.date} ({schedule.dayOfWeek})
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <UserCheck className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600 font-medium">담당의: {schedule.doctorName}</span>
                            <Badge className={getStatusColor(schedule.status)} variant="outline">
                              {schedule.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-semibold text-gray-700">시간대별 예약 현황</h5>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-gray-600">예약가능</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span className="text-gray-600">예약완료</span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                          {schedule.timeSlots.map((slot: string) => {
                            const isBooked = schedule.bookedSlots.includes(slot);
                            return (
                              <div 
                                key={slot}
                                className={`p-3 rounded-lg border-2 text-center font-medium transition-all duration-200 hover:scale-105 cursor-pointer ${
                                  isBooked 
                                    ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100' 
                                    : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                                }`}
                              >
                                <div className="text-lg font-bold">{slot}</div>
                                <div className="text-xs mt-1">
                                  {isBooked ? '예약완료' : '예약가능'}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 lg:ml-6">
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Edit className="w-4 h-4 mr-1" />
                        수정
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-300">
                        <Eye className="w-4 h-4 mr-1" />
                        상세보기
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4 mr-1" />
                        삭제
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* 향상된 예약 관리 탭 */}
      <TabsContent value="appointments" className="space-y-6">
        {/* 예약 관리 헤더 */}
        <div className="bg-white rounded-2xl shadow-lg border border-cyan-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-cyan-600" />
                예약 관리 시스템
              </h2>
              <p className="text-gray-600 mt-2">환자 예약을 체계적으로 관리하고 승인하세요</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="border-cyan-200 hover:bg-cyan-50">
                <Download className="w-4 h-4 mr-2" />
                예약 현황 내보내기
              </Button>
              <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700">
                <Plus className="w-4 h-4 mr-2" />
                수동 예약 추가
              </Button>
            </div>
          </div>
        </div>

        {/* 예약 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 font-medium">오늘 예약</p>
                  <p className="text-2xl font-bold text-blue-800">{appointments.filter(apt => apt.date === '2024-12-30').length}건</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-700 font-medium">승인 대기</p>
                  <p className="text-2xl font-bold text-orange-800">{appointments.filter(apt => apt.status === '승인대기').length}건</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 font-medium">예약 확정</p>
                  <p className="text-2xl font-bold text-green-800">{appointments.filter(apt => apt.status === '예약확인').length}건</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700 font-medium">이번 주 총</p>
                  <p className="text-2xl font-bold text-purple-800">{appointments.length}건</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 검색 및 필터 */}
        <Card className="shadow-lg border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                <Input
                  placeholder="환자명, 연락처, 진료과목으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48 border-cyan-200">
                  <SelectValue placeholder="상태별 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 상태</SelectItem>
                  <SelectItem value="승인대기">승인 대기</SelectItem>
                  <SelectItem value="예약확인">예약 확정</SelectItem>
                  <SelectItem value="진료중">진료 중</SelectItem>
                  <SelectItem value="완료">진료 완료</SelectItem>
                  <SelectItem value="취소">예약 취소</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="border-cyan-200 hover:bg-cyan-50">
                <Filter className="w-4 h-4 mr-2" />
                고급 필터
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 예약 목록 */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-100">
            <CardTitle className="text-cyan-800 flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                예약 현황 목록
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  총 {appointments.filter(apt => 
                    filterStatus === 'all' || apt.status === filterStatus
                  ).length}건
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-cyan-50">
                  <TableRow>
                    <TableHead className="font-semibold text-cyan-800">환자 정보</TableHead>
                    <TableHead className="font-semibold text-cyan-800">예약 날짜</TableHead>
                    <TableHead className="font-semibold text-cyan-800">담당의</TableHead>
                    <TableHead className="font-semibold text-cyan-800">진료 내용</TableHead>
                    <TableHead className="font-semibold text-cyan-800">예약 유형</TableHead>
                    <TableHead className="font-semibold text-cyan-800">상태</TableHead>
                    <TableHead className="font-semibold text-cyan-800">요청일</TableHead>
                    <TableHead className="font-semibold text-cyan-800">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments
                    .filter(apt => 
                      filterStatus === 'all' || apt.status === filterStatus
                    )
                    .filter(apt =>
                      searchTerm === '' ||
                      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      apt.patientPhone.includes(searchTerm) ||
                      apt.service.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((appointment) => (
                    <TableRow key={appointment.id} className="hover:bg-cyan-50/30">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {appointment.patientName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{appointment.patientName}</p>
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                              <Phone className="w-3 h-3" />
                              <span>{appointment.patientPhone}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-semibold text-gray-900">{appointment.date}</p>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <UserCheck className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-700">{appointment.doctorName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
                            {appointment.service}
                          </Badge>
                          {appointment.notes && (
                            <p className="text-sm text-gray-600 truncate max-w-xs" title={appointment.notes}>
                              {appointment.notes}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          appointment.type === '상담' ? 'text-purple-700 border-purple-200 bg-purple-50' :
                          appointment.type === '치료' ? 'text-green-700 border-green-200 bg-green-50' :
                          'text-gray-700 border-gray-200 bg-gray-50'
                        }>
                          {appointment.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(appointment.status)} variant="outline">
                          {appointment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">{appointment.createdAt}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {appointment.status === '승인대기' && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleAppointmentApprove(appointment.id)}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              승인
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="border-gray-300">
                            <Eye className="w-3 h-3 mr-1" />
                            상세
                          </Button>
                          <Button size="sm" variant="outline" className="border-cyan-300 text-cyan-600 hover:bg-cyan-50">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            연락
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
}