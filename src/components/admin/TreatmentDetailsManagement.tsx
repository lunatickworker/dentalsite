import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { 
  Plus, Edit, Trash2, Save, X, Settings, Search, ArrowUp, ArrowDown, Filter
} from 'lucide-react';

interface TreatmentDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  order: number;
  status: '활성' | '비활성';
  price?: string;
  duration?: string;
  createdAt?: string;
  updatedAt?: string;
}

const TREATMENT_CATEGORIES = [
  { id: 'implant', title: '임플란트' },
  { id: 'orthodontics', title: '교정치료' },
  { id: 'aesthetic', title: '심미치료' },
  { id: 'general', title: '일반진료' }
];

export default function TreatmentDetailsManagement() {
  const [treatmentDetails, setTreatmentDetails] = useState<TreatmentDetail[]>([
    // 임플란트
    { id: 'implant-general', title: '일반 임플란트', category: 'implant', description: '단일 치아 임플란트', order: 1, status: '활성', price: '1,200,000원', duration: '3개월' },
    { id: 'implant-immediate', title: '즉시 임플란트', category: 'implant', description: '발치 후 즉시 식립', order: 2, status: '활성', price: '1,500,000원', duration: '2개월' },
    { id: 'implant-navigation', title: '네비게이션 임플란트', category: 'implant', description: '정밀 가이드 시술', order: 3, status: '활성', price: '1,800,000원', duration: '3개월' },
    { id: 'implant-allon4', title: 'All-on-4', category: 'implant', description: '전악 임플란트', order: 4, status: '활성', price: '15,000,000원', duration: '6개월' },
    
    // 교정치료
    { id: 'ortho-invisible', title: '투명교정', category: 'orthodontics', description: '인비절라인', order: 1, status: '활성', price: '6,000,000원', duration: '18개월' },
    { id: 'ortho-lingual', title: '설측교정', category: 'orthodontics', description: '혀쪽 브라켓', order: 2, status: '활성', price: '8,000,000원', duration: '24개월' },
    { id: 'ortho-partial', title: '부분교정', category: 'orthodontics', description: '앞니 교정', order: 3, status: '활성', price: '2,500,000원', duration: '12개월' },
    
    // 심미치료
    { id: 'aesthetic-laminate', title: '라미네이트', category: 'aesthetic', description: '앞니 성형', order: 1, status: '활성', price: '700,000원', duration: '2주' },
    { id: 'aesthetic-crown', title: '올세라믹', category: 'aesthetic', description: '자연스러운 크라운', order: 2, status: '활성', price: '800,000원', duration: '2주' },
    { id: 'aesthetic-whitening', title: '치아미백', category: 'aesthetic', description: '전문 미백 시술', order: 3, status: '활성', price: '400,000원', duration: '1주' },
    
    // 일반진료
    { id: 'general-cavity', title: '충치치료', category: 'general', description: '레진/아말감', order: 1, status: '활성', price: '150,000원', duration: '1일' },
    { id: 'general-root', title: '신경치료', category: 'general', description: '근관치료', order: 2, status: '활성', price: '400,000원', duration: '2주' },
    { id: 'general-scaling', title: '스케일링', category: 'general', description: '치석제거', order: 3, status: '활성', price: '100,000원', duration: '1일' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('전체');
  const [statusFilter, setStatusFilter] = useState<'전체' | '활성' | '비활성'>('전체');
  const [editingDetail, setEditingDetail] = useState<TreatmentDetail | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 새 세부치료 템플릿
  const newDetailTemplate: TreatmentDetail = {
    id: '',
    title: '',
    category: 'implant',
    description: '',
    order: 1,
    status: '활성',
    price: '',
    duration: ''
  };

  // 필터링된 세부치료 목록
  const filteredDetails = treatmentDetails
    .filter(detail => {
      const matchesSearch = detail.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           detail.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === '전체' || detail.category === categoryFilter;
      const matchesStatus = statusFilter === '전체' || detail.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.order - b.order;
    });

  // 카테고리별 그룹화
  const groupedDetails = filteredDetails.reduce((groups, detail) => {
    const categoryTitle = TREATMENT_CATEGORIES.find(cat => cat.id === detail.category)?.title || detail.category;
    if (!groups[categoryTitle]) {
      groups[categoryTitle] = [];
    }
    groups[categoryTitle].push(detail);
    return groups;
  }, {} as Record<string, TreatmentDetail[]>);

  // 세부치료 저장
  const handleSaveDetail = (detail: TreatmentDetail) => {
    if (detail.id) {
      // 기존 세부치료 수정
      setTreatmentDetails(prev => prev.map(item => 
        item.id === detail.id 
          ? { ...detail, updatedAt: new Date().toISOString().split('T')[0] }
          : item
      ));
    } else {
      // 새 세부치료 추가
      const newId = `${detail.category}-${Date.now()}`;
      const categoryItems = treatmentDetails.filter(item => item.category === detail.category);
      const newOrder = Math.max(...categoryItems.map(item => item.order), 0) + 1;
      
      const newDetail = {
        ...detail,
        id: newId,
        order: newOrder,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setTreatmentDetails(prev => [...prev, newDetail]);
    }
    setIsDialogOpen(false);
    setEditingDetail(null);
  };

  // 세부치료 삭제
  const handleDeleteDetail = (detailId: string) => {
    if (confirm('정말로 이 세부진료과목을 삭제하시겠습니까?')) {
      setTreatmentDetails(prev => prev.filter(item => item.id !== detailId));
    }
  };

  // 순서 변경
  const handleMoveDetail = (detailId: string, direction: 'up' | 'down') => {
    const detail = treatmentDetails.find(item => item.id === detailId);
    if (!detail) return;

    const categoryItems = treatmentDetails.filter(item => item.category === detail.category);
    const newOrder = direction === 'up' ? detail.order - 1 : detail.order + 1;
    const swapDetail = categoryItems.find(item => item.order === newOrder);
    
    if (swapDetail) {
      setTreatmentDetails(prev => prev.map(item => {
        if (item.id === detailId) return { ...item, order: newOrder };
        if (item.id === swapDetail.id) return { ...item, order: detail.order };
        return item;
      }));
    }
  };

  // 상태 토글
  const handleToggleStatus = (detailId: string) => {
    setTreatmentDetails(prev => prev.map(item => 
      item.id === detailId 
        ? { ...item, status: item.status === '활성' ? '비활성' : '활성' }
        : item
    ));
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
              세부진료과목 관리
            </h2>
            <p className="text-gray-600 mt-2">각 진료과목의 세부 치료 항목을 관리할 수 있습니다</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
                onClick={() => setEditingDetail(newDetailTemplate)}
              >
                <Plus className="w-4 h-4 mr-2" />
                새 세부치료 추가
              </Button>
            </DialogTrigger>
            <DetailDialog 
              detail={editingDetail}
              onSave={handleSaveDetail}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingDetail(null);
              }}
            />
          </Dialog>
        </div>
      </div>

      {/* 필터 및 검색 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="세부치료명이나 설명으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="전체">전체 진료과목</SelectItem>
                {TREATMENT_CATEGORIES.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="전체">전체 상태</SelectItem>
                <SelectItem value="활성">활성</SelectItem>
                <SelectItem value="비활성">비활성</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 세부치료 목록 (카테고리별 그룹화) */}
      <div className="space-y-6">
        {Object.entries(groupedDetails).map(([categoryTitle, details]) => (
          <Card key={categoryTitle}>
            <CardHeader>
              <CardTitle className="text-lg text-indigo-700 flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>{categoryTitle}</span>
                <Badge variant="outline">{details.length}개</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {details.map((detail) => (
                  <div key={detail.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{detail.title}</h4>
                          <Badge variant={detail.status === '활성' ? 'default' : 'secondary'}>
                            {detail.status}
                          </Badge>
                          <span className="text-sm text-gray-500">#{detail.order}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{detail.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          {detail.price && <span>💰 {detail.price}</span>}
                          {detail.duration && <span>⏱️ {detail.duration}</span>}
                          {detail.createdAt && <span>📅 {detail.createdAt}</span>}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {/* 순서 변경 */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoveDetail(detail.id, 'up')}
                          disabled={detail.order === 1}
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoveDetail(detail.id, 'down')}
                          disabled={detail.order === Math.max(...details.map(d => d.order))}
                        >
                          <ArrowDown className="w-4 h-4" />
                        </Button>

                        {/* 상태 토글 */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(detail.id)}
                          className={detail.status === '활성' ? 'text-green-600' : 'text-gray-600'}
                        >
                          {detail.status}
                        </Button>

                        {/* 편집 */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingDetail(detail)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DetailDialog 
                            detail={detail}
                            onSave={handleSaveDetail}
                            onCancel={() => setEditingDetail(null)}
                          />
                        </Dialog>

                        {/* 삭제 */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteDetail(detail.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {Object.keys(groupedDetails).length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Settings className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">세부치료가 없습니다</h3>
            <p className="text-gray-600">새로운 세부치료를 추가해보세요</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// 세부치료 편집 다이얼로그
function DetailDialog({ 
  detail, 
  onSave, 
  onCancel 
}: { 
  detail: TreatmentDetail | null;
  onSave: (detail: TreatmentDetail) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<TreatmentDetail>(
    detail || {
      id: '',
      title: '',
      category: 'implant',
      description: '',
      order: 1,
      status: '활성',
      price: '',
      duration: ''
    }
  );

  React.useEffect(() => {
    if (detail) {
      setFormData(detail);
    }
  }, [detail]);

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('세부치료명을 입력해주세요.');
      return;
    }
    if (!formData.description.trim()) {
      alert('설명을 입력해주세요.');
      return;
    }
    onSave(formData);
  };

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>
          {detail?.id ? '세부치료 편집' : '새 세부치료 추가'}
        </DialogTitle>
        <DialogDescription>
          {detail?.id ? '기존 세부치료의 정보를 수정할 수 있습니다.' : '새로운 세부치료를 추가하고 카테고리, 가격, 기간 정보를 설정하세요.'}
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">세부치료명 *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="예: 일반 임플란트"
            />
          </div>
          <div>
            <Label htmlFor="category">진료과목 *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TREATMENT_CATEGORIES.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">설명 *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="세부치료에 대한 간단한 설명을 입력하세요"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="price">치료비용</Label>
            <Input
              id="price"
              value={formData.price || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              placeholder="예: 1,200,000원"
            />
          </div>
          <div>
            <Label htmlFor="duration">치료기간</Label>
            <Input
              id="duration"
              value={formData.duration || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              placeholder="예: 3개월"
            />
          </div>
          <div>
            <Label htmlFor="status">상태</Label>
            <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="활성">활성</SelectItem>
                <SelectItem value="비활성">비활성</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 미리보기 */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <Label className="text-sm font-medium text-gray-700 mb-2 block">미리보기</Label>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-gray-900">{formData.title || '세부치료명'}</h4>
              <Badge variant="default">{formData.status}</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">{formData.description || '설명'}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              {formData.price && <span>💰 {formData.price}</span>}
              {formData.duration && <span>⏱️ {formData.duration}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          취소
        </Button>
        <Button onClick={handleSave} className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700">
          <Save className="w-4 h-4 mr-2" />
          저장
        </Button>
      </div>
    </DialogContent>
  );
}