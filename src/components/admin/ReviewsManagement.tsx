import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Star, Search, Filter, Eye, CheckCircle, XCircle, AlertCircle,
  ThumbsUp, MessageSquare, Calendar, TrendingUp
} from 'lucide-react';
import { useAdmin, Review } from '../../contexts/AdminContext';

interface ReviewsManagementProps {
  reviews: Review[];
  onUpdate: (reviews: Review[]) => void;
}

export default function ReviewsManagement({ reviews: propReviews, onUpdate }: ReviewsManagementProps) {
  const { state, dispatch } = useAdmin();
  const { filters, loading } = state;
  const reviews = propReviews || state.reviews;
  const reviewFilters = filters.reviews;

  // 필터링된 후기 목록
  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      const matchesSearch = reviewFilters.searchTerm === '' || 
        review.patientName.toLowerCase().includes(reviewFilters.searchTerm.toLowerCase()) ||
        review.service.toLowerCase().includes(reviewFilters.searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(reviewFilters.searchTerm.toLowerCase()) ||
        review.doctorName.toLowerCase().includes(reviewFilters.searchTerm.toLowerCase());
      
      const matchesStatus = reviewFilters.status === 'all' || review.status === reviewFilters.status;
      const matchesRating = reviewFilters.rating === 'all' || review.rating.toString() === reviewFilters.rating;
      
      return matchesSearch && matchesStatus && matchesRating;
    }).sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [reviews, reviewFilters]);

  // 통계 계산
  const stats = useMemo(() => {
    const total = reviews.length;
    const pending = reviews.filter(r => r.status === '승인대기').length;
    const approved = reviews.filter(r => r.status === '승인완료').length;
    const avgRating = total > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / total
      : 0;

    return { 
      total, 
      pending, 
      approved, 
      avgRating: Math.round(avgRating * 10) / 10 
    };
  }, [reviews]);

  const getStatusColor = (status: string) => {
    const colors = {
      '승인대기': 'bg-orange-100 text-orange-800',
      '승인완료': 'bg-green-100 text-green-800',
      '승인거부': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  const handleSearchChange = (value: string) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      payload: { section: 'reviews', filters: { searchTerm: value } }
    });
  };

  const handleStatusFilter = (value: string) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      payload: { section: 'reviews', filters: { status: value } }
    });
  };

  const handleRatingFilter = (value: string) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      payload: { section: 'reviews', filters: { rating: value } }
    });
  };

  const handleViewReview = (review: Review) => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: { type: 'review-view', data: review }
    });
  };

  const handleApproveReview = (reviewId: number) => {
    dispatch({ type: 'APPROVE_REVIEW', payload: reviewId });
  };

  const handleRejectReview = (review: Review) => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: { type: 'review-reject', data: review }
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
      <div className="bg-white rounded-2xl shadow-lg border border-yellow-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent flex items-center">
              <Star className="w-6 h-6 mr-3 text-yellow-600" />
              후기 관리
            </h2>
            <p className="text-gray-600 mt-2">고객 후기를 승인하고 관리하세요</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-yellow-200 hover:bg-yellow-50">
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
                <p className="text-sm text-blue-700 font-medium">전체 후기</p>
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
                <p className="text-sm text-orange-700 font-medium">승인 대기</p>
                <p className="text-2xl font-bold text-orange-800">{stats.pending}건</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">승인 완료</p>
                <p className="text-2xl font-bold text-green-800">{stats.approved}건</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 font-medium">평균 평점</p>
                <div className="flex items-center space-x-1">
                  <p className="text-2xl font-bold text-yellow-800">{stats.avgRating}</p>
                  <Star className="w-5 h-5 text-yellow-600 fill-current" />
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-600" />
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
                placeholder="환자명, 치료내용, 의료진으로 검색..."
                value={reviewFilters.searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 border-yellow-200 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            
            <Select value={reviewFilters.status} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-full md:w-48 border-yellow-200">
                <SelectValue placeholder="상태별 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 상태</SelectItem>
                <SelectItem value="승인대기">승인 대기</SelectItem>
                <SelectItem value="승인완료">승인 완료</SelectItem>
                <SelectItem value="승인거부">승인 거부</SelectItem>
              </SelectContent>
            </Select>

            <Select value={reviewFilters.rating} onValueChange={handleRatingFilter}>
              <SelectTrigger className="w-full md:w-48 border-yellow-200">
                <SelectValue placeholder="평점별 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 평점</SelectItem>
                <SelectItem value="5">5점</SelectItem>
                <SelectItem value="4">4점</SelectItem>
                <SelectItem value="3">3점</SelectItem>
                <SelectItem value="2">2점</SelectItem>
                <SelectItem value="1">1점</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-100">
          <CardTitle className="text-yellow-800 flex items-center justify-between">
            <div className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              후기 목록 ({filteredReviews.length}건)
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-yellow-50">
                <TableRow>
                  <TableHead className="font-semibold text-yellow-800">환자 정보</TableHead>
                  <TableHead className="font-semibold text-yellow-800">치료 내용</TableHead>
                  <TableHead className="font-semibold text-yellow-800">평점</TableHead>
                  <TableHead className="font-semibold text-yellow-800">후기 내용</TableHead>
                  <TableHead className="font-semibold text-yellow-800">담당의</TableHead>
                  <TableHead className="font-semibold text-yellow-800">상태</TableHead>
                  <TableHead className="font-semibold text-yellow-800">작성일</TableHead>
                  <TableHead className="font-semibold text-yellow-800">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                      검색 조건에 맞는 후기가 없습니다.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReviews.map((review) => (
                    <TableRow key={review.id} className="hover:bg-yellow-50/30">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold">
                            {review.patientName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{review.patientName}</p>
                            <p className="text-sm text-gray-600">{review.patientInfo}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-blue-600 border-blue-200">
                          {review.service}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {renderStars(review.rating)}
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {review.content}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-medium text-gray-900">{review.doctorName}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(review.status)} variant="outline">
                          {review.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300"
                            onClick={() => handleViewReview(review)}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          {review.status === '승인대기' && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleApproveReview(review.id)}
                              >
                                <CheckCircle className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-300 text-red-600 hover:bg-red-50"
                                onClick={() => handleRejectReview(review)}
                              >
                                <XCircle className="w-3 h-3" />
                              </Button>
                            </>
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