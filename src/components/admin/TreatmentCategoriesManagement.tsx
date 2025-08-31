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
  Plus, Edit, Trash2, Save, X, Heart, Stethoscope, Sparkles, Smile, 
  ArrowUp, ArrowDown, Search
} from 'lucide-react';

interface TreatmentCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  order: number;
  status: '활성' | '비활성';
  createdAt?: string;
  updatedAt?: string;
}

const ICON_OPTIONS = [
  { value: 'Stethoscope', label: '청진기', icon: Stethoscope },
  { value: 'Heart', label: '하트', icon: Heart },
  { value: 'Sparkles', label: '반짝임', icon: Sparkles },
  { value: 'Smile', label: '미소', icon: Smile }
];

const COLOR_OPTIONS = [
  { value: 'text-blue-600', label: '파란색', bg: 'bg-blue-100' },
  { value: 'text-red-600', label: '빨간색', bg: 'bg-red-100' },
  { value: 'text-purple-600', label: '보라색', bg: 'bg-purple-100' },
  { value: 'text-emerald-600', label: '초록색', bg: 'bg-emerald-100' },
  { value: 'text-orange-600', label: '주황색', bg: 'bg-orange-100' },
  { value: 'text-pink-600', label: '분홍색', bg: 'bg-pink-100' }
];

export default function TreatmentCategoriesManagement() {
  const [categories, setCategories] = useState<TreatmentCategory[]>([
    {
      id: 'implant',
      title: '임플란트',
      icon: 'Stethoscope',
      color: 'text-blue-600',
      description: '자연치아와 같은 기능 회복',
      order: 1,
      status: '활성',
      createdAt: '2024-01-01',
      updatedAt: '2024-12-30'
    },
    {
      id: 'orthodontics',
      title: '교정치료',
      icon: 'Sparkles',
      color: 'text-purple-600',
      description: '아름다운 미소를 위한 치아교정',
      order: 2,
      status: '활성',
      createdAt: '2024-01-01',
      updatedAt: '2024-12-30'
    },
    {
      id: 'aesthetic',
      title: '심미치료',
      icon: 'Smile',
      color: 'text-pink-600',
      description: '자연스럽고 아름다운 치아',
      order: 3,
      status: '활성',
      createdAt: '2024-01-01',
      updatedAt: '2024-12-30'
    },
    {
      id: 'general',
      title: '일반진료',
      icon: 'Heart',
      color: 'text-emerald-600',
      description: '건강한 치아 관리',
      order: 4,
      status: '활성',
      createdAt: '2024-01-01',
      updatedAt: '2024-12-30'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'전체' | '활성' | '비활성'>('전체');
  const [editingCategory, setEditingCategory] = useState<TreatmentCategory | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 새 카테고리 템플릿
  const newCategoryTemplate: TreatmentCategory = {
    id: '',
    title: '',
    icon: 'Stethoscope',
    color: 'text-blue-600',
    description: '',
    order: categories.length + 1,
    status: '활성'
  };

  // 필터링된 카테고리 목록
  const filteredCategories = categories
    .filter(category => {
      const matchesSearch = category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           category.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === '전체' || category.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => a.order - b.order);

  // 카테고리 저장
  const handleSaveCategory = (category: TreatmentCategory) => {
    if (category.id) {
      // 기존 카테고리 수정
      setCategories(prev => prev.map(cat => 
        cat.id === category.id 
          ? { ...category, updatedAt: new Date().toISOString().split('T')[0] }
          : cat
      ));
    } else {
      // 새 카테고리 추가
      const newId = `category-${Date.now()}`;
      const newCategory = {
        ...category,
        id: newId,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setCategories(prev => [...prev, newCategory]);
    }
    setIsDialogOpen(false);
    setEditingCategory(null);
  };

  // 카테고리 삭제
  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('정말로 이 진료과목을 삭제하시겠습니까?')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    }
  };

  // 순서 변경
  const handleMoveCategory = (categoryId: string, direction: 'up' | 'down') => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return;

    const newOrder = direction === 'up' ? category.order - 1 : category.order + 1;
    const swapCategory = categories.find(cat => cat.order === newOrder);
    
    if (swapCategory) {
      setCategories(prev => prev.map(cat => {
        if (cat.id === categoryId) return { ...cat, order: newOrder };
        if (cat.id === swapCategory.id) return { ...cat, order: category.order };
        return cat;
      }));
    }
  };

  // 상태 토글
  const handleToggleStatus = (categoryId: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, status: cat.status === '활성' ? '비활성' : '활성' }
        : cat
    ));
  };

  // 아이콘 렌더링
  const renderIcon = (iconName: string) => {
    const IconComponent = ICON_OPTIONS.find(opt => opt.value === iconName)?.icon || Stethoscope;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              진료과목 관리
            </h2>
            <p className="text-gray-600 mt-2">진료 카테고리를 관리하고 편집할 수 있습니다</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                onClick={() => setEditingCategory(newCategoryTemplate)}
              >
                <Plus className="w-4 h-4 mr-2" />
                새 진료과목 추가
              </Button>
            </DialogTrigger>
            <CategoryDialog 
              category={editingCategory}
              onSave={handleSaveCategory}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingCategory(null);
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
                  placeholder="진료과목명이나 설명으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
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

      {/* 카테고리 목록 */}
      <div className="grid gap-4">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center ${category.color}`}>
                    {renderIcon(category.icon)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="font-bold text-lg text-gray-900">{category.title}</h3>
                      <Badge variant={category.status === '활성' ? 'default' : 'secondary'}>
                        {category.status}
                      </Badge>
                      <span className="text-sm text-gray-500">순서: {category.order}</span>
                    </div>
                    <p className="text-gray-600 mt-1">{category.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>생성: {category.createdAt}</span>
                      <span>수정: {category.updatedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* 순서 변경 버튼 */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMoveCategory(category.id, 'up')}
                    disabled={category.order === 1}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMoveCategory(category.id, 'down')}
                    disabled={category.order === categories.length}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>

                  {/* 상태 토글 */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(category.id)}
                    className={category.status === '활성' ? 'text-green-600' : 'text-gray-600'}
                  >
                    {category.status === '활성' ? '활성' : '비활성'}
                  </Button>

                  {/* 편집 버튼 */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingCategory(category)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <CategoryDialog 
                      category={category}
                      onSave={handleSaveCategory}
                      onCancel={() => setEditingCategory(null)}
                    />
                  </Dialog>

                  {/* 삭제 버튼 */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">진료과목이 없습니다</h3>
            <p className="text-gray-600">새로운 진료과목을 추가해보세요</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// 카테고리 편집 다이얼로그
function CategoryDialog({ 
  category, 
  onSave, 
  onCancel 
}: { 
  category: TreatmentCategory | null;
  onSave: (category: TreatmentCategory) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<TreatmentCategory>(
    category || {
      id: '',
      title: '',
      icon: 'Stethoscope',
      color: 'text-blue-600',
      description: '',
      order: 1,
      status: '활성'
    }
  );

  React.useEffect(() => {
    if (category) {
      setFormData(category);
    }
  }, [category]);

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('진료과목명을 입력해주세요.');
      return;
    }
    if (!formData.description.trim()) {
      alert('설명을 입력해주세요.');
      return;
    }
    onSave(formData);
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = ICON_OPTIONS.find(opt => opt.value === iconName)?.icon || Stethoscope;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>
          {category?.id ? '진료과목 편집' : '새 진료과목 추가'}
        </DialogTitle>
        <DialogDescription>
          {category?.id ? '기존 진료과목의 정보를 수정할 수 있습니다.' : '새로운 진료과목을 추가하고 아이콘, 색상, 설명을 설정하세요.'}
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">진료과목명 *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="예: 임플란트"
            />
          </div>
          <div>
            <Label htmlFor="order">표시 순서</Label>
            <Input
              id="order"
              type="number"
              min="1"
              value={formData.order}
              onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">설명 *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="진료과목에 대한 간단한 설명을 입력하세요"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>아이콘 선택</Label>
            <Select value={formData.icon} onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ICON_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center space-x-2">
                      {renderIcon(option.value)}
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>컬러 선택</Label>
            <Select value={formData.color} onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLOR_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${option.bg}`}></div>
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>상태</Label>
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

        {/* 미리보기 */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <Label className="text-sm font-medium text-gray-700 mb-2 block">미리보기</Label>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center ${formData.color}`}>
              {renderIcon(formData.icon)}
            </div>
            <div>
              <h4 className="font-bold text-gray-900">{formData.title || '진료과목명'}</h4>
              <p className="text-sm text-gray-600">{formData.description || '설명'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          취소
        </Button>
        <Button onClick={handleSave} className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
          <Save className="w-4 h-4 mr-2" />
          저장
        </Button>
      </div>
    </DialogContent>
  );
}