import React from 'react'
import toast from 'react-hot-toast'
import { CheckCircle2, AlertCircle, Zap, Target, Trophy, Trash2, LogOut } from 'lucide-react'

export const toastConfig = {
  success: (message) => toast.success(message, {
    icon: <CheckCircle2 className="toast-icon-success" size={20} />,
    style: { background: 'var(--bg2)', color: 'var(--text)', border: '1px solid var(--success)', padding: '12px 16px', fontWeight: 500 },
    duration: 3000
  }),
  error: (message) => toast.error(message, {
    icon: <AlertCircle className="toast-icon-error" size={20} />,
    style: { background: 'var(--bg2)', color: 'var(--text)', border: '1px solid var(--danger)', padding: '12px 16px', fontWeight: 500 },
    duration: 4000
  }),
  info: (message) => toast(message, {
    icon: <Zap size={20} style={{ color: 'var(--acc)' }} />,
    style: { background: 'var(--bg2)', color: 'var(--text)', border: '1px solid var(--acc)', padding: '12px 16px', fontWeight: 500 },
    duration: 3000
  }),
  quest: (message) => toast(message, {
    icon: <Target size={20} style={{ color: 'var(--cat-main)' }} />,
    style: { background: 'var(--bg2)', color: 'var(--text)', border: '1px solid var(--cat-main)', padding: '12px 16px', fontWeight: 500 },
    duration: 3000
  }),
  rankUp: (message) => toast(message, {
    icon: <Trophy size={20} style={{ color: 'var(--priority-medium)' }} />,
    style: { background: 'var(--bg2)', color: 'var(--text)', border: '1px solid var(--priority-medium)', padding: '14px 18px', fontWeight: 600, boxShadow: '0 0 20px rgba(245,158,11,0.3)' },
    duration: 6000
  }),
  xp: (message) => toast(message, {
    icon: <Zap size={20} style={{ color: 'var(--cat-study)' }} />,
    style: { background: 'var(--bg2)', color: 'var(--text)', border: '1px solid var(--cat-study)', padding: '12px 16px', fontWeight: 500 },
    duration: 2500
  }),
  delete: (message) => toast(message, {
    icon: <Trash2 size={20} style={{ color: 'var(--danger)' }} />,
    style: { background: 'var(--bg2)', color: 'var(--text)', border: '1px solid var(--danger)', padding: '12px 16px', fontWeight: 500 },
    duration: 3000
  }),
  logout: (message) => toast.success(message, {
    icon: <LogOut size={20} style={{ color: 'var(--muted)' }} />,
    style: { background: 'var(--bg2)', color: 'var(--text)', border: '1px solid var(--muted)', padding: '12px 16px', fontWeight: 500 },
    duration: 3000
  })
}
