import PowerCard from '../components/PowerCard';
import { Button } from '@/components/ui/button';
import { Map, Clock, Globe, Landmark } from 'lucide-react';

interface PortalSocialScienceProps {
  onBossFightStart: () => void;
}

export default function PortalSocialScience({ onBossFightStart }: PortalSocialScienceProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-time-traveler/10 to-background">
      <div className="container mx-auto px-4 py-12">
        {/* Portal Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-12 h-12 text-time-traveler animate-pulse-glow" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold neon-text">
            The Time Traveler's Map
          </h1>
          <p className="text-xl text-time-traveler font-medium">
            Mission: Collect Historical Artifacts
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Journey through time to 1789 and explore the Himalayas. Gather artifacts and uncover the secrets of civilizations!
          </p>
        </div>

        {/* Power Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <PowerCard
            title="French Revolution"
            description="Travel to 1789 Paris and witness the birth of modern democracy."
            imageIndex={0}
            icon={<Landmark className="w-6 h-6" />}
          />
          <PowerCard
            title="Himalayan Geography"
            description="Explore the world's highest peaks and understand their formation."
            imageIndex={1}
            icon={<Map className="w-6 h-6" />}
          />
          <PowerCard
            title="Ancient Civilizations"
            description="Discover the rise and fall of great empires throughout history."
            imageIndex={2}
            icon={<Globe className="w-6 h-6" />}
          />
          <PowerCard
            title="Political Systems"
            description="Learn about different forms of government and their evolution."
            imageIndex={3}
            icon={<Landmark className="w-6 h-6" />}
          />
          <PowerCard
            title="Cultural Heritage"
            description="Collect artifacts that tell the story of human civilization."
            imageIndex={4}
            icon={<Clock className="w-6 h-6" />}
          />
          <PowerCard
            title="Economic History"
            description="Understand how trade and commerce shaped the modern world."
            imageIndex={5}
            icon={<Globe className="w-6 h-6" />}
          />
        </div>

        {/* Boss Fight CTA */}
        <div className="text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-time-traveler/20 to-accent/20 border-2 border-time-traveler/50 neon-glow">
            <h2 className="text-2xl font-display font-bold mb-4 text-time-traveler">
              Ready to Travel Through Time?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Test your historical knowledge in an epic Boss Fight. Earn 100 XP and become a master time traveler!
            </p>
            <Button 
              size="lg"
              onClick={onBossFightStart}
              className="shake-hover bg-time-traveler hover:bg-time-traveler/80 text-time-traveler-foreground font-display text-lg px-8 py-6"
            >
              <Clock className="w-5 h-5 mr-2" />
              Start Boss Fight
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
