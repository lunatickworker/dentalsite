import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Phone, Mail, MapPin, Clock, MessageSquare, MessageCircle, ArrowRight
} from 'lucide-react';
import Breadcrumb, { getBreadcrumbForPage } from './Breadcrumb';

interface ContactPageProps {
  onPageChange: (page: string) => void;
  onContactSubmit?: () => void;
}

export default function ContactPage({ onPageChange, onContactSubmit }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
    contactMethod: 'phone'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.');
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      message: '',
      contactMethod: 'phone'
    });
    onContactSubmit?.();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Breadcrumb 
              items={getBreadcrumbForPage('contact')} 
              onPageChange={onPageChange} 
            />
          </div>

          <div>
            <div className="mb-6">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                상담 · 예약
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              상담 · 문의
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              언제든지 편하게 연락주세요. 전문 상담원이 친절하게 안내해드리겠습니다.
            </p>

            {/* Key Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Phone className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold">전화 상담</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">031-651-3054</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold">상담 시간</span>
                </div>
                <div className="text-2xl font-bold text-green-600">09-18시</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <MessageCircle className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-semibold">응답 시간</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">24시간</div>
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
              {/* 연락처 정보 */}
              <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center">
                    <Phone className="w-6 h-6 mr-3" />
                    연락처 정보
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">전화 상담</h3>
                        <p className="text-blue-600 font-bold text-lg">031-651-3054</p>
                        <p className="text-sm text-gray-600 mt-2">
                          평일 09:00~18:00<br />토요일 09:00~13:00
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">카카오톡 상담</h3>
                        <p className="text-green-600 font-bold">@믿음치과</p>
                        <p className="text-sm text-gray-600 mt-2">
                          24시간 문의 가능<br />실시간 답변
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">이메일 문의</h3>
                        <p className="text-purple-600 font-bold">info@faith-dental.com</p>
                        <p className="text-sm text-gray-600 mt-2">
                          상세한 상담 내용<br />24시간 내 회신
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-xl">
                      <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">병원 위치</h3>
                        <p className="text-gray-700 font-medium">경기도 평택시 평택로 102, 3층</p>
                        <Button 
                          size="sm" 
                          onClick={() => onPageChange('location')}
                          className="mt-2 bg-orange-600 hover:bg-orange-700 text-white"
                        >
                          오시는 길 보기
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 온라인 상담 신청 폼 */}
              <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center">
                    <MessageSquare className="w-6 h-6 mr-3" />
                    온라인 상담 신청
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-blue-700 font-medium">이름 *</Label>
                        <Input 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="border-blue-200 focus:border-blue-500"
                          placeholder="이름을 입력하세요"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-blue-700 font-medium">연락처 *</Label>
                        <Input 
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="border-blue-200 focus:border-blue-500"
                          placeholder="010-0000-0000"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-blue-700 font-medium">이메일</Label>
                      <Input 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border-blue-200 focus:border-blue-500"
                        placeholder="example@email.com"
                      />
                    </div>

                    <div>
                      <Label className="text-blue-700 font-medium">상담 분야</Label>
                      <Select name="service" value={formData.service} onValueChange={(value) => setFormData(prev => ({...prev, service: value}))}>
                        <SelectTrigger className="border-blue-200 focus:border-blue-500">
                          <SelectValue placeholder="상담받고 싶은 분야를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="임플란트">임플란트</SelectItem>
                          <SelectItem value="교정치료">교정치료</SelectItem>
                          <SelectItem value="심미치료">심미치료</SelectItem>
                          <SelectItem value="일반진료">일반진료</SelectItem>
                          <SelectItem value="기타">기타</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-blue-700 font-medium">상담 내용</Label>
                      <Textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="border-blue-200 focus:border-blue-500 h-32"
                        placeholder="상담받고 싶은 내용을 자세히 입력해주세요"
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-4 text-lg font-semibold"
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      상담 신청하기
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <Card className="bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-900">빠른 상담</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => window.open('tel:031-651-3054')}
                    className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center"
                  >
                    <Phone className="w-6 h-6 mb-1" />
                    전화상담
                  </Button>
                  <Button 
                    onClick={() => window.open('https://pf.kakao.com/_faith_dental')}
                    className="w-full h-16 bg-yellow-500 hover:bg-yellow-600 text-white flex flex-col items-center justify-center"
                  >
                    <MessageCircle className="w-6 h-6 mb-1" />
                    카톡상담
                  </Button>
                </CardContent>
              </Card>

              {/* Operating Hours */}
              <Card>
                <CardHeader>
                  <CardTitle>진료시간 안내</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">평일</span>
                      <span className="font-medium">09:00~18:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">토요일</span>
                      <span className="font-medium">09:00~13:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">점심시간</span>
                      <span className="font-medium">13:00~14:00</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-red-600">일요일</span>
                      <span className="font-medium text-red-600">휴진</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Popular Treatments */}
              <Card>
                <CardHeader>
                  <CardTitle>상담 많은 치료</CardTitle>
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
            상담 신청 후 처리 과정
          </h2>
          <p className="text-xl mb-8 opacity-90">
            간단한 3단계로 전문적인 상담을 받아보세요
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">상담 신청</h4>
              <p className="text-blue-100 text-sm">온라인 또는 전화로 상담 신청</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">연락 및 상담</h4>
              <p className="text-blue-100 text-sm">24시간 내 연락드려 상담 진행</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">방문 예약</h4>
              <p className="text-blue-100 text-sm">편리한 시간에 방문 예약 진행</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}