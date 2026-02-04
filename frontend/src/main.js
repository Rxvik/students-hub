import './style.css'
import { api, setToken } from './api.js'

document.querySelector('#app').innerHTML = 
`
  <div class="container">
  <h1>Students Hub V1.0.0</h1>
  <section class="card">
    <h2>Login</h2>
    <form id="loginForm">
      <input name="usuario" placeholder="usuario" required />
      <input name="password" placeholder="password" type="password" required />
      <button>Entrar</button>
    </form>
    <pre id="loginInfo"></pre>
  </section>
  <section class="card">
    <h2>Crear Alumno</h2>
    <form id="studentForm"></form>
      <input name="matricula" placeholder="matricula" required />
      <input name="nombre" placeholder="nombre" required />
      <input name="apaterno" placeholder="apaterno" required />
      <input name="amaterno" placeholder="amaterno" required />
      <input name="correo" placeholder="correo" type="email" required />
      <button>Crear</button>
    </form>
    <div class="row">
      <input id="q" placeholder="buscar...">
      <select id="activo">
        <option value="">todos</option>
        <option value="true">activos</option>
        <option value="false">inactivos</option>
      </select>
      <button id="refreshBtn" type="button">Refrescar</button>
    </div>
    <ul id="list"></ul>
  </section>
</div>
`
// Botones
const refreshBtn = document.getElementById('refreshBtn')

//Formularios
const loginForm = document.getElementById('loginForm')
const studentForm = document.getElementById('studentForm')

//Elementos
const loginInfo = document.getElementById('loginInfo')
const list = document.getElementById('list')
const activo = document.getElementById('activo')
const q = document.getElementById('q')

const refres = async () => {
  try {
    const qS = q.value.trim()
    const act = activo.value
    const query = new URLSearchParams()
    if (qS) {
      query.set('q', qS)
    }
    if (activo) {
      query.set('activo', activo)
    }
    const {items} = await api(`/users?${query.toString()}`)

  } catch (error) {
    list.innerHTML = 
    `
      <li class="error">${error.message}</li>
    `
  }
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(loginForm)
  const usuario = formData.get('usuario')
  const password = formData.get('password')
  try {
    const res = await api('/auth/login',{
      method: 'POST',
      body: JSON.stringify({ usuario, password })
    })
    setToken(res.token)
    loginInfo.textContent = `OK: ${res.user.nombre} (${res.user.usuario})`
    refres
  } catch (error) {
    loginInfo.textContent = `Error: ${error.message}`
   }
})