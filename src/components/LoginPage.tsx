import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import Logo from './Logo';
import { Eye, EyeOff, Lock, Mail, User, Phone, X, Shield } from 'lucide-react';

interface LoginPageProps {
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export default function LoginPage({ onClose, onLoginSuccess }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: '',
    agreeTerms: false,
    agreePrivacy: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 목업 로그인 처리
    setTimeout(() => {
      const user = {
        id: 1,
        name: '홍길동',
        email: formData.email,
        phone: '010-1234-5678',
        loginType: 'email'
      };
      
      onLoginSuccess(user);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 목업 회원가입 처리
    setTimeout(() => {
      const user = {
        id: 2,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        loginType: 'email'
      };
      
      onLoginSuccess(user);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    
    // 목업 SNS 로그인 처리
    setTimeout(() => {
      const user = {
        id: 3,
        name: `${provider} 사용자`,
        email: `user@${provider}.com`,
        phone: '010-9876-5432',
        loginType: provider,
        profileImage: `https://ui-avatars.com/api/?name=${provider}&background=random`
      };
      
      onLoginSuccess(user);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const socialButtons = [
    {
      provider: 'kakao',
      name: '카카오 계정으로 로그인',
      bgColor: 'bg-yellow-400 hover:bg-yellow-500',
      textColor: 'text-black',
      icon: '💬'
    },
    {
      provider: 'google',
      name: '구글 계정으로 로그인',
      bgColor: 'bg-gray-900 hover:bg-gray-800',
      textColor: 'text-white',
      icon: 'G'
    },
    {
      provider: 'naver',
      name: '네이버 계정으로 로그인',
      bgColor: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white',
      icon: 'N'
    },
    {
      provider: 'apple',
      name: '애플 계정으로 로그인',
      bgColor: 'bg-black hover:bg-gray-900',
      textColor: 'text-white',
      icon: '🍎'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl bg-white border-0 shadow-2xl rounded-2xl overflow-hidden relative max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center space-y-2 sm:space-y-4 bg-gradient-to-br from-blue-50 to-white border-b border-blue-100 relative">
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-full w-8 h-8 p-0"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="pt-6 sm:pt-8 pb-4 sm:pb-6 text-center">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Logo 
                size="lg" 
                showText={false}
                className="shadow-xl sm:w-16 sm:h-16 w-12 h-12"
              />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
              믿음치과
            </CardTitle>
            <p className="text-gray-600 text-xs sm:text-sm px-2">
              안전하고 편리한 로그인으로 예약 서비스를 이용하세요
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 lg:p-8">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 lg:mb-8 bg-blue-50 rounded-xl p-1">
              <TabsTrigger 
                value="login"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg font-medium"
              >
                로그인
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg font-medium"
              >
                회원가입
              </TabsTrigger>
            </TabsList>

            {/* 로그인 탭 */}
            <TabsContent value="login" className="space-y-4 sm:space-y-6">
              {/* 간편 로그인 버튼들 */}
              <div className="space-y-2 sm:space-y-3">
                {socialButtons.map((social) => (
                  <Button
                    key={social.provider}
                    className={`w-full h-10 sm:h-12 lg:h-14 ${social.bgColor} ${social.textColor} rounded-xl font-medium text-sm sm:text-base border-0 shadow-sm hover:shadow-md transition-all duration-200`}
                    onClick={() => handleSocialLogin(social.provider)}
                    disabled={isLoading}
                  >
                    <span className="mr-2 sm:mr-3 text-base sm:text-lg">{social.icon}</span>
                    <span className="hidden sm:inline">{social.name}</span>
                    <span className="sm:hidden">{social.name.split(' ')[0]}</span>
                  </Button>
                ))}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    또는 직접 입력
                  </span>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
                <div className="space-y-2">
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="이메일"
                    className="h-10 sm:h-12 bg-gray-100 border-0 rounded-xl px-3 sm:px-4 focus:bg-white focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-sm sm:text-base"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호"
                    className="h-10 sm:h-12 bg-gray-100 border-0 rounded-xl px-3 sm:px-4 focus:bg-white focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-sm sm:text-base"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      className="border-gray-300 data-[state=checked]:bg-gray-900 h-3 w-3 sm:h-4 sm:w-4"
                    />
                    <Label htmlFor="remember" className="text-xs sm:text-sm text-gray-600">
                      <span className="hidden sm:inline">로그인 상태 유지</span>
                      <span className="sm:hidden">자동로그인</span>
                    </Label>
                  </div>
                  <Button variant="link" className="text-xs sm:text-sm p-0 text-gray-600 hover:text-gray-900">
                    비밀번호 찾기
                  </Button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-10 sm:h-12 bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 font-medium rounded-xl text-sm sm:text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>로그인 중...</span>
                    </div>
                  ) : (
                    <span>로그인</span>
                  )}
                </Button>
              </form>

              <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600">
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm text-gray-600 hover:text-gray-900">
                  회원가입
                </Button>
                <span className="text-gray-300">|</span>
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm text-gray-600 hover:text-gray-900">
                  아이디 찾기
                </Button>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm text-gray-600 hover:text-gray-900 hidden sm:inline-block">
                  비밀번호 찾기
                </Button>
              </div>
            </TabsContent>

            {/* 회원가입 탭 */}
            <TabsContent value="signup" className="space-y-4 sm:space-y-6">
              {/* 간편 로그인 버튼들 */}
              <div className="space-y-2 sm:space-y-3">
                {socialButtons.map((social) => (
                  <Button
                    key={social.provider}
                    className={`w-full h-10 sm:h-12 lg:h-14 ${social.bgColor} ${social.textColor} rounded-xl font-medium text-sm sm:text-base border-0 shadow-sm hover:shadow-md transition-all duration-200`}
                    onClick={() => handleSocialLogin(social.provider)}
                    disabled={isLoading}
                  >
                    <span className="mr-2 sm:mr-3 text-base sm:text-lg">{social.icon}</span>
                    <span className="hidden sm:inline">{social.name}</span>
                    <span className="sm:hidden">{social.name.split(' ')[0]}</span>
                  </Button>
                ))}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    또는 직접 입력
                  </span>
                </div>
              </div>

              <form onSubmit={handleSignup} className="space-y-2 sm:space-y-3">
                <div className="space-y-1 sm:space-y-2">
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="이름"
                    className="h-10 sm:h-12 bg-gray-100 border-0 rounded-xl px-3 sm:px-4 focus:bg-white focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-sm sm:text-base"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="휴대폰 번호"
                    className="h-10 sm:h-12 bg-gray-100 border-0 rounded-xl px-3 sm:px-4 focus:bg-white focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-sm sm:text-base"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="이메일"
                    className="h-10 sm:h-12 bg-gray-100 border-0 rounded-xl px-3 sm:px-4 focus:bg-white focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-sm sm:text-base"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호"
                    className="h-10 sm:h-12 bg-gray-100 border-0 rounded-xl px-3 sm:px-4 focus:bg-white focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-sm sm:text-base"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    placeholder="비밀번호 확인"
                    className="h-10 sm:h-12 bg-gray-100 border-0 rounded-xl px-3 sm:px-4 focus:bg-white focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-sm sm:text-base"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2 sm:space-y-3 bg-blue-50 p-3 sm:p-4 rounded-xl border border-blue-100">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <Checkbox 
                      id="agree-terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                      required
                      className="border-blue-300 data-[state=checked]:bg-blue-600 mt-0.5 h-3 w-3 sm:h-4 sm:w-4"
                    />
                    <Label htmlFor="agree-terms" className="text-xs sm:text-sm text-gray-700 flex items-start space-x-1">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 mt-0.5" />
                      <span><span className="text-gray-900 font-medium">이용약관</span>에 동의합니다 (필수)</span>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <Checkbox 
                      id="agree-privacy"
                      checked={formData.agreePrivacy}
                      onCheckedChange={(checked) => handleInputChange('agreePrivacy', checked)}
                      required
                      className="border-blue-300 data-[state=checked]:bg-blue-600 mt-0.5 h-3 w-3 sm:h-4 sm:w-4"
                    />
                    <Label htmlFor="agree-privacy" className="text-xs sm:text-sm text-gray-700 flex items-start space-x-1">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 mt-0.5" />
                      <span><span className="text-gray-900 font-medium">개인정보처리방침</span>에 동의합니다 (필수)</span>
                    </Label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-10 sm:h-12 bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 font-medium rounded-xl text-sm sm:text-base"
                  disabled={isLoading || !formData.agreeTerms || !formData.agreePrivacy}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>가입 중...</span>
                    </div>
                  ) : (
                    <span>회원가입</span>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}