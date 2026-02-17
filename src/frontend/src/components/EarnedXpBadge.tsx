import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface EarnedXpBadgeProps {
  xp: number;
}

export default function EarnedXpBadge({ xp }: EarnedXpBadgeProps) {
  return (
    <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-xp-gold/20 to-accent/20 border-2 border-xp-gold neon-glow-accent animate-pulse-glow">
      <Sparkles className="w-6 h-6 text-xp-gold" />
      <Badge className="bg-xp-gold text-xp-gold-foreground font-display font-bold text-xl px-4 py-2 border-0">
        +{xp} XP
      </Badge>
      <Sparkles className="w-6 h-6 text-xp-gold" />
    </div>
  );
}
