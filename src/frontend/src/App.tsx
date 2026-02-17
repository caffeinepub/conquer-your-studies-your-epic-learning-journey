import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardWarMap from './pages/DashboardWarMap';
import DivideAndConquer from './pages/DivideAndConquer';
import { Swords, Target } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('war-map');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header with Battle Banner */}
      <header className="relative border-b-4 border-primary shadow-battle overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/assets/generated/battle-banner.dim_1600x400.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <Swords className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-display font-bold text-center text-foreground">
              Conquer Your Studies: Your Epic Learning Journey
            </h1>
            <Target className="w-8 h-8 text-primary" />
          </div>
          <p className="text-center text-muted-foreground mt-2 text-sm md:text-base font-medium">
            Strategic Battle Plan for Academic Victory
          </p>
        </div>
      </header>

      {/* Main Navigation */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start h-14 bg-transparent border-0 rounded-none">
              <TabsTrigger 
                value="war-map" 
                className="data-[state=active]:border-b-4 data-[state=active]:border-primary rounded-none px-6 py-3 font-display text-base"
              >
                <Target className="w-5 h-5 mr-2" />
                War Map Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="divide-conquer" 
                className="data-[state=active]:border-b-4 data-[state=active]:border-primary rounded-none px-6 py-3 font-display text-base"
              >
                <Swords className="w-5 h-5 mr-2" />
                Divide and Conquer
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <Tabs value={activeTab} className="w-full">
          <TabsContent value="war-map" className="mt-0">
            <DashboardWarMap />
          </TabsContent>
          <TabsContent value="divide-conquer" className="mt-0">
            <DivideAndConquer />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'conquer-studies'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
