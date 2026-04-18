import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import toast from 'react-hot-toast'
import { Mail, Lock, Eye, EyeOff, CheckSquare, Sun, Moon, Code2, Send, Briefcase } from 'lucide-react'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dark, setDark] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (mounted && user) navigate('/', { replace: true })
    })
    return () => { mounted = false }
  }, [navigate])

  const c = dark ? {
    bg: '#0f172a',
    surface: '#1e293b',
    surfaceHover: '#273549',
    border: '#334155',
    text: '#f1f5f9',
    muted: '#94a3b8',
    inputBg: '#162032',
    navBg: 'rgba(15,23,42,0.95)',
  } : {
    bg: '#f8fafc',
    surface: '#ffffff',
    surfaceHover: '#f1f5f9',
    border: '#e2e8f0',
    text: '#0f172a',
    muted: '#64748b',
    inputBg: '#f8fafc',
    navBg: 'rgba(248,250,252,0.95)',
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return toast.error('Please fill in all fields')
    if (password.length < 6) return toast.error('Password must be at least 6 characters')
    setLoading(true)
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) toast.error(error.message)
      else { toast.success('Welcome back!'); navigate('/') }
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) toast.error(error.message)
      else toast.success('Account created! Check your email to confirm.')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: c.bg, color: c.text, fontFamily: 'Inter, Segoe UI, sans-serif', transition: 'all 0.3s' }}>

      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', background: c.navBg, borderBottom: `1px solid ${c.border}`, backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 20, fontWeight: 700, color: '#6366f1' }}>
          <CheckSquare size={24} />
          <span>TaskFlow</span>
        </div>
        <button onClick={() => setDark(!dark)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 8, padding: '8px 16px', color: c.muted, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s' }}>
          {dark ? <Sun size={16} /> : <Moon size={16} />}
          <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </nav>

      {/* Main */}
      <main style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

        {/* Left */}
        <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 48px' }}>
          <div style={{ maxWidth: 360, color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <CheckSquare size={44} color="#fff" />
              <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', margin: 0 }}>TaskFlow</h1>
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', marginBottom: 36 }}>
              The productivity app built for people who get things done.
            </p>
            {[
              'Organize tasks by priority',
              'Sync across all devices',
              'Secure and private',
              'Beautiful dark & light themes'
            ].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, color: 'rgba(255,255,255,0.9)', fontSize: 15 }}>
                <CheckSquare size={16} color="rgba(255,255,255,0.8)" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 48px', background: c.bg }}>
          <div style={{ width: '100%', maxWidth: 420 }}>

            {/* Tabs */}
            <div style={{ display: 'flex', background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: 4, marginBottom: 28 }}>
              {['Sign In', 'Sign Up'].map((label, i) => (
                <button key={label} onClick={() => setIsLogin(i === 0)} style={{
                  flex: 1, padding: '10px', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                  background: (isLogin && i === 0) || (!isLogin && i === 1) ? '#6366f1' : 'transparent',
                  color: (isLogin && i === 0) || (!isLogin && i === 1) ? '#fff' : c.muted,
                }}>{label}</button>
              ))}
            </div>

            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6, color: c.text }}>
              {isLogin ? 'Welcome back' : 'Create account'}
            </h2>
            <p style={{ fontSize: 14, color: c.muted, marginBottom: 28 }}>
              {isLogin ? 'Sign in to continue to your workspace' : 'Start organizing your life for free'}
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: c.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email Address</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Mail size={16} style={{ position: 'absolute', left: 14, color: c.muted, pointerEvents: 'none' }} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%', background: c.inputBg, border: `1.5px solid ${c.border}`, borderRadius: 10, padding: '13px 16px 13px 42px', color: c.text, fontSize: 15, outline: 'none', transition: 'border 0.2s' }}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = c.border}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: c.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Password</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Lock size={16} style={{ position: 'absolute', left: 14, color: c.muted, pointerEvents: 'none' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ width: '100%', background: c.inputBg, border: `1.5px solid ${c.border}`, borderRadius: 10, padding: '13px 42px 13px 42px', color: c.text, fontSize: 15, outline: 'none', transition: 'border 0.2s' }}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = c.border}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, background: 'none', border: 'none', cursor: 'pointer', color: c.muted, display: 'flex', padding: 0 }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div style={{ textAlign: 'right', marginTop: -10 }}>
                  <span style={{ fontSize: 13, color: '#6366f1', cursor: 'pointer', fontWeight: 500 }}>Forgot password?</span>
                </div>
              )}

              <button type="submit" disabled={loading} style={{ background: loading ? c.border : '#6366f1', color: loading ? c.muted : '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: loading ? 'none' : '0 4px 14px rgba(99,102,241,0.4)' }}>
                {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
              </button>

            </form>

            <p style={{ textAlign: 'center', color: c.muted, fontSize: 14, marginTop: 24 }}>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <span onClick={() => setIsLogin(!isLogin)} style={{ color: '#6366f1', fontWeight: 600, cursor: 'pointer', marginLeft: 4 }}>
                {isLogin ? 'Sign up free' : 'Sign in'}
              </span>
            </p>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', borderTop: `1px solid ${c.border}`, fontSize: 13, color: c.muted }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckSquare size={16} color="#6366f1" />
          <span>TaskFlow &copy; {new Date().getFullYear()}</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy', 'Terms', 'Support'].map(l => (
            <a key={l} href="#" style={{ color: c.muted, textDecoration: 'none', fontSize: 13 }}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <a href="https://github.com/BereketWorana" target="_blank" rel="noreferrer" style={{ color: c.muted, display: 'flex' }}><Code2 size={18} /></a>
          <a href="#" target="_blank" rel="noreferrer" style={{ color: c.muted, display: 'flex' }}><Send size={18} /></a>
          <a href="#" target="_blank" rel="noreferrer" style={{ color: c.muted, display: 'flex' }}><Briefcase size={18} /></a>
        </div>
      </footer>

    </div>
  )
}
