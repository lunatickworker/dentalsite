import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  Calendar, Plus, CheckCircle,
  Download, Filter, UserCheck, BarChart3, Search, Phone,
  Clock, Activity, UserX, History, TrendingDown, AlertTriangle,
  PlayCircle, XCircle, RotateCcw, PauseCircle
} from 'lucide-react';

interface ScheduleAppointmentProps {
  schedules?: any[];
  appointments?: any[];
  getStatusColor: (status: string) => string;
  handleAppointmentApprove: (id: number) => void;
}

// 병원 프로세스에 맞는 환자 상태 정의
const PATIENT_STATUS = {
  '예약접수': { color: 'bg-blue-100 text-blue-800', icon: Calendar, description: '초기 예약 상태' },
  '확정': { color: 'bg-green-100 text-green-800', icon: CheckCircle, description: '예약이 확정된 상태' },
  '대기': { color: 'bg-yellow-100 text-yellow-800', icon: Clock, description: '대기실에서 대기 중' },
  '진찰중': { color: 'bg-purple-100 text-purple-800', icon: Activity, description: '의사가 진료 중' },
  '치료중': { color: 'bg-indigo-100 text-indigo-800', icon: PlayCircle, description: '치료 진행 중' },
  '완료': { color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle, description: '진료/치료 완료' },
  '취소': { color: 'bg-gray-100 text-gray-800', icon: XCircle, description: '예약 취소' },
  '노쇼': { color: 'bg-red-100 text-red-800', icon: UserX, description: '무단 결근' },
  '연기': { color: 'bg-orange-100 text-orange-800', icon: RotateCcw, description: '예약 연기' },
  '보류': { color: 'bg-slate-100 text-slate-800', icon: PauseCircle, description: '일시적 보류' }
} as const;

type PatientStatus = keyof typeof PATIENT_STATUS;

export default function AdminDashboardScheduleAppointment({
  schedules = [],
  appointments = [],
  getStatusColor,
  handleAppointmentApprove
}: ScheduleAppointmentProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Safe arrays with fallback to empty arrays
  const safeAppointments = appointments || [];
  const safeSchedules = schedules || [];

  // 노쇼 통계 계산
  const noShowCount = safeAppointments.filter(apt => apt.status === '노쇼').length;
  const noShowRate = safeAppointments.length > 0 ? ((noShowCount / safeAppointments.length) * 100).toFixed(1) : '0';

  // 상태별 통계
  const statusStats = Object.keys(PATIENT_STATUS).reduce((acc, status) => {
    acc[status] = safeAppointments.filter(apt => apt.status === status).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* 예약 관리 헤더 */}
      <div className="bg-white rounded-2xl shadow-lg border border-cyan-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-cyan-600" />
              오늘의 예약 현황
            </h2>
            <p className="text-gray-600 mt-2">실시간 예약 상태를 확인하고 관리하세요</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-cyan-200 hover:bg-cyan-50">
              <Download className="w-4 h-4 mr-2" />
              현황 내보내기
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700">
              <Plus className="w-4 h-4 mr-2" />
              예약 추가
            </Button>
          </div>
        </div>
      </div>

      {/* 예약 통계 카드 - 반응형 가로 1열 */}
      <div className="grid grid-cols-1 gap-4 w-full md:grid-cols-1 lg:grid-cols-1">
        <div className="flex flex-row gap-4 w-full">
          <Card className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 font-medium">오늘 예약</p>
                  <p className="text-2xl font-bold text-blue-800">{safeAppointments.filter(apt => apt.date === '2024-12-30').length}건</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700 font-medium">진찰중</p>
                  <p className="text-2xl font-bold text-purple-800">{statusStats['진찰중'] || 0}건</p>
                </div>
                <Activity className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1 bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-700 font-medium">치료중</p>
                  <p className="text-2xl font-bold text-indigo-800">{statusStats['치료중'] || 0}건</p>
                </div>
                <PlayCircle className="w-8 h-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 font-medium">완료</p>
                  <p className="text-2xl font-bold text-green-800">{statusStats['완료'] || 0}건</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-700 font-medium">노쇼</p>
                  <p className="text-2xl font-bold text-red-800">{noShowCount}건</p>
                  <p className="text-xs text-red-600">({noShowRate}%)</p>
                </div>
                <UserX className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-700 font-medium">총 예약</p>
                  <p className="text-2xl font-bold text-slate-800">{safeAppointments.length}건</p>
                </div>
                <BarChart3 className="w-8 h-8 text-slate-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 노쇼 관리 카드 */}
      <Card className="shadow-lg border border-red-200 bg-gradient-to-br from-red-50 to-orange-50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            노쇼(No-Show) 관리 현황
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">이번 달 노쇼율</span>
                <span className="text-lg font-bold text-red-700">{noShowRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(parseFloat(noShowRate), 100)}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">노쇼 환자 수</span>
                <span className="text-lg font-bold text-red-700">{noShowCount}명</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <TrendingDown className="w-4 h-4 mr-1" />
                <span>전월 대비 {Math.random() > 0.5 ? '감소' : '증가'}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full border-red-300 text-red-700 hover:bg-red-50"
                onClick={() => setFilterStatus('노쇼')}
              >
                <History className="w-4 h-4 mr-2" />
                노쇼 이력 보기
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
                {Object.keys(PATIENT_STATUS).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status} ({statusStats[status] || 0}건)
                  </SelectItem>
                ))}
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
              실시간 예약 목록
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                총 {safeAppointments.filter(apt =>
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
                  <TableHead className="font-semibold text-cyan-800">환자 상태</TableHead>
                  <TableHead className="font-semibold text-cyan-800">예약 유형</TableHead>
                  <TableHead className="font-semibold text-cyan-800">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {safeAppointments
                  .filter(apt =>
                    filterStatus === 'all' || apt.status === filterStatus
                  )
                  .filter(apt =>
                    searchTerm === '' ||
                    apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    apt.patientPhone.includes(searchTerm) ||
                    apt.service.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .slice(0, 10) // 대시보드에서는 최대 10개만 표시
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
                        <div className="flex items-center space-x-2">
                          {(() => {
                            const status = appointment.status as PatientStatus;
                            const statusInfo = PATIENT_STATUS[status] || PATIENT_STATUS['예약접수'];
                            const IconComponent = statusInfo.icon;
                            return (
                              <>
                                <IconComponent className="w-4 h-4" />
                                <Badge className={statusInfo.color} variant="outline">
                                  {status}
                                </Badge>
                              </>
                            );
                          })()}
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
                        <div className="flex items-center space-x-1">
                          {appointment.status === '예약접수' && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleAppointmentApprove(appointment.id)}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              승인
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300"
                          >
                            상세
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
    </div>
  );
}