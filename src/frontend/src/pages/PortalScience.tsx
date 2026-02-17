import PowerCard from '../components/PowerCard';
import { Button } from '@/components/ui/button';
import { Atom, Zap, Beaker, Rocket } from 'lucide-react';

interface PortalScienceProps {
  onBossFightStart: () => void;
}

export default function PortalScience({ onBossFightStart }: PortalScienceProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-quantum-lab/10 to-background">
      <div className="container mx-auto px-4 py-12">
        {/* Portal Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Atom className="w-12 h-12 text-quantum-lab animate-pulse-glow" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold neon-text">
            The Quantum Lab
          </h1>
          <p className="text-xl text-quantum-lab font-medium">
            Mission: Defeat the Black Hole
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master Physics and Chemistry puzzles to save the universe from collapsing into darkness!
          </p>
        </div>

        {/* Power Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <PowerCard
            title="Matter & Energy"
            description="Explore the fundamental building blocks of the universe and their transformations."
            imageIndex={0}
            icon={<Atom className="w-6 h-6" />}
          />
          <PowerCard
            title="Chemical Reactions"
            description="Mix elements and compounds to create powerful reactions and unlock new abilities."
            imageIndex={1}
            icon={<Beaker className="w-6 h-6" />}
          />
          <PowerCard
            title="Forces & Motion"
            description="Harness the laws of physics to navigate through space and time."
            imageIndex={2}
            icon={<Zap className="w-6 h-6" />}
          />
          <PowerCard
            title="Atomic Structure"
            description="Dive deep into the quantum realm and understand the nature of atoms."
            imageIndex={3}
            icon={<Rocket className="w-6 h-6" />}
          />
          <PowerCard
            title="Periodic Table"
            description="Master the elements and their properties to solve complex puzzles."
            imageIndex={4}
            icon={<Atom className="w-6 h-6" />}
          />
          <PowerCard
            title="Energy Conservation"
            description="Learn to balance energy equations and power up your scientific arsenal."
            imageIndex={5}
            icon={<Zap className="w-6 h-6" />}
          />
        </div>

        {/* Boss Fight CTA */}
        <div className="text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-quantum-lab/20 to-primary/20 border-2 border-quantum-lab/50 neon-glow">
            <h2 className="text-2xl font-display font-bold mb-4 text-quantum-lab">
              Ready to Face the Black Hole?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Test your knowledge in an epic Boss Fight. Win to earn 100 XP and advance your level!
            </p>
            <Button 
              size="lg"
              onClick={onBossFightStart}
              className="shake-hover bg-quantum-lab hover:bg-quantum-lab/80 text-quantum-lab-foreground font-display text-lg px-8 py-6"
            >
              <Atom className="w-5 h-5 mr-2" />
              Start Boss Fight
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
