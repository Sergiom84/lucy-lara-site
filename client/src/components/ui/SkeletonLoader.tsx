import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
  ...props
}) => {
  const baseClasses = 'bg-gray-200';
  
  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded',
    circular: 'rounded-full',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={style}
      {...props}
    />
  );
};

// Predefined skeleton components for common use cases
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 1, 
  className 
}) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        width={index === lines - 1 ? '60%' : '100%'}
        className={index === lines - 1 ? 'w-3/5' : 'w-full'}
      />
    ))}
  </div>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-4 space-y-4', className)}>
    <Skeleton variant="rounded" height={200} className="w-full" />
    <div className="space-y-2">
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
    </div>
    <div className="flex justify-between items-center">
      <Skeleton variant="text" width={80} />
      <Skeleton variant="rounded" width={100} height={32} />
    </div>
  </div>
);

export const SkeletonAvatar: React.FC<{ size?: number; className?: string }> = ({ 
  size = 40, 
  className 
}) => (
  <Skeleton
    variant="circular"
    width={size}
    height={size}
    className={className}
  />
);

export const SkeletonButton: React.FC<{ width?: number; className?: string }> = ({ 
  width = 120, 
  className 
}) => (
  <Skeleton
    variant="rounded"
    width={width}
    height={40}
    className={className}
  />
);

// Loading state for service cards
export const ServiceCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <Skeleton variant="rectangular" height={200} className="w-full" />
    <div className="p-6 space-y-4">
      <Skeleton variant="text" className="w-3/4 h-6" />
      <div className="space-y-2">
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-5/6" />
        <Skeleton variant="text" className="w-2/3" />
      </div>
      <div className="flex justify-between items-center pt-4">
        <Skeleton variant="text" width={80} className="h-6" />
        <Skeleton variant="rounded" width={120} height={40} />
      </div>
    </div>
  </div>
);

// Loading state for testimonials
export const TestimonialSkeleton: React.FC = () => (
  <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
    <div className="flex items-center space-x-4">
      <SkeletonAvatar size={60} />
      <div className="space-y-2">
        <Skeleton variant="text" width={120} />
        <Skeleton variant="text" width={80} />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton variant="text" className="w-full" />
      <Skeleton variant="text" className="w-5/6" />
      <Skeleton variant="text" className="w-3/4" />
    </div>
    <div className="flex space-x-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} variant="circular" width={16} height={16} />
      ))}
    </div>
  </div>
);

// Loading state for forms
export const FormSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="space-y-2">
      <Skeleton variant="text" width={100} height={16} />
      <Skeleton variant="rounded" height={40} className="w-full" />
    </div>
    <div className="space-y-2">
      <Skeleton variant="text" width={80} height={16} />
      <Skeleton variant="rounded" height={40} className="w-full" />
    </div>
    <div className="space-y-2">
      <Skeleton variant="text" width={120} height={16} />
      <Skeleton variant="rounded" height={100} className="w-full" />
    </div>
    <Skeleton variant="rounded" width={150} height={44} />
  </div>
);

export default Skeleton;