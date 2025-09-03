import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, VisuallyHidden } from './ui/sheet';
import Logo from './Logo';
import { 
  Menu, Phone, MapPin, Clock, User, Settings, 
  Building2, UserCheck, Stethoscope, MessageCircle, 
  Calendar, Award, Heart, Sparkles, Wrench, Smile, ChevronDown, Shield
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  user?: any;
  onShowLogin?: () => void;
  onLogout?: () => void;
  onAdminAccess?: () => void;
  treatmentCategories?: any[];
  treatmentDetails?: any[];
}

interface MenuItem {
  id: string;
  label: string;
  page: string;
  icon: React.ReactNode;
  color: string;
  hasSubmenu?: boolean;
  submenu?: Array<{
    id: string;
    label: string;
    page: string;
  }>;
}

interface TreatmentCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  treatments: {
    id: string;
    name: string;
    description: string;
  }[];
}

export default function Navigation({ currentPage, onPageChange, user, onShowLogin, onLogout, onAdminAccess, treatmentCategories = [], treatmentDetails = [] }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTreatmentMenu, setShowTreatmentMenu] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  
  // 강제로 메뉴를 표시하는 상태 (테스트용)
  const [forceShowServices, setForceShowServices] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [mobileOpenMenus, setMobileOpenMenus] = useState<Set<string>>(new Set());
  const navRef = useRef<HTMLDivElement>(null);

  // 아이콘 컴포넌트 매핑 함수
  function getIconComponent(iconName: string) {
    const iconMap: { [key: string]: JSX.Element } = {
      'Stethoscope': <Stethoscope className="w-5 h-5" />,
      'Sparkles': <Sparkles className="w-5 h-5" />,
      'Smile': <Smile className="w-5 h-5" />,
      'Heart': <Heart className="w-5 h-5" />,
      'Shield': <Shield className="w-5 h-5" />
    };
    return iconMap[iconName] || <Stethoscope className="w-5 h-5" />;
  }

  // 기본 데이터 정의 (fallback)
  const defaultCategories = [
    {
      id: 'implant',
      title: '임플란트',
      icon: 'Stethoscope',
      color: 'text-blue-600',
      order: 1,
      status: '활성'
    },
    {
      id: 'orthodontics',
      title: '교정치료',
      icon: 'Sparkles',
      color: 'text-purple-600',
      order: 2,
      status: '활성'
    },
    {
      id: 'aesthetic',
      title: '심미치료',
      icon: 'Smile',
      color: 'text-pink-600',
      order: 3,
      status: '활성'
    },
    {
      id: 'general',
      title: '일반진료',
      icon: 'Heart',
      color: 'text-emerald-600',
      order: 4,
      status: '활성'
    }
  ];

  const defaultDetails = [
    // 임플란트
    { id: 'implant-general', title: '일반 임플란트', category: 'implant', description: '단일 치아 임플란트', order: 1, status: '활성' },
    { id: 'implant-immediate', title: '즉시 임플란트', category: 'implant', description: '발치 후 즉시 식립', order: 2, status: '활성' },
    { id: 'implant-navigation', title: '네비게이션 임플란트', category: 'implant', description: '정밀 가이드 시술', order: 3, status: '활성' },
    { id: 'implant-allon4', title: 'All-on-4', category: 'implant', description: '전악 임플란트', order: 4, status: '활성' },
    { id: 'implant-bone', title: '뼈이식 임플란트', category: 'implant', description: '골이식 동반 시술', order: 5, status: '활성' },
    { id: 'implant-sinus', title: '상악동거상술', category: 'implant', description: '상악 임플란트 전용', order: 6, status: '활성' },
    
    // 교정치료
    { id: 'ortho-invisible', title: '투명교정', category: 'orthodontics', description: '인비절라인', order: 1, status: '활성' },
    { id: 'ortho-lingual', title: '설측교정', category: 'orthodontics', description: '혀쪽 브라켓', order: 2, status: '활성' },
    { id: 'ortho-partial', title: '부분교정', category: 'orthodontics', description: '앞니 교정', order: 3, status: '활성' },
    { id: 'ortho-adult', title: '성인교정', category: 'orthodontics', description: '성인 전용 교정', order: 4, status: '활성' },
    { id: 'ortho-ceramic', title: '세라믹교정', category: 'orthodontics', description: '투명 브라켓', order: 5, status: '활성' },
    { id: 'ortho-self', title: '셀프라이게이션', category: 'orthodontics', description: '빠른 교정', order: 6, status: '활성' },
    
    // 심미치료
    { id: 'aesthetic-laminate', title: '라미네이트', category: 'aesthetic', description: '앞니 성형', order: 1, status: '활성' },
    { id: 'aesthetic-crown', title: '올세라믹', category: 'aesthetic', description: '자연스러운 크라운', order: 2, status: '활성' },
    { id: 'aesthetic-whitening', title: '치아미백', category: 'aesthetic', description: '전문 미백 시술', order: 3, status: '활성' },
    { id: 'aesthetic-gum', title: '잇몸성형', category: 'aesthetic', description: '잇몸라인 교정', order: 4, status: '활성' },
    { id: 'aesthetic-inlay', title: '인레이/온레이', category: 'aesthetic', description: '심미 충전재', order: 5, status: '활성' },
    { id: 'aesthetic-veneer', title: '베니어', category: 'aesthetic', description: '얇은 도재 부착', order: 6, status: '활성' },
    
    // 일반진료
    { id: 'general-cavity', title: '충치치료', category: 'general', description: '레진/아말감', order: 1, status: '활성' },
    { id: 'general-root', title: '신경치료', category: 'general', description: '근관치료', order: 2, status: '활성' },
    { id: 'general-perio', title: '잇몸치료', category: 'general', description: '치주치료', order: 3, status: '활성' },
    { id: 'general-scaling', title: '스케일링', category: 'general', description: '치석제거', order: 4, status: '활성' },
    { id: 'general-extraction', title: '사랑니발치', category: 'general', description: '매복치 발치', order: 5, status: '활성' },
    { id: 'general-denture', title: '틀니', category: 'general', description: '부분/완전틀니', order: 6, status: '활성' }
  ];

  // 진료과목 카테고리 및 세부 진료과목 데이터 (CMS에서 전달받음)
  const categoryMap = React.useMemo(() => {
    // 항상 기본 데이터를 사용하여 메뉴가 표시되도록 함
    const categories = defaultCategories; // 먼저 기본 데이터를 사용
    const details = defaultDetails;

    // Safe logging without circular references  
    console.log('=== Navigation Debug START ===');
    console.log('treatmentCategories prop:', treatmentCategories?.length || 0);
    console.log('treatmentDetails prop:', treatmentDetails?.length || 0);
    console.log('defaultCategories:', categories.length);
    console.log('defaultDetails:', details.length);

    const result = categories
      .filter(cat => cat.status === '활성')
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map(category => {
        const categoryTreatments = details
          .filter(detail => detail.category === category.id && detail.status === '활성')
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map(detail => ({
            id: detail.id,
            name: detail.title || detail.name,
            description: detail.description
          }));

        console.log(`Building category: ${category.title} (${categoryTreatments.length} treatments)`);

        return {
          id: category.id,
          title: category.title,
          icon: getIconComponent(category.icon),
          color: category.color || 'text-blue-600',
          treatments: categoryTreatments
        };
      });

    console.log('=== Final categoryMap ===');
    console.log('Total categories:', result.length);
    result.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.title}: ${cat.treatments.length} treatments`);
    });
    console.log('=== Navigation Debug END ===');
    
    return result;
  }, [treatmentCategories, treatmentDetails]);

  const menuItems = [
    { 
      id: 'about', 
      label: '병원소개', 
      page: 'about',
      icon: <Building2 className="w-4 h-4" />,
      color: 'text-blue-600',
      hasSubmenu: true,
      submenu: [
        { id: 'about', label: '병원소개', page: 'about' },
        { id: 'doctors', label: '의료진 소개', page: 'doctors' },
        { id: 'gallery', label: '병원시설', page: 'gallery' },
        { id: 'location', label: '찾아오시는길', page: 'location' }
      ]
    },
    { 
      id: 'services', 
      label: '진료과목', 
      page: 'services',
      icon: <Stethoscope className="w-4 h-4" />,
      color: 'text-indigo-600',
      hasSubmenu: true
    },
    { 
      id: 'notice', 
      label: '공지사항', 
      page: 'notice',
      icon: <MessageCircle className="w-4 h-4" />,
      color: 'text-purple-600',
      hasSubmenu: true,
      submenu: [
        { id: 'notice', label: '공지사항', page: 'notice' },
        { id: 'reviews', label: '치료후기', page: 'reviews' }
      ]
    },
    { 
      id: 'appointment', 
      label: '예약·상담', 
      page: 'appointment',
      icon: <Calendar className="w-4 h-4" />,
      color: 'text-orange-600',
      hasSubmenu: true,
      submenu: [
        { id: 'appointment', label: '온라인 예약', page: 'appointment' },
        { id: 'contact', label: '상담 문의', page: 'contact' }
      ]
    }
  ];

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    setIsOpen(false);
    setHoveredMenu(null);
  };

  const toggleMobileMenu = (menuId: string) => {
    setMobileOpenMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
      } else {
        newSet.add(menuId);
      }
      return newSet;
    });
  };

  // 외부 클릭 시 드랍다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setHoveredMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 페이지 변경 시 모든 드랍다운 닫기
  useEffect(() => {
    setHoveredMenu(null);
    setMobileOpenMenus(new Set());
  }, [currentPage]);

  return (
    <div ref={navRef} className="fixed top-0 left-0 right-0 z-[9998] w-full">
      {/* Top Info Bar - Full Width */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100 py-2 w-full backdrop-blur-sm">
        <div className="px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-2 md:mb-0">
            <div className="flex items-center text-blue-800">
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-semibold">031-651-3054</span>
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin className="w-4 h-4 mr-2" />
              <span>경기도 평택시 평택로 102, 3층</span>
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>평일 09:00~18:00 | 토요일 09:00~13:00 | 일요일 휴진</span>
          </div>
        </div>
      </div>

      {/* Main Navigation - Full Width */}
      <nav className="bg-white backdrop-blur-sm shadow-lg border-b border-blue-100 w-full">
        <div className="px-6 lg:px-12">
          <div className="flex justify-between items-center py-5">
            {/* Logo */}
            <Logo 
              size="lg" 
              onClick={() => handleNavClick('home')}
              className="group-hover:shadow-xl"
            />

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <div 
                  key={item.id} 
                  className="relative"
                  onMouseEnter={() => {
                    if (item.hasSubmenu) {
                      console.log(`Mouse enter on ${item.label} (${item.id})`);
                      if (timeoutId) {
                        clearTimeout(timeoutId);
                        setTimeoutId(null);
                      }
                      // 호버로 메뉴 열기 (클릭으로 열린 메뉴와 구별 없이)
                      setHoveredMenu(item.id);
                      console.log(`Set hoveredMenu to: ${item.id}`);
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.hasSubmenu) {
                      const newTimeoutId = setTimeout(() => {
                        setHoveredMenu(null);
                      }, 150);
                      setTimeoutId(newTimeoutId);
                    }
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(`Clicked on ${item.label} (${item.id}), hasSubmenu: ${item.hasSubmenu}`);
                      
                      if (!item.hasSubmenu) {
                        handleNavClick(item.page);
                      } else {
                        // 서브메뉴가 있는 경우 드랍다운 토글
                        if (timeoutId) {
                          clearTimeout(timeoutId);
                          setTimeoutId(null);
                        }
                        
                        if (item.id === 'services') {
                          console.log('Toggling services menu');
                          setForceShowServices(!forceShowServices);
                        }
                        
                        if (hoveredMenu === item.id) {
                          setHoveredMenu(null);
                          console.log('Closed hoveredMenu');
                        } else {
                          setHoveredMenu(item.id);
                          console.log(`Set hoveredMenu to: ${item.id}`);
                        }
                      }
                    }}
                    className={`
                      flex items-center space-x-2 px-4 py-3 rounded-xl
                      transition-all duration-300 group relative overflow-hidden cursor-pointer
                      ${hoveredMenu === item.id
                        ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold shadow-sm border border-blue-200'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                      }
                    `}
                  >
                    <span className={`${item.color} group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </span>
                    <span className="whitespace-nowrap font-medium">{item.label}</span>
                    {item.hasSubmenu && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        hoveredMenu === item.id ? 'rotate-180' : ''
                      }`} />
                    )}
                    
                    {/* 호버 효과 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/10 transition-all duration-300 rounded-xl"></div>
                  </button>

                  {/* 진료과목 메가 메뉴 */}
                  {item.id === 'services' && item.hasSubmenu && (hoveredMenu === item.id || forceShowServices) && (
                    console.log(`Rendering mega menu - item.id: ${item.id}, hasSubmenu: ${item.hasSubmenu}, hoveredMenu: ${hoveredMenu}, force: ${forceShowServices}`) ||
                    <div 
                      className="absolute top-full left-0 w-[800px] bg-white shadow-2xl border border-gray-200 rounded-2xl mt-2 p-8 z-50 animate-dropdown"
                      style={{ 
                        transform: 'translateX(0)',
                        maxWidth: 'calc(100vw - 4rem)',
                        left: 'max(-300px, calc(50% - 400px))',
                        right: 'auto'
                      }}
                      onMouseEnter={() => {
                        if (timeoutId) {
                          clearTimeout(timeoutId);
                          setTimeoutId(null);
                        }
                        setHoveredMenu(item.id);
                      }}
                      onMouseLeave={() => {
                        const newTimeoutId = setTimeout(() => {
                          setHoveredMenu(null);
                        }, 150);
                        setTimeoutId(newTimeoutId);
                      }}
                    >
                      {categoryMap && categoryMap.length > 0 ? (
                        <>
                          <div className="text-center mb-4 text-sm text-blue-600 font-medium">
                            {categoryMap.length}개 진료분야 | 총 {categoryMap.reduce((total, cat) => total + (cat.treatments?.length || 0), 0)}개 세부진료
                          </div>
                          <div className="grid grid-cols-4 gap-6">
                            {categoryMap.map((category) => (
                              <div key={category.id} className="space-y-4">
                                <div className="flex items-center space-x-3 mb-4">
                                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center ${category.color}`}>
                                    {category.icon}
                                  </div>
                                  <h3 className="font-bold text-gray-900">{category.title}</h3>
                                </div>
                                <div className="space-y-2">
                                  {category.treatments && category.treatments.length > 0 ? (
                                    category.treatments.map((treatment) => (
                                      <button
                                        key={treatment.id}
                                        onClick={() => {
                                          console.log('Navigating to:', treatment.id);
                                          handleNavClick(treatment.id);
                                          setHoveredMenu(null);
                                        }}
                                        className="block w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                                      >
                                        <div className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                                          {treatment.name}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                          {treatment.description}
                                        </div>
                                      </button>
                                    ))
                                  ) : (
                                    <div className="text-sm text-gray-500 p-3 italic">
                                      {category.title} 준비 중
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* 하단 CTA */}
                          <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1">진료 상담이 필요하신가요?</h4>
                                <p className="text-sm text-gray-600">전문의와 1:1 맞춤 상담을 받아보세요</p>
                              </div>
                              <div className="flex space-x-3">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    handleNavClick('contact');
                                    setHoveredMenu(null);
                                  }}
                                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                                >
                                  상담 문의
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    handleNavClick('appointment');
                                    setHoveredMenu(null);
                                  }}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  예약하기
                                </Button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-12">
                          <Stethoscope className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">진료과목 데이터 없음</h3>
                          <p className="text-gray-600">
                            Categories: {treatmentCategories?.length || 0} | 
                            Details: {treatmentDetails?.length || 0}
                          </p>
                          <div className="mt-4 text-sm text-red-500">
                            DEBUG: categoryMap.length = {categoryMap.length}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 일반 서브메뉴 (병원소개, 공지사항, 예약상담) */}
                  {item.id !== 'services' && item.hasSubmenu && item.submenu && hoveredMenu === item.id && (
                    <div 
                      className="absolute top-full left-0 bg-white shadow-2xl border border-gray-200 rounded-xl mt-2 p-4 z-50 min-w-[200px] animate-dropdown"
                      style={{ 
                        transform: 'translateX(0)',
                        transformOrigin: 'top left',
                        right: 'auto'
                      }}
                      onMouseEnter={() => {
                        if (timeoutId) {
                          clearTimeout(timeoutId);
                          setTimeoutId(null);
                        }
                        setHoveredMenu(item.id);
                      }}
                      onMouseLeave={() => {
                        const newTimeoutId = setTimeout(() => {
                          setHoveredMenu(null);
                        }, 150);
                        setTimeoutId(newTimeoutId);
                      }}
                    >
                      <div className="space-y-2">
                        {item.submenu.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              handleNavClick(subItem.page);
                              setHoveredMenu(null);
                            }}
                            className="block w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                          >
                            <div className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                              {subItem.label}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA Button & User Section */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mr-4">
                <div className="flex items-center bg-blue-50 rounded-full px-3 py-1">
                  <Phone className="w-3 h-3 mr-1 text-blue-600" />
                  <span className="font-semibold text-blue-800">031-651-3054</span>
                </div>
              </div>
              <Button 
                onClick={() => handleNavClick('appointment')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-2.5 rounded-xl font-semibold"
              >
                <Calendar className="w-4 h-4 mr-2" />
                예약하기
              </Button>
              
              {/* Enhanced User Section */}
              {user ? (
                <div className="flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-4 py-2 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-700">{user.name}님</span>
                  </div>
                  {onAdminAccess && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={onAdminAccess}
                      className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={onLogout}
                    className="border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    로그아웃
                  </Button>
                </div>
              ) : (
                onShowLogin && (
                  <Button 
                    onClick={onShowLogin}
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200"
                  >
                    <User className="w-4 h-4 mr-2" />
                    로그인
                  </Button>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile User Section */}
              {user ? (
                <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-1">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-700">{user.name}</span>
                  {onLogout && (
                    <Button size="sm" variant="ghost" onClick={onLogout} className="text-xs px-2 py-1 h-auto">
                      로그아웃
                    </Button>
                  )}
                </div>
              ) : (
                onShowLogin && (
                  <Button 
                    onClick={onShowLogin}
                    size="sm"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    로그인
                  </Button>
                )
              )}
              
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="shadow-sm">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                  <VisuallyHidden>
                    <SheetTitle>메뉴</SheetTitle>
                    <SheetDescription>사이트 메뉴를 탐색하고 페이지를 선택하세요</SheetDescription>
                  </VisuallyHidden>
                  <div className="flex flex-col space-y-2 mt-6">
                    {menuItems.map((item) => (
                      <div key={item.id}>
                        {item.hasSubmenu ? (
                          <div className="space-y-2">
                            <button
                              onClick={() => toggleMobileMenu(item.id)}
                              className="flex items-center space-x-3 py-4 px-4 text-gray-700 font-semibold w-full text-left hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <span className={item.color}>
                                {item.icon}
                              </span>
                              <span>{item.label}</span>
                              <ChevronDown className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                                mobileOpenMenus.has(item.id) ? 'rotate-180' : ''
                              }`} />
                            </button>
                            {mobileOpenMenus.has(item.id) && (
                              <div className="ml-4 space-y-1">
                              {item.id === 'services' ? (
                                // 진료과목용 메뉴
                                categoryMap && categoryMap.length > 0 ? (
                                  <>
                                    <div className="text-xs text-blue-600 font-medium py-2 px-3">
                                      {categoryMap.length}개 진료분야
                                    </div>
                                    {categoryMap.map((category) => (
                                      <div key={category.id} className="space-y-1">
                                        <div className="flex items-center space-x-2 py-2 px-3 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg">
                                          <span className={category.color}>
                                            {category.icon}
                                          </span>
                                          <span>{category.title}</span>
                                          <span className="text-xs text-gray-400 ml-auto">
                                            {category.treatments?.length || 0}개
                                          </span>
                                        </div>
                                        <div className="ml-6 space-y-1">
                                          {category.treatments && category.treatments.length > 0 ? 
                                            category.treatments.map((treatment) => (
                                              <button
                                                key={treatment.id}
                                                onClick={() => {
                                                  console.log('Mobile navigating to:', treatment.id);
                                                  handleNavClick(treatment.id);
                                                }}
                                                className="block w-full text-left py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                              >
                                                {treatment.name}
                                              </button>
                                            )) : (
                                              <div className="text-sm text-gray-500 py-2 px-3">{category.title} 준비 중</div>
                                            )
                                          }
                                        </div>
                                      </div>
                                    ))}
                                  </>
                                ) : (
                                  <div className="text-sm text-gray-500 py-2 px-3">
                                    <div className="animate-pulse">데이터 로딩 중...</div>
                                  </div>
                                )
                              ) : (
                                // 일반 서브메뉴
                                item.submenu?.map((subItem) => (
                                  <button
                                    key={subItem.id}
                                    onClick={() => handleNavClick(subItem.page)}
                                    className="block w-full text-left py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  >
                                    {subItem.label}
                                  </button>
                                ))
                              )}
                              </div>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() => handleNavClick(item.page)}
                            className={`
                              flex items-center space-x-3 w-full text-left py-4 px-4 rounded-xl 
                              hover:bg-blue-50 transition-all duration-200 group
                              ${currentPage === item.page || currentPage === item.id ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'}
                            `}
                          >
                            <span className={`${item.color} group-hover:scale-110 transition-transform duration-200`}>
                              {item.icon}
                            </span>
                            <span>{item.label}</span>
                          </button>
                        )}
                      </div>
                    ))}
                    <Button 
                      onClick={() => handleNavClick('appointment')}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 w-full mt-6 py-3 rounded-xl shadow-lg"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      온라인 예약
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}