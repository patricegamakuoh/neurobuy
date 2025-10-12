import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface FlexProps {
  children: ReactNode;
  className?: string;
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  wrap?: boolean;
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

const directionClasses = {
  row: 'flex-row',
  col: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'col-reverse': 'flex-col-reverse',
};

const justifyClasses = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const alignClasses = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
};

const gapClasses = {
  sm: 'gap-2 sm:gap-4',
  md: 'gap-4 sm:gap-6',
  lg: 'gap-6 sm:gap-8',
  xl: 'gap-8 sm:gap-12',
};

export default function Flex({ 
  children, 
  className, 
  direction = 'row',
  wrap = false,
  justify = 'start',
  align = 'start',
  gap = 'md',
  responsive = true
}: FlexProps) {
  const responsiveDirection = responsive && direction === 'row' 
    ? 'flex-col sm:flex-row' 
    : directionClasses[direction];

  return (
    <div 
      className={cn(
        'flex',
        responsiveDirection,
        wrap && 'flex-wrap',
        justifyClasses[justify],
        alignClasses[align],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
}
