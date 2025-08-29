import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Phone, Mail, Clock, Users, Award, Eye, Calendar, CheckCircle, Star, Shield, Heart, Zap, Target, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Breadcrumb, { getBreadcrumbForPage } from './Breadcrumb';

interface AboutPageProps {
  currentTab?: string;
  onPageChange?: (page: string) => void;
}

export default function AboutPage({ currentTab = 'intro', onPageChange }: AboutPageProps) {
  // 시설 탭이 제거되어 항상 intro 탭만 표시
  const [activeTab, setActiveTab] = useState('intro');

  const renderIntroContent = () => (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Breadcrumb 
              items={getBreadcrumbForPage('about')} 
              onPageChange={onPageChange || (() => {})} 
            />
          </div>

          <div>
            <div className="mb-6">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                병원소개
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              병원 소개
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              환자의 건강한 미소를 위해 최선을 다하는 믿음치과입니다
            </p>

            {/* Key Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Award className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold">운영 기간</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">20년+</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Users className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold">치료 사례</span>
                </div>
                <div className="text-2xl font-bold text-green-600">5,000+</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="font-semibold">환자 만족도</span>
                </div>
                <div className="text-2xl font-bold text-yellow-600">98%</div>
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
              {/* Main Image */}
              <div className="aspect-video rounded-xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZW50YWwlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTYyNzkzODd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="믿음치과 병원 내부"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">병원 개요</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  믿음치과는 최신 의료 기술과 풍부한 경험을 바탕으로 환자 한 분 한 분께 최고의 치료를 제공합니다. 
                  20년 이상의 경험을 가진 전문의료진과 최첨단 장비로 안전하고 정확한 치료를 약속드립니다.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  환자의 구강 건강을 최우선으로 생각하며, 개인별 맞춤 치료 계획을 통해 최상의 결과를 제공하고 있습니다. 
                  철저한 멸균 시스템과 체계적인 감염 관리로 안전한 치료 환경을 유지하고 있습니다.
                </p>
              </div>

              {/* Mission & Vision */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="shadow-sm border border-gray-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-blue-900">우리의 사명</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      환자의 구강 건강을 최우선으로 하며, 최신 의료 기술과 따뜻한 마음으로 
                      모든 환자분께 최고의 치료 서비스를 제공합니다.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        환자 중심의 맞춤형 치료
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        최신 장비와 기술 활용
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        안전하고 편안한 치료 환경
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border border-gray-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-purple-900">우리의 비전</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      지역 사회에서 가장 신뢰받는 치과로 성장하여, 
                      모든 환자분이 건강하고 아름다운 미소를 가질 수 있도록 돕겠습니다.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-700">
                        <Star className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" />
                        지역 최고의 치과 병원
                      </li>
                      <li className="flex items-center text-gray-700">
                        <Star className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" />
                        환자 만족도 최우선
                      </li>
                      <li className="flex items-center text-gray-700">
                        <Star className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" />
                        지속적인 기술 발전
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Core Values */}
              <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle>핵심 가치</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">정성과 배려</h3>
                      <p className="text-gray-600 text-sm">
                        환자 한 분 한 분을 가족처럼 생각하며, 진심어린 마음으로 치료합니다.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">혁신과 발전</h3>
                      <p className="text-gray-600 text-sm">
                        끊임없는 연구와 학습으로 최신 치료 기술을 도입합니다.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">신뢰와 안전</h3>
                      <p className="text-gray-600 text-sm">
                        철저한 멸균과 안전 관리로 믿을 수 있는 치료를 제공합니다.
                      </p>
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
                  <CardTitle className="text-blue-900">상담 예약</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-blue-800 text-sm">
                    믿음치과에 대해 더 궁금하신 점이 있으시면 언제든 연락주세요.
                  </p>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => onPageChange?.('appointment')}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    상담 예약하기
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open('tel:031-651-3054')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    전화: 031-651-3054
                  </Button>
                </CardContent>
              </Card>

              {/* Hospital Info */}
              <Card>
                <CardHeader>
                  <CardTitle>병원 정보</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">설립년도</span>
                      <span className="font-medium">2004년</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">의료진</span>
                      <span className="font-medium">3명</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">진료과목</span>
                      <span className="font-medium">4개 과목</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">주차시설</span>
                      <span className="font-medium">완비</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Pages */}
              <Card>
                <CardHeader>
                  <CardTitle>관련 페이지</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <button
                      onClick={() => onPageChange?.('doctors')}
                      className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                            의료진 소개
                          </h4>
                          <p className="text-sm text-gray-500">전문의료진 프로필</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                      </div>
                    </button>
                    <button
                      onClick={() => onPageChange?.('gallery')}
                      className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                            병원시설
                          </h4>
                          <p className="text-sm text-gray-500">시설 사진 갤러리</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                      </div>
                    </button>
                    <button
                      onClick={() => onPageChange?.('location')}
                      className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                            찾아오시는 길
                          </h4>
                          <p className="text-sm text-gray-500">위치 및 교통정보</p>
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
            믿음치과와 함께하세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            20년 경험의 전문의료진이 여러분의 건강한 미소를 책임지겠습니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => onPageChange?.('appointment')}
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

  // 시설 탭이 제거되어 항상 intro 탭만 렌더링
  return renderIntroContent();
}