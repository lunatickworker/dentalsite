import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Camera, ArrowRight, Eye, Calendar, MessageSquare,
  Move3D, RotateCcw, Play, X, Building2
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Breadcrumb, { getBreadcrumbForPage } from './Breadcrumb';

interface GalleryPageProps {
  onPageChange: (page: string) => void;
}

// 360도 파노라마 뷰어 컴포넌트
function PanoramaViewer({ src, onClose }: { src: string; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 크기 설정
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 파노라마 이미지 로드 및 렌더링
    const img = new Image();
    img.onload = () => {
      setIsLoading(false);
      renderPanorama();
    };
    img.src = src;

    const renderPanorama = () => {
      if (!ctx || !img.complete) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 간단한 파노라마 효과 시뮬레이션
      const offsetX = (rotation.y * 2) % canvas.width;
      
      ctx.save();
      ctx.drawImage(img, -offsetX, 0, canvas.width * 2, canvas.height);
      ctx.drawImage(img, canvas.width - offsetX, 0, canvas.width * 2, canvas.height);
      ctx.restore();
    };

    const animate = () => {
      renderPanorama();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [rotation, src]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;

    setRotation(prev => ({
      x: Math.max(-90, Math.min(90, prev.x + deltaY * 0.5)),
      y: prev.y + deltaX * 0.5
    }));

    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-black rounded-lg overflow-hidden">
        {/* 헤더 */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <Move3D className="w-6 h-6" />
              <h3 className="text-lg font-semibold">진료실 360° 파노라마 뷰</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={resetView}
                variant="outline"
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                초기화
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* 파노라마 캔버스 */}
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />

        {/* 로딩 상태 */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-700">파노라마 뷰 로딩 중...</p>
            </div>
          </div>
        )}

        {/* 하단 컨트롤 */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="text-center text-white">
            <p className="text-sm opacity-75 mb-2">
              마우스로 드래그하여 360도로 둘러보세요
            </p>
            <div className="flex justify-center space-x-4 text-xs">
              <span>회전: {Math.round(rotation.y)}°</span>
              <span>기울기: {Math.round(rotation.x)}°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage({ onPageChange }: GalleryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPanorama, setShowPanorama] = useState(false);
  const [panoramaImage, setPanoramaImage] = useState('');
  
  const galleryItems = [
    {
      id: 1,
      title: '현대적인 진료실',
      category: 'clinic',
      description: '최첨단 장비를 갖춘 쾌적한 진료실',
      image: 'https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZW50YWwlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTYyNzkzODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: '2024-12-10',
      type: '시설안내',
      has360: true
    },
    {
      id: 2,
      title: '1번 진료실 360° 뷰',
      category: 'clinic',
      description: '1번 진료실을 360도로 둘러보세요',
      image: 'https://images.unsplash.com/photo-1565090567208-c8038cfcf6cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZW50aXN0JTIwdHJlYXRtZW50fGVufDF8fHx8MTc1NjM2MDk4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: '2024-12-08',
      type: '360° 뷰',
      has360: true
    },
    {
      id: 3,
      title: '편안한 대기실',
      category: 'clinic',
      description: '환자분들이 편안하게 대기할 수 있는 공간',
      image: 'https://images.unsplash.com/photo-1600721187850-c944924fd48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjB3YWl0aW5nJTIwcm9vbXxlbnwxfHx8fDE3NTYzNTUxNDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: '2024-12-08',
      type: '시설안내',
      has360: false
    },
    {
      id: 4,
      title: '3D CT 장비',
      category: 'equipment',
      description: '정밀한 진단을 위한 최신 3D CT',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBlcXVpcG1lbnQlMjBtZWRpY2FsJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTYzNjA5OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: '2024-12-05',
      type: '장비소개',
      has360: false
    },
    {
      id: 5,
      title: '디지털 구강 스캐너',
      category: 'equipment',
      description: '불편함 없는 정밀 스캔 시스템',
      image: 'https://images.unsplash.com/photo-1565090567208-c8038cfcf6cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZW50aXN0JTIwdHJlYXRtZW50fGVufDF8fHx8MTc1NjM2MDk4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: '2024-12-03',
      type: '장비소개',
      has360: false
    },
    {
      id: 6,
      title: '멸균 시설',
      category: 'clinic',
      description: '철저한 감염관리 시스템',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBlcXVpcG1lbnQlMjBtZWRpY2FsJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTYzNjA5OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: '2024-11-25',
      type: '시설안내',
      has360: false
    },
    {
      id: 7,
      title: '2번 진료실 360° 뷰',
      category: 'clinic',
      description: '2번 진료실을 360도로 둘러보세요',
      image: 'https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZW50YWwlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTYyNzkzODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: '2024-11-20',
      type: '360° 뷰',
      has360: true
    },
    {
      id: 8,
      title: '임플란트 치료 전후',
      category: 'before-after',
      description: '상악 전치부 임플란트 치료 결과',
      image: 'https://images.unsplash.com/photo-1565090567208-c8038cfcf6cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZW50aXN0JTIwdHJlYXRtZW50fGVufDF8fHx8MTc1NjM2MDk4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: '2024-12-20',
      type: '치료사례',
      has360: false
    },
    {
      id: 9,
      title: '투명교정 치료 과정',
      category: 'before-after',
      description: '3개월차 투명교정 진행 상황',
      image: 'https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZW50YWwlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTYyNzkzODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      date: '2024-12-18',
      type: '치료사례',
      has360: false
    }
  ];

  const categories = [
    { id: 'all', name: '전체', count: galleryItems.length },
    { id: 'clinic', name: '진료실', count: galleryItems.filter(item => item.category === 'clinic').length },
    { id: 'equipment', name: '의료장비', count: galleryItems.filter(item => item.category === 'equipment').length },
    { id: 'before-after', name: '치료사례', count: galleryItems.filter(item => item.category === 'before-after').length }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const open360View = (image: string) => {
    setPanoramaImage(image);
    setShowPanorama(true);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Breadcrumb 
              items={getBreadcrumbForPage('gallery')} 
              onPageChange={onPageChange} 
            />
          </div>

          <div>
            <div className="mb-6">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                <Building2 className="w-4 h-4 mr-2" />
                병원시설
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              병원시설
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              최첨단 시설과 쾌적한 환경을 확인하세요
            </p>

            {/* Key Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Eye className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold">총 사진</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{galleryItems.length}장</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Building2 className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold">진료실</span>
                </div>
                <div className="text-2xl font-bold text-green-600">{categories.find(c => c.id === 'clinic')?.count}장</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-2">
                  <Move3D className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-semibold">360° 뷰</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">{galleryItems.filter(item => item.has360).length}개</div>
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
              
              {/* Gallery Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="bg-white shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-200 group">
                    <div className="relative h-64 overflow-hidden">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-gray-700">
                          {item.type}
                        </Badge>
                      </div>
                      
                      {/* 360도 뷰 표시 */}
                      {item.has360 && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-purple-500 text-white">
                            <Move3D className="w-3 h-3 mr-1" />
                            360°
                          </Badge>
                        </div>
                      )}
                      
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1 bg-white/90 text-gray-800 hover:bg-white">
                            <Eye className="w-4 h-4 mr-2" />
                            자세히 보기
                          </Button>
                          {item.has360 && (
                            <Button 
                              size="sm" 
                              onClick={() => open360View(item.image)}
                              className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                              <Move3D className="w-4 h-4 mr-2" />
                              360° 뷰
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {item.description}
                      </p>
                      {item.has360 && (
                        <div className="flex items-center text-purple-600 text-sm">
                          <Play className="w-4 h-4 mr-2" />
                          <span>360도 파노라마 뷰 체험 가능</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>


            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <Card className="bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-900">상담 예약</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-blue-800 text-sm">
                    실제 시설을 직접 보고 싶으신가요?
                  </p>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => onPageChange('appointment')}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    상담 예약하기
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => onPageChange('reviews')}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    후기 더 보기
                  </Button>
                </CardContent>
              </Card>

              {/* Category Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>카테고리별 갤러리</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">치료전후</span>
                      <span className="font-medium">{categories.find(c => c.id === 'before-after')?.count}장</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">진료실</span>
                      <span className="font-medium">{categories.find(c => c.id === 'clinic')?.count}장</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">의료장비</span>
                      <span className="font-medium">{categories.find(c => c.id === 'equipment')?.count}장</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-purple-600">360° 뷰</span>
                      <span className="font-medium text-purple-600">{galleryItems.filter(item => item.has360).length}개</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Treatments */}
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
                      onClick={() => onPageChange('aesthetic-laminate')}
                      className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                            라미네이트
                          </h4>
                          <p className="text-sm text-gray-500">자연스러운 심미치료</p>
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
            최첨단 시설에서 안전한 치료를 받으세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            편안하고 안전한 진료 환경에서 전문의의 치료를 받아보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => onPageChange('appointment')}
            >
              <Calendar className="w-5 h-5 mr-2" />
              상담 예약하기
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => onPageChange('reviews')}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              후기 더 보기
            </Button>
          </div>
        </div>
      </section>

      {/* 360도 파노라마 뷰어 모달 */}
      {showPanorama && (
        <PanoramaViewer
          src={panoramaImage}
          onClose={() => setShowPanorama(false)}
        />
      )}
    </div>
  );
}