import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface GridProps {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

const gapClasses = {
  sm: 'gap-2 sm:gap-4',
  md: 'gap-4 sm:gap-6',
  lg: 'gap-6 sm:gap-8',
  xl: 'gap-8 sm:gap-12',
};

const responsiveCols = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

export default function Grid({ 
  children, 
  className, 
  cols = 3,
  gap = 'md',
  responsive = true
}: GridProps) {
  const gridCols = responsive 
    ? responsiveCols 
    : `grid-cols-${cols}`;

  return (
    <div 
      className={cn(
        'grid',
        gridCols,
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
}
