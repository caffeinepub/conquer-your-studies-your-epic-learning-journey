import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export function MotivationalQuote() {
  return (
    <Card className="border-4 border-primary bg-gradient-to-br from-card to-accent/20 shadow-battle">
      <CardContent className="py-8 px-6 md:px-12">
        <div className="flex items-start gap-4">
          <Sparkles className="w-8 h-8 text-primary flex-shrink-0 mt-1 animate-pulse-glow" />
          <blockquote className="text-lg md:text-xl font-medium text-foreground leading-relaxed">
            <p className="italic">
              "Embrace the challenges, celebrate your discoveries, and unlock your full learning potential. 
              Your quest for knowledge awaits – go forth and conquer!"
            </p>
          </blockquote>
          <Sparkles className="w-8 h-8 text-primary flex-shrink-0 mt-1 animate-pulse-glow" />
        </div>
      </CardContent>
    </Card>
  );
}
