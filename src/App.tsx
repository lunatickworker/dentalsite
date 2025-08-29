import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import DoctorsPage from './components/DoctorsPage';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboardComplete';
import Logo from './components/Logo';

import LocationPage from './components/LocationPage';
import TreatmentDetailPage from './components/TreatmentDetailPage';
import GalleryPage from './components/GalleryPage';
import Breadcrumb, { getBreadcrumbForPage } from './components/Breadcrumb';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { 
  User, Settings, Calendar, MessageSquare, Phone, Mail, MapPin, 
  Clock, Shield, MessageCircle, Eye, ChevronRight, Star, UserCheck,
  Stethoscope, Camera, ArrowRight, RotateCcw, Move3D, X, Play
} from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { treatmentAPI, doctorAPI, noticeAPI, reviewAPI, appointmentAPI, contactAPI, initAPI, healthAPI } from './utils/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Supabase 연동 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 실시간 데이터 상태
  const [treatmentCategories, setTreatmentCategories] = useState([
    {
      id: 'implant',
      title: '임플란트',
      icon: 'Stethoscope',
      color: 'text-blue-600',
      description: '자연치아와 같은 기능 회복',
      order: 1,
      status: '활성'
    },
    {
      id: 'orthodontics',
      title: '교정치료',
      icon: 'Sparkles',
      color: 'text-purple-600',
      description: '아름다운 미소를 위한 치아교정',
      order: 2,
      status: '활성'
    },
    {
      id: 'aesthetic',
      title: '심미치료',
      icon: 'Smile',
      color: 'text-pink-600',
      description: '자연스럽고 아름다운 치아',
      order: 3,
      status: '활성'
    },
    {
      id: 'general',
      title: '일반진료',
      icon: 'Heart',
      color: 'text-emerald-600',
      description: '건강한 치아 관리',
      order: 4,
      status: '활성'
    }
  ]);

  const [treatmentDetails, setTreatmentDetails] = useState([
    {
      id: 'implant-general',
      title: '일반 임플란트',
      category: 'implant',
      description: '단일 치아 임플란트',
      order: 1,
      status: '활성'
    },
    {
      id: 'implant-immediate',
      title: '즉시 임플란트',
      category: 'implant',
      description: '발치 후 즉시 식립',
      order: 2,
      status: '활성'
    },
    {
      id: 'implant-navigation',
      title: '네비게이션 임플란트',
      category: 'implant',
      description: '정밀 가이드 시술',
      order: 3,
      status: '활성'
    },
    {
      id: 'implant-allon4',
      title: 'All-on-4',
      category: 'implant',
      description: '전악 임플란트',
      order: 4,
      status: '활성'
    },
    {
      id: 'implant-bone',
      title: '뼈이식 임플란트',
      category: 'implant',
      description: '골이식 동반 시술',
      order: 5,
      status: '활성'
    },
    {
      id: 'implant-sinus',
      title: '상악동거상술',
      category: 'implant',
      description: '상악 임플란트 전용',
      order: 6,
      status: '활성'
    },
    {
      id: 'ortho-invisible',
      title: '투명교정',
      category: 'orthodontics',
      description: '인비절라인',
      order: 1,
      status: '활성'
    },
    {
      id: 'ortho-lingual',
      title: '설측교정',
      category: 'orthodontics',
      description: '혀쪽 브라켓',
      order: 2,
      status: '활성'
    },
    {
      id: 'ortho-partial',
      title: '부분교정',
      category: 'orthodontics',
      description: '앞니 교정',
      order: 3,
      status: '활성'
    },
    {
      id: 'ortho-adult',
      title: '성인교정',
      category: 'orthodontics',
      description: '성인 전용 교정',
      order: 4,
      status: '활성'
    },
    {
      id: 'ortho-ceramic',
      title: '세라믹교정',
      category: 'orthodontics',
      description: '투명 브라켓',
      order: 5,
      status: '활성'
    },
    {
      id: 'ortho-self',
      title: '셀프라이게이션',
      category: 'orthodontics',
      description: '빠른 교정',
      order: 6,
      status: '활성'
    },
    {
      id: 'aesthetic-laminate',
      title: '라미네이트',
      category: 'aesthetic',
      description: '앞니 성형',
      order: 1,
      status: '활성'
    },
    {
      id: 'aesthetic-crown',
      title: '올세라믹',
      category: 'aesthetic',
      description: '자연스러운 크라운',
      order: 2,
      status: '활성'
    },
    {
      id: 'aesthetic-whitening',
      title: '치아미백',
      category: 'aesthetic',
      description: '전문 미백 시술',
      order: 3,
      status: '활성'
    },
    {
      id: 'aesthetic-gum',
      title: '잇몸성형',
      category: 'aesthetic',
      description: '잇몸라인 교정',
      order: 4,
      status: '활성'
    },
    {
      id: 'aesthetic-inlay',
      title: '인레이/온레이',
      category: 'aesthetic',
      description: '심미 충전재',
      order: 5,
      status: '활성'
    },
    {
      id: 'aesthetic-veneer',
      title: '베니어',
      category: 'aesthetic',
      description: '얇은 도재 부착',
      order: 6,
      status: '활성'
    },
    {
      id: 'general-cavity',
      title: '충치치료',
      category: 'general',
      description: '레진/아말감',
      order: 1,
      status: '활성'
    },
    {
      id: 'general-root',
      title: '신경치료',
      category: 'general',
      description: '근관치료',
      order: 2,
      status: '활성'
    },
    {
      id: 'general-perio',
      title: '잇몸치료',
      category: 'general',
      description: '치주치료',
      order: 3,
      status: '활성'
    },
    {
      id: 'general-scaling',
      title: '스케일링',
      category: 'general',
      description: '치석제거',
      order: 4,
      status: '활성'
    },
    {
      id: 'general-extraction',
      title: '사랑니발치',
      category: 'general',
      description: '매복치 발치',
      order: 5,
      status: '활성'
    },
    {
      id: 'general-denture',
      title: '틀니',
      category: 'general',
      description: '부분/완전틀니',
      order: 6,
      status: '활성'
    }
  ]);

  // 실시간 데이터 상태
  const [doctors, setDoctors] = useState([]);
  const [notices, setNotices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // 데이터 로딩 함수
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 헬스체크 먼저 수행
      await healthAPI.check();

      // 모든 데이터 동시 로딩
      const [
        treatmentData,
        doctorsData,
        noticesData,
        reviewsData,
        appointmentsData
      ] = await Promise.all([
        treatmentAPI.getAll(),
        doctorAPI.getAll(),
        noticeAPI.getAll(),
        reviewAPI.getAll(),
        appointmentAPI.getAll()
      ]);

      // 진료과목 데이터 업데이트
      if (treatmentData.success) {
        if (treatmentData.data.categories && treatmentData.data.categories.length > 0) {
          setTreatmentCategories(treatmentData.data.categories);
        }
        if (treatmentData.data.details) {
          // details 객체를 배열로 변환
          const detailsArray = Object.values(treatmentData.data.details) as any [];
          if (detailsArray.length > 0) {
            setTreatmentDetails(detailsArray);
          }
        }
      }

      // 의료진 데이터 업데이트
      if (doctorsData.success) {
        setDoctors(doctorsData.data);
      }

      // 공지사항 데이터 업데이트
      if (noticesData.success) {
        setNotices(noticesData.data);
      }

      // 치료후기 데이터 업데이트
      if (reviewsData.success) {
        setReviews(reviewsData.data);
      }

      // 예약 데이터 업데이트
      if (appointmentsData.success) {
        setAppointments(appointmentsData.data);
      }

    } catch (error) {
      console.error('데이터 로딩 에러:', error);
      setError('데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      
      // 초기 데이터 설정 시도
      try {
        await initAPI.setupInitialData();
        console.log('초기 데이터 설정 완료');
        // 초기 데이터 설정 후 다시 로딩
        setTimeout(loadData, 1000);
      } catch (initError) {
        console.error('초기 데이터 설정 에러:', initError);
      }
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로딩
  useEffect(() => {
    loadData();
  }, []);

  // 데이터 새로고침 함수
  const refreshData = () => {
    loadData();
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    setShowLogin(false);
    
    // 관리자 계정 체크 (실제로는 서버에서 권한 확인)
    if (userData.email === 'admin@faith-dental.com' || userData.name === '관리자') {
      setIsAdmin(true);
      setCurrentPage('admin');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    setCurrentPage('home');
  };

  const handleAdminAccess = () => {
    // 관리자 권한 체크
    if (user && (user.email === 'admin@faith-dental.com' || user.name === '관리자')) {
      setIsAdmin(true);
      setCurrentPage('admin');
    } else {
      // 관리자 로그인 유도
      const adminUser = {
        id: 999,
        name: '관리자',
        email: 'admin@faith-dental.com',
        phone: '031-651-3054',
        loginType: 'admin'
      };
      setUser(adminUser);
      setIsAdmin(true);
      setCurrentPage('admin');
    }
  };

  // 로딩 상태 렌더링
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">데이터 로딩 중...</h2>
          <p className="text-gray-600">잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  // 에러 상태 렌더링
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">오류가 발생했습니다</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={refreshData} className="bg-blue-600 hover:bg-blue-700">
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  // 관리자 페이지 렌더링
  if (isAdmin && currentPage === 'admin') {
    return <AdminDashboard user={user} onLogout={handleLogout} onGoHome={() => handlePageChange('home')} onDataUpdate={refreshData} />;
  }

  const renderPage = () => {
    // 확장된 치료 상세 페이지들
    const treatmentPages = [
      // 임플란트
      'implant-general', 'implant-immediate', 'implant-navigation', 'implant-allon4',
      'implant-bone', 'implant-sinus',
      // 교정치료
      'ortho-invisible', 'ortho-lingual', 'ortho-partial', 'ortho-adult',
      'ortho-ceramic', 'ortho-self',
      // 심미치료
      'aesthetic-laminate', 'aesthetic-crown', 'aesthetic-whitening', 'aesthetic-gum',
      'aesthetic-inlay', 'aesthetic-veneer',
      // 일반진료
      'general-cavity', 'general-root', 'general-perio', 'general-scaling',
      'general-extraction', 'general-denture'
    ];

    if (treatmentPages.includes(currentPage)) {
      return <TreatmentDetailPage treatmentId={currentPage} onPageChange={handlePageChange} />;
    }

    // 새로운 페이지들 처리
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={handlePageChange} />;
      
      // 병원소개 관련 페이지들
      case 'about':
      case 'about-intro':
      case 'about-vision':
      case 'about-history':
        return <AboutPage currentTab="intro" onPageChange={handlePageChange} />;
      case 'location':
      case 'location-map':
      case 'location-transport':
      case 'location-parking':
        return <LocationPage onPageChange={handlePageChange} />;
      
      // 의료진 관련 페이지들
      case 'doctors':
      case 'doctors-chief':
      case 'doctors-staff':
      case 'doctors-hygienist':
      case 'doctors-career':
      case 'doctors-education':
      case 'doctors-experience':
      case 'doctors-awards':
        return <DoctorsPage currentTab="profile" onPageChange={handlePageChange} doctors={doctors} />;
      
      // 커뮤니티 관련 페이지들 (갤러리는 병원소개로 이동)
      case 'gallery':
      case 'gallery-before-after':
      case 'gallery-clinic':
      case 'gallery-equipment':
        return <GalleryPage onPageChange={handlePageChange} />;
      case 'reviews':
      case 'reviews-implant':
      case 'reviews-orthodontics':
      case 'reviews-aesthetic':
      case 'reviews-general':
        return <ReviewsPage onPageChange={handlePageChange} reviews={reviews} onReviewSubmit={refreshData} />;
      case 'notice':
      case 'notice-general':
      case 'notice-event':
      case 'notice-media':
        return <NoticePage onPageChange={handlePageChange} notices={notices} />;
      
      // 예약 관련 페이지들
      case 'appointment':
      case 'appointment-consultation':
      case 'appointment-treatment':
      case 'appointment-checkup':
        return <AppointmentPage user={user} onPageChange={handlePageChange} onAppointmentSubmit={refreshData} />;
      case 'contact':
      case 'contact-phone':
      case 'contact-kakao':
      case 'contact-online':
        return <ContactPage onPageChange={handlePageChange} onContactSubmit={refreshData} />;
      
      // 기존 페이지들
      case 'services':
        return <ServicesPage />;
      
      default:
        return <HomePage onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-white w-full">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        user={user}
        onShowLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
        onAdminAccess={handleAdminAccess}
        treatmentCategories={treatmentCategories}
        treatmentDetails={treatmentDetails}
      />
      
      {/* 네비게이션 높이만큼 여백 추가 - 반응형 */}
      <div className="pt-[100px] md:pt-[120px]"></div>

      {renderPage()}

      {/* Enhanced Footer - Full Width */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 w-full">
        <div className="px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Logo 
                  size="md" 
                  variant="white" 
                  showText={false}
                  className="shadow-lg"
                />
                <h3 className="text-white text-2xl font-bold">믿음치과</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                환자의 건강한 미소를 위해<br />
                최선을 다하는 치과입니다.<br />
                안전하고 정확한 치료로<br />
                여러분의 믿음에 보답하겠습니다.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">i</span>
                </div>
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">B</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-blue-300">주요 진료</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="cursor-pointer hover:text-blue-300 transition-colors flex items-center space-x-2" onClick={() => handlePageChange('implant-general')}>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>일반 임플란트</span>
                </li>
                <li className="cursor-pointer hover:text-blue-300 transition-colors flex items-center space-x-2" onClick={() => handlePageChange('ortho-invisible')}>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>투명교정</span>
                </li>
                <li className="cursor-pointer hover:text-blue-300 transition-colors flex items-center space-x-2" onClick={() => handlePageChange('aesthetic-whitening')}>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>치아미백</span>
                </li>
                <li className="cursor-pointer hover:text-blue-300 transition-colors flex items-center space-x-2" onClick={() => handlePageChange('general-scaling')}>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>스케일링</span>
                </li>
                <li className="cursor-pointer hover:text-blue-300 transition-colors flex items-center space-x-2" onClick={() => handlePageChange('aesthetic-laminate')}>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>라미네이트</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-blue-300">병원 정보</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="cursor-pointer hover:text-blue-300 transition-colors flex items-center space-x-2" onClick={() => handlePageChange('about')}>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  <span>병원 소개</span>
                </li>
                <li className="cursor-pointer hover:text-blue-300 transition-colors flex items-center space-x-2" onClick={() => handlePageChange('doctors')}>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  <span>의료진 소개</span>
                </li>
                <li className="cursor-pointer hover:text-blue-300 transition-colors flex items-center space-x-2" onClick={() => handlePageChange('gallery')}>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  <span>병원시설</span>
                </li>
                <li className="cursor-pointer hover:text-blue-300 transition-colors flex items-center space-x-2" onClick={() => handlePageChange('location')}>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  <span>찾아오시는 길</span>
                </li>
                <li className="cursor-pointer hover:text-blue-300 transition-colors flex items-center space-x-2" onClick={() => handlePageChange('reviews')}>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  <span>치료 후기</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-blue-300">연락처</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    📞
                  </div>
                  <div>
                    <div className="text-white font-semibold">031-651-3054</div>
                    <div className="text-sm">전화 상담 가능</div>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    📧
                  </div>
                  <div>
                    <div className="text-white font-semibold">info@faith-dental.com</div>
                    <div className="text-sm">이메일 문의</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    📍
                  </div>
                  <div>
                    <div className="text-white font-semibold cursor-pointer hover:text-blue-300 transition-colors" onClick={() => handlePageChange('location')}>
                      경기도 평택시 평택로 102, 3층
                    </div>
                    <div className="text-sm">믿음치과의원</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    🕒
                  </div>
                  <div>
                    <div className="text-white font-semibold">진료시간</div>
                    <div className="text-sm space-y-1">
                      <div>평일: 09:00~18:00</div>
                      <div>토요일: 09:00~13:00</div>
                      <div className="text-red-400">일요일: 휴진</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-16 pt-8 text-center">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400">
                &copy; 2025 믿음치과의원. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-gray-400 text-sm">
                <button className="hover:text-white transition-colors">이용약관</button>
                <button className="hover:text-white transition-colors">개인정보처리방침</button>
                <button className="hover:text-white transition-colors">이메일무단수집거부</button>
                <button className="hover:text-white transition-colors">비급여진료비</button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Login Modal */}
      {showLogin && (
        <LoginPage 
          onClose={() => setShowLogin(false)} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

// 추가 페이지 컴포넌트들 - TreatmentDetailPage 포맷으로 통일
function ReviewsPage({ onPageChange }: { onPageChange: (page: string) => void }) {
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
  
  const reviews = [
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

  const categories = [
    { id: 'all', name: '전체', count: reviews.length },
    { id: '임플란트', name: '임플란트', count: reviews.filter(r => r.service.includes('임플란트')).length },
    { id: '교정', name: '교정치료', count: reviews.filter(r => r.service.includes('교정')).length },
    { id: '심미', name: '심미치료', count: reviews.filter(r => ['치아미백', '라미네이트', '올세라믹'].some(s => r.service.includes(s))).length },
    { id: '일반', name: '일반진료', count: reviews.filter(r => ['스케일링', '신경치료', '틀니'].some(s => r.service.includes(s))).length }
  ];

  const filteredReviews = selectedCategory === 'all' 
    ? reviews 
    : reviews.filter(review => {
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
                <div className="text-2xl font-bold text-blue-600">{reviews.length}건</div>
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
                        {review.images.length > 0 && (
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

function NoticePage({ onPageChange }: { onPageChange: (page: string) => void }) {
  const [selectedType, setSelectedType] = useState('all');
  
  const notices = [
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

  const types = [
    { id: 'all', name: '전체', count: notices.length },
    { id: '일반', name: '일반공지', count: notices.filter(n => n.type === '일반').length },
    { id: '이벤트', name: '이벤트', count: notices.filter(n => n.type === '이벤트').length },
    { id: '언론', name: '언론보도', count: notices.filter(n => n.type === '언론').length }
  ];

  const filteredNotices = selectedType === 'all' 
    ? notices 
    : notices.filter(notice => notice.type === selectedType);

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
                <div className="text-2xl font-bold text-blue-600">{notices.length}건</div>
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
                <div className="text-2xl font-bold text-orange-600">{notices.reduce((sum, n) => sum + n.views, 0).toLocaleString()}</div>
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
                    {notices.slice(0, 3).sort((a, b) => b.views - a.views).map((notice) => (
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

function ContactPage({ onPageChange }: { onPageChange: (page: string) => void }) {
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
    // 실제로는 서버로 전송
    alert('상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.');
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      message: '',
      contactMethod: 'phone'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

function AppointmentPage({ user, onPageChange }: { user: any, onPageChange: (page: string) => void }) {
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
    // 실제 환경에서는 서버로 데이터 전송
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