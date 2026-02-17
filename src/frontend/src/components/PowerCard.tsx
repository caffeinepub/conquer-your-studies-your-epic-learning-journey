import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface PowerCardProps {
  title: string;
  description: string;
  imageIndex?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: ReactNode;
}

export default function PowerCard({ title, description, imageIndex = 0, action, icon }: PowerCardProps) {
  return (
    <Card className="float-animation hover:neon-glow transition-all duration-300 bg-card/80 backdrop-blur-sm border-primary/30 overflow-hidden group">
      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
        <img 
          src="/assets/generated/power-cards-pack.dim_1024x1024.png" 
          alt={title}
          className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
          style={{ objectPosition: `${(imageIndex % 4) * 33}% 50%` }}
        />
        {icon && (
          <div className="absolute top-2 right-2 text-primary">
            {icon}
          </div>
        )}
      </div>
      
      <CardContent className="p-4 space-y-3">
        <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        {action && (
          <Button 
            onClick={action.onClick}
            size="sm"
            className="w-full mt-2"
            variant="outline"
          >
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
