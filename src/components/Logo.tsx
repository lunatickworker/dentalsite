import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'gradient';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Logo({ 
  size = 'md', 
  variant = 'default', 
  showText = true, 
  className = '',
  onClick 
}: LogoProps) {
  // 크기별 설정
  const sizes = {
    sm: {
      container: 'w-8 h-8',
      text: 'text-sm',
      line: 'w-3 h-0.5',
      titleSize: 'text-lg'
    },
    md: {
      container: 'w-12 h-12',
      text: 'text-lg',
      line: 'w-4 h-0.5',
      titleSize: 'text-2xl'
    },
    lg: {
      container: 'w-16 h-16',
      text: 'text-xl',
      line: 'w-5 h-0.5',
      titleSize: 'text-3xl'
    },
    xl: {
      container: 'w-20 h-20',
      text: 'text-2xl',
      line: 'w-6 h-0.5',
      titleSize: 'text-4xl'
    }
  };

  // 색상 변형별 설정
  const variants = {
    default: {
      background: 'bg-gradient-to-br from-blue-600 to-blue-700',
      textColor: 'text-white',
      lineColor: 'bg-white/60',
      titleColor: 'text-blue-600',
      subtitleColor: 'text-gray-800'
    },
    white: {
      background: 'bg-gradient-to-br from-white to-gray-100',
      textColor: 'text-blue-600',
      lineColor: 'bg-blue-600/60',
      titleColor: 'text-white',
      subtitleColor: 'text-white/80'
    },
    gradient: {
      background: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      textColor: 'text-white',
      lineColor: 'bg-white/70',
      titleColor: 'text-blue-600',
      subtitleColor: 'text-gray-700'
    }
  };

  const sizeConfig = sizes[size];
  const variantConfig = variants[variant];

  const logoIcon = (
    <div 
      className={`
        ${sizeConfig.container} 
        ${variantConfig.background} 
        rounded-2xl flex items-center justify-center shadow-lg 
        ${onClick ? 'hover:shadow-xl transition-all duration-300 cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <span className={`${sizeConfig.text} font-bold ${variantConfig.textColor}`}>
          믿
        </span>
        <div className={`${sizeConfig.line} ${variantConfig.lineColor} rounded-full mt-0.5`}></div>
      </div>
    </div>
  );

  if (!showText) {
    return logoIcon;
  }

  return (
    <div 
      className={`flex items-center space-x-3 ${onClick ? 'cursor-pointer group' : ''}`}
      onClick={onClick}
    >
      {logoIcon}
      <div>
        <h1 className={`${sizeConfig.titleSize} font-bold leading-none`}>
          <span className={variantConfig.titleColor}>믿음</span>
          <span className={variantConfig.subtitleColor}>치과의원</span>
        </h1>
        <p className={`text-xs ${variantConfig.subtitleColor} mt-0.5 opacity-75`}>
          Faith Dental Clinic
        </p>
      </div>
    </div>
  );
}