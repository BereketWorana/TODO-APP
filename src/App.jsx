import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')
  const [priority, setPriority] = useState('medium')

  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) setTodos(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (!input.trim()) return
    setTodos([...todos, {
      id: Date.now(),
      text: input,
      completed: false,
      priority
    }])
    setInput('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const priorityColor = (p) => {
    if (p === 'high') return '#ef4444'
    if (p === 'medium') return '#f59e0b'
    return '#22c55e'
  }

  return (
    <div style={{
       minHeight: '100vh',
       background: '#0f172a',
       display: 'flex',
       justifyContent: 'center',
       padding: '48px 16px',
       fontFamily: 'Segoe UI, sans-serif'
        }}>

      <div style={{
         width: '100%', 
         maxWidth: '600px' }}>

        <h1 style={{ 
          color: '#f1f5f9', 
          fontSize: '32px', 
          fontWeight: '700', 
          marginBottom: '8px' 
          }}>
          My Tasks
        </h1>
        <p style={{
           color: '#64748b', 
           marginBottom: '32px'
            }}>

          {todos.filter(t => !t.completed).length} tasks remaining
        </p>

        {/* Input */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '16px' 
          }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
            placeholder="Add a new task..."
            style={{ 
              flex: 1, 
              padding: '12px 16px', 
              borderRadius: '10px', 
              border: '1px solid #1e293b', 
              background: '#1e293b', 
              color: '#f1f5f9', 
              fontSize: '15px',
               outline: 'none' 
              }}
          />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            style={{
               padding: '12px',
               borderRadius: '10px', 
               border: '1px solid #1e293b', 
               background: '#1e293b', 
               color: '#f1f5f9', 
               fontSize: '14px', 
               cursor: 'pointer' }}
          >
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
          <button
            onClick={addTodo}
            style={{ 
              padding: '12px 20px', 
              borderRadius: '10px', 
              background: '#3b82f6', 
              color: '#fff', 
              border: 'none', 
              fontSize: '20px', 
              cursor: 'pointer', 
              fontWeight: '700'
             }}
          >+</button>
        </div>

        {/* Filters */}
        <div style={{
           display: 'flex', 
           gap: '8px', 
           marginBottom: '24px' }}>
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{ 
                padding: '8px 20px', 
                borderRadius: '8px', 
                border: 'none', 
                cursor: 'pointer', 
                fontWeight: '600', 
                fontSize: '13px', 
                background: filter === f ? '#3b82f6' : '#1e293b', color: filter === f ? '#fff' : '#64748b', textTransform: 'capitalize' }}
            >{f}</button>
          ))}
          <span style={{
             marginLeft: 'auto', 
             color: '#64748b', 
             fontSize: '13px', 
             alignSelf: 'center' }}>
            {todos.filter(t => t.completed).length}/{todos.length} done
          </span>
        </div>

        {/* Todo List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.length === 0 && (
            <p style={{ color: '#475569', textAlign: 'center', padding: '40px' }}>No tasks here. Add one above!</p>
          )}
          {filtered.map(todo => (
            <div key={todo.id}
             style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '12px', background: '#1e293b', border: `1px solid ${todo.completed ? '#1e293b' : '#334155'}` }}>
              <div
                onClick={() => toggleTodo(todo.id)}
                style={{ width: '22px', height: '22px', borderRadius: '50%', border: `2px solid ${todo.completed ? '#3b82f6' : '#475569'}`, background: todo.completed ? '#3b82f6' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              >
                {todo.completed && <span style={{ color: '#fff', fontSize: '13px' }}>✓</span>}
              </div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: priorityColor(todo.priority), flexShrink: 0 }} />
              <span style={{ flex: 1, color: todo.completed ? '#475569' : '#f1f5f9', textDecoration: todo.completed ? 'line-through' : 'none', fontSize: '15px' }}>
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '18px', padding: '4px 8px', borderRadius: '6px' }}
              >✕</button>
            </div>
          ))}
        </div>

        {todos.some(t => t.completed) && (
          <button
            onClick={() => setTodos(todos.filter(t => !t.completed))}
            style={{ marginTop: '20px', width: '100%', padding: '12px', borderRadius: '10px', background: 'none', border: '1px solid #334155', color: '#64748b', cursor: 'pointer', fontSize: '14px' }}
          >Clear completed</button>
        )}
      </div>
    </div>
  )
}

export default App