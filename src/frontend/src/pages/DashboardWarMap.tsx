import { useSyllabusItems } from '../hooks/useQueries';
import { WarMapNode } from '../components/WarMapNode';
import { MotivationalQuote } from '../components/MotivationalQuote';
import { Loader2, Map, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function DashboardWarMap() {
  const { data: items, isLoading, error } = useSyllabusItems();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground font-medium">Loading your battle map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load syllabus items. Please try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* War Map Background */}
      <div 
        className="fixed inset-0 war-map-bg opacity-20 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Map className="w-10 h-10 text-primary" />
            <h2 className="text-4xl font-display font-bold">War Map of the Syllabus</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Survey your academic territories and plan your conquest
          </p>
        </div>

        {/* War Map Grid */}
        {items && items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {items.map((item) => (
              <WarMapNode key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 mb-16">
            <Map className="w-20 h-20 text-muted-foreground/50 mx-auto mb-6" />
            <h3 className="text-2xl font-display font-bold mb-3">Your Map Awaits</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              No territories claimed yet. Head to "Divide and Conquer" to create your first chapter and begin your journey!
            </p>
          </div>
        )}

        {/* Motivational Quote */}
        <div className="max-w-4xl mx-auto">
          <MotivationalQuote />
        </div>
      </div>
    </div>
  );
}
