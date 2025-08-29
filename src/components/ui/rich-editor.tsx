import React, { useState } from 'react';
import { Button } from './button';
import { Textarea } from './textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { Bold, Italic, Underline, List, ListOrdered, Link, Image, Code, Eye } from 'lucide-react';

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

export function RichEditor({ value, onChange, placeholder = '내용을 입력하세요...', height = 'h-64' }: RichEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  const insertText = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newText);
    
    // 커서 위치 조정
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const formatButtons = [
    { icon: <Bold className="w-4 h-4" />, action: () => insertText('**', '**'), tooltip: '굵게' },
    { icon: <Italic className="w-4 h-4" />, action: () => insertText('*', '*'), tooltip: '기울임' },
    { icon: <Underline className="w-4 h-4" />, action: () => insertText('<u>', '</u>'), tooltip: '밑줄' },
    { icon: <List className="w-4 h-4" />, action: () => insertText('\n- '), tooltip: '목록' },
    { icon: <ListOrdered className="w-4 h-4" />, action: () => insertText('\n1. '), tooltip: '번호 목록' },
    { icon: <Link className="w-4 h-4" />, action: () => insertText('[', '](url)'), tooltip: '링크' },
    { icon: <Image className="w-4 h-4" />, action: () => insertText('![alt](', ')'), tooltip: '이미지' },
    { icon: <Code className="w-4 h-4" />, action: () => insertText('`', '`'), tooltip: '코드' }
  ];

  const renderPreview = (text: string) => {
    // 간단한 마크다운 렌더링
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded">$1</code>')
      .replace(/\n- (.*)/g, '<li>$1</li>')
      .replace(/\n\d+\. (.*)/g, '<li>$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 underline">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg" />')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="border-b bg-gray-50 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {formatButtons.map((button, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={button.action}
                className="h-8 w-8 p-0"
                title={button.tooltip}
              >
                {button.icon}
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>{isPreview ? '편집' : '미리보기'}</span>
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <Tabs value={isPreview ? 'preview' : 'edit'} className="w-full">
        <TabsContent value="edit" className="mt-0">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`border-0 resize-none focus:ring-0 ${height}`}
          />
        </TabsContent>
        <TabsContent value="preview" className="mt-0">
          <div 
            className={`p-4 prose max-w-none ${height} overflow-y-auto`}
            dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
          />
        </TabsContent>
      </Tabs>

      {/* Status Bar */}
      <div className="border-t bg-gray-50 px-4 py-2 text-xs text-gray-500">
        {value.length} 글자 | 마크다운 문법 지원
      </div>
    </div>
  );
}