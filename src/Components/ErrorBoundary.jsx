// DecisionLab 360 - ErrorBoundary Component
import React from 'react';
import { AlertOctagon, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('DecisionLab 360 ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-xl w-full bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4 border border-rose-500/30">
              <AlertOctagon className="w-6 h-6" />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Se detectó un error en la interfaz
            </h1>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              DecisionLab 360 ha aislado el problema para proteger la integridad de los datos financieros.
            </p>

            {this.state.error && (
              <div className="bg-slate-950 rounded-xl p-4 mb-6 border border-slate-800 text-xs font-mono text-rose-300 overflow-x-auto max-h-40">
                <p className="font-bold">{this.state.error.toString()}</p>
                {this.state.errorInfo?.componentStack && (
                  <pre className="text-slate-500 text-[11px] mt-2 whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack.slice(0, 300)}...
                  </pre>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-md shadow-blue-600/30"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Recargar al Inicio</span>
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-semibold transition-all"
              >
                <Home className="w-4 h-4" />
                <span>Reintentar Render</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
