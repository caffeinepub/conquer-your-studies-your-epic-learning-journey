import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Flame, ArrowLeft } from 'lucide-react';
import { useGetCallerGamificationState } from '../hooks/useGamificationQueries';

interface GamificationHeaderProps {
  onHallOfFameClick: () => void;
  onBackClick: () => void;
}

export default function GamificationHeader({ onHallOfFameClick, onBackClick }: GamificationHeaderProps) {
  const { data: gamificationState, isLoading } = useGetCallerGamificationState();

  const xp = gamificationState ? Number(gamificationState.xp) : 0;
  const streak = gamificationState ? Number(gamificationState.dailyStreak) : 0;
  const coins = gamificationState ? Number(gamificationState.coins) : 0;
  
  // Calculate level and progress (100 XP per level)
  const level = Math.floor(xp / 100);
  const xpInCurrentLevel = xp % 100;
  const progressPercent = xpInCurrentLevel;

  return (
    <header className="sticky top-0 z-50 border-b border-primary/20 bg-card/95 backdrop-blur-md shadow-neon">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onBackClick}
            className="hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Level Progress with Glow */}
          <div className="flex-1 min-w-[200px] max-w-md">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-display font-bold text-primary">
                Level {level}
              </span>
              <span className="text-xs text-muted-foreground">
                {xpInCurrentLevel}/100 XP
              </span>
            </div>
            <div className="relative">
              <Progress 
                value={progressPercent} 
                className="h-3 bg-muted progress-glow"
              />
            </div>
          </div>

          {/* Coins Counter */}
          <div className="flex items-center gap-2">
            <img 
              src="/assets/generated/coins-icon.dim_512x512.png" 
              alt="Coins"
              className="w-6 h-6"
            />
            <Badge variant="outline" className="border-amber-500/50 text-amber-500 font-bold text-base px-3">
              {isLoading ? '...' : coins}
            </Badge>
          </div>

          {/* Daily Streak */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Flame className="w-6 h-6 text-orange-500 animate-pulse-glow" />
            </div>
            <Badge variant="outline" className="border-orange-500/50 text-orange-500 font-bold">
              {isLoading ? '...' : streak} Day Streak
            </Badge>
          </div>

          {/* Hall of Fame */}
          <Button 
            onClick={onHallOfFameClick}
            className="bg-xp-gold hover:bg-xp-gold/80 text-xp-gold-foreground font-display font-bold neon-glow-accent"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Hall of Fame
          </Button>
        </div>
      </div>
    </header>
  );
}
