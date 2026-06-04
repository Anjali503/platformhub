import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="text-center px-6">
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-rose-500/10 rounded-full">
                <AlertCircle className="w-12 h-12 text-rose-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Something went wrong</h1>
            <p className="text-slate-400 mb-2">
              We encountered an unexpected error. Please try again or refresh the page.
            </p>
            {this.state.error && (
              <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-700 max-w-md mx-auto">
                <p className="text-slate-300 text-sm font-mono break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
