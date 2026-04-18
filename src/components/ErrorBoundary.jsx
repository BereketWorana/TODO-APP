import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('System Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, textAlign: 'center', background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
          <h2 style={{ color: 'var(--danger)', marginBottom: 20 }}>System Critical Error</h2>
          <p className="text-muted">The hunter system interface encountered a fatal anomaly.</p>
          <button 
            className="btn-primary" 
            style={{ margin: '20px auto' }}
            onClick={() => window.location.reload()}
          >
            Reboot System
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
