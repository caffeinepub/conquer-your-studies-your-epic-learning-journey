import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';
import { SyllabusItem } from '../backend';
import { CheckCircle2, Circle } from 'lucide-react';

interface WarMapNodeProps {
  item: SyllabusItem;
  onClick?: () => void;
}

export function WarMapNode({ item, onClick }: WarMapNodeProps) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-battle transition-all duration-200 border-2 hover:scale-105 relative overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute top-2 right-2">
        {item.isCompleted ? (
          <CheckCircle2 className="w-6 h-6 text-victory-zone" />
        ) : (
          <Circle className="w-6 h-6 text-muted-foreground" />
        )}
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-display pr-8">{item.topic}</CardTitle>
        <p className="text-sm text-muted-foreground font-medium">{item.chapter}</p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {item.description && (
          <p className="text-sm text-foreground/80 line-clamp-2">{item.description}</p>
        )}
        
        <div className="flex items-center justify-between">
          <StatusBadge status={item.status} />
          <span className="text-xs text-muted-foreground font-medium">
            {item.tasks.length} {item.tasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
