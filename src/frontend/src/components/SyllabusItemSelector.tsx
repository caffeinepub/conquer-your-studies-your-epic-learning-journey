import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SyllabusItem } from '../backend';
import { StatusBadge } from './StatusBadge';

interface SyllabusItemSelectorProps {
  items: SyllabusItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  disabled?: boolean;
}

export function SyllabusItemSelector({ 
  items, 
  selectedId, 
  onSelect,
  disabled = false 
}: SyllabusItemSelectorProps) {
  return (
    <Select value={selectedId || undefined} onValueChange={onSelect} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a chapter/topic to manage..." />
      </SelectTrigger>
      <SelectContent>
        {items.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No chapters created yet. Create one first!
          </div>
        ) : (
          items.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              <div className="flex items-center gap-3 py-1">
                <div className="flex-1">
                  <p className="font-medium">{item.topic}</p>
                  <p className="text-xs text-muted-foreground">{item.chapter}</p>
                </div>
                <StatusBadge status={item.status} className="text-xs" />
              </div>
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
