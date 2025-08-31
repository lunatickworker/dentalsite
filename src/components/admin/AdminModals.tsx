import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { 
  X, User, Phone, Mail, Calendar, MapPin, Award, Star,
  CheckCircle, XCircle, MessageSquare, Edit, Save
} from 'lucide-react';
import { useAdmin, Member, Doctor, Inquiry, Review } from '../../contexts/AdminContext';

export default function AdminModals() {
  const { state, dispatch } = useAdmin();
  const { modal } = state;

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const renderMemberModal = () => {
    const member = modal.data as Member;
    const isEdit = modal.type === 'member-edit';
    const isView = modal.type === 'member-view';

    return (
      <Dialog open={modal.isOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>{isEdit ? '회원 정보 수정' : isView ? '회원 상세 정보' : '새 회원 추가'}</span>
            </DialogTitle>
            <DialogDescription>
              {isEdit ? '회원 정보를 수정합니다.' : isView ? '회원의 상세 정보를 확인합니다.' : '새로운 회원을 등록합니다.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input 
                  id="name" 
                  defaultValue={member?.name} 
                  readOnly={isView}
                  className={isView ? 'bg-gray-50' : ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">성별</Label>
                <Select defaultValue={member?.gender} disabled={isView}>
                  <SelectTrigger className={isView ? 'bg-gray-50' : ''}>
                    <SelectValue placeholder="성별 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="남성">남성</SelectItem>
                    <SelectItem value="여성">여성</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">전화번호</Label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                  <Input 
                    id="phone" 
                    defaultValue={member?.phone}
                    readOnly={isView}
                    className={`pl-10 ${isView ? 'bg-gray-50' : ''}`}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                  <Input 
                    id="email" 
                    defaultValue={member?.email}
                    readOnly={isView}
                    className={`pl-10 ${isView ? 'bg-gray-50' : ''}`}
                  />
                </div>
              </div>
            </div>

            {isView && member && (
              <>
                {/* Treatment History */}
                <div className="space-y-3">
                  <Label>치료 이력</Label>
                  <div className="flex flex-wrap gap-2">
                    {member.treatments.map((treatment, index) => (
                      <Badge key={index} variant="outline" className="text-blue-600">
                        {treatment}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Visit Statistics */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{member.totalVisits}</p>
                    <p className="text-sm text-gray-600">총 방문횟수</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{member.totalAmount.toLocaleString()}원</p>
                    <p className="text-sm text-gray-600">누적 치료비</p>
                  </div>
                  <div className="text-center">
                    <Badge className={member.status === '활성' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {member.status}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">상태</p>
                  </div>
                </div>
              </>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">메모</Label>
              <Textarea 
                id="notes" 
                defaultValue={member?.notes}
                readOnly={isView}
                className={isView ? 'bg-gray-50' : ''}
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={closeModal}>
              {isView ? '닫기' : '취소'}
            </Button>
            {!isView && (
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                {isEdit ? '수정' : '추가'}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const renderInquiryModal = () => {
    const inquiry = modal.data as Inquiry;
    const isView = modal.type === 'inquiry-view';
    const isAnswer = modal.type === 'inquiry-answer';

    return (
      <Dialog open={modal.isOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>{isAnswer ? '문의 답변' : '문의 상세정보'}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Inquiry Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>문의자</Label>
                <p className="p-2 bg-gray-50 rounded">{inquiry?.name}</p>
              </div>
              <div className="space-y-2">
                <Label>연락처</Label>
                <p className="p-2 bg-gray-50 rounded">{inquiry?.phone}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>제목</Label>
              <p className="p-2 bg-gray-50 rounded">{inquiry?.subject}</p>
            </div>

            <div className="space-y-2">
              <Label>문의 내용</Label>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="whitespace-pre-wrap">{inquiry?.content}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>분류</Label>
                <Badge variant="outline">{inquiry?.category}</Badge>
              </div>
              <div className="space-y-2">
                <Label>상태</Label>
                <Badge className={inquiry?.status === '답변완료' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                  {inquiry?.status}
                </Badge>
              </div>
            </div>

            {/* Answer Section */}
            {isAnswer && (
              <div className="space-y-2">
                <Label htmlFor="answer">답변 내용</Label>
                <Textarea 
                  id="answer"
                  placeholder="고객에게 보낼 답변을 작성해주세요..."
                  rows={6}
                  className="resize-none"
                />
              </div>
            )}

            {inquiry?.answer && (
              <div className="space-y-2">
                <Label>답변 내용</Label>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="whitespace-pre-wrap">{inquiry.answer}</p>
                  <div className="mt-2 text-sm text-gray-600">
                    답변일: {inquiry.answeredAt}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={closeModal}>
              닫기
            </Button>
            {isAnswer && (
              <Button className="bg-blue-600 hover:bg-blue-700">
                <MessageSquare className="w-4 h-4 mr-2" />
                답변 전송
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const renderReviewModal = () => {
    const review = modal.data as Review;
    const isReject = modal.type === 'review-reject';

    const renderStars = (rating: number) => (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );

    return (
      <Dialog open={modal.isOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>{isReject ? '후기 승인 거부' : '후기 상세정보'}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Review Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>환자</Label>
                <p className="p-2 bg-gray-50 rounded">{review?.patientName}</p>
              </div>
              <div className="space-y-2">
                <Label>담당의</Label>
                <p className="p-2 bg-gray-50 rounded">{review?.doctorName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>치료 내용</Label>
                <Badge variant="outline">{review?.service}</Badge>
              </div>
              <div className="space-y-2">
                <Label>평점</Label>
                {review && renderStars(review.rating)}
              </div>
            </div>

            <div className="space-y-2">
              <Label>후기 내용</Label>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="whitespace-pre-wrap">{review?.content}</p>
              </div>
            </div>

            {isReject && (
              <div className="space-y-2">
                <Label htmlFor="rejectReason">거부 사유</Label>
                <Textarea 
                  id="rejectReason"
                  placeholder="후기 승인을 거부하는 사유를 입력해주세요..."
                  rows={4}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>관리자 메모</Label>
              <Textarea 
                defaultValue={review?.adminNotes}
                placeholder="관리자 전용 메모..."
                rows={2}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={closeModal}>
              취소
            </Button>
            {isReject ? (
              <Button variant="destructive">
                <XCircle className="w-4 h-4 mr-2" />
                승인 거부
              </Button>
            ) : (
              <Button className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                승인
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  // Render appropriate modal based on type
  if (!modal.isOpen) return null;

  switch (modal.type) {
    case 'member-add':
    case 'member-edit':
    case 'member-view':
      return renderMemberModal();
    case 'inquiry-view':
    case 'inquiry-answer':
      return renderInquiryModal();
    case 'review-view':
    case 'review-reject':
      return renderReviewModal();
    default:
      return null;
  }
}