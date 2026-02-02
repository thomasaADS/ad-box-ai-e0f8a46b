import { useState, useEffect } from 'react';

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Start fade-out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 2500);

    // Remove from DOM after fade-out transition completes (300ms)
    const removeTimer = setTimeout(() => {
      setVisible(false);
      setRemoved(true);
    }, 2800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <>
      {/* Injected keyframe animations */}
      <style>{`
        @keyframes loading-shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes loading-glow-pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes loading-orb-float-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -20px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 15px) scale(0.95);
          }
        }

        @keyframes loading-orb-float-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-25px, 25px) scale(0.9);
          }
          66% {
            transform: translate(15px, -30px) scale(1.08);
          }
        }

        @keyframes loading-orb-float-3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, 20px) scale(1.12);
          }
        }

        @keyframes loading-progress-line {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes loading-dot-bounce {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.3;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes loading-ring-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes loading-text-reveal {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes loading-subtitle-reveal {
          0% {
            opacity: 0;
            letter-spacing: 0.3em;
          }
          100% {
            opacity: 1;
            letter-spacing: 0.15em;
          }
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: visible ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #1a0533 0%, #0f1a3e 40%, #0c1029 70%, #150a2e 100%)',
          opacity: fading ? 0 : 1,
          transition: 'opacity 300ms ease-out',
          overflow: 'hidden',
        }}
        aria-hidden={fading}
      >
        {/* Background gradient orbs */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
            animation: 'loading-orb-float-1 8s ease-in-out infinite',
            filter: 'blur(40px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)',
            animation: 'loading-orb-float-2 10s ease-in-out infinite',
            filter: 'blur(50px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '350px',
            height: '350px',
            marginLeft: '-175px',
            marginTop: '-175px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
            animation: 'loading-orb-float-3 7s ease-in-out infinite',
            filter: 'blur(30px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '60%',
            left: '25%',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
            animation: 'loading-orb-float-1 9s ease-in-out infinite',
            animationDelay: '2s',
            filter: 'blur(35px)',
          }}
        />

        {/* Subtle grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(124, 58, 237, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Main content container */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          {/* Glow ring behind the logo area */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, rgba(37, 99, 235, 0.1) 50%, transparent 70%)',
              animation: 'loading-glow-pulse 2.5s ease-in-out infinite',
              filter: 'blur(20px)',
            }}
          />

          {/* Logo icon */}
          <div
            style={{
              position: 'relative',
              width: '72px',
              height: '72px',
              animation: 'loading-text-reveal 0.6s ease-out both',
            }}
          >
            {/* Spinning ring */}
            <div
              style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: '50%',
                border: '2px solid transparent',
                borderTopColor: '#7c3aed',
                borderRightColor: 'rgba(124, 58, 237, 0.3)',
                animation: 'loading-ring-rotate 2s linear infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: '-14px',
                borderRadius: '50%',
                border: '1px solid transparent',
                borderBottomColor: '#2563eb',
                borderLeftColor: 'rgba(37, 99, 235, 0.2)',
                animation: 'loading-ring-rotate 3s linear infinite reverse',
              }}
            />

            {/* Icon background */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #ec4899 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 40px rgba(124, 58, 237, 0.3), 0 0 80px rgba(37, 99, 235, 0.15)',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '40px', height: '40px', color: 'white' }}
              >
                <path
                  d="M3 21L12 12M12 12L21 3M12 12L17 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 3L6 6L9 7L6 8L5 11L4 8L1 7L4 6L5 3Z"
                  fill="currentColor"
                  style={{ animation: 'loading-glow-pulse 2s ease-in-out infinite' }}
                />
                <path
                  d="M19 14L19.5 15.5L21 16L19.5 16.5L19 18L18.5 16.5L17 16L18.5 15.5L19 14Z"
                  fill="currentColor"
                  style={{ animation: 'loading-glow-pulse 2s ease-in-out infinite 0.5s' }}
                />
              </svg>
            </div>
          </div>

          {/* Brand name with gradient shimmer */}
          <h1
            style={{
              fontSize: '3rem',
              fontWeight: 800,
              lineHeight: 1,
              margin: 0,
              padding: 0,
              background:
                'linear-gradient(90deg, #a78bfa 0%, #818cf8 20%, #e0e7ff 45%, #c4b5fd 55%, #818cf8 80%, #a78bfa 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'loading-shimmer 2.5s linear infinite, loading-text-reveal 0.6s ease-out 0.15s both',
              letterSpacing: '-0.02em',
              fontFamily:
                'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            AdSync
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '0.8rem',
              fontWeight: 500,
              color: 'rgba(196, 181, 253, 0.7)',
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              animation: 'loading-subtitle-reveal 0.8s ease-out 0.4s both',
              fontFamily:
                'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            AI Advertising Platform
          </p>

          {/* Loading indicator - slim progress track with sliding bar */}
          <div
            style={{
              width: '180px',
              height: '2px',
              borderRadius: '2px',
              background: 'rgba(124, 58, 237, 0.15)',
              overflow: 'hidden',
              marginTop: '12px',
              animation: 'loading-text-reveal 0.5s ease-out 0.6s both',
            }}
          >
            <div
              style={{
                width: '40%',
                height: '100%',
                borderRadius: '2px',
                background: 'linear-gradient(90deg, transparent, #7c3aed, #2563eb, transparent)',
                animation: 'loading-progress-line 1.4s ease-in-out infinite',
              }}
            />
          </div>

          {/* Pulsing dots */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              animation: 'loading-text-reveal 0.5s ease-out 0.7s both',
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                  animation: `loading-dot-bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom subtle branding line */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            animation: 'loading-text-reveal 0.5s ease-out 0.9s both',
          }}
        >
          <div
            style={{
              width: '16px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.4))',
            }}
          />
          <span
            style={{
              fontSize: '0.65rem',
              color: 'rgba(148, 163, 184, 0.4)',
              fontWeight: 400,
              letterSpacing: '0.08em',
              fontFamily:
                'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            Powered by AI
          </span>
          <div
            style={{
              width: '16px',
              height: '1px',
              background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.4), transparent)',
            }}
          />
        </div>
      </div>
    </>
  );
}
