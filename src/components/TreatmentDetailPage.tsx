import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Clock, Phone, CheckCircle, AlertTriangle, User, Calendar, Star, ArrowRight } from 'lucide-react';
import Breadcrumb, { getBreadcrumbForPage } from './Breadcrumb';

interface TreatmentDetailPageProps {
  treatmentId: string;
  onPageChange: (page: string) => void;
  cmsData?: any; // CMS에서 관리되는 데이터
}

export default function TreatmentDetailPage({ treatmentId, onPageChange, cmsData }: TreatmentDetailPageProps) {
  // 치료별 상세 정보 데이터
  const treatmentData: { [key: string]: any } = {
    'implant-general': {
      title: '일반 임플란트',
      category: '임플란트',
      subtitle: '자연치아와 같은 기능과 심미성을 제공하는 임플란트 치료',
      mainImage: 'https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZW50YWwlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTYyNzkzODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      overview: '임플란트는 손실된 치아를 대체하는 가장 이상적인 치료 방법입니다. 티타늄 소재의 인공치근을 잇몸뼈에 식립하여 자연치아와 같은 기능을 회복할 수 있습니다.',
      consultationInfo: '정확한 비용은 구강 상태 검사 후 안내드립니다',
      duration: '3-6개월',
      advantages: [
        '자연치아와 동일한 저작력',
        '반영구적 사용 가능',
        '인접한 건전한 치아 보존',
        '뛰어난 심미성',
        '편안한 착용감'
      ],
      process: [
        { step: 1, title: '정밀 검사 및 진단', desc: '3D CT 촬영을 통한 정확한 진단' },
        { step: 2, title: '치료 계획 수립', desc: '개인별 맞춤 치료 계획 설명' },
        { step: 3, title: '임플란트 식립', desc: '무통 마취 하에 임플란트 식립' },
        { step: 4, title: '골유착 기간', desc: '3-6개월간 잇몸뼈와 결합' },
        { step: 5, title: '보철물 제작', desc: '개인별 맞춤 크라운 제작 및 장착' }
      ],
      precautions: [
        '수술 후 2-3일간 부종이 있을 수 있습니다',
        '금연과 금주가 치유에 도움이 됩니다',
        '정기적인 검진이 필요합니다',
        '구강위생 관리가 중요합니다'
      ],
      faq: [
        {
          q: '임플란트 수술은 아픈가요?',
          a: '국소마취를 통해 수술 중 통증은 거의 없으며, 수술 후에도 처방된 진통제로 충분히 조절 가능합니다.'
        },
        {
          q: '임플란트는 얼마나 오래 사용할 수 있나요?',
          a: '적절한 관리 시 반영구적으로 사용 가능하며, 일반적으로 10년 이상 사용하시는 분들이 대부분입니다.'
        },
        {
          q: '임플란트 후 음식 제한이 있나요?',
          a: '초기 2-3개월은 딱딱한 음식을 피하시고, 이후에는 자연치아와 동일하게 모든 음식 섭취가 가능합니다.'
        }
      ]
    },
    'implant-immediate': {
      title: '즉시 임플란트',
      category: '임플란트',
      subtitle: '발치와 동시에 임플란트를 식립하는 원데이 치료',
      mainImage: 'https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZW50YWwlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTYyNzkzODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      overview: '발치와 동시에 임플란트를 식립하여 치료 기간을 단축하는 첨단 치료법입니다. 적절한 조건에서 시행될 경우 우수한 결과를 얻을 수 있습니다.',
      consultationInfo: '개인별 구강 상태에 따라 비용이 다르므로 상담 후 안내드립니다',
      duration: '1일 (식립), 3-4개월 (전체)',
      advantages: [
        '치료 기간 대폭 단축',
        '수술 횟수 최소화',
        '잇몸뼈 흡수 방지',
        '심미적 결과 우수',
        '환자 만족도 높음'
      ]
    },
    'ortho-invisible': {
      title: '투명교정 (인비절라인)',
      category: '교정치료',
      subtitle: '투명한 장치로 눈에 띄지 않는 교정 치료',
      mainImage: 'https://images.unsplash.com/photo-1684607631635-44399dee5ac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhdGllbnQlMjBkZW50YWx8ZW58MXx8fHwxNzU2MzQzMzc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      overview: '투명한 플라스틱 재질의 장치를 사용하여 눈에 띄지 않게 치아를 교정하는 치료법입니다. 사회생활에 지장 없이 교정 치료를 받을 수 있습니다.',
      consultationInfo: '치아 상태와 교정 범위에 따라 비용이 결정됩니다',
      duration: '12-24개월',
      advantages: [
        '거의 보이지 않는 투명한 장치',
        '탈착 가능하여 식사와 양치 편리',
        '금속 알레르기 걱정 없음',
        '구강위생 관리 용이',
        '사회생활에 지장 없음'
      ]
    }
  };

  // CMS 데이터가 있으면 우선 사용, 없으면 기본 데이터 사용
  const treatment = cmsData || treatmentData[treatmentId] || treatmentData['implant-general'];
  
  // 상담문의 정보 표시
  const consultationInfo = treatment.consultationInfo || '정확한 비용은 구강 상태 검사 후 안내드립니다';
  const consultationPhone = treatment.consultationPhone || '031-651-3054';

  const relatedTreatments = [
    { id: 'implant-immediate', title: '즉시 임플란트', category: '임플란트' },
    { id: 'implant-navigation', title: '네비게이션 임플란트', category: '임플란트' },
    { id: 'implant-allon4', title: 'All-on-4', category: '임플란트' }
  ];

  const doctorInfo = {
    name: '김믿음 원장',
    specialty: '임플란트 전문의',
    experience: '20년',
    image: 'https://images.unsplash.com/photo-1631596577204-53ad0d6e6978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MzQzMzc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Breadcrumb 
              items={getBreadcrumbForPage(treatmentId)} 
              onPageChange={onPageChange} 
            />
          </div>

          <div>
            <div className="mb-6">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                {treatment.category}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {treatment.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {treatment.subtitle}
            </p>

            {/* Key Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Phone className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold">치료 비용</span>
                </div>
                <div className="text-xl font-bold text-blue-600">상담문의</div>
                <div className="text-sm text-gray-600 mt-1">{consultationPhone}</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold">치료 기간</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{treatment.duration}</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="font-semibold">만족도</span>
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
          <div>
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Main Image */}
                <div className="aspect-video rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src={treatment.mainImage}
                    alt={treatment.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overview */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">치료 개요</h2>
                  {/* CMS 데이터의 content가 있으면 HTML로 렌더링, 없으면 기본 overview 사용 */}
                  {treatment.content ? (
                    <div 
                      className="text-lg text-gray-700 leading-relaxed prose max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: treatment.content
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
                          .replace(/\n/g, '<br />')
                      }} 
                    />
                  ) : (
                    <p className="text-lg text-gray-700 leading-relaxed">{treatment.overview}</p>
                  )}
                </div>

                {/* Advantages */}
                <Card>
                  <CardHeader>
                    <CardTitle>치료의 장점</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {treatment.advantages.map((advantage: string, index: number) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{advantage}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Treatment Process */}
                {treatment.process && (
                  <Card>
                    <CardHeader>
                      <CardTitle>치료 과정</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {treatment.process.map((step: any, index: number) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                              {step.step}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                              <p className="text-gray-600">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Precautions */}
                {treatment.precautions && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                        주의사항
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {treatment.precautions.map((precaution: string, index: number) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{precaution}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* FAQ */}
                {treatment.faq && (
                  <Card>
                    <CardHeader>
                      <CardTitle>자주 묻는 질문</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {treatment.faq.map((item: any, index: number) => (
                          <div key={index}>
                            <h3 className="font-semibold text-gray-900 mb-2">Q. {item.q}</h3>
                            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">A. {item.a}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Doctor Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>담당 의료진</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
                        <ImageWithFallback
                          src={doctorInfo.image}
                          alt={doctorInfo.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{doctorInfo.name}</h3>
                        <p className="text-blue-600">{doctorInfo.specialty}</p>
                        <p className="text-gray-600 text-sm">경력 {doctorInfo.experience}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => onPageChange('doctors')}
                      >
                        <User className="w-4 h-4 mr-2" />
                        의료진 상세보기
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Reservation */}
                <Card className="bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-blue-900">빠른 예약</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-blue-800 text-sm">
                        전문의와 직접 상담받으시고 맞춤형 치료 계획을 세워보세요.
                      </p>
                      <p className="text-gray-600 text-xs">
                        {consultationInfo}
                      </p>
                    </div>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => onPageChange('appointment')}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      온라인 예약하기
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.open(`tel:${consultationPhone}`)}
                    >
                      전화 상담: {consultationPhone}
                    </Button>
                  </CardContent>
                </Card>

                {/* Related Treatments */}
                <Card>
                  <CardHeader>
                    <CardTitle>관련 치료</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {relatedTreatments.map((related, index) => (
                        <button
                          key={index}
                          onClick={() => onPageChange(related.id)}
                          className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                                {related.title}
                              </h4>
                              <p className="text-sm text-gray-500">{related.category}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {treatment.title}에 대해 더 궁금하시나요?
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
              무료 상담 예약하기
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => window.open(`tel:${consultationPhone}`)}
            >
              전화 상담: {consultationPhone}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}