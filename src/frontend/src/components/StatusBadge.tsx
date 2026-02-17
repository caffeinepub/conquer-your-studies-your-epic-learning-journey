import { Badge } from '@/components/ui/badge';
import { Status } from '../backend';
import { getStatusTheme } from '../lib/statusTheme';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const theme = getStatusTheme(status);
  
  return (
    <Badge 
      className={`${theme.bgClass} ${theme.textClass} font-display font-semibold px-3 py-1 ${className}`}
    >
      {theme.label}
    </Badge>
  );
}
