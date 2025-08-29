import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { 
  Phone, Calendar, MessageCircle, MapPin, Clock, X, Menu, Stethoscope, 
  Camera, ChevronUp, ArrowUp, User, Star
} from 'lucide-react';

interface QuickMenuProps {
  onPageChange: (page: string) => void;
}

export default function QuickMenu({ onPageChange }: QuickMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickMenuItems = [
    {
      icon: <Phone className="w-6 h-6" />,
      label: '전화상담',
      action: () => window.open('tel:031-651-3054'),
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      description: '즉시 상담 가능'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: '카톡상담',
      action: () => window.open('https://pf.kakao.com/_faith_dental'),
      bgColor: 'bg-yellow-500',
      hoverColor: 'hover:bg-yellow-600',
      description: '24시간 문의'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: '온라인예약',
      action: () => onPageChange('appointment'),
      bgColor: 'bg-emerald-600',
      hoverColor: 'hover:bg-emerald-700',
      description: '편리한 예약'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: '오시는길',
      action: () => onPageChange('location'),
      bgColor: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700',
      description: '위치 안내'
    },
    {
      icon: <Star className="w-6 h-6" />,
      label: '치료후기',
      action: () => onPageChange('reviews'),
      bgColor: 'bg-orange-600',
      hoverColor: 'hover:bg-orange-700',
      description: '실제 후기'
    }
  ];

  return (
    <>
      {/* Side Quick Menu - Modern Floating Style */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col space-y-3">
          {quickMenuItems.map((item, index) => (
            <div key={index} className="group relative">
              <Button
                onClick={item.action}
                className={`
                  w-16 h-16 rounded-2xl shadow-lg hover:shadow-xl
                  ${item.bgColor} ${item.hoverColor} text-white
                  flex items-center justify-center
                  transition-all duration-300 hover:scale-110
                  border-0 relative overflow-hidden
                `}
              >
                <div className="relative z-10">
                  {item.icon}
                </div>
                
                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              
              {/* Tooltip */}
              <div className="absolute right-20 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
                  <div className="font-semibold text-sm">{item.label}</div>
                  <div className="text-xs opacity-80">{item.description}</div>
                  {/* Arrow */}
                  <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Hospital Info Card - Updated Design */}
      <div className="fixed left-6 bottom-6 z-40">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden max-w-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">믿음치과의원</h3>
                  <p className="text-sm text-gray-600">Faith Dental Clinic</p>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-blue-50 rounded-xl p-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-blue-800">031-651-3054</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => window.open('tel:031-651-3054')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
                  >
                    전화하기
                  </Button>
                </div>
                
                {/* Opening Hours */}
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="font-semibold text-gray-700 text-sm">진료시간</span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>평일</span>
                      <span className="font-medium">09:00 ~ 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>토요일</span>
                      <span className="font-medium">09:00 ~ 13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>일요일</span>
                      <span className="text-red-500 font-medium">휴진</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  onClick={() => onPageChange('appointment')}
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl py-3 flex flex-col items-center space-y-1"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-semibold">온라인예약</span>
                </Button>
                <Button
                  onClick={() => onPageChange('location')}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-3 flex flex-col items-center space-y-1"
                >
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-semibold">오시는길</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scroll to Top Button */}
      <div className="fixed right-6 bottom-32 z-40">
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>
    </>
  );
}