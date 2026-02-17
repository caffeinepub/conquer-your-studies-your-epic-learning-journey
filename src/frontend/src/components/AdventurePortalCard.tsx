import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface AdventurePortalCardProps {
  title: string;
  subject: string;
  mission: string;
  color: 'quantum-lab' | 'infinity-dungeon' | 'time-traveler';
  onClick: () => void;
}

export default function AdventurePortalCard({ 
  title, 
  subject, 
  mission, 
  color,
  onClick 
}: AdventurePortalCardProps) {
  const colorClasses = {
    'quantum-lab': 'border-quantum-lab/50 hover:border-quantum-lab hover:shadow-[0_0_30px_oklch(var(--quantum-lab)/0.5)]',
    'infinity-dungeon': 'border-infinity-dungeon/50 hover:border-infinity-dungeon hover:shadow-[0_0_30px_oklch(var(--infinity-dungeon)/0.5)]',
    'time-traveler': 'border-time-traveler/50 hover:border-time-traveler hover:shadow-[0_0_30px_oklch(var(--time-traveler)/0.5)]'
  };

  const badgeClasses = {
    'quantum-lab': 'bg-quantum-lab/20 text-quantum-lab border-quantum-lab/50',
    'infinity-dungeon': 'bg-infinity-dungeon/20 text-infinity-dungeon border-infinity-dungeon/50',
    'time-traveler': 'bg-time-traveler/20 text-time-traveler border-time-traveler/50'
  };

  return (
    <Card 
      className={`float-animation cursor-pointer transition-all duration-300 border-2 ${colorClasses[color]} bg-card/80 backdrop-blur-sm overflow-hidden group`}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src="/assets/generated/adventure-portals-set.dim_1536x1024.png" 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
      </div>
      
      <CardHeader>
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-2 ${badgeClasses[color]}`}>
          {subject}
        </div>
        <CardTitle className="text-2xl font-display group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {mission}
        </p>
        
        <Button 
          className="w-full group-hover:neon-glow transition-all"
          variant="outline"
        >
          Enter Portal
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
