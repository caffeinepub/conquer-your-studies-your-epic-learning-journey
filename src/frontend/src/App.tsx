import { useState } from 'react';
import PortalHome from './pages/PortalHome';
import WorldMapHub from './pages/WorldMapHub';
import RealmQuantumGalaxy from './pages/RealmQuantumGalaxy';
import RealmInfinityDungeon from './pages/RealmInfinityDungeon';
import RealmCivilizationQuest from './pages/RealmCivilizationQuest';
import BossFight from './pages/BossFight';
import GamificationHeader from './components/GamificationHeader';
import HallOfFameLeaderboard from './components/HallOfFameLeaderboard';
import { Heart } from 'lucide-react';

type View = 'landing' | 'world-map' | 'realm-science' | 'realm-maths' | 'realm-sst' | 'boss-fight';

function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleStartQuest = () => {
    setCurrentView('world-map');
  };

  const handleRealmSelect = (realm: 'science' | 'maths' | 'sst') => {
    if (realm === 'science') setCurrentView('realm-science');
    else if (realm === 'maths') setCurrentView('realm-maths');
    else if (realm === 'sst') setCurrentView('realm-sst');
  };

  const handleChapterSelect = (chapterId: string) => {
    setSelectedChapter(chapterId);
    setCurrentView('boss-fight');
  };

  const handleBackToWorldMap = () => {
    setCurrentView('world-map');
    setSelectedChapter(null);
  };

  const handleBackToRealm = () => {
    // Determine which realm to return to based on selected chapter
    if (selectedChapter) {
      if (selectedChapter.startsWith('sci-')) setCurrentView('realm-science');
      else if (selectedChapter.startsWith('math-')) setCurrentView('realm-maths');
      else if (selectedChapter.startsWith('sst-')) setCurrentView('realm-sst');
    }
    setSelectedChapter(null);
  };

  const handleBackClick = () => {
    if (currentView === 'boss-fight') {
      handleBackToRealm();
    } else if (currentView.startsWith('realm-')) {
      handleBackToWorldMap();
    } else if (currentView === 'world-map') {
      setCurrentView('landing');
    }
  };

  const showHeader = currentView !== 'landing';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Gamification Header */}
      {showHeader && (
        <GamificationHeader 
          onHallOfFameClick={() => setShowLeaderboard(true)}
          onBackClick={handleBackClick}
        />
      )}

      {/* Main Content */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <PortalHome onStartQuest={handleStartQuest} />
        )}
        {currentView === 'world-map' && (
          <WorldMapHub onRealmSelect={handleRealmSelect} />
        )}
        {currentView === 'realm-science' && (
          <RealmQuantumGalaxy 
            onBack={handleBackToWorldMap}
            onChapterSelect={handleChapterSelect}
          />
        )}
        {currentView === 'realm-maths' && (
          <RealmInfinityDungeon 
            onBack={handleBackToWorldMap}
            onChapterSelect={handleChapterSelect}
          />
        )}
        {currentView === 'realm-sst' && (
          <RealmCivilizationQuest 
            onBack={handleBackToWorldMap}
            onChapterSelect={handleChapterSelect}
          />
        )}
        {currentView === 'boss-fight' && selectedChapter && (
          <BossFight 
            chapterId={selectedChapter}
            onComplete={handleBackToRealm}
          />
        )}
      </main>

      {/* Footer */}
      {currentView === 'landing' && (
        <footer className="border-t border-primary/20 bg-card/50 backdrop-blur-sm py-6">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              © {new Date().getFullYear()} Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'class9-epic-adventure'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </footer>
      )}

      {/* Hall of Fame Modal */}
      <HallOfFameLeaderboard 
        open={showLeaderboard} 
        onOpenChange={setShowLeaderboard} 
      />
    </div>
  );
}

export default App;
