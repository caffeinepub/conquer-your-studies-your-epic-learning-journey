import PowerCard from '../components/PowerCard';
import { Button } from '@/components/ui/button';
import { Shapes, Calculator, PieChart, Infinity } from 'lucide-react';

interface PortalMathsProps {
  onBossFightStart: () => void;
}

export default function PortalMaths({ onBossFightStart }: PortalMathsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-infinity-dungeon/10 to-background">
      <div className="container mx-auto px-4 py-12">
        {/* Portal Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Infinity className="w-12 h-12 text-infinity-dungeon animate-pulse-glow" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold neon-text">
            The Infinity Dungeon
          </h1>
          <p className="text-xl text-infinity-dungeon font-medium">
            Mission: Unlock the Secret Vault
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Use Geometry and Algebra keys to solve ancient mathematical mysteries and claim the treasure!
          </p>
        </div>

        {/* Power Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <PowerCard
            title="Algebraic Equations"
            description="Solve complex equations to unlock hidden passages and secret chambers."
            imageIndex={0}
            icon={<Calculator className="w-6 h-6" />}
          />
          <PowerCard
            title="Geometric Shapes"
            description="Master triangles, circles, and polygons to navigate the dungeon's architecture."
            imageIndex={1}
            icon={<Shapes className="w-6 h-6" />}
          />
          <PowerCard
            title="Number Patterns"
            description="Discover sequences and patterns that reveal the vault's combination."
            imageIndex={2}
            icon={<PieChart className="w-6 h-6" />}
          />
          <PowerCard
            title="Coordinate Geometry"
            description="Plot your path through the dungeon using the power of coordinates."
            imageIndex={3}
            icon={<Shapes className="w-6 h-6" />}
          />
          <PowerCard
            title="Polynomials"
            description="Factor and expand expressions to break through mathematical barriers."
            imageIndex={4}
            icon={<Calculator className="w-6 h-6" />}
          />
          <PowerCard
            title="Trigonometry"
            description="Use angles and ratios to calculate distances and unlock ancient mechanisms."
            imageIndex={5}
            icon={<PieChart className="w-6 h-6" />}
          />
        </div>

        {/* Boss Fight CTA */}
        <div className="text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-infinity-dungeon/20 to-secondary/20 border-2 border-infinity-dungeon/50 neon-glow">
            <h2 className="text-2xl font-display font-bold mb-4 text-infinity-dungeon">
              Ready to Unlock the Vault?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Face the ultimate mathematical challenge. Solve the puzzles to earn 100 XP!
            </p>
            <Button 
              size="lg"
              onClick={onBossFightStart}
              className="shake-hover bg-infinity-dungeon hover:bg-infinity-dungeon/80 text-infinity-dungeon-foreground font-display text-lg px-8 py-6"
            >
              <Infinity className="w-5 h-5 mr-2" />
              Start Boss Fight
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
