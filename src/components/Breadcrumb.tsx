import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from './ui/button';

interface BreadcrumbItem {
  label: string;
  page?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onPageChange: (page: string) => void;
}

export default function Breadcrumb({ items, onPageChange }: BreadcrumbProps) {
  const breadcrumbMap: { [key: string]: BreadcrumbItem[] } = {
    'home': [{ label: '홈' }],
    'about': [{ label: '홈', page: 'home' }, { label: '병원소개' }],
    'doctors': [{ label: '홈', page: 'home' }, { label: '병원소개', page: 'about' }, { label: '의료진소개' }],
    'facilities': [{ label: '홈', page: 'home' }, { label: '병원소개', page: 'about' }, { label: '시설안내' }],
    'gallery': [{ label: '홈', page: 'home' }, { label: '병원소개', page: 'about' }, { label: '병원시설' }],
    'location': [{ label: '홈', page: 'home' }, { label: '병원소개', page: 'about' }, { label: '진료시간/오시는길' }],
    'services': [{ label: '홈', page: 'home' }, { label: '진료과목' }],
    'reviews': [{ label: '홈', page: 'home' }, { label: '치료후기' }],
    'notice': [{ label: '홈', page: 'home' }, { label: '공지사항' }],
    'appointment': [{ label: '홈', page: 'home' }, { label: '진료예약' }],
    'contact': [{ label: '홈', page: 'home' }, { label: '상담문의' }],
    
    // 임플란트
    'implant-general': [{ label: '홈', page: 'home' }, { label: '임플란트' }, { label: '일반 임플란트' }],
    'implant-immediate': [{ label: '홈', page: 'home' }, { label: '임플란트' }, { label: '즉시 임플란트' }],
    'implant-navigation': [{ label: '홈', page: 'home' }, { label: '임플란트' }, { label: '네비게이션 임플란트' }],
    'implant-allon4': [{ label: '홈', page: 'home' }, { label: '임플란트' }, { label: 'All-on-4' }],
    
    // 교정치료
    'ortho-invisible': [{ label: '홈', page: 'home' }, { label: '교정치료' }, { label: '투명교정' }],
    'ortho-lingual': [{ label: '홈', page: 'home' }, { label: '교정치료' }, { label: '설측교정' }],
    'ortho-partial': [{ label: '홈', page: 'home' }, { label: '교정치료' }, { label: '부분교정' }],
    'ortho-adult': [{ label: '홈', page: 'home' }, { label: '교정치료' }, { label: '성인교정' }],
    
    // 심미치료
    'aesthetic-laminate': [{ label: '홈', page: 'home' }, { label: '심미치료' }, { label: '라미네이트' }],
    'aesthetic-crown': [{ label: '홈', page: 'home' }, { label: '심미치료' }, { label: '올세라믹' }],
    'aesthetic-whitening': [{ label: '홈', page: 'home' }, { label: '심미치료' }, { label: '화이트닝' }],
    'aesthetic-gum': [{ label: '홈', page: 'home' }, { label: '심미치료' }, { label: '잇몸성형' }],
    
    // 일반진료
    'general-cavity': [{ label: '홈', page: 'home' }, { label: '일반진료' }, { label: '충치치료' }],
    'general-root': [{ label: '홈', page: 'home' }, { label: '일반진료' }, { label: '신경치료' }],
    'general-perio': [{ label: '홈', page: 'home' }, { label: '일반진료' }, { label: '잇몸치료' }],
    'general-scaling': [{ label: '홈', page: 'home' }, { label: '일반진료' }, { label: '스케일링' }]
  };

  // items가 제공되지 않은 경우 현재 페이지 기반으로 breadcrumb 생성
  const currentItems = items.length > 0 ? items : breadcrumbMap['home'] || [{ label: '홈' }];

  if (currentItems.length <= 1) {
    return null; // 홈페이지이거나 breadcrumb이 필요 없는 경우
  }

  return (
    <nav className="flex items-center space-x-2 text-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange('home')}
        className="p-1 h-auto text-gray-600 hover:text-blue-600"
      >
        <Home className="w-4 h-4" />
      </Button>
      
      {currentItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
          
          {item.page ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(item.page!)}
              className="p-1 h-auto text-gray-600 hover:text-blue-600"
            >
              {item.label}
            </Button>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

// 페이지별 breadcrumb을 자동으로 가져오는 헬퍼 함수
export function getBreadcrumbForPage(currentPage: string): BreadcrumbItem[] {
  const breadcrumbMap: { [key: string]: BreadcrumbItem[] } = {
    'home': [],
    'about': [{ label: '홈', page: 'home' }, { label: '병원소개' }],
    'doctors': [{ label: '홈', page: 'home' }, { label: '병원소개', page: 'about' }, { label: '의료진소개' }],
    'facilities': [{ label: '홈', page: 'home' }, { label: '병원소개', page: 'about' }, { label: '시설안내' }],
    'gallery': [{ label: '홈', page: 'home' }, { label: '병원소개', page: 'about' }, { label: '병원시설' }],
    'location': [{ label: '홈', page: 'home' }, { label: '병원소개', page: 'about' }, { label: '진료시간/오시는길' }],
    'services': [{ label: '홈', page: 'home' }, { label: '진료과목' }],
    'reviews': [{ label: '홈', page: 'home' }, { label: '치료후기' }],
    'notice': [{ label: '홈', page: 'home' }, { label: '공지사항' }],
    'appointment': [{ label: '홈', page: 'home' }, { label: '진료예약' }],
    'contact': [{ label: '홈', page: 'home' }, { label: '상담문의' }],
    
    // 임플란트
    'implant-general': [{ label: '홈', page: 'home' }, { label: '임플란트' }, { label: '일반 임플란트' }],
    'implant-immediate': [{ label: '홈', page: 'home' }, { label: '임플란트' }, { label: '즉시 임플란트' }],
    'implant-navigation': [{ label: '홈', page: 'home' }, { label: '임플란트' }, { label: '네비게이션 임플란트' }],
    'implant-allon4': [{ label: '홈', page: 'home' }, { label: '임플란트' }, { label: 'All-on-4' }],
    
    // 교정치료
    'ortho-invisible': [{ label: '홈', page: 'home' }, { label: '교정치료' }, { label: '투명교정' }],
    'ortho-lingual': [{ label: '홈', page: 'home' }, { label: '교정치료' }, { label: '설측교정' }],
    'ortho-partial': [{ label: '홈', page: 'home' }, { label: '교정치료' }, { label: '부분교정' }],
    'ortho-adult': [{ label: '홈', page: 'home' }, { label: '교정치료' }, { label: '성인교정' }],
    
    // 심미치료
    'aesthetic-laminate': [{ label: '홈', page: 'home' }, { label: '심미치료' }, { label: '라미네이트' }],
    'aesthetic-crown': [{ label: '홈', page: 'home' }, { label: '심미치료' }, { label: '올세라믹' }],
    'aesthetic-whitening': [{ label: '홈', page: 'home' }, { label: '심미치료' }, { label: '화이트닝' }],
    'aesthetic-gum': [{ label: '홈', page: 'home' }, { label: '심미치료' }, { label: '잇몸성형' }],
    
    // 일반진료
    'general-cavity': [{ label: '홈', page: 'home' }, { label: '일반진료' }, { label: '충치치료' }],
    'general-root': [{ label: '홈', page: 'home' }, { label: '일반진료' }, { label: '신경치료' }],
    'general-perio': [{ label: '홈', page: 'home' }, { label: '일반진료' }, { label: '잇몸치료' }],
    'general-scaling': [{ label: '홈', page: 'home' }, { label: '일반진료' }, { label: '스케일링' }]
  };

  return breadcrumbMap[currentPage] || [];
}