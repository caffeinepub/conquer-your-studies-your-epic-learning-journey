import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Infinity } from 'lucide-react';
import { getChaptersBySubject } from '../lib/contentModel';
import ThreeDLevelIcon from '../components/ThreeDLevelIcon';
import { useGetCallerGamificationState } from '../hooks/useGamificationQueries';

interface RealmInfinityDungeonProps {
  onBack: () => void;
  onChapterSelect: (chapterId: string) => void;
}

export default function RealmInfinityDungeon({ onBack, onChapterSelect }: RealmInfinityDungeonProps) {
  const { data: gamificationState } = useGetCallerGamificationState();
  const completedChapters = gamificationState?.completedChapters || [];
  const chapters = getChaptersBySubject('maths');

  const isChapterCompleted = (chapterId: string) => completedChapters.includes(chapterId);
  
  const isChapterUnlocked = (index: number) => {
    // First chapter is always unlocked
    if (index === 0) return true;
    // Next chapter unlocks when previous is completed
    return isChapterCompleted(chapters[index - 1].id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-maths/10 to-background px-4 py-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="text-maths hover:text-maths/80">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to World Map
          </Button>
          <Badge className="bg-maths text-maths-foreground px-4 py-2 text-lg font-display">
            <Infinity className="w-4 h-4 mr-2" />
            THE INFINITY DUNGEON
          </Badge>
        </div>

        {/* Title */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-maths neon-text-maths">
            The Infinity Dungeon
          </h1>
          <p className="text-muted-foreground text-lg">
            Conquer 13 Boss Levels in Linear Progression
          </p>
        </div>

        {/* Linear Path */}
        <div className="relative">
          {/* Path Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-maths via-maths/50 to-maths transform -translate-x-1/2 hidden md:block" />

          {/* Boss Level Nodes */}
          <div className="space-y-8">
            {chapters.map((chapter, index) => {
              const completed = isChapterCompleted(chapter.id);
              const unlocked = isChapterUnlocked(index);
              const isNext = !completed && unlocked;

              return (
                <div
                  key={chapter.id}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-8`}
                >
                  {/* Level Number Badge */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg ${
                      completed
                        ? 'bg-green-500 text-white'
                        : isNext
                        ? 'bg-maths text-maths-foreground animate-pulse-glow'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />

                  {/* Chapter Card */}
                  <Card
                    className={`flex-1 group relative overflow-hidden border-2 transition-all duration-300 ${
                      completed
                        ? 'border-green-500 bg-green-500/10'
                        : isNext
                        ? 'border-maths hover:border-maths hover:shadow-maths-glow bg-card/80 cursor-pointer'
                        : unlocked
                        ? 'border-maths/50 hover:border-maths hover:shadow-maths-glow bg-card/80 cursor-pointer'
                        : 'border-muted bg-muted/20 cursor-not-allowed'
                    }`}
                    onClick={() => unlocked && onChapterSelect(chapter.id)}
                  >
                    <div className="p-6 flex items-center gap-6">
                      <div className="flex-shrink-0">
                        <ThreeDLevelIcon
                          icon={chapter.icon}
                          color="#fbbf24"
                          locked={!unlocked}
                          completed={completed}
                          size={80}
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 md:hidden">
                          <Badge variant="outline" className="text-xs">
                            Level {index + 1}
                          </Badge>
                        </div>
                        <h3 className="font-display font-bold text-xl">
                          {chapter.title}
                        </h3>
                        <div className="flex gap-2">
                          {completed && (
                            <Badge variant="outline" className="border-green-500 text-green-500">
                              ✓ Defeated
                            </Badge>
                          )}
                          {isNext && (
                            <Badge className="bg-maths text-maths-foreground">
                              ⚔️ Next Boss
                            </Badge>
                          )}
                          {!unlocked && (
                            <Badge variant="outline" className="border-muted text-muted-foreground">
                              🔒 Locked
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
