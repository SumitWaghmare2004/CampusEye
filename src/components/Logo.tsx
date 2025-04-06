import React from 'react';
import { GraduationCap } from 'lucide-react';
import { clsx } from 'clsx';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true }) => {
  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <GraduationCap className="w-8 h-8 text-indigo-600" />
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold text-gray-900">CampusEye.ai</span>
          {/* <span className="text-sm font-semibold text-indigo-600">.ai</span> */}
        </div>
      )}
    </div>
  );
};