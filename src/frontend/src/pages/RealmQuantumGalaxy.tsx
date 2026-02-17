import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { sciencePlanets, getChaptersByCategory } from '../lib/contentModel';
import ThreeDLevelIcon from '../components/ThreeDLevelIcon';
import { useGetCallerGamificationState } from '../hooks/useGamificationQueries';

interface RealmQuantumGalaxyProps {
  onBack: () => void;
  onChapterSelect: (chapterId: string) => void;
}

export default function RealmQuantumGalaxy({ onBack, onChapterSelect }: RealmQuantumGalaxyProps) {
  const { data: gamificationState } = useGetCallerGamificationState();
  const completedChapters = gamificationState?.completedChapters || [];

  const isChapterCompleted = (chapterId: string) => completedChapters.includes(chapterId);
  const isChapterUnlocked = (chapterId: string) => {
    // For science, all chapters are unlocked from the start
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-science/10 to-background px-4 py-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="text-science hover:text-science/80">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to World Map
          </Button>
          <Badge className="bg-science text-science-foreground px-4 py-2 text-lg font-display">
            <Sparkles className="w-4 h-4 mr-2" />
            THE QUANTUM GALAXY
          </Badge>
        </div>

        {/* Title */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-science neon-text-science">
            The Quantum Galaxy
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore 3 Planets of Scientific Discovery
          </p>
        </div>

        {/* Planets */}
        <div className="space-y-16">
          {sciencePlanets.map((planet) => {
            const chapters = getChaptersByCategory('science', planet.name);
            
            return (
              <div key={planet.name} className="space-y-6">
                {/* Planet Header */}
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${planet.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-3xl">🪐</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-display font-bold text-science">
                      {planet.name} Planet
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {chapters.length} Mission Levels
                    </p>
                  </div>
                </div>

                {/* Chapter Nodes */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {chapters.map((chapter) => {
                    const completed = isChapterCompleted(chapter.id);
                    const unlocked = isChapterUnlocked(chapter.id);

                    return (
                      <Card
                        key={chapter.id}
                        className={`group relative overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                          completed
                            ? 'border-green-500 bg-green-500/10'
                            : unlocked
                            ? 'border-science/50 hover:border-science hover:shadow-science-glow bg-card/80'
                            : 'border-muted bg-muted/20 cursor-not-allowed'
                        }`}
                        onClick={() => unlocked && onChapterSelect(chapter.id)}
                      >
                        <div className="p-4 space-y-3">
                          <div className="flex justify-center">
                            <ThreeDLevelIcon
                              icon={chapter.icon}
                              color="#10b981"
                              locked={!unlocked}
                              completed={completed}
                              size={80}
                            />
                          </div>
                          <div className="text-center space-y-1">
                            <h3 className="font-display font-bold text-sm leading-tight">
                              {chapter.title}
                            </h3>
                            {completed && (
                              <Badge variant="outline" className="border-green-500 text-green-500 text-xs">
                                ✓ Mastered
                              </Badge>
                            )}
                            {!unlocked && (
                              <Badge variant="outline" className="border-muted text-muted-foreground text-xs">
                                🔒 Locked
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
