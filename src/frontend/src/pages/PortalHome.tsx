import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface PortalHomeProps {
  onStartQuest: () => void;
}

export default function PortalHome({ onStartQuest }: PortalHomeProps) {
  return (
    <div className="min-h-screen relative">
      {/* Hero Section with Space Background */}
      <section 
        className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/generated/adventure-hero-space.dim_1920x1080.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/70" />
        
        <div className="relative z-10 text-center space-y-12 max-w-4xl mx-auto">
          <div className="float-animation">
            <Sparkles className="w-20 h-20 mx-auto text-accent mb-6" />
          </div>
          
          {/* NCW Adventures Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="/assets/branding/ncw-logo.png" 
              alt="NCW Adventures logo"
              className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
            />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-bold neon-text leading-tight">
            NCW Adventures
          </h1>
          
          <p className="text-2xl md:text-3xl text-primary font-medium">
            Roblox × Minecraft × Neon Realms
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Conquer 3 Massive Realms. Defeat Boss Fights. Earn XP, Coins & Medals. 
            Become the Ultimate Class 9 Champion!
          </p>
          
          <Button 
            size="lg"
            onClick={onStartQuest}
            className="quest-cta-button text-2xl px-12 py-8 h-auto bg-gradient-to-r from-primary via-accent to-primary hover:from-accent hover:via-primary hover:to-accent neon-glow font-display font-bold shadow-2xl"
          >
            START YOUR QUEST
          </Button>

          <div className="pt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-science text-2xl">⚛️</span>
              <span>Science Galaxy</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-maths text-2xl">∞</span>
              <span>Maths Dungeon</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sst text-2xl">🏰</span>
              <span>SST Quest</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
