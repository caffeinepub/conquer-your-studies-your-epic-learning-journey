import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';
import { useGetLeaderBoard } from '../hooks/useGamificationQueries';
import { useGetAllUserProfiles } from '../hooks/useUserQueries';

interface HallOfFameLeaderboardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HallOfFameLeaderboard({ open, onOpenChange }: HallOfFameLeaderboardProps) {
  const { data: leaderboard, isLoading } = useGetLeaderBoard();
  const { data: profiles } = useGetAllUserProfiles();

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-orange-600" />;
    return <span className="w-6 h-6 flex items-center justify-center font-bold text-muted-foreground">#{rank}</span>;
  };

  const getUserName = (principal: string) => {
    if (!profiles) return 'Anonymous Hero';
    const profile = profiles.find(([p]) => p.toString() === principal);
    return profile?.[1]?.name || 'Anonymous Hero';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-primary/30 neon-glow">
        <DialogHeader>
          <DialogTitle className="text-3xl font-display text-center neon-text flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-xp-gold" />
            Hall of Fame
            <Trophy className="w-8 h-8 text-xp-gold" />
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Top adventurers ranked by total XP earned
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[500px] pr-4">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading leaderboard...</div>
          ) : !leaderboard || leaderboard.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No adventurers yet. Be the first to complete a Boss Fight!
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map(([principal, state], index) => {
                const rank = index + 1;
                const xp = Number(state.xp);
                const level = Math.floor(xp / 100);
                const streak = Number(state.dailyStreak);

                return (
                  <div
                    key={principal.toString()}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                      rank <= 3
                        ? 'border-primary/50 bg-primary/5 hover:bg-primary/10'
                        : 'border-border bg-card/50 hover:bg-card'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {getRankIcon(rank)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-foreground truncate">
                        {getUserName(principal.toString())}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                        <span>Level {level}</span>
                        {streak > 0 && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <span className="text-orange-500">🔥</span>
                              {streak} day streak
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <Badge className="bg-xp-gold/20 text-xp-gold border-xp-gold/50 font-bold">
                      {xp.toLocaleString()} XP
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
