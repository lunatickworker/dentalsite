import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Logo from './Logo';

import { 
  Phone, MapPin, Clock, Calendar, Star, ChevronRight, ChevronLeft,
  Award, Shield, Heart, Users, CheckCircle, Stethoscope,
  Microscope, Activity, HeartHandshake, ArrowRight, PlayCircle,
  Mail, MessageCircle, Navigation, Building2
} from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export default function HomePage({ onPageChange }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 메인 슬라이더 데이터
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZW50YWwlMjBvZmZpY2UlMjBtb2Rlcm4lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTYzNjI3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "환자 중심의 정밀한 치료",
      subtitle: "첨단 장비와 풍부한 경험으로 안전하고 정확한 치료를 제공합니다",
      cta: "진료 예약하기",
      action: () => onPageChange('appointment')
    },
    {
      image: "https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZW50YWwlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTYyNzkzODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "쾌적하고 안전한 진료 환경",
      subtitle: "철저한 감염관리 시스템과 최신 의료 장비로 편안한 치료를 약속드립니다",
      cta: "시설 둘러보기",
      action: () => onPageChange('facilities')
    },
    {
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBlcXVpcG1lbnQlMjBtZWRpY2FsJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTYzNjA5OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "20년 경력의 전문 의료진",
      subtitle: "오랜 경험과 지속적인 연구로 최상의 치료 결과를 만들어 갑니다",
      cta: "의료진 소개",
      action: () => onPageChange('doctors')
    }
  ];

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // 주요 서비스
  const mainServices = [
    {
      id: 'implant-general',
      title: '임플란트',
      description: '자연치아와 같은 기능 회복',
      image: "https://images.unsplash.com/photo-1565090567208-c8038cfcf6cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZW50aXN0JTIwdHJlYXRtZW50fGVufDF8fHx8MTc1NjM2MDk4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ['디지털 임플란트', '즉시 임플란트', '네비게이션 임플란트']
    },
    {
      id: 'ortho-invisible',
      title: '교정치료',
      description: '아름다운 미소를 위한 치아교정',
      image: "https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZW50YWwlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTYyNzkzODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ['투명교정', '설측교정', '부분교정']
    },
    {
      id: 'aesthetic-whitening',
      title: '심미치료',
      description: '자연스럽고 아름다운 치아',
      image: "https://images.unsplash.com/photo-1600721187850-c944924fd48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjB3YWl0aW5nJTIwcm9vbXxlbnwxfHx8fDE3NTYzNTUxNDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ['치아미백', '라미네이트', '올세라믹']
    },
    {
      id: 'general-scaling',
      title: '일반진료',
      description: '건강한 치아 관리',
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBlcXVpcG1lbnQlMjBtZWRpY2FsJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTYzNjA5OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ['충치치료', '신경치료', '스케일링']
    }
  ];

  // 병원 특장점
  const hospitalFeatures = [
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "20년 경력",
      description: "풍부한 임상 경험으로 안전한 치료",
      stats: "15,000+ 케이스"
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-600" />,
      title: "안전한 치료",
      description: "철저한 멸균 시스템과 감염 관리",
      stats: "99.9% 안전율"
    },
    {
      icon: <Microscope className="w-8 h-8 text-purple-600" />,
      title: "첨단 장비",
      description: "최신 디지털 장비로 정밀 진료",
      stats: "5년 이내 최신 장비"
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-rose-600" />,
      title: "환자 중심",
      description: "개인별 맞춤 치료 계획 수립",
      stats: "만족도 98.7%"
    }
  ];

  // 의료진 정보
  const medicalTeam = [
    {
      name: '오진수',
      position: '대표원장',
      specialty: '임플란트 · 구강외과',
      education: '서울대학교 치과대학 졸업',
      experience: '20년 임상경험',
      image: 'https://images.unsplash.com/photo-1592393532405-fb1f165c4a1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBtZWRpY2FsJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2NDQxNDg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      certifications: ['대한치과임플란트학회 인정의', '구강외과 전문의'],
      type: 'doctor'
    },
    {
      name: '김민지',
      position: '교정과 전문의',
      specialty: '교정치료 · 심미치료',
      education: '연세대학교 치과대학 졸업',
      experience: '15년 임상경험',
      image: 'https://images.unsplash.com/photo-1740153204545-ac8320c44a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZlbWFsZSUyMGRlbnRpc3QlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY0NDE0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      certifications: ['대한치과교정학회 인정의', '인비절라인 프로바이더'],
      type: 'doctor'
    },
    {
      name: '박현우',
      position: '보존과 전문의',
      specialty: '심미치료 · 신경치료',
      education: '서울대학교 치과대학 졸업',
      experience: '12년 임상경험',
      image: 'https://images.unsplash.com/photo-1631596577204-53ad0d6e6978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbGUlMjBkZW50aXN0JTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzU2NDQxNDkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      certifications: ['대한치과보존학회 인정의', '현미경치료학회 인증의'],
      type: 'doctor'
    },
    {
      name: '최치위',
      position: '치과위생사 팀장',
      specialty: '스케일링 · 예방치료',
      education: '동서울대학교 치위생과 졸업',
      experience: '10년 임상경험',
      image: 'https://images.unsplash.com/photo-1584516151140-f79fde30d55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBoeWdpZW5pc3QlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGFzaWFufGVufDF8fHx8MTc1NjQ0MTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      certifications: ['치과위생사 면허', '구강보건교육사 자격증'],
      type: 'staff'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="relative h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <ImageWithFallback
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent"></div>
              
              {/* 콘텐츠 */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6 lg:px-12">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        size="lg"
                        onClick={slide.action}
                        className="bg-white text-blue-800 hover:bg-blue-50 font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {slide.cta}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                      <Button 
                        size="lg"
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg rounded-xl backdrop-blur-sm"
                        onClick={() => onPageChange('about')}
                      >
                        <PlayCircle className="w-5 h-5 mr-2" />
                        병원 소개 영상
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* 슬라이드 컨트롤 */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-4 text-white transition-all backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-4 text-white transition-all backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          {/* 인디케이터 */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-white scale-110' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 병원 소개 섹션 */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 mb-6">
              <Logo 
                size="lg" 
                showText={false}
                className="shadow-lg"
              />
              <h2 className="text-4xl font-bold text-gray-900">믿음치과의원</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              환자의 건강한 미소를 위해 최선을 다하는 치과입니다.<br />
              안전하고 정확한 치료로 여러분의 믿음에 보답하겠습니다.
            </p>
            

          </div>

          {/* 병원 특장점 */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-16">
            {hospitalFeatures.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                  <div className="text-sm font-semibold text-blue-600 bg-blue-50 rounded-full px-4 py-2 inline-block">
                    {feature.stats}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 주요 진료과목 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">주요 진료과목</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              전문적인 의료진과 첨단 장비로 최상의 치료 서비스를 제공합니다
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
              <Card key={service.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-gray-50 hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline"
                    onClick={() => onPageChange(service.id)}
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                  >
                    자세히 보기
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 의료진 소개 */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">전문 의료진</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              각 분야별 전문의와 숙련된 지원팀이 함께 환자분들의 건강한 미소를 위해 최선을 다합니다
            </p>
            
            {/* 팀 통계 */}
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
                <div className="flex items-center justify-center mb-2">
                  <Stethoscope className="w-6 h-6 text-blue-600 mr-2" />
                  <span className="font-semibold text-gray-700">전문의</span>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-1">3명</div>
                <div className="text-sm text-gray-500">각 분야별 전문의</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100">
                <div className="flex items-center justify-center mb-2">
                  <Award className="w-6 h-6 text-emerald-600 mr-2" />
                  <span className="font-semibold text-gray-700">평균 경력</span>
                </div>
                <div className="text-3xl font-bold text-emerald-600 mb-1">16년</div>
                <div className="text-sm text-gray-500">풍부한 임상경험</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-purple-600 mr-2" />
                  <span className="font-semibold text-gray-700">전문팀</span>
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-1">4명</div>
                <div className="text-sm text-gray-500">전문 의료진 팀</div>
              </div>
            </div>
          </div>

          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
            {medicalTeam.map((member, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm overflow-hidden hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-[4/5] overflow-hidden">
                      <ImageWithFallback
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                        <p className="text-blue-200 font-medium text-sm">{member.position}</p>
                      </div>
                    </div>
                    {member.type === 'doctor' && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-blue-600 text-white">
                          전문의
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="font-semibold text-blue-800 mb-2 text-sm">전문 분야</h4>
                      <p className="text-gray-700 text-sm">{member.specialty}</p>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-700 text-xs">{member.education}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="text-gray-700 text-xs">{member.experience}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-800 text-sm">주요 자격</h5>
                      <div className="space-y-1">
                        {member.certifications.slice(0, 2).map((cert, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 text-xs leading-relaxed">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="mb-8">
              <p className="text-gray-600 max-w-2xl mx-auto">
                각 분야별 전문의의 상세한 이력과 치료 철학을 확인하고, 
                본인에게 맞는 전문의와 상담 예약을 진행하세요.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => onPageChange('doctors')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Users className="w-5 h-5 mr-2" />
                상세 프로필 보기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onPageChange('appointment')}
                className="border-blue-300 text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold"
              >
                <Calendar className="w-5 h-5 mr-2" />
                전문의 상담 예약
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 환자 후기 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">환자 후기</h2>
            <p className="text-xl text-gray-600">믿음치과에서 치료받은 환자분들의 생생한 경험담을 확인해보세요</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                name: '김○○', 
                treatment: '임플란트', 
                rating: 5, 
                comment: '정말 만족스러운 치료였습니다. 자연치아와 같은 느낌이에요! 의료진분들이 너무 친절하시고 꼼꼼하게 설명해주셔서 안심하고 치료받을 수 있었습니다.', 
                date: '2024.12.20',
                age: '50대'
              },
              { 
                name: '이○○', 
                treatment: '투명교정', 
                rating: 5, 
                comment: '투명교정으로 불편함 없이 치료받았어요. 결과도 완벽해요. 직장생활 하면서도 전혀 티가 나지 않아서 좋았습니다.', 
                date: '2024.12.18',
                age: '30대'
              },
              { 
                name: '박○○', 
                treatment: '치아미백', 
                rating: 5, 
                comment: '치아가 정말 하얘졌어요. 효과가 놀라워요! 시술 과정도 전혀 아프지 않았고, 결과에 매우 만족합니다.', 
                date: '2024.12.15',
                age: '20대'
              }
            ].map((review, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <p className="text-sm text-gray-500">{review.age}</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                      {review.treatment}
                    </Badge>
                  </div>
                  
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 italic leading-relaxed mb-4">
                    "{review.comment}"
                  </p>
                  
                  <div className="text-sm text-gray-500 text-right">
                    {review.date}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline"
              size="lg"
              onClick={() => onPageChange('reviews')}
              className="border-blue-300 text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold"
            >
              더 많은 후기 보기
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              건강한 미소를 위한 첫 걸음
            </h2>
            <p className="text-xl lg:text-2xl mb-12 opacity-90 leading-relaxed">
              믿음치과와 함께 시작하세요. 전문적인 상담과 정확한 진단으로<br />
              여러분만의 맞춤 치료 계획을 제안해드립니다.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button 
                size="lg"
                onClick={() => onPageChange('appointment')}
                className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-10 py-5 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
              >
                <Calendar className="w-6 h-6 mr-3" />
                온라인 예약하기
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-bold px-10 py-5 text-lg rounded-xl backdrop-blur-sm min-w-[200px]"
                onClick={() => window.open('tel:031-651-3054')}
              >
                <Phone className="w-6 h-6 mr-3" />
                031-651-3054
              </Button>
            </div>

            {/* 빠른 연락처 */}
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-lg">전화 상담</h3>
                <p className="opacity-90">031-651-3054</p>
                <p className="text-sm opacity-75">평일 09:00~18:00</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-lg">카카오톡 상담</h3>
                <p className="opacity-90">@믿음치과</p>
                <p className="text-sm opacity-75">24시간 상담 가능</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                  <Navigation className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-lg">오시는 길</h3>
                <p className="opacity-90">평택시 평택로 102</p>
                <p className="text-sm opacity-75">지하철 1호선 평택역</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}