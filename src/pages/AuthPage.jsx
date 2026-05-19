import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import toast from 'react-hot-toast'
import { Mail, Lock, Eye, EyeOff, Zap, Sun, Moon, Code2, Send, Briefcase } from 'lucide-react'

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
    bg: '#0a0d14',
    surface: '#0f1319',
    surfaceHover: '#1a1f2e',
    border: '#2d3748',
    text: '#e0e7ff',
    muted: '#6b7280',
    inputBg: '#1a1f2e',
    navBg: 'rgba(10, 13, 20, 0.98)',
    accent: '#a78bfa',
    accentDark: '#7c3aed',
    neonCyan: '#06b6d4',
    neonGold: '#fbbf24',
  } : {
    bg: '#f8fafc',
    surface: '#ffffff',
    surfaceHover: '#f1f5f9',
    border: '#e2e8f0',
    text: '#0f172a',
    muted: '#64748b',
    inputBg: '#f8fafc',
    navBg: 'rgba(248,250,252,0.95)',
    accent: '#a78bfa',
    accentDark: '#7c3aed',
    neonCyan: '#06b6d4',
    neonGold: '#fbbf24',
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: dark ? 'radial-gradient(ellipse at top, rgba(167, 139, 250, 0.05) 0%, transparent 60%)' : c.bg, color: c.text, fontFamily: 'Inter, Segoe UI, sans-serif', transition: 'all 0.3s' }}>

      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', background: c.navBg, borderBottom: `2px solid rgba(167, 139, 250, 0.2)`, backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 0 30px rgba(167, 139, 250, 0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 20, fontWeight: 700, color: c.accent, textShadow: '0 0 20px rgba(167, 139, 250, 0.5)' }}>
          <div style={{ position: 'relative', display: 'flex' }}>
            <Zap size={24} color={c.neonGold} style={{ filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))' }} />
          </div>
          <span>THE SYSTEM</span>
        </div>
        <button onClick={() => setDark(!dark)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: `rgba(167, 139, 250, 0.1)`, border: `1px solid ${c.border}`, borderRadius: 8, padding: '8px 16px', color: c.muted, fontSize: 14, cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 0 10px rgba(167, 139, 250, 0.1)' }}>
          {dark ? <Sun size={16} /> : <Moon size={16} />}
          <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </nav>

      {/* Main */}
      <main style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

        {/* Left */}
        <div style={{ background: dark ? 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #06b6d4 100%)' : 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 48px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
          <div style={{ maxWidth: 360, color: '#fff', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <Zap size={44} color={c.neonGold} style={{ filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.8))' }} />
              <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', margin: 0, textShadow: '0 0 20px rgba(0, 0, 0, 0.3)' }}>THE SYSTEM</h1>
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.9)', marginBottom: 36 }}>
              Unlock your potential. Level up your productivity. Become unstoppable.
            </p>
            {[
              'Organize quests by priority',
              'Sync across all devices',
              'Secure and encrypted',
              'Dark mode for night raiders'
            ].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, color: 'rgba(255,255,255,0.95)', fontSize: 15 }}>
                <Zap size={16} color="rgba(255,255,255,0.9)" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 48px', background: c.bg }}>
          <div style={{ width: '100%', maxWidth: 420 }}>

            {/* Tabs */}
            <div style={{ display: 'flex', background: c.surface, border: `1px solid rgba(167, 139, 250, 0.2)`, borderRadius: 10, padding: 4, marginBottom: 28, boxShadow: '0 0 15px rgba(167, 139, 250, 0.1)' }}>
              {['Sign In', 'Sign Up'].map((label, i) => (
                <button key={label} onClick={() => setIsLogin(i === 0)} style={{
                  flex: 1, padding: '10px', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s',
                  background: (isLogin && i === 0) || (!isLogin && i === 1) ? `linear-gradient(135deg, ${c.accent} 0%, ${c.accentDark} 100%)` : 'transparent',
                  color: (isLogin && i === 0) || (!isLogin && i === 1) ? '#fff' : c.muted,
                  boxShadow: (isLogin && i === 0) || (!isLogin && i === 1) ? '0 0 20px rgba(167, 139, 250, 0.4)' : 'none',
                }}>{label}</button>
              ))}
            </div>

            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6, color: c.text }}>
              {isLogin ? 'Welcome back' : 'Create account'}
            </h2>
            <p style={{ fontSize: 14, color: c.muted, marginBottom: 28 }}>
              {isLogin ? 'Return to the System' : 'Begin your journey'}
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
                    style={{ width: '100%', background: c.inputBg, border: `1.5px solid rgba(167, 139, 250, 0.2)`, borderRadius: 10, padding: '13px 16px 13px 42px', color: c.text, fontSize: 15, outline: 'none', transition: 'all 0.3s', backdropFilter: 'blur(10px)' }}
                    onFocus={e => { e.target.style.borderColor = c.accent; e.target.style.boxShadow = `0 0 20px rgba(167, 139, 250, 0.3)`; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(167, 139, 250, 0.2)'; e.target.style.boxShadow = 'none'; }}
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
                    style={{ width: '100%', background: c.inputBg, border: `1.5px solid rgba(167, 139, 250, 0.2)`, borderRadius: 10, padding: '13px 42px 13px 42px', color: c.text, fontSize: 15, outline: 'none', transition: 'all 0.3s', backdropFilter: 'blur(10px)' }}
                    onFocus={e => { e.target.style.borderColor = c.accent; e.target.style.boxShadow = `0 0 20px rgba(167, 139, 250, 0.3)`; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(167, 139, 250, 0.2)'; e.target.style.boxShadow = 'none'; }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, background: 'none', border: 'none', cursor: 'pointer', color: c.muted, display: 'flex', padding: 0 }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div style={{ textAlign: 'right', marginTop: -10 }}>
                  <span style={{ fontSize: 13, color: c.accent, cursor: 'pointer', fontWeight: 500 }}>Forgot password?</span>
                </div>
              )}

              <button type="submit" disabled={loading} style={{ background: loading ? c.border : `linear-gradient(135deg, ${c.accent} 0%, ${c.accentDark} 100%)`, color: loading ? c.muted : '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s', boxShadow: loading ? 'none' : `0 0 25px rgba(167, 139, 250, 0.4)`, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
              </button>

            </form>

            <p style={{ textAlign: 'center', color: c.muted, fontSize: 14, marginTop: 24 }}>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <span onClick={() => setIsLogin(!isLogin)} style={{ color: c.accent, fontWeight: 600, cursor: 'pointer', marginLeft: 4, textShadow: `0 0 8px rgba(167, 139, 250, 0.4)` }}>
                {isLogin ? 'Sign up free' : 'Sign in'}
              </span>
            </p>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', borderTop: `1px solid rgba(167, 139, 250, 0.2)`, fontSize: 13, color: c.muted, background: c.navBg, backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Zap size={16} color={c.accent} style={{ filter: 'drop-shadow(0 0 6px rgba(167, 139, 250, 0.4))' }} />
          <span>THE SYSTEM &copy; {new Date().getFullYear()}</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy', 'Terms', 'Support'].map(l => (
            <a key={l} href="#" style={{ color: c.muted, textDecoration: 'none', fontSize: 13, transition: 'all 0.3s' }} onMouseEnter={e => { e.target.style.color = c.accent; e.target.style.textShadow = `0 0 8px rgba(167, 139, 250, 0.4)`; }} onMouseLeave={e => { e.target.style.color = c.muted; e.target.style.textShadow = 'none'; }}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <a href="https://github.com/BereketWorana" target="_blank" rel="noreferrer" style={{ color: c.muted, display: 'flex', transition: 'all 0.3s' }} onMouseEnter={e => { e.target.style.color = c.accent; e.target.style.filter = 'drop-shadow(0 0 8px rgba(167, 139, 250, 0.4))'; }} onMouseLeave={e => { e.target.style.color = c.muted; e.target.style.filter = 'none'; }}><Code2 size={18} /></a>
          <a href="#" target="_blank" rel="noreferrer" style={{ color: c.muted, display: 'flex', transition: 'all 0.3s' }} onMouseEnter={e => { e.target.style.color = c.accent; e.target.style.filter = 'drop-shadow(0 0 8px rgba(167, 139, 250, 0.4))'; }} onMouseLeave={e => { e.target.style.color = c.muted; e.target.style.filter = 'none'; }}><Send size={18} /></a>
          <a href="#" target="_blank" rel="noreferrer" style={{ color: c.muted, display: 'flex', transition: 'all 0.3s' }} onMouseEnter={e => { e.target.style.color = c.accent; e.target.style.filter = 'drop-shadow(0 0 8px rgba(167, 139, 250, 0.4))'; }} onMouseLeave={e => { e.target.style.color = c.muted; e.target.style.filter = 'none'; }}><Briefcase size={18} /></a>
        </div>
      </footer>

    </div>
  )
}
