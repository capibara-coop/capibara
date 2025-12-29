'use client';

import { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';

const loadingMessages = [
  "Collettivizzando le rubriche...",
  "Distribuendo equamente i contenuti...",
  "I capibara stanno nuotando nelle acque del giornalismo critico...",
  "Organizzando il soviet dei contenuti...",
  "Abbattendo i paywall del capitalismo editoriale...",
  "I capibara preparano la rivoluzione informativa...",
  "Condividendo i mezzi di produzione delle notizie...",
  "Costruendo la coscienza di classe, una riga alla volta...",
  "I capibara meditano sulla prassi rivoluzionaria...",
  "Smantellando l'egemonia culturale neoliberista...",
  "Caricando il materiale dialettico...",
  "I capibara studiano Gramsci sotto un albero...",
  "Sincronizzando la solidarietà internazionale...",
  "Decolonizzando il feed delle notizie...",
  "I capibara organizzano un'assemblea popolare...",
  "Recuperando le storie nascoste dal mainstream...",
  "Preparando l'analisi di classe del giornalismo...",
  "I capibara praticano il mutuo appoggio kropotkiniano...",
  "Caricando la controegemonia culturale...",
  "Distribuendo informazione dal basso...",
];

export default function NewsletterLoading() {
  const [message, setMessage] = useState(loadingMessages[0]);
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Determine theme
    const checkTheme = () => {
      if (typeof window !== 'undefined') {
        const theme = document.documentElement.getAttribute('data-theme');
        setIsDark(theme === 'dark');
      }
    };
    
    checkTheme();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    if (typeof window !== 'undefined') {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'class']
      });
    }

    // Random message on mount
    const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    setMessage(randomMessage);

    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // Change message every 3 seconds with smooth fade transition
    const messageInterval = setInterval(() => {
      // Fade out
      setOpacity(0);
      
      // After fade out completes, change message and fade in
      setTimeout(() => {
        const newMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
        setMessage(newMessage);
        setOpacity(1);
      }, 300); // Half of transition duration
    }, 3000);

    // Animate progress bar - single continuous loading
    // Start fast, then slow down as it approaches 100%
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          // Slow down significantly when near completion
          return Math.min(prev + 0.1, 95);
        } else if (prev >= 80) {
          // Slow down when getting close
          return prev + 0.3;
        } else if (prev >= 50) {
          // Medium speed in the middle
          return prev + 0.8;
        } else {
          // Faster at the beginning
          return prev + 1.2;
        }
      });
    }, 50);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      observer.disconnect();
    };
  }, []);

  const containerBg = isDark ? '#27272a' : '#e4e4e7'; // zinc-800 : zinc-200
  const barGradient = isDark 
    ? 'linear-gradient(to right, #ef4444, #f87171)' // red-500 to red-400
    : 'linear-gradient(to right, #dc2626, #ef4444)'; // red-600 to red-500
  const textColor = isDark ? '#ffffff' : '#000000';

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <div className="text-center space-y-6 max-w-md px-4 w-full">
          {/* Loading message with smooth fade animation */}
          <p 
            className="text-lg font-medium transition-opacity duration-300 ease-in-out"
            style={{ 
              color: textColor,
              opacity: opacity
            }}
          >
            {message}{dots}
          </p>
          
          {/* Progress bar container */}
          <div 
            className="relative w-full max-w-md mx-auto rounded-full overflow-hidden"
            style={{
              height: '20px',
              backgroundColor: containerBg,
              minHeight: '20px'
            }}
          >
            {/* Progress bar fill */}
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-75 ease-linear"
              style={{
                width: `${progress}%`,
                background: barGradient,
                minWidth: progress > 0 ? '4px' : '0px'
              }}
            />
          </div>

          {/* Animated dots */}
          <div className="flex items-center justify-center gap-2">
            <div 
              className="w-2 h-2 rounded-full animate-bounce" 
              style={{ 
                animationDelay: '0ms',
                backgroundColor: isDark ? '#71717a' : '#a1a1aa'
              }}
            />
            <div 
              className="w-2 h-2 rounded-full animate-bounce" 
              style={{ 
                animationDelay: '150ms',
                backgroundColor: isDark ? '#71717a' : '#a1a1aa'
              }}
            />
            <div 
              className="w-2 h-2 rounded-full animate-bounce" 
              style={{ 
                animationDelay: '300ms',
                backgroundColor: isDark ? '#71717a' : '#a1a1aa'
              }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
