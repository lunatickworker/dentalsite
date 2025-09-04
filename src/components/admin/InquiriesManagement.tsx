import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  MessageSquare, Search, Filter, Eye, MessageCircle, Phone, Mail,
  Clock, CheckCircle, AlertCircle, Calendar
} from 'lucide-react';
import { useAdmin, Inquiry } from '../../contexts/AdminContext';

interface InquiriesManagementProps {
  inquiries: Inquiry[];
  onUpdate: (inquiries: Inquiry[]) => void;
}

export default function InquiriesManagement({ inquiries: propInquiries, onUpdate }: InquiriesManagementProps) {
  const { state, dispatch } = useAdmin();
  const { filters, loading } = state;
  const inquiries = propInquiries || state.inquiries;
  const inquiryFilters = filters.inquiries;

  // 필터링된 문의 목록
  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inquiry => {
      const matchesSearch = inquiryFilters.searchTerm === '' || 
        inquiry.name.toLowerCase().includes(inquiryFilters.searchTerm.toLowerCase()) ||
        inquiry.phone.includes(inquiryFilters.searchTerm) ||
        inquiry.subject.toLowerCase().includes(inquiryFilters.searchTerm.toLowerCase()) ||
        inquiry.content.toLowerCase().includes(inquiryFilters.searchTerm.toLowerCase());
      
      const matchesStatus = inquiryFilters.status === 'all' || inquiry.status === inquiryFilters.status;
      const matchesCategory = inquiryFilters.category === 'all' || inquiry.category === inquiryFilters.category;
      
      return matchesSearch && matchesStatus && matchesCategory;
    }).sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [inquiries, inquiryFilters]);

  // 통계 계산
  const stats = useMemo(() => {
    const total = inquiries.length;
    const pending = inquiries.filter(i => i.status === '답변대기').length;
    const completed = inquiries.filter(i => i.status === '답변완료').length;
    const today = inquiries.filter(i => {
      const today = new Date().toISOString().split('T')[0];
      return i.createdAt.startsWith(today);
    }).length;

    return { total, pending, completed, today };
  }, [inquiries]);

  const getStatusColor = (status: string) => {
    return status === '답변완료' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-orange-100 text-orange-800';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      '치료문의': 'bg-blue-100 text-blue-800',
      '예약문의': 'bg-green-100 text-green-800',
      '일반문의': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleSearchChange = (value: string) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      payload: { section: 'inquiries', filters: { searchTerm: value } }
    });
  };

  const handleStatusFilter = (value: string) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      payload: { section: 'inquiries', filters: { status: value } }
    });
  };

  const handleCategoryFilter = (value: string) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      payload: { section: 'inquiries', filters: { category: value } }
    });
  };

  const handleViewInquiry = (inquiry: Inquiry) => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: { type: 'inquiry-view', data: inquiry }
    });
  };

  const handleAnswerInquiry = (inquiry: Inquiry) => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: { type: 'inquiry-answer', data: inquiry }
    });
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
      <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent flex items-center">
              <MessageSquare className="w-6 h-6 mr-3 text-pink-600" />
              문의 관리
            </h2>
            <p className="text-gray-600 mt-2">고객 문의를 신속하게 처리하세요</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-pink-200 hover:bg-pink-50">
              <Filter className="w-4 h-4 mr-2" />
              엑셀 내보내기
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
                <p className="text-sm text-blue-700 font-medium">전체 문의</p>
                <p className="text-2xl font-bold text-blue-800">{stats.total}건</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-medium">답변 대기</p>
                <p className="text-2xl font-bold text-orange-800">{stats.pending}건</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">답변 완료</p>
                <p className="text-2xl font-bold text-green-800">{stats.completed}건</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">오늘 접수</p>
                <p className="text-2xl font-bold text-purple-800">{stats.today}건</p>
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
                placeholder="이름, 제목, 내용으로 검색..."
                value={inquiryFilters.searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 border-pink-200 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            
            <Select value={inquiryFilters.status} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-full md:w-48 border-pink-200">
                <SelectValue placeholder="상태별 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 상태</SelectItem>
                <SelectItem value="답변대기">답변 대기</SelectItem>
                <SelectItem value="답변완료">답변 완료</SelectItem>
              </SelectContent>
            </Select>

            <Select value={inquiryFilters.category} onValueChange={handleCategoryFilter}>
              <SelectTrigger className="w-full md:w-48 border-pink-200">
                <SelectValue placeholder="분류별 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 분류</SelectItem>
                <SelectItem value="치료문의">치료 문의</SelectItem>
                <SelectItem value="예약문의">예약 문의</SelectItem>
                <SelectItem value="일반문의">일반 문의</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries Table */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
          <CardTitle className="text-pink-800 flex items-center justify-between">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              문의 목록 ({filteredInquiries.length}건)
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-pink-50">
                <TableRow>
                  <TableHead className="font-semibold text-pink-800">문의자 정보</TableHead>
                  <TableHead className="font-semibold text-pink-800">문의 내용</TableHead>
                  <TableHead className="font-semibold text-pink-800">분류</TableHead>
                  <TableHead className="font-semibold text-pink-800">상태</TableHead>
                  <TableHead className="font-semibold text-pink-800">접수일</TableHead>
                  <TableHead className="font-semibold text-pink-800">처리일</TableHead>
                  <TableHead className="font-semibold text-pink-800">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                      검색 조건에 맞는 문의가 없습니다.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInquiries.map((inquiry) => (
                    <TableRow key={inquiry.id} className="hover:bg-pink-50/30">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">
                            {inquiry.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{inquiry.name}</p>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-1 text-sm text-gray-600">
                                <Phone className="w-3 h-3" />
                                <span>{inquiry.phone}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-gray-600">
                                <Mail className="w-3 h-3" />
                                <span className="truncate max-w-xs">{inquiry.email}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="space-y-1">
                          <p className="font-semibold text-gray-900 line-clamp-1">{inquiry.subject}</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{inquiry.content}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(inquiry.category)} variant="outline">
                          {inquiry.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(inquiry.status)} variant="outline">
                          {inquiry.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {new Date(inquiry.createdAt).toLocaleDateString('ko-KR')}
                        </span>
                      </TableCell>
                      <TableCell>
                        {inquiry.answeredAt ? (
                          <span className="text-sm text-gray-600">
                            {new Date(inquiry.answeredAt).toLocaleDateString('ko-KR')}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300"
                            onClick={() => handleViewInquiry(inquiry)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            상세
                          </Button>
                          {inquiry.status === '답변대기' && (
                            <Button
                              size="sm"
                              className="bg-pink-600 hover:bg-pink-700 text-white"
                              onClick={() => handleAnswerInquiry(inquiry)}
                            >
                              <MessageCircle className="w-3 h-3 mr-1" />
                              답변
                            </Button>
                          )}
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