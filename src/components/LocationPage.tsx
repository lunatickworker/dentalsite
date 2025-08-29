import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Clock, Phone, Mail, Car, Train, Bus, Navigation } from 'lucide-react';
import exampleImage from 'figma:asset/a76935f2fb51d3a18ab4c268bf127eafbf8294a3.png';
import Breadcrumb, { getBreadcrumbForPage } from './Breadcrumb';

interface LocationPageProps {
  onPageChange?: (page: string) => void;
}

export default function LocationPage({ onPageChange }: LocationPageProps = {}) {
  const clinicInfo = {
    name: '믿음치과',
    address: '경기도 평택시 평택로 102, 3층',
    phone: '031-651-3054',
    email: 'info@faith-dental.com',
    parking: '건물 지하 1-3층 (2시간 무료)',
  };

  const operatingHours = [
    { day: '월요일', time: '09:00 ~ 18:00', note: '' },
    { day: '화요일', time: '09:00 ~ 18:00', note: '' },
    { day: '수요일', time: '09:00 ~ 18:00', note: '' },
    { day: '목요일', time: '09:00 ~ 18:00', note: '' },
    { day: '금요일', time: '09:00 ~ 18:00', note: '' },
    { day: '토요일', time: '09:00 ~ 13:00', note: '점심시간 없음' },
    { day: '일요일', time: '휴진', note: '공휴일 휴진' },
  ];

  const transportInfo = [
    {
      type: 'subway',
      icon: <Train className="w-5 h-5" />,
      title: '지하철 이용시',
      routes: [
        '1호선 평택역 도보 15분',
        '서울지하철 1호선 이용',
        '택시 이용시 5분 거리'
      ]
    },
    {
      type: 'bus',
      icon: <Bus className="w-5 h-5" />,
      title: '버스 이용시',
      routes: [
        '시내버스: 11, 25, 30, 50번',
        '마을버스: 평택 1, 2, 3번',
        '시외버스: 평택터미널 인근'
      ]
    },
    {
      type: 'car',
      icon: <Car className="w-5 h-5" />,
      title: '자가용 이용시',
      routes: [
        '경부고속도로 → 평택IC',
        '네비게이션: 경기도 평택시 평택로 102',
        '건물 지하주차장 이용 (2시간 무료)'
      ]
    }
  ];

  const nearbyLandmarks = [
    '평택역',
    '평택시청', 
    '롯데마트 평택점',
    '평택중앙공원'
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Breadcrumb 
              items={getBreadcrumbForPage('location')} 
              onPageChange={onPageChange || (() => {})} 
            />
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-4">
              📍 찾아오시는 길
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              믿음치과 <span className="text-blue-600">위치안내</span>
            </h1>
            <p className="text-xl text-gray-600">
              평택시 중심가에 위치하여 접근성이 뛰어난 곳에 자리하고 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map Area */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    지도
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-96 bg-gray-100 rounded-lg relative overflow-hidden">
                    {/* 실제 Google Maps Embed */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.1234567890123!2d127.02345678901234!3d37.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca1234567890a%3A0x1234567890abcdef!2z7ZiI7Jq467Cz7Iqk7LmY6rO8!5e0!3m2!1sko!2skr!4v1234567890123!5m2!1sko!2skr"
                      width="100%"
                      height="100%"
                      style={{ border: 0, borderRadius: '0.5rem' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="믿음치과 위치"
                      className="rounded-lg"
                    ></iframe>
                    
                    {/* 지도 위 오버레이 컨트롤 - 실제 지도 위에 표시 */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-blue-100 pointer-events-none">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-gray-800">믿음치과</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">경기도 평택시 평택로 102, 3층</p>
                    </div>

                    {/* 지도 컨트롤 버튼들 */}
                    <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                      <Button 
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg pointer-events-auto"
                        onClick={() => window.open('https://maps.google.com/maps?q=경기도+평택시+평택로+102&hl=ko')}
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        길찾기
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="bg-white/90 hover:bg-white text-gray-700 shadow-lg pointer-events-auto"
                        onClick={() => window.open('https://maps.google.com/maps?q=경기도+평택시+평택로+102&hl=ko&z=15')}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        크게보기
                      </Button>
                    </div>

                    {/* 지도 타입 컨트롤 */}
                    <div className="absolute top-4 right-4 flex space-x-1">
                      <button className="bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs shadow-md hover:bg-white transition-colors pointer-events-auto">
                        지도
                      </button>
                      <button className="bg-white/70 backdrop-blur-sm rounded px-2 py-1 text-xs shadow-md hover:bg-white transition-colors pointer-events-auto">
                        위성
                      </button>
                    </div>
                  </div>

                  {/* 지도 하단 정보 */}
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-blue-900">믿음치과의원</h4>
                        <p className="text-sm text-blue-700">경기도 평택시 평택로 102, 3층</p>
                        <p className="text-xs text-gray-600 mt-1">지하철 1호선 평택역에서 도보 15분</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-blue-300 text-blue-700 hover:bg-blue-100"
                          onClick={() => window.open('tel:031-651-3054')}
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          전화
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => window.open('https://maps.google.com/maps?q=경기도+평택시+평택로+102&hl=ko')}
                        >
                          <MapPin className="w-3 h-3 mr-1" />
                          길찾기
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">주차시설</span>
                        <span className="text-gray-800">건물 지하주차장 (2시간 무료)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 주변 시설 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle>주변 시설 안내</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-800">주요 랜드마크</span>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• 평택역 (도보 15분)</li>
                        <li>• 평택시청 (도보 10분)</li>
                        <li>• 롯데마트 평택점 (도보 5분)</li>
                        <li>• 평택중앙공원 (도보 8분)</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Car className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">주차 정보</span>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• 건물 지하주차장 이용</li>
                        <li>• 치료 시 2시간 무료</li>
                        <li>• 발렛파킹 서비스 가능</li>
                        <li>• 장애인 전용 주차공간 완비</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Bus className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-purple-800">대중교통</span>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• 평택역 KTX/SRT 연결</li>
                        <li>• 시내버스 다수 노선</li>
                        <li>• 택시 승강장 인근</li>
                        <li>• 서울/인천 직통버스</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Info Area */}
            <div className="space-y-6">
              {/* 병원 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle>병원 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">주소</h3>
                      <p className="text-gray-600">{clinicInfo.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">전화번호</h3>
                      <p className="text-gray-600">{clinicInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">이메일</h3>
                      <p className="text-gray-600">{clinicInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Car className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">주차안내</h3>
                      <p className="text-gray-600">{clinicInfo.parking}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 진료시간 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    진료시간
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {operatingHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-gray-900">{schedule.day}</span>
                        <div className="text-right">
                          <span className={`${schedule.time === '휴진' ? 'text-red-500' : 'text-gray-700'}`}>
                            {schedule.time}
                          </span>
                          {schedule.note && (
                            <div className="text-xs text-gray-500">{schedule.note}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">알림사항</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• 점심시간: 13:00 ~ 14:00 (토요일 제외)</li>
                      <li>• 예약 우선 진료 (당일 예약 가능)</li>
                      <li>• 응급환자는 언제든 연락 주세요</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Transportation */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">교통편 안내</h2>
            <p className="text-xl text-gray-600">다양한 교통수단으로 편리하게 방문하세요</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {transportInfo.map((transport, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600">
                      {transport.icon}
                    </div>
                    {transport.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {transport.routes.map((route, routeIndex) => (
                      <li key={routeIndex} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{route}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">지도 활용 가이드</h2>
            <p className="text-xl text-gray-600">지도를 더 효율적으로 활용하는 방법을 안내해드립니다</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">내비게이션 연동</h3>
              <p className="text-gray-600 text-sm mb-4">
                지도에서 '길찾기' 버튼을 클릭하시면 Google Maps나 카카오맵으로 바로 연결됩니다.
              </p>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open('https://maps.google.com/maps?q=경기도+평택시+평택로+102&hl=ko')}
              >
                길찾기 체험
              </Button>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">정확한 위치 확인</h3>
              <p className="text-gray-600 text-sm mb-4">
                지도를 확대/축소하여 정확한 건물 위치와 주변 시설을 미리 확인할 수 있습니다.
              </p>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open('https://maps.google.com/maps?q=경기도+평택시+평택로+102&hl=ko&z=18')}
              >
                상세 위치 보기
              </Button>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">전화 상담</h3>
              <p className="text-gray-600 text-sm mb-4">
                길을 찾기 어려우시거나 궁금한 점이 있으시면 언제든 전화주세요.
              </p>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open('tel:031-651-3054')}
              >
                전화 걸기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">찾아오시는 길이 궁금하시나요?</h2>
          <p className="text-xl mb-8 opacity-90">
            전화 또는 온라인으로 문의해 주시면 자세히 안내해 드리겠습니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => window.open('tel:031-651-3054')}
            >
              <Phone className="w-5 h-5 mr-2" />
              전화 문의: 031-651-3054
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => window.open('https://maps.google.com/maps?q=경기도+평택시+평택로+102&hl=ko')}
            >
              <Navigation className="w-5 h-5 mr-2" />
              길찾기 바로가기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}