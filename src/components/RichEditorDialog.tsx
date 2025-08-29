import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  FileText, Image, Link, Upload, AlignLeft, AlignCenter, AlignRight,
  Bold, Italic, Underline, List, ListOrdered, Quote, Code,
  Eye, Save, X, Plus, Type, Palette, Layout, AlertCircle, HelpCircle
} from 'lucide-react';

interface RichEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem: any;
  onSave: (data: any) => void;
}

export default function RichEditorDialog({ isOpen, onClose, editingItem, onSave }: RichEditorDialogProps) {
  const [activeTab, setActiveTab] = useState('content');
  const [content, setContent] = useState(editingItem?.content || '');
  const [isPreview, setIsPreview] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    const processedData = {
      ...editingItem,
      ...data,
      content,
      advantages: data.advantages ? (data.advantages as string).split('\n').filter(Boolean) : [],
      process: data.process ? (data.process as string).split('\n').filter(Boolean) : [],
      precautions: data.precautions ? (data.precautions as string).split('\n').filter(Boolean) : [],
      faq: data.faq ? (data.faq as string).split('|').map(item => {
        const [q, a] = item.split('?');
        return { question: q + '?', answer: a?.trim() || '' };
      }).filter(item => item.question && item.answer) : []
    };
    
    onSave(processedData);
  };

  const insertText = (before: string, after: string = '') => {
    const textarea = document.getElementById('rich-content') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
    
    setContent(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const toolbarButtons = [
    { icon: <Bold className="w-4 h-4" />, action: () => insertText('**', '**'), title: '굵게' },
    { icon: <Italic className="w-4 h-4" />, action: () => insertText('*', '*'), title: '기울임' },
    { icon: <Underline className="w-4 h-4" />, action: () => insertText('<u>', '</u>'), title: '밑줄' },
    { icon: <List className="w-4 h-4" />, action: () => insertText('- '), title: '불릿 리스트' },
    { icon: <ListOrdered className="w-4 h-4" />, action: () => insertText('1. '), title: '번호 리스트' },
    { icon: <Quote className="w-4 h-4" />, action: () => insertText('> '), title: '인용구' },
    { icon: <Code className="w-4 h-4" />, action: () => insertText('`', '`'), title: '코드' },
    { icon: <Link className="w-4 h-4" />, action: () => insertText('[링크 텍스트](', ')'), title: '링크' },
    { icon: <Image className="w-4 h-4" />, action: () => insertText('![이미지 설명](', ')'), title: '이미지' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
        <DialogHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 -m-6 mb-6 rounded-t-lg">
          <DialogTitle className="text-2xl font-bold flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <span>{editingItem?.id ? '수정' : '새로 작성'} - 치료 상세페이지</span>
          </DialogTitle>
          <DialogDescription className="text-blue-100">
            치료의 상세 정보를 시각적으로 편집하고 관리할 수 있습니다. 마크다운을 지원합니다.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="grid grid-cols-4 w-fit bg-white border border-blue-200">
                <TabsTrigger value="content" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <Type className="w-4 h-4 mr-2" />
                  콘텐츠
                </TabsTrigger>
                <TabsTrigger value="details" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <Layout className="w-4 h-4 mr-2" />
                  상세정보
                </TabsTrigger>
                <TabsTrigger value="media" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <Image className="w-4 h-4 mr-2" />
                  미디어
                </TabsTrigger>
                <TabsTrigger value="preview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <Eye className="w-4 h-4 mr-2" />
                  미리보기
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-3">
                <Button type="button" variant="outline" onClick={onClose} className="border-blue-300 text-blue-700">
                  <X className="w-4 h-4 mr-2" />
                  취소
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <Save className="w-4 h-4 mr-2" />
                  저장하기
                </Button>
              </div>
            </div>

            {/* 콘텐츠 편집 */}
            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-12 gap-6">
                {/* 기본 정보 */}
                <div className="col-span-5">
                  <Card className="h-full">
                    <CardHeader className="bg-blue-50 border-b">
                      <CardTitle className="text-blue-800 flex items-center space-x-2">
                        <FileText className="w-5 h-5" />
                        <span>기본 정보</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <Label className="text-blue-700 font-medium">치료명</Label>
                        <Input 
                          name="title" 
                          defaultValue={editingItem?.title} 
                          className="border-blue-200 focus:border-blue-500" 
                          required 
                        />
                      </div>
                      <div>
                        <Label className="text-blue-700 font-medium">카테고리</Label>
                        <Select name="category" defaultValue={editingItem?.category}>
                          <SelectTrigger className="border-blue-200 focus:border-blue-500">
                            <SelectValue placeholder="카테고리 선택" />
                          </SelectTrigger>
                          <SelectContent className="z-[60]">
                            <SelectItem value="implant">임플란트</SelectItem>
                            <SelectItem value="orthodontics">교정치료</SelectItem>
                            <SelectItem value="aesthetic">심미치료</SelectItem>
                            <SelectItem value="general">일반진료</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-blue-700 font-medium">상담 안내</Label>
                        <Textarea 
                          name="consultationInfo" 
                          defaultValue={editingItem?.consultationInfo} 
                          className="border-blue-200 focus:border-blue-500"
                          placeholder="정확한 비용은 구강 상태 검사 후 안내드립니다"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-blue-700 font-medium">상담 전화번호</Label>
                          <Input 
                            name="consultationPhone" 
                            defaultValue={editingItem?.consultationPhone || '031-651-3054'} 
                            className="border-blue-200 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <Label className="text-blue-700 font-medium">치료 기간</Label>
                          <Input 
                            name="duration" 
                            defaultValue={editingItem?.duration} 
                            className="border-blue-200 focus:border-blue-500"
                            placeholder="3-6개월"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-blue-700 font-medium">상태</Label>
                        <Select name="status" defaultValue={editingItem?.status || '활성'}>
                          <SelectTrigger className="border-blue-200 focus:border-blue-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="z-[60]">
                            <SelectItem value="활성">활성</SelectItem>
                            <SelectItem value="비활성">비활성</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 리치 에디터 */}
                <div className="col-span-7">
                  <Card className="h-full">
                    <CardHeader className="bg-blue-50 border-b">
                      <CardTitle className="text-blue-800 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Palette className="w-5 h-5" />
                          <span>상세 내용 편집</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-white rounded-lg p-1 border">
                          {toolbarButtons.map((btn, index) => (
                            <Button
                              key={index}
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={btn.action}
                              className="h-8 w-8 p-0 hover:bg-blue-100"
                              title={btn.title}
                            >
                              {btn.icon}
                            </Button>
                          ))}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Textarea
                        id="rich-content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`치료에 대한 상세 설명을 입력하세요.

**마크다운** 문법을 사용할 수 있습니다:
- **굵게**: **텍스트**
- *기울임*: *텍스트*
- 제목: ## 제목
- 리스트: - 항목
- 링크: [텍스트](URL)
- 이미지: ![설명](URL)`}
                        className="min-h-[400px] border-0 rounded-none resize-none focus:ring-0 text-base leading-relaxed"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* 상세 정보 */}
            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="bg-green-50 border-b">
                    <CardTitle className="text-green-800 flex items-center space-x-2">
                      <Plus className="w-5 h-5" />
                      <span>치료 장점</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Textarea 
                      name="advantages" 
                      defaultValue={editingItem?.advantages?.join('\n') || ''} 
                      placeholder="각 장점을 한 줄씩 입력하세요"
                      rows={8}
                      className="border-green-200 focus:border-green-500"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-blue-50 border-b">
                    <CardTitle className="text-blue-800 flex items-center space-x-2">
                      <List className="w-5 h-5" />
                      <span>치료 과정</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Textarea 
                      name="process" 
                      defaultValue={editingItem?.process?.join('\n') || ''} 
                      placeholder="각 치료 단계를 한 줄씩 입력하세요"
                      rows={8}
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-orange-50 border-b">
                    <CardTitle className="text-orange-800 flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5" />
                      <span>주의사항</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Textarea 
                      name="precautions" 
                      defaultValue={editingItem?.precautions?.join('\n') || ''} 
                      placeholder="각 주의사항을 한 줄씩 입력하세요"
                      rows={8}
                      className="border-orange-200 focus:border-orange-500"
                    />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="bg-purple-50 border-b">
                  <CardTitle className="text-purple-800 flex items-center space-x-2">
                    <HelpCircle className="w-5 h-5" />
                    <span>자주 묻는 질문</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <Textarea 
                    name="faq" 
                    defaultValue={editingItem?.faq?.map(item => `${item.question} ${item.answer}`).join('|') || ''} 
                    placeholder="질문과 답변을 입력하세요. 형식: 질문? 답변|다음질문? 다음답변"
                    rows={6}
                    className="border-purple-200 focus:border-purple-500"
                  />
                  <p className="text-sm text-purple-600 mt-2">
                    각 질문과 답변은 '|'로 구분하고, 질문은 '?'로 끝내주세요.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 미디어 */}
            <TabsContent value="media" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="bg-blue-50 border-b">
                    <CardTitle className="text-blue-800 flex items-center space-x-2">
                      <Image className="w-5 h-5" />
                      <span>대표 이미지</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div>
                      <Label className="text-blue-700 font-medium">이미지 URL</Label>
                      <Input 
                        name="image" 
                        defaultValue={editingItem?.image} 
                        className="border-blue-200 focus:border-blue-500"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-blue-600 font-medium">이미지 업로드</p>
                      <p className="text-sm text-blue-400">또는 URL을 입력하세요</p>
                      <Button type="button" variant="outline" className="mt-3 border-blue-300 text-blue-700">
                        파일 선택
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-green-50 border-b">
                    <CardTitle className="text-green-800 flex items-center space-x-2">
                      <Eye className="w-5 h-5" />
                      <span>이미지 미리보기</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {editingItem?.image ? (
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={editingItem.image}
                          alt="대표 이미지"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <Image className="w-12 h-12 mx-auto mb-2" />
                          <p>이미지가 없습니다</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 미리보기 */}
            <TabsContent value="preview" className="space-y-6">
              <Card>
                <CardHeader className="bg-blue-50 border-b">
                  <CardTitle className="text-blue-800 flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>페이지 미리보기</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                    {/* 미리보기 헤더 */}
                    <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-700">
                      {editingItem?.image && (
                        <ImageWithFallback
                          src={editingItem.image}
                          alt="치료 이미지"
                          className="w-full h-full object-cover opacity-80"
                        />
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white">
                          <h1 className="text-3xl font-bold mb-2">{editingItem?.title || '치료명'}</h1>
                          <Badge className="bg-white/20 text-white">
                            {editingItem?.category || '카테고리'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* 미리보기 내용 */}
                    <div className="p-6">
                      <div className="prose max-w-none">
                        <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                          {content || '상세 내용이 없습니다.'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </DialogContent>
    </Dialog>
  );
}