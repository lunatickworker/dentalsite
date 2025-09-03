import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Award, GraduationCap, Calendar, MapPin, Phone, Mail, Star, ArrowRight, Users, Clock } from 'lucide-react';
import Breadcrumb, { getBreadcrumbForPage } from './Breadcrumb';

interface DoctorsPageProps {
  currentTab?: string;
  onPageChange?: (page: string) => void;
  doctors?: any[];
}

export default function DoctorsPage({ currentTab = 'profile', onPageChange, doctors: propDoctors }: DoctorsPageProps) {
  const defaultDoctors = [
    {
      id: 1,
      name: '오진수',
      position: '대표원장',
      specialties: ['임플란트', '구강외과', '보철'],
      experience: '20년',
      education: [
        '서울대학교 치과대학 졸업',
        '연세대학교 치과대학원 임플란트학 석사',
        'UCLA 임플란트 연수'
      ],
      certifications: [
        '대한치과임플란트학회 인증의',
        '대한구강악안면외과학회 정회원',
        '국제임플란트학회(ITI) Fellow'
      ],
      career: [
        '서울대학교병원 구강악안면외과 전공의',
        '강남세브란스병원 임플란트센터 임상강사',
        '믿음치과 대표원장 (2004~현재)'
      ],
      philosophy: '환자의 건강한 미소를 위해 최선을 다하는 것이 저의 사명입니다. 20년간의 경험과 최신 기술을 바탕으로 안전하고 정확한 치료를 제공하겠습니다.',
      image: 'https://images.unsplash.com/photo-1592393532405-fb1f165c4a1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBtZWRpY2FsJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2NDQxNDg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      contact: {
        phone: '031-651-3054',
        email: 'director@faith-dental.com'
      },
      schedule: {
        weekdays: '09:00 - 18:00',
        saturday: '09:00 - 13:00',
        sunday: '휴진'
      }
    },
    {
      id: 2,
      name: '김민지',
      position: '교정과 전문의',
      specialties: ['치아교정', '투명교정', '소아교정'],
      experience: '15년',
      education: [
        '연세대학교 치과대학 졸업',
        '연세대학교 치과대학원 교정과 전문의',
        '미국 하버드대학교 교정과 연수'
      ],
      certifications: [
        '대한치과교정학회 인증의',
        '인비절라인 다이아몬드 프로바이더',
        '세계교정학회(WFO) 정회원'
      ],
      career: [
        '연세대학교 치과대학병원 교정과 전공의',
        '강남구 교정전문치과 원장',
        '믿음치과 교정과 전문의 (2015~현재)'
      ],
      philosophy: '아름다운 미소는 자신감의 시작입니다. 환자 개개인의 특성을 고려한 맞춤형 교정 치료로 건강하고 아름다운 치열을 만들어드리겠습니다.',
      image: 'https://images.unsplash.com/photo-1740153204545-ac8320c44a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZlbWFsZSUyMGRlbnRpc3QlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY0NDE0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      contact: {
        phone: '031-651-3054',
        email: 'ortho@faith-dental.com'
      },
      schedule: {
        weekdays: '10:00 - 19:00',
        saturday: '09:00 - 14:00',
        sunday: '휴진'
      }
    },
    {
      id: 3,
      name: '박현우',
      position: '보존과 전문의',
      specialties: ['심미치료', '신경치료', '충치치료'],
      experience: '12년',
      education: [
        '서울대학교 치과대학 졸업',
        '서울대학교 치과대학원 보존과 전문의',
        '독일 뮌헨대학교 심미치료 연수'
      ],
      certifications: [
        '대한치과보존학회 인증의',
        '대한심미치과학회 정회원',
        '현미경치료학회 인증의'
      ],
      career: [
        '서울대학교 치과병원 보존과 전공의',
        '강남 심미치과 원장',
        '믿음치과 보존과 전문의 (2018~현재)'
      ],
      philosophy: '자연치아의 보존과 아름다운 심미성, 두 마리 토끼를 모두 잡는 치료를 지향합니다. 환자의 소중한 치아를 최대한 보존하면서도 만족스러운 결과를 드리겠습니다.',
      image: 'https://images.unsplash.com/photo-1631596577204-53ad0d6e6978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbGUlMjBkZW50aXN0JTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzU2NDQxNDkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      contact: {
        phone: '031-651-3054',
        email: 'esthetic@faith-dental.com'
      },
      schedule: {
        weekdays: '09:30 - 18:30',
        saturday: '09:00 - 13:00',
        sunday: '휴진'
      }
    }
  ];

  // Use prop doctors if available, fallback to default doctors
  const doctors = propDoctors && propDoctors.length > 0 ? propDoctors : defaultDoctors;

  const teamMembers = [
    {
      name: '최치위',
      position: '치과위생사 팀장',
      experience: '10년',
      specialties: ['스케일링', '예방치료', '환자관리'],
      image: 'https://images.unsplash.com/photo-1584516151140-f79fde30d55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBoeWdpZW5pc3QlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGFzaWFufGVufDF8fHx8MTc1NjQ0MTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: '김간호',
      position: '수석 간호조무사',
      experience: '8년',
      specialties: ['수술보조', '환자케어', '멸균관리'],
      image: 'https://images.unsplash.com/photo-1676552055618-22ec8cde399a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbnVyc2UlMjBhc3Npc3RhbnQlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY0NDE1MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: '박코디',
      position: '치료 코디네이터',
      experience: '6년',
      specialties: ['치료상담', '일정관리', '보험업무'],
      image: 'https://images.unsplash.com/photo-1734002886107-168181bcd6a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwY29vcmRpbmF0b3IlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY0NDE1MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Breadcrumb 
              items={getBreadcrumbForPage('doctors')} 
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
              의료진 소개
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              풍부한 경험과 전문성으로 최고의 치료를 제공하는 의료진을 소개합니다
            </p>

            {/* Key Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Users className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold">전문의</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">3명</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Award className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold">평균 경력</span>
                </div>
                <div className="text-2xl font-bold text-green-600">16년</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="font-semibold">전문 분야</span>
                </div>
                <div className="text-2xl font-bold text-yellow-600">8개</div>
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
              {/* Doctors */}
              <div className="space-y-12">
                {doctors.map((doctor, index) => (
                  <Card key={doctor.id} className="shadow-sm border border-gray-200 overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Doctor Image & Basic Info */}
                      <div className="relative">
                        <div className="aspect-[4/5]">
                          <ImageWithFallback
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full h-full object-cover object-top rounded-lg"
                          />
                        </div>
                      </div>

                      {/* Doctor Details */}
                      <CardContent className="p-6 space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                          <p className="text-lg text-blue-600 font-medium mb-4">{doctor.position}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {doctor.specialties.map((specialty: string, i: number) => (
                              <Badge key={i} variant="secondary">
                                {specialty}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center space-x-2 text-gray-600 mb-4">
                            <Calendar className="w-4 h-4" />
                            <span>경력 {doctor.experience}</span>
                          </div>
                        </div>

                        {/* Philosophy */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">진료 철학</h4>
                          <p className="text-gray-700 text-sm italic bg-blue-50 p-4 rounded-lg">
                            "{doctor.philosophy}"
                          </p>
                        </div>

                        {/* Education (간략하게) */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">주요 학력</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            {doctor.education.slice(0, 2).map((edu: string, i:number) => (
                              <li key={i} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{edu}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Contact */}
                        <div className="pt-4 border-t">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Phone className="w-4 h-4" />
                              <span>{doctor.contact.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{doctor.schedule.weekdays}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Support Team */}
              <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle>전문 지원팀</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="text-center space-y-4">
                        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-100">
                          <ImageWithFallback
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900">{member.name}</h3>
                          <p className="text-blue-600 text-sm">{member.position}</p>
                        </div>

                        <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm">
                          <Calendar className="w-3 h-3" />
                          <span>경력 {member.experience}</span>
                        </div>

                        <div className="flex flex-wrap justify-center gap-1">
                          {member.specialties.map((specialty, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <Card className="bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-900">전문의 상담</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-blue-800 text-sm">
                    각 분야별 전문의와 직접 상담받으시고 맞춤형 치료 계획을 세워보세요.
                  </p>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => onPageChange?.('appointment')}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    전문의 상담 예약
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

              {/* Medical Team Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>의료진 현황</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">대표원장</span>
                      <span className="font-medium">1명</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">전문의</span>
                      <span className="font-medium">3명</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">치과위생사</span>
                      <span className="font-medium">1명</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">간호조무사</span>
                      <span className="font-medium">1명</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">코디네이터</span>
                      <span className="font-medium">1명</span>
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
                      onClick={() => onPageChange?.('about')}
                      className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                            병원 소개
                          </h4>
                          <p className="text-sm text-gray-500">믿음치과 소개</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                      </div>
                    </button>
                    <button
                      onClick={() => onPageChange?.('services')}
                      className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                            진료과목
                          </h4>
                          <p className="text-sm text-gray-500">전문 진료분야</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                      </div>
                    </button>
                    <button
                      onClick={() => onPageChange?.('reviews')}
                      className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                            치료 후기
                          </h4>
                          <p className="text-sm text-gray-500">환자 후기 보기</p>
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
            전문 의료진과 상담하고 싶으시나요?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            각 분야별 전문의와 직접 상담받으시고 맞춤형 치료 계획을 세워보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => onPageChange?.('appointment')}
            >
              <Calendar className="w-5 h-5 mr-2" />
              전문의 상담 예약
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