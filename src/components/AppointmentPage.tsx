import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Calendar, Clock, UserCheck, Phone
} from 'lucide-react';
import Breadcrumb, { getBreadcrumbForPage } from './Breadcrumb';

interface AppointmentPageProps {
  user?: any;
  onPageChange: (page: string) => void;
  onAppointmentSubmit?: () => void;
}

export default function AppointmentPage({ user, onPageChange, onAppointmentSubmit }: AppointmentPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    doctor: '',
    date: '',
    time: '',
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    birthDate: '',
    gender: '',
    firstVisit: true,
    symptoms: '',
    memo: ''
  });

  const services = [
    { id: 'implant', name: '임플란트', description: '자연치아와 같은 기능 회복', icon: '🦷', duration: '60분' },
    { id: 'orthodontics', name: '교정치료', description: '아름다운 미소를 위한 치아교정', icon: '✨', duration: '30분' },
    { id: 'aesthetic', name: '심미치료', description: '자연스럽고 아름다운 치아', icon: '💎', duration: '45분' },
    { id: 'general', name: '일반진료', description: '건강한 치아 관리', icon: '🏥', duration: '30분' },
    { id: 'consultation', name: '상담', description: '치료 계획 및 비용 상담', icon: '💬', duration: '20분' }
  ];

  const doctors = [
    { id: 'oh', name: '오진수', position: '대표원장', specialty: '임플란트 · 구강외과', available: ['implant', 'general', 'consultation'] },
    { id: 'kim', name: '김민지', position: '부원장', specialty: '교정치료 · 심미치료', available: ['orthodontics', 'aesthetic', 'consultation'] },
    { id: 'park', name: '박현우', position: '진료과장', specialty: '일반진료 · 소아치료', available: ['general', 'consultation'] }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('예약이 완료되었습니다. 확인 연락을 드리겠습니다.');
    onAppointmentSubmit?.();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 현재 날짜부터 30일 후까지만 선택 가능
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Breadcrumb 
              items={getBreadcrumbForPage('appointment')} 
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
              온라인 예약
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              간편한 온라인 예약으로 원하는 시간에 진료받으세요
            </p>

            {/* Key Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold">예약 가능</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">30일</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold">소요 시간</span>
                </div>
                <div className="text-2xl font-bold text-green-600">3분</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <UserCheck className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-semibold">전문의</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">3명</div>
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
              {/* 진행 단계 표시 */}
              <div className="mb-12">
                <div className="flex items-center justify-center space-x-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        step <= currentStep 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step}
                      </div>
                      {step < 4 && (
                        <div className={`w-16 h-1 mx-2 ${
                          step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <div className="flex space-x-8 text-sm text-gray-600">
                    <span className={currentStep === 1 ? 'text-blue-600 font-medium' : ''}>진료선택</span>
                    <span className={currentStep === 2 ? 'text-blue-600 font-medium' : ''}>의료진</span>
                    <span className={currentStep === 3 ? 'text-blue-600 font-medium' : ''}>날짜시간</span>
                    <span className={currentStep === 4 ? 'text-blue-600 font-medium' : ''}>정보입력</span>
                  </div>
                </div>
              </div>
              
              {/* Form Card */}
              <Card className="shadow-sm border border-gray-200 overflow-hidden">
                <form onSubmit={handleSubmit}>
                  {/* Step 1: 진료과목 선택 */}
                  {currentStep === 1 && (
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-blue-800 mb-8 text-center">진료과목을 선택해주세요</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {services.map((service) => (
                          <div
                            key={service.id}
                            onClick={() => handleInputChange('service', service.id)}
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                              formData.service === service.id
                                ? 'border-blue-500 bg-blue-50 shadow-md'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <div className="text-3xl">{service.icon}</div>
                              <div className="flex-1">
                                <h3 className="font-bold text-gray-900 mb-1">{service.name}</h3>
                                <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                                <div className="flex items-center text-xs text-blue-600">
                                  <Clock className="w-3 h-3 mr-1" />
                                  예상 시간: {service.duration}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: 의료진 선택 */}
                  {currentStep === 2 && (
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-blue-800 mb-8 text-center">담당 의료진을 선택해주세요</h2>
                      <div className="grid md:grid-cols-3 gap-6">
                        {doctors
                          .filter(doctor => doctor.available.includes(formData.service))
                          .map((doctor) => (
                          <div
                            key={doctor.id}
                            onClick={() => handleInputChange('doctor', doctor.id)}
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg text-center ${
                              formData.doctor === doctor.id
                                ? 'border-blue-500 bg-blue-50 shadow-md'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <UserCheck className="w-10 h-10 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">{doctor.name}</h3>
                            <p className="text-blue-600 font-medium text-sm mb-2">{doctor.position}</p>
                            <p className="text-gray-600 text-xs">{doctor.specialty}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: 날짜 및 시간 선택 */}
                  {currentStep === 3 && (
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-blue-800 mb-8 text-center">날짜와 시간을 선택해주세요</h2>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <Label className="text-blue-700 font-medium mb-4 block">예약 날짜</Label>
                          <Input
                            type="date"
                            min={today}
                            max={maxDate}
                            value={formData.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                            className="border-blue-200 focus:border-blue-500 text-center text-lg"
                            required
                          />
                          <p className="text-sm text-gray-500 mt-2 text-center">
                            일요일은 휴진입니다
                          </p>
                        </div>
                        
                        <div>
                          <Label className="text-blue-700 font-medium mb-4 block">예약 시간</Label>
                          <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                            {timeSlots.map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => handleInputChange('time', time)}
                                className={`p-3 rounded-lg border transition-all text-sm ${
                                  formData.time === time
                                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            점심시간: 13:00-14:00
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: 개인정보 입력 */}
                  {currentStep === 4 && (
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-blue-800 mb-8 text-center">예약자 정보를 입력해주세요</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-blue-700 font-medium">이름 *</Label>
                          <Input
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="border-blue-200 focus:border-blue-500"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label className="text-blue-700 font-medium">연락처 *</Label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="border-blue-200 focus:border-blue-500"
                            placeholder="010-0000-0000"
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <Label className="text-blue-700 font-medium">증상 및 요청사항</Label>
                          <Textarea
                            value={formData.symptoms}
                            onChange={(e) => handleInputChange('symptoms', e.target.value)}
                            className="border-blue-200 focus:border-blue-500 h-24"
                            placeholder="현재 느끼는 증상이나 치료받고 싶은 부분을 자세히 적어주세요"
                          />
                        </div>

                        {/* 예약 정보 요약 */}
                        <div className="md:col-span-2 mt-6 p-6 bg-blue-50 rounded-xl border border-blue-200">
                          <h3 className="font-bold text-blue-800 mb-4">예약 정보 확인</h3>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">진료과목:</span> 
                              <span className="font-medium ml-2">
                                {services.find(s => s.id === formData.service)?.name}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">담당의:</span> 
                              <span className="font-medium ml-2">
                                {doctors.find(d => d.id === formData.doctor)?.name}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">예약일시:</span> 
                              <span className="font-medium ml-2">
                                {formData.date} {formData.time}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">예약자:</span> 
                              <span className="font-medium ml-2">{formData.name}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 네비게이션 버튼 */}
                  <div className="flex justify-between items-center p-8 bg-gray-50 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrev}
                      disabled={currentStep === 1}
                      className="border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                      이전 단계
                    </Button>
                    
                    <div className="text-sm text-gray-500">
                      {currentStep} / 4 단계
                    </div>

                    {currentStep < 4 ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        disabled={
                          (currentStep === 1 && !formData.service) ||
                          (currentStep === 2 && !formData.doctor) ||
                          (currentStep === 3 && (!formData.date || !formData.time))
                        }
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                      >
                        다음 단계
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={!formData.name || !formData.phone}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        예약 완료
                      </Button>
                    )}
                  </div>
                </form>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Info */}
              <Card className="bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-900">전화 예약</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-blue-800 text-sm">
                    온라인 예약이 어려우시면 전화로 예약해주세요.
                  </p>
                  <Button 
                    onClick={() => window.open('tel:031-651-3054')}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    031-651-3054
                  </Button>
                </CardContent>
              </Card>

              {/* Available Doctors */}
              <Card>
                <CardHeader>
                  <CardTitle>의료진 안내</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {doctors.map((doctor) => (
                      <div key={doctor.id} className="p-3 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-900">{doctor.name}</h4>
                        <p className="text-sm text-blue-600">{doctor.position}</p>
                        <p className="text-xs text-gray-500">{doctor.specialty}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notice */}
              <Card>
                <CardHeader>
                  <CardTitle>예약 안내</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>• 예약 변경은 진료일 1일 전까지 가능합니다</p>
                    <p>• 일요일은 휴진입니다</p>
                    <p>• 점심시간(13:00-14:00)은 예약불가</p>
                    <p>• 응급상황 시 언제든 연락주세요</p>
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
            예약 완료 후 안내 과정
          </h2>
          <p className="text-xl mb-8 opacity-90">
            예약 후 체계적인 진료 과정을 안내해드립니다
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">예약 확인</h4>
              <p className="text-blue-100 text-sm">예약 확인 및 사전 안내</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">정밀 검진</h4>
              <p className="text-blue-100 text-sm">상태 진단 및 치료 계획</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">맞춤 치료</h4>
              <p className="text-blue-100 text-sm">개인별 최적 치료 진행</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}