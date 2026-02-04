const API_URL = import.meta.env.VITE_API_URL
let token = localStorage.getItem('token') || null

export function setToken(t) {
    token = t
    if (t) localStorage.setItem('token', t)
        else localStorage.removeItem('token')
}

export async function api(path, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
    }
    if (token) headers.Authorization = `Bearer ${token}`
    const res = await fetch(`${API_URL}${path}`, { ...options, headers })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data?.message || 'Error en la petición')
    return data
}