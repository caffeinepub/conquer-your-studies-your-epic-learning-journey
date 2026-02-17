import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';
import { SyllabusItem, Status } from '../backend';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getStatusTheme } from '../lib/statusTheme';

interface TaskListProps {
  item: SyllabusItem;
  onUpdateStatus: (taskIndex: number, newStatus: Status) => void;
  isUpdating?: boolean;
}

export function TaskList({ item, onUpdateStatus, isUpdating = false }: TaskListProps) {
  if (item.tasks.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-8 text-center text-muted-foreground">
          <Circle className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No tasks yet. Add your first task to begin!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {item.tasks.map((task, index) => (
        <Card key={index} className="border-l-4 border-l-primary">
          <CardContent className="py-4 px-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                {item.status === Status.victoryZone ? (
                  <CheckCircle2 className="w-5 h-5 text-victory-zone flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{task}</p>
                  <p className="text-xs text-muted-foreground mt-1">Task #{index + 1}</p>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={isUpdating}
                    className="flex-shrink-0"
                  >
                    Update Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {Object.values(Status).map((status) => {
                    const theme = getStatusTheme(status);
                    return (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => onUpdateStatus(index, status)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-2 w-full">
                          {status === Status.victoryZone && (
                            <Trophy className="w-4 h-4 text-victory-zone" />
                          )}
                          <span className="flex-1">{theme.label}</span>
                          <div className={`w-3 h-3 rounded-full ${theme.bgClass}`} />
                        </div>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
