import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Atom, Infinity, Castle } from 'lucide-react';

interface WorldMapHubProps {
  onRealmSelect: (realm: 'science' | 'maths' | 'sst') => void;
}

export default function WorldMapHub({ onRealmSelect }: WorldMapHubProps) {
  return (
    <div 
      className="min-h-screen relative bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-12"
      style={{ backgroundImage: 'url(/assets/generated/world-map-hub.dim_1920x1080.png)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
      
      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-display font-bold neon-text">
            World Map
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose Your Massive Realm
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* THE QUANTUM GALAXY - Science */}
          <Card 
            className="group relative overflow-hidden border-4 border-science bg-card/90 backdrop-blur-md hover:border-science hover:shadow-science-glow transition-all duration-300 cursor-pointer"
            onClick={() => onRealmSelect('science')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-science/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-8 space-y-6">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-science/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Atom className="w-12 h-12 text-science animate-pulse-glow" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-display font-bold text-science">
                  THE QUANTUM GALAXY
                </h2>
                <p className="text-sm text-muted-foreground">
                  Science - Full Syllabus
                </p>
                <p className="text-xs text-muted-foreground pt-2">
                  3 Planets: Chemistry, Physics, Biology
                </p>
              </div>
              <Button 
                className="w-full bg-science hover:bg-science/80 text-science-foreground font-display"
                size="lg"
              >
                Enter Realm
              </Button>
            </div>
          </Card>

          {/* THE INFINITY DUNGEON - Maths */}
          <Card 
            className="group relative overflow-hidden border-4 border-maths bg-card/90 backdrop-blur-md hover:border-maths hover:shadow-maths-glow transition-all duration-300 cursor-pointer"
            onClick={() => onRealmSelect('maths')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-maths/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-8 space-y-6">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-maths/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Infinity className="w-12 h-12 text-maths animate-pulse-glow" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-display font-bold text-maths">
                  THE INFINITY DUNGEON
                </h2>
                <p className="text-sm text-muted-foreground">
                  Mathematics - Full Syllabus
                </p>
                <p className="text-xs text-muted-foreground pt-2">
                  13 Boss Levels in Linear Path
                </p>
              </div>
              <Button 
                className="w-full bg-maths hover:bg-maths/80 text-maths-foreground font-display"
                size="lg"
              >
                Enter Realm
              </Button>
            </div>
          </Card>

          {/* THE CIVILIZATION QUEST - SST */}
          <Card 
            className="group relative overflow-hidden border-4 border-sst bg-card/90 backdrop-blur-md hover:border-sst hover:shadow-sst-glow transition-all duration-300 cursor-pointer"
            onClick={() => onRealmSelect('sst')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sst/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-8 space-y-6">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-sst/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Castle className="w-12 h-12 text-sst animate-pulse-glow" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-display font-bold text-sst">
                  THE CIVILIZATION QUEST
                </h2>
                <p className="text-sm text-muted-foreground">
                  Social Science - All 4 Subjects
                </p>
                <p className="text-xs text-muted-foreground pt-2">
                  4 Kingdoms: History, Geography, Civics, Economics
                </p>
              </div>
              <Button 
                className="w-full bg-sst hover:bg-sst/80 text-sst-foreground font-display"
                size="lg"
              >
                Enter Realm
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
