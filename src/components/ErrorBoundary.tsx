import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

/**
 * ErrorBoundary - Catches React errors and displays fallback UI
 * 
 * Usage:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    // Example: Sentry.captureException(error, { extra: errorInfo });
    
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    // Optionally reload the page
    // window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-lg w-full p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-destructive/10">
                <AlertTriangle className="w-12 h-12 text-destructive" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-2">משהו השתבש</h1>
            <p className="text-muted-foreground mb-6">
              אירעה שגיאה בלתי צפויה. אנא נסה לרענן את הדף או צור קשר עם התמיכה אם הבעיה נמשכת.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <div className="mb-6 p-4 bg-muted rounded-lg text-left overflow-auto">
                <p className="font-mono text-sm text-destructive mb-2">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo?.componentStack && (
                  <pre className="text-xs text-muted-foreground overflow-x-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}

            <div className="flex gap-3 justify-center">
              <Button onClick={this.handleReset} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                נסה שוב
              </Button>
              <Button onClick={() => window.location.href = '/'}>
                חזור לדף הבית
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

