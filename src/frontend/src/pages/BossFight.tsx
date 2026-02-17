import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { triggerConfetti } from '../lib/confetti';
import { useCompleteBossFight } from '../hooks/useGamificationQueries';
import { bossFights } from '../lib/bossFights';
import { getChapterById } from '../lib/contentModel';
import { Swords, CheckCircle2, Coins as CoinsIcon } from 'lucide-react';

interface BossFightProps {
  chapterId: string;
  onComplete: () => void;
}

export default function BossFight({ chapterId, onComplete }: BossFightProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const completeBossFight = useCompleteBossFight();
  const chapter = getChapterById(chapterId);
  
  // Get questions based on subject
  const questions = chapter ? bossFights[chapter.subject] : bossFights.science;
  const question = questions[currentQuestion];

  // Subject color mapping
  const subjectColors = {
    science: 'text-science border-science bg-science/10',
    maths: 'text-maths border-maths bg-maths/10',
    sst: 'text-sst border-sst bg-sst/10',
  };
  const subjectColor = chapter ? subjectColors[chapter.subject] : subjectColors.science;

  const handleSubmit = () => {
    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      // Boss Fight completed
      setCompleted(true);
      triggerConfetti();
      completeBossFight.mutate({ earnedXp: BigInt(500), chapter: chapterId });
    }
  };

  const handleFinish = () => {
    onComplete();
  };

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-primary/10 to-background px-4">
        <Card className={`max-w-2xl w-full neon-glow border-2 ${subjectColor} bg-card/95 backdrop-blur-sm`}>
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="flex justify-center">
              <CheckCircle2 className="w-24 h-24 text-primary animate-pulse-glow" />
            </div>
            <CardTitle className="text-5xl font-display neon-text">
              VICTORY!
            </CardTitle>
            {chapter && (
              <p className="text-xl text-muted-foreground">
                {chapter.subject === 'science' ? '⚛️' : chapter.subject === 'maths' ? '∞' : '🏰'} {chapter.title}
              </p>
            )}
          </CardHeader>
          <CardContent className="text-center space-y-8">
            <p className="text-2xl font-bold">
              Score: <span className="text-primary">{score}/{questions.length}</span>
            </p>
            
            {/* Rewards */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50">
                <div className="text-4xl mb-2">⚡</div>
                <div className="text-2xl font-bold text-yellow-500">+500 XP</div>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border-amber-500/50">
                <img 
                  src="/assets/generated/coins-icon.dim_512x512.png" 
                  alt="Coins"
                  className="w-12 h-12 mx-auto mb-2"
                />
                <div className="text-2xl font-bold text-amber-500">+50 Coins</div>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50">
                <img 
                  src="/assets/generated/chapter-mastery-medal.dim_512x512.png" 
                  alt="Medal"
                  className="w-12 h-12 mx-auto mb-2"
                />
                <div className="text-sm font-bold text-purple-500">Chapter Mastery</div>
              </Card>
            </div>
            
            <div className="pt-4">
              <Button 
                size="lg"
                onClick={handleFinish}
                className="bg-primary hover:bg-primary/80 font-display text-xl px-10 py-6 h-auto"
              >
                Return to Realm
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-destructive/10 to-background px-4 py-12">
      <div className="container mx-auto max-w-3xl">
        {/* Boss Fight Header */}
        <div className="text-center mb-8 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Swords className="w-12 h-12 text-destructive animate-pulse-glow" />
          </div>
          <Badge className={`${subjectColor} px-4 py-2 text-lg font-display`}>
            {chapter && `${chapter.subject === 'science' ? '⚛️ Science' : chapter.subject === 'maths' ? '∞ Maths' : '🏰 SST'} → ${chapter.title}`}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold neon-text">
            Boss Fight
          </h1>
          <p className="text-muted-foreground text-lg">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <div className="flex justify-center gap-2">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`h-3 w-16 rounded-full transition-all ${
                  idx < currentQuestion
                    ? 'bg-primary'
                    : idx === currentQuestion
                    ? 'bg-primary animate-pulse-glow'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Card */}
        <Card className={`neon-glow border-2 ${subjectColor} bg-card/95 backdrop-blur-sm`}>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-display leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              <div className="space-y-4">
                {question.options.map((option, idx) => (
                  <Card
                    key={idx}
                    className={`transition-all cursor-pointer ${
                      showResult
                        ? option === question.correctAnswer
                          ? 'border-2 border-green-500 bg-green-500/20'
                          : selectedAnswer === option
                          ? 'border-2 border-red-500 bg-red-500/20'
                          : 'border border-border'
                        : selectedAnswer === option
                        ? 'border-2 border-primary bg-primary/10'
                        : 'border border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center space-x-4 p-4">
                      <RadioGroupItem value={option} id={`option-${idx}`} disabled={showResult} />
                      <Label
                        htmlFor={`option-${idx}`}
                        className="flex-1 cursor-pointer text-base md:text-lg font-medium"
                      >
                        {option}
                      </Label>
                      {showResult && option === question.correctAnswer && (
                        <span className="text-2xl">✓</span>
                      )}
                      {showResult && selectedAnswer === option && option !== question.correctAnswer && (
                        <span className="text-2xl">✗</span>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </RadioGroup>

            {showResult && (
              <Card
                className={`p-4 border-2 ${
                  isCorrect
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-red-500 bg-red-500/10'
                }`}
              >
                <p className="font-bold text-lg mb-2">
                  {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                </p>
                <p className="text-muted-foreground">{question.explanation}</p>
              </Card>
            )}

            <div className="flex justify-end gap-3 pt-4">
              {!showResult ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                  size="lg"
                  className="font-display text-lg px-8"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="font-display bg-primary hover:bg-primary/80 text-lg px-8"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question →' : 'Complete Boss Fight 🎉'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
