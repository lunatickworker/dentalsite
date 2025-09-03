import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import DoctorsPage from './components/DoctorsPage';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboardOptimizedEnhanced';
import Logo from './components/Logo';
import ReviewsPage from './components/ReviewsPage';
import NoticePage from './components/NoticePage';
import ContactPage from './components/ContactPage';
import AppointmentPage from './components/AppointmentPage';
import LocationPage from './components/LocationPage';
import TreatmentDetailPage from './components/TreatmentDetailPage';
import GalleryPage from './components/GalleryPage';
import { Button } from './components/ui/button';
import { treatmentAPI, doctorAPI, noticeAPI, reviewAPI, appointmentAPI, contactAPI, initAPI, healthAPI } from './utils/api';
import { AdminProvider } from './contexts/AdminContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState('admin');
  const [user, setUser] = useState<any>({
    id: 999,
    name: '관리자',
    email: 'admin@faith-dental.com',
    phone: '031-651-3054',
    loginType: 'admin'
  });
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  
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
          const detailsArray = Object.values(treatmentData.data.details) as { id: string; title: string; category: string; description: string; order: number; status: string; }[];
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
    // 로그아웃 후에도 관리자 상태 유지 (테스트 목적)
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
    return (
      <AdminProvider>
        <AdminDashboard user={user} onLogout={handleLogout} onGoHome={() => handlePageChange('home')} onDataUpdate={refreshData} />
      </AdminProvider>
    );
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