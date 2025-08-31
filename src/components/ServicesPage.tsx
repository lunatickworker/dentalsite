import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CheckCircle, Clock, Star, ArrowRight, Shield, Award } from 'lucide-react';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const mainServices = [
    {
      id: 'implant',
      title: '임플란트',
      description: '자연치아와 같은 기능과 심미성을 제공하는 임플란트 치료',
      icon: '🦷',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      price: '1,200,000원~',
      duration: '3-6개월',
      image: 'https://images.unsplash.com/photo-1729870992116-5f1f59feb4ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBpbXBsYW50JTIweHJheXxlbnwxfHx8fDE3NTYzNDMzNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      subServices: [
        {
          name: '일반 임플란트',
          description: '단일 치아 결손 시 시행하는 기본 임플란트',
          price: '1,200,000원',
          features: ['티타늄 픽스처 사용', '세라믹 크라운', '10년 보증']
        },
        {
          name: '즉시 임플란트',
          description: '발치와 동시에 임플란트를 식립하는 치료',
          price: '1,500,000원',
          features: ['발치 즉시 식립', '치료 기간 단축', '임시 보철 제공']
        },
        {
          name: '무치악 임플란트',
          description: '전체 치아가 없는 경우의 임플란트 치료',
          price: '8,000,000원',
          features: ['올온포 방식', 'CT 가이드 수술', '당일 임시 보철']
        }
      ]
    },
    {
      id: 'orthodontics',
      title: '교정치료',
      description: '투명교정, 브라켓교정 등 다양한 교정 치료 옵션',
      icon: '📐',
      color: 'bg-green-50 text-green-600 border-green-200',
      price: '3,000,000원~',
      duration: '18-36개월',
      image: 'https://images.unsplash.com/photo-1684607631635-44399dee5ac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhdGllbnQlMjBkZW50YWx8ZW58MXx8fHwxNzU2MzQzMzc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      subServices: [
        {
          name: '투명교정 (인비절라인)',
          description: '탈착 가능한 투명한 교정장치',
          price: '4,500,000원',
          features: ['심미적 우수', '탈착 가능', '3D 시뮬레이션']
        },
        {
          name: '세라믹 브라켓',
          description: '치아색과 유사한 세라믹 브라켓 교정',
          price: '3,500,000원',
          features: ['치아색 브라켓', '강한 접착력', '변색 방지']
        },
        {
          name: '메탈 브라켓',
          description: '일반적인 금속 브라켓 교정',
          price: '3,000,000원',
          features: ['경제적 비용', '강한 내구성', '빠른 치료']
        }
      ]
    },
    {
      id: 'aesthetic',
      title: '심미치료',
      description: '화이트닝, 라미네이트 등으로 아름다운 미소 연출',
      icon: '✨',
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      price: '300,000원~',
      duration: '1-4주',
      image: 'https://images.unsplash.com/photo-1684607631635-44399dee5ac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhdGllbnQlMjBkZW50YWx8ZW58MXx8fHwxNzU2MzQzMzc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      subServices: [
        {
          name: '전문가 화이트닝',
          description: '치과에서 시행하는 전문 화이트닝',
          price: '300,000원',
          features: ['즉시 효과', '안전한 시술', '지속적 관리']
        },
        {
          name: '포세린 라미네이트',
          description: '치아 앞면에 얇은 도자기 부착',
          price: '800,000원/개',
          features: ['자연스런 색상', '반영구적', '최소 삭제']
        },
        {
          name: '올세라믹 크라운',
          description: '금속 없는 100% 세라믹 크라운',
          price: '1,000,000원/개',
          features: ['금속 알레르기 없음', '투명도 우수', '생체 친화적']
        }
      ]
    },
    {
      id: 'general',
      title: '일반진료',
      description: '충치치료, 스케일링 등 기본적인 구강 건강 관리',
      icon: '🏥',
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      price: '50,000원~',
      duration: '30분-2시간',
      image: 'https://images.unsplash.com/photo-1631596577204-53ad0d6e6978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MzQzMzc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      subServices: [
        {
          name: '충치 치료',
          description: '초기 충치부터 신경치료까지',
          price: '100,000원~',
          features: ['무통 치료', '당일 완료', '자연스런 복구']
        },
        {
          name: '스케일링',
          description: '치석 제거 및 잇몸 관리',
          price: '50,000원',
          features: ['연 1회 보험 적용', '잇몸 건강 개선', '구취 제거']
        },
        {
          name: '신경치료',
          description: '치아 신경이 손상된 경우의 치료',
          price: '200,000원~',
          features: ['치아 보존', '현미경 사용', '정밀 치료']
        }
      ]
    }
  ];

  const benefits = [
    {
      icon: <Award className="w-6 h-6" />,
      title: '전문의 진료',
      description: '각 분야별 전문의가 직접 진료합니다'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: '안전한 치료',
      description: '철저한 멸균과 감염 관리 시스템'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: '최신 기술',
      description: '첨단 장비와 최신 치료 기법 도입'
    }
  ];

  const ServiceDetailModal = ({ service }: { service: any }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{service.title} 상세 정보</h2>
            <Button 
              variant="outline" 
              onClick={() => setSelectedService(null)}
            >
              닫기
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <ImageWithFallback
                src={service.image}
                alt={service.title}
                className="rounded-lg w-full aspect-video object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className={`text-2xl p-3 rounded-full ${service.color}`}>
                  {service.icon}
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">치료 비용</div>
                  <div className="font-semibold text-lg">{service.price}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">치료 기간</div>
                  <div className="font-semibold text-lg">{service.duration}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 세부 치료 옵션 */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">세부 치료 옵션</h3>
            <div className="grid gap-6">
              {service.subServices.map((subService: any, index: number) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {subService.name}
                        </h4>
                        <p className="text-gray-600 mb-3">{subService.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-blue-600">
                          {subService.price}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-900">포함 사항:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {subService.features.map((feature: string, featureIndex: number) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              상담 예약하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-4">
              ✨ 전문 진료과목
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              당신의 구강 건강을 위한<br />
              <span className="text-blue-600">전문 치료 서비스</span>
            </h1>
            <p className="text-xl text-gray-600">
              각 분야별 전문의가 최신 장비와 기술로<br />
              최고의 치료 결과를 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              주요 진료과목
            </h2>
            <p className="text-xl text-gray-600">
              전문적이고 체계적인 치료 시스템으로 최고의 결과를 제공합니다
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {mainServices.map((service) => (
              <Card 
                key={service.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
                onClick={() => setSelectedService(service.id)}
              >
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className={`p-3 rounded-full border-2 ${service.color}`}>
                      <span className="text-2xl">{service.icon}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">시작가격</span>
                            <span className="font-semibold text-blue-600">{service.price}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">{service.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-gray-500">
                        {service.subServices.length}개의 세부 치료 옵션
                      </div>
                      <Button variant="outline" size="sm">
                        자세히 보기 <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              치료 과정
            </h2>
            <p className="text-xl text-gray-600">
              체계적이고 안전한 치료 과정을 통해 최고의 결과를 제공합니다
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: '상담 및 검진', desc: '정밀 검사를 통한 정확한 진단' },
              { step: '02', title: '치료 계획', desc: '개인 맞춤형 치료 계획 수립' },
              { step: '03', title: '치료 시행', desc: '최신 장비로 안전한 치료 진행' },
              { step: '04', title: '사후 관리', desc: '정기 검진을 통한 지속적 관리' }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {process.title}
                </h3>
                <p className="text-gray-600">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            전문적인 치료가 필요하시다면
          </h2>
          <p className="text-xl mb-8 opacity-90">
            지금 바로 상담을 예약하고 건강한 미소를 되찾으세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              온라인 상담 예약
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              전화 상담: 02-1234-5678
            </Button>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal 
          service={mainServices.find(s => s.id === selectedService)} 
        />
      )}
    </div>
  );
}