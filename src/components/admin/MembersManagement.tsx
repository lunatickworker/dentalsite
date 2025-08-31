import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Users, Search, Filter, Plus, Edit, Eye, Trash2, Phone, Mail,
  Calendar, TrendingUp, Award, AlertCircle
} from 'lucide-react';
import { useAdmin, Member } from '../../contexts/AdminContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function MembersManagement() {
  const { state, dispatch } = useAdmin();
  const { members, filters, loading } = state;
  const memberFilters = filters.members;

  // 필터링된 회원 목록
  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch = memberFilters.searchTerm === '' || 
        member.name.toLowerCase().includes(memberFilters.searchTerm.toLowerCase()) ||
        member.phone.includes(memberFilters.searchTerm) ||
        member.email.toLowerCase().includes(memberFilters.searchTerm.toLowerCase());
      
      const matchesStatus = memberFilters.status === 'all' || member.status === memberFilters.status;
      
      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      switch (memberFilters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        case 'visits':
          return b.totalVisits - a.totalVisits;
        case 'amount':
          return b.totalAmount - a.totalAmount;
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [members, memberFilters]);

  // 통계 계산
  const stats = useMemo(() => {
    const total = members.length;
    const active = members.filter(m => m.status === '활성').length;
    const inactive = members.filter(m => m.status === '비활성').length;
    const highPriority = members.filter(m => m.priority === 'high').length;
    const totalAmount = members.reduce((sum, m) => sum + m.totalAmount, 0);
    const avgVisits = total > 0 ? members.reduce((sum, m) => sum + m.totalVisits, 0) / total : 0;

    return {
      total,
      active,
      inactive,
      highPriority,
      totalAmount,
      avgVisits: Math.round(avgVisits * 10) / 10
    };
  }, [members]);

  const getStatusColor = (status: string) => {
    return status === '활성' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
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

  const handleSearchChange = (value: string) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      payload: { section: 'members', filters: { searchTerm: value } }
    });
  };

  const handleStatusFilter = (value: string) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      payload: { section: 'members', filters: { status: value } }
    });
  };

  const handleSortChange = (value: string) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      payload: { section: 'members', filters: { sortBy: value } }
    });
  };

  const handleAddMember = () => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: { type: 'member-add', data: null }
    });
  };

  const handleEditMember = (member: Member) => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: { type: 'member-edit', data: member }
    });
  };

  const handleViewMember = (member: Member) => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: { type: 'member-view', data: member }
    });
  };

  const handleDeleteMember = (memberId: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      dispatch({ type: 'DELETE_MEMBER', payload: memberId });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent flex items-center">
              <Users className="w-6 h-6 mr-3 text-emerald-600" />
              회원 관리
            </h2>
            <p className="text-gray-600 mt-2">환자 정보를 체계적으로 관리하세요</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50">
              <Filter className="w-4 h-4 mr-2" />
              엑셀 내보내기
            </Button>
            <Button 
              onClick={handleAddMember}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              회원 추가
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">총 회원 수</p>
                <p className="text-2xl font-bold text-blue-800">{stats.total}명</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">활성 회원</p>
                <p className="text-2xl font-bold text-green-800">{stats.active}명</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-medium">VIP 회원</p>
                <p className="text-2xl font-bold text-red-800">{stats.highPriority}명</p>
              </div>
              <Award className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">평균 방문</p>
                <p className="text-2xl font-bold text-purple-800">{stats.avgVisits}회</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-lg border-0 bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
              <Input
                placeholder="이름, 전화번호, 이메일로 검색..."
                value={memberFilters.searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <Select value={memberFilters.status} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-full md:w-48 border-emerald-200">
                <SelectValue placeholder="상태별 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 상태</SelectItem>
                <SelectItem value="활성">활성 회원</SelectItem>
                <SelectItem value="비활성">비활성 회원</SelectItem>
              </SelectContent>
            </Select>

            <Select value={memberFilters.sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full md:w-48 border-emerald-200">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">이름순</SelectItem>
                <SelectItem value="date">가입일순</SelectItem>
                <SelectItem value="visits">방문횟수순</SelectItem>
                <SelectItem value="amount">치료비순</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
          <CardTitle className="text-emerald-800 flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              회원 목록 ({filteredMembers.length}명)
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-emerald-50">
                <TableRow>
                  <TableHead className="font-semibold text-emerald-800">회원 정보</TableHead>
                  <TableHead className="font-semibold text-emerald-800">연락처</TableHead>
                  <TableHead className="font-semibold text-emerald-800">가입정보</TableHead>
                  <TableHead className="font-semibold text-emerald-800">방문현황</TableHead>
                  <TableHead className="font-semibold text-emerald-800">치료내역</TableHead>
                  <TableHead className="font-semibold text-emerald-800">상태</TableHead>
                  <TableHead className="font-semibold text-emerald-800">우선도</TableHead>
                  <TableHead className="font-semibold text-emerald-800">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                      검색 조건에 맞는 회원이 없습니다.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMembers.map((member) => (
                    <TableRow key={member.id} className="hover:bg-emerald-50/30">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-emerald-100">
                            {member.avatar ? (
                              <ImageWithFallback
                                src={member.avatar}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-emerald-600 font-bold">
                                {member.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.gender} • {new Date().getFullYear() - new Date(member.birthDate).getFullYear()}세</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1 text-sm">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span>{member.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span className="truncate">{member.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{member.joinDate}</p>
                          <p className="text-xs text-gray-600">가입일</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-semibold">{member.totalVisits}회</p>
                          <p className="text-xs text-gray-600">최근: {member.lastVisit}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex flex-wrap gap-1">
                            {member.treatments.slice(0, 2).map((treatment, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {treatment}
                              </Badge>
                            ))}
                            {member.treatments.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{member.treatments.length - 2}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">
                            총액: {member.totalAmount.toLocaleString()}원
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(member.status)} variant="outline">
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(member.priority)} variant="outline">
                          {getPriorityText(member.priority)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300"
                            onClick={() => handleViewMember(member)}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                            onClick={() => handleEditMember(member)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteMember(member.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}