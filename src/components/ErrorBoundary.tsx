import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Portfolio render error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-void text-white flex items-center justify-center p-8">
          <div className="max-w-md text-center space-y-4">
            <h1 className="font-display text-2xl text-gold">Something went wrong</h1>
            <p className="font-body text-sm text-white/60">
              The page failed to load. Try a hard refresh (Cmd+Shift+R). If it persists,
              open the browser console and share any errors.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gold text-void text-xs uppercase tracking-widest font-semibold"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
