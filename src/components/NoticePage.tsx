import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  MessageSquare, Clock, Eye, ChevronRight, MessageCircle
} from 'lucide-react';
import Breadcrumb, { getBreadcrumbForPage } from './Breadcrumb';

interface NoticePageProps {
  onPageChange: (page: string) => void;
  notices?: any[];
}

export default function NoticePage({ onPageChange, notices = [] }: NoticePageProps) {
  const [selectedType, setSelectedType] = useState('all');
  
  const defaultNotices = [
    {
      id: 1,
      title: '연말연시 진료 안내',
      content: '12월 30일부터 1월 2일까지 휴진합니다. 응급환자는 응급실로 연락해 주세요.',
      type: '일반',
      date: '2024.12.25',
      views: 156,
      priority: '높음',
      author: '관리자'
    },
    {
      id: 2,
      title: '임플란트 특별 이벤트 안내',
      content: '1월 한달간 임플란트 특별 할인 이벤트를 진행합니다. 최대 30% 할인 혜택을 제공해드립니다.',
      type: '이벤트',
      date: '2024.12.20',
      views: 324,
      priority: '높음',
      author: '관리자'
    },
    {
      id: 3,
      title: '새로운 진료 장비 도입 안내',
      content: '최신 3D CT 및 디지털 구강 스캐너를 도입하여 더욱 정확한 진단과 치료가 가능합니다.',
      type: '일반',
      date: '2024.12.15',
      views: 89,
      priority: '보통',
      author: '관리자'
    },
    {
      id: 4,
      title: 'MBC 뉴스 치과 인터뷰 방송',
      content: '오진수 원장님이 MBC 뉴스에서 최신 임플란트 치료법에 대해 인터뷰했습니다.',
      type: '언론',
      date: '2024.12.10',
      views: 245,
      priority: '보통',
      author: '관리자'
    },
    {
      id: 5,
      title: '신규 의료진 영입 안내',
      content: '소아치과 전문의 박현우 원장님이 새롭게 합류하셨습니다.',
      type: '일반',
      date: '2024.12.05',
      views: 127,
      priority: '보통',
      author: '관리자'
    },
    {
      id: 6,
      title: '겨울철 구강 관리 특강 안내',
      content: '겨울철 건조한 날씨로 인한 구강 건조증 예방법에 대한 특강을 진행합니다.',
      type: '이벤트',
      date: '2024.11.28',
      views: 178,
      priority: '보통',
      author: '관리자'
    },
    {
      id: 7,
      title: '치아미백 프로모션 진행',
      content: '결혼시즌을 맞아 치아미백 시술 20% 할인 이벤트를 진행합니다.',
      type: '이벤트',
      date: '2024.11.20',
      views: 412,
      priority: '높음',
      author: '관리자'
    },
    {
      id: 8,
      title: 'KBS 건강프로그램 출연',
      content: '김민지 원장님이 KBS 건강프로그램에서 교정치료에 대해 설명했습니다.',
      type: '언론',
      date: '2024.11.15',
      views: 298,
      priority: '보통',
      author: '관리자'
    }
  ];

  const noticesData = notices.length > 0 ? notices : defaultNotices;

  const types = [
    { id: 'all', name: '전체', count: noticesData.length },
    { id: '일반', name: '일반공지', count: noticesData.filter(n => n.type === '일반').length },
    { id: '이벤트', name: '이벤트', count: noticesData.filter(n => n.type === '이벤트').length },
    { id: '언론', name: '언론보도', count: noticesData.filter(n => n.type === '언론').length }
  ];

  const filteredNotices = selectedType === 'all' 
    ? noticesData 
    : noticesData.filter(notice => notice.type === selectedType);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Breadcrumb 
              items={getBreadcrumbForPage('notice')} 
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
              공지사항
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              믿음치과의 소식과 공지사항을 확인하세요
            </p>

            {/* Key Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold">총 공지</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{noticesData.length}건</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold">최신 업데이트</span>
                </div>
                <div className="text-2xl font-bold text-green-600">오늘</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Eye className="w-5 h-5 text-orange-600 mr-2" />
                  <span className="font-semibold">총 조회수</span>
                </div>
                <div className="text-2xl font-bold text-orange-600">{noticesData.reduce((sum, n) => sum + n.views, 0).toLocaleString()}</div>
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
              {/* 타입 필터 */}
              <div className="flex justify-center">
                <div className="flex space-x-2 bg-white rounded-xl p-2 shadow-lg border border-blue-100">
                  {types.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        selectedType === type.id
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                          : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                      }`}
                    >
                      {type.name}
                      <span className="ml-2 text-sm opacity-75">({type.count})</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Notice List */}
              <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {filteredNotices.map((notice) => (
                      <div 
                        key={notice.id} 
                        className="flex items-center justify-between p-6 border border-blue-100 hover:bg-blue-50 cursor-pointer rounded-xl transition-all duration-200 hover:shadow-md group"
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="flex items-center space-x-3">
                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                              notice.type === '이벤트' ? 'bg-red-100 text-red-600 border border-red-200' :
                              notice.type === '언론' ? 'bg-purple-100 text-purple-600 border border-purple-200' :
                              'bg-blue-100 text-blue-600 border border-blue-200'
                            }`}>
                              {notice.type}
                            </span>
                            {notice.priority === '높음' && (
                              <Badge className="bg-red-500 text-white">
                                중요
                              </Badge>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                              {notice.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                              {notice.content}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{notice.views}</span>
                          </div>
                          <span>{notice.date}</span>
                          <ChevronRight className="w-4 h-4 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 페이지네이션 */}
                  <div className="flex justify-center mt-12">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" disabled>
                        이전
                      </Button>
                      <Button size="sm" className="bg-blue-600 text-white">
                        1
                      </Button>
                      <Button variant="outline" size="sm">
                        2
                      </Button>
                      <Button variant="outline" size="sm">
                        3
                      </Button>
                      <Button variant="outline" size="sm">
                        다음
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <Card className="bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-900">빠른 문의</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-blue-800 text-sm">
                    궁금한 점이 있으시면 언제든 연락주세요.
                  </p>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => onPageChange('contact')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    상담 문의
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open('tel:031-651-3054')}
                  >
                    전화: 031-651-3054
                  </Button>
                </CardContent>
              </Card>

              {/* Notice Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>공지 통계</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">일반공지</span>
                      <span className="font-medium">{types.find(t => t.id === '일반')?.count}건</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">이벤트</span>
                      <span className="font-medium">{types.find(t => t.id === '이벤트')?.count}건</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">언론보도</span>
                      <span className="font-medium">{types.find(t => t.id === '언론')?.count}건</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Popular Posts */}
              <Card>
                <CardHeader>
                  <CardTitle>인기 공지</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {noticesData.slice(0, 3).sort((a, b) => b.views - a.views).map((notice) => (
                      <div
                        key={notice.id}
                        className="p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                          {notice.title}
                        </h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">{notice.date}</span>
                          <div className="flex items-center text-xs text-gray-500">
                            <Eye className="w-3 h-3 mr-1" />
                            {notice.views}
                          </div>
                        </div>
                      </div>
                    ))}
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
            궁금한 점이 있으신가요?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            언제든지 편하게 문의해 주세요. 친절하게 안내해드리겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => onPageChange('contact')}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              상담 문의
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