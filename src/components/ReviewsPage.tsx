import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  User, Calendar, MessageSquare, Star, UserCheck,
  Stethoscope, ArrowRight
} from 'lucide-react';
import Breadcrumb, { getBreadcrumbForPage } from './Breadcrumb';

interface ReviewsPageProps {
  onPageChange: (page: string) => void;
  reviews?: any[];
  onReviewSubmit?: () => void;
}

export default function ReviewsPage({ onPageChange, reviews = [], onReviewSubmit }: ReviewsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    phone: '',
    service: '',
    rating: 5,
    comment: '',
    agreement: false
  });
  
  const defaultReviews = [
    { 
      id: 1, 
      patient: '김○○', 
      patientInfo: '50대 남성',
      service: '임플란트', 
      rating: 5, 
      comment: '정말 만족스러운 치료였습니다. 자연치아와 같은 느낌이에요! 의료진분들이 너무 친절하시고 꼼꼼하게 설명해주셔서 안심하고 치료받을 수 있었습니다. 다른 분들께도 적극 추천드립니다.', 
      date: '2024-12-28', 
      doctor: '오진수',
      images: ['before1.jpg', 'after1.jpg']
    },
    { 
      id: 2, 
      patient: '이○○', 
      patientInfo: '30대 여성',
      service: '투명교정', 
      rating: 5, 
      comment: '투명교정으로 불편함 없이 치료받았어요. 결과도 완벽해요. 직장생활 하면서도 전혀 티가 나지 않아서 좋았습니다. 김민지 원장님께서 세심하게 관리해주셔서 감사합니다.', 
      date: '2024-12-27', 
      doctor: '김민지',
      images: []
    },
    { 
      id: 3, 
      patient: '박○○', 
      patientInfo: '20대 여성',
      service: '치아미백', 
      rating: 5, 
      comment: '치아가 정말 하얘졌어요. 효과가 놀라워요! 시술 과정도 전혀 아프지 않았고, 결과에 매우 만족합니다. 결혼식 전에 받길 잘했어요.', 
      date: '2024-12-26', 
      doctor: '김민지',
      images: []
    },
    { 
      id: 4, 
      patient: '정○○', 
      patientInfo: '40대 남성',
      service: '스케일링', 
      rating: 4, 
      comment: '정기적으로 스케일링 받고 있는데 항상 깔끔하게 해주셔서 좋습니다. 구취도 많이 줄어들었어요. 6개월마다 꾸준히 받으니까 치아가 건강해지는 게 느껴집니다.', 
      date: '2024-12-25', 
      doctor: '박현우',
      images: []
    },
    { 
      id: 5, 
      patient: '윤○○', 
      patientInfo: '35세 여성',
      service: '임플란트', 
      rating: 5, 
      comment: '임플란트 수술이 두려웠는데 생각보다 아프지 않았고, 지금은 자연치아처럼 편하게 사용하고 있습니다. 음식도 맘껏 씹을 수 있어서 정말 만족해요.', 
      date: '2024-12-24', 
      doctor: '오진수',
      images: []
    },
    { 
      id: 6, 
      patient: '최○○', 
      patientInfo: '28세 여성',
      service: '라미네이트', 
      rating: 5, 
      comment: '앞니 색이 너무 신경 쓰였는데 라미네이트로 정말 자연스럽게 예뻐졌어요. 웃을 때 자신감이 생겼습니다.', 
      date: '2024-12-22', 
      doctor: '김민지',
      images: []
    },
    { 
      id: 7, 
      patient: '강○○', 
      patientInfo: '45세 남성',
      service: '신경치료', 
      rating: 4, 
      comment: '심한 충치로 신경치료를 받았는데 아픈 것 없이 잘 해주셨어요. 이제 통증이 완전히 사라졌습니다.', 
      date: '2024-12-20', 
      doctor: '박현우',
      images: []
    },
    { 
      id: 8, 
      patient: '송○○', 
      patientInfo: '32세 여성',
      service: '올세라믹', 
      rating: 5, 
      comment: '어금니 올세라믹 치료받았는데 색깔도 자연스럽고 잘 맞아요. 치료 과정도 편안했습니다.', 
      date: '2024-12-18', 
      doctor: '김민지',
      images: []
    },
    { 
      id: 9, 
      patient: '장○○', 
      patientInfo: '55세 남성',
      service: '틀니', 
      rating: 4, 
      comment: '부분틀니 제작했는데 잘 맞고 불편하지 않아요. 음식 섭취도 훨씬 편해졌습니다.', 
      date: '2024-12-15', 
      doctor: '박현우',
      images: []
    }
  ];

  const reviewsData = reviews.length > 0 ? reviews : defaultReviews;

  const categories = [
    { id: 'all', name: '전체', count: reviewsData.length },
    { id: '임플란트', name: '임플란트', count: reviewsData.filter(r => r.service.includes('임플란트')).length },
    { id: '교정', name: '교정치료', count: reviewsData.filter(r => r.service.includes('교정')).length },
    { id: '심미', name: '심미치료', count: reviewsData.filter(r => ['치아미백', '라미네이트', '올세라믹'].some(s => r.service.includes(s))).length },
    { id: '일반', name: '일반진료', count: reviewsData.filter(r => ['스케일링', '신경치료', '틀니'].some(s => r.service.includes(s))).length }
  ];

  const filteredReviews = selectedCategory === 'all' 
    ? reviewsData 
    : reviewsData.filter(review => {
        switch(selectedCategory) {
          case '임플란트': return review.service.includes('임플란트');
          case '교정': return review.service.includes('교정');
          case '심미': return ['치아미백', '라미네이트', '올세라믹'].some(s => review.service.includes(s));
          case '일반': return ['스케일링', '신경치료', '틀니'].some(s => review.service.includes(s));
          default: return true;
        }
      });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Breadcrumb 
              items={getBreadcrumbForPage('reviews')} 
              onPageChange={onPageChange} 
            />
          </div>

          <div>
            <div className="mb-6">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                커뮤니티
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              치료 후기
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              믿음치과에서 치료받은 환자분들의 생생한 경험담을 확인해보세요
            </p>

            {/* Key Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold">총 후기</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{reviewsData.length}건</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="font-semibold">평균 만족도</span>
                </div>
                <div className="text-2xl font-bold text-yellow-600">4.8점</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <UserCheck className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold">추천율</span>
                </div>
                <div className="text-2xl font-bold text-green-600">96%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* 카테고리 필터 */}
              <div className="flex justify-center">
                <div className="flex space-x-2 bg-white rounded-xl p-2 shadow-lg border border-blue-100">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                          : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                      }`}
                    >
                      {category.name}
                      <span className="ml-2 text-sm opacity-75">({category.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Form Section */}
              {showReviewForm && (
                <Card className="shadow-sm border border-blue-200 bg-blue-50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-900 flex items-center">
                        <MessageSquare className="w-6 h-6 mr-3" />
                        후기 작성하기
                      </CardTitle>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowReviewForm(false)}
                        className="border-blue-300 text-blue-700 hover:bg-blue-100"
                      >
                        취소
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!reviewForm.agreement) {
                        alert('개인정보 수집 및 이용에 동의해주세요.');
                        return;
                      }
                      alert('후기가 성공적으로 등록되었습니다. 검토 후 게시됩니다.');
                      setShowReviewForm(false);
                      setReviewForm({
                        name: '',
                        phone: '',
                        service: '',
                        rating: 5,
                        comment: '',
                        agreement: false
                      });
                      onReviewSubmit?.();
                    }} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-700 font-medium">이름 *</Label>
                          <Input 
                            value={reviewForm.name}
                            onChange={(e) => setReviewForm(prev => ({...prev, name: e.target.value}))}
                            placeholder="이름을 입력하세요"
                            className="bg-white border-blue-200 focus:border-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <Label className="text-gray-700 font-medium">연락처 *</Label>
                          <Input 
                            type="tel"
                            value={reviewForm.phone}
                            onChange={(e) => setReviewForm(prev => ({...prev, phone: e.target.value}))}
                            placeholder="010-0000-0000"
                            className="bg-white border-blue-200 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-gray-700 font-medium">치료받은 항목 *</Label>
                        <Select value={reviewForm.service} onValueChange={(value) => setReviewForm(prev => ({...prev, service: value}))}>
                          <SelectTrigger className="bg-white border-blue-200 focus:border-blue-500">
                            <SelectValue placeholder="치료받은 항목을 선택하세요" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="임플란트">임플란트</SelectItem>
                            <SelectItem value="투명교정">투명교정</SelectItem>
                            <SelectItem value="치아미백">치아미백</SelectItem>
                            <SelectItem value="라미네이트">라미네이트</SelectItem>
                            <SelectItem value="스케일링">스케일링</SelectItem>
                            <SelectItem value="신경치료">신경치료</SelectItem>
                            <SelectItem value="기타">기타</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-gray-700 font-medium">만족도 *</Label>
                        <div className="flex items-center space-x-2 mt-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => setReviewForm(prev => ({...prev, rating}))}
                              className={`p-1 ${rating <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                              <Star className="w-8 h-8 fill-current" />
                            </button>
                          ))}
                          <span className="ml-2 text-gray-600">({reviewForm.rating}점)</span>
                        </div>
                      </div>

                      <div>
                        <Label className="text-gray-700 font-medium">후기 내용 *</Label>
                        <Textarea 
                          value={reviewForm.comment}
                          onChange={(e) => setReviewForm(prev => ({...prev, comment: e.target.value}))}
                          placeholder="치료받으신 경험을 자세히 적어주세요. 다른 환자분들에게 도움이 되는 솔직한 후기를 부탁드립니다."
                          className="h-32 bg-white border-blue-200 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id="agreement"
                            checked={reviewForm.agreement}
                            onChange={(e) => setReviewForm(prev => ({...prev, agreement: e.target.checked}))}
                            className="mt-1"
                            required
                          />
                          <label htmlFor="agreement" className="text-sm text-gray-700">
                            개인정보 수집 및 이용에 동의합니다. 수집된 정보는 후기 게시 목적으로만 사용되며, 
                            게시 시 이름은 일부 마스킹되어 표시됩니다. (예: 김○○)
                          </label>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Button 
                          type="button"
                          variant="outline" 
                          className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-100"
                          onClick={() => setShowReviewForm(false)}
                        >
                          취소
                        </Button>
                        <Button 
                          type="submit"
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          후기 등록하기
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
              
              {/* Reviews Grid */}
              <div className="grid md:grid-cols-1 gap-6">
                {filteredReviews.map((review) => (
                  <Card key={review.id} className="bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{review.patient}</h3>
                            <p className="text-sm text-gray-500">{review.patientInfo}</p>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                          {review.service}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex text-yellow-400">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed mb-4">
                        "{review.comment}"
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <Stethoscope className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-600">담당의: {review.doctor}</span>
                        </div>
                        {review.images && review.images.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            사진 {review.images.length}장
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <Card className="bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-900">후기 작성하기</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-blue-800 text-sm">
                    치료받으신 경험을 다른 환자분들과 공유해주세요.
                  </p>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => setShowReviewForm(true)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    후기 작성하기
                  </Button>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>후기 통계</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">임플란트</span>
                      <span className="font-medium">{categories.find(c => c.id === '임플란트')?.count}건</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">교정치료</span>
                      <span className="font-medium">{categories.find(c => c.id === '교정')?.count}건</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">심미치료</span>
                      <span className="font-medium">{categories.find(c => c.id === '심미')?.count}건</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">일반진료</span>
                      <span className="font-medium">{categories.find(c => c.id === '일반')?.count}건</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Popular Services */}
              <Card>
                <CardHeader>
                  <CardTitle>인기 치료</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <button
                      onClick={() => onPageChange('implant-general')}
                      className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                            일반 임플란트
                          </h4>
                          <p className="text-sm text-gray-500">자연치아와 같은 기능</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                      </div>
                    </button>
                    <button
                      onClick={() => onPageChange('ortho-invisible')}
                      className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                            투명교정
                          </h4>
                          <p className="text-sm text-gray-500">눈에 띄지 않는 교정</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                      </div>
                    </button>
                    <button
                      onClick={() => onPageChange('aesthetic-whitening')}
                      className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                            치아미백
                          </h4>
                          <p className="text-sm text-gray-500">하얗고 밝은 치아</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                      </div>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            여러분도 만족스러운 치료를 경험해보세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            전문의와 직접 상담받으시고 개인별 맞춤 치료 계획을 세워보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => onPageChange('appointment')}
            >
              <Calendar className="w-5 h-5 mr-2" />
              무료 상담 예약하기
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => window.open('tel:031-651-3054')}
            >
              전화 상담: 031-651-3054
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}