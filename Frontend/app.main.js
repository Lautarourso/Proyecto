// ====================
// Funciones de ayuda
// ====================
function showAlert(icon, title, text) {
  return Swal.fire({
    icon,
    title,
    text,
    confirmButtonColor: '#E24B16'
  });
}

const API_BASE = "https://proyecto-zvzl.onrender.com";

function mostrarLogin() {
  const form = document.getElementById('sesionForm');
  if (form) form.reset();
  const modal = new bootstrap.Modal(document.getElementById('loginModal'));
  modal.show();
}

function mostrarRegistro() {
  const form = document.getElementById('registroForm');
  if (form) form.reset();
  const modal = new bootstrap.Modal(document.getElementById('registroModal'));
  modal.show();
}

// ====================
// Registro - Corregido
// ====================
function setupRegistroForm() {
  const registroForm = document.getElementById('registroForm');
  if (registroForm) {
    // Remover event listener anterior si existe
    registroForm.removeEventListener('submit', handleRegistroSubmit);
    // Agregar nuevo event listener
    registroForm.addEventListener('submit', handleRegistroSubmit);
  }
}

async function handleRegistroSubmit(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const dni = document.getElementById('dni').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  if (password !== confirmPassword) {
    await showAlert('error', 'Error', 'Las contraseñas no coinciden');
    return;
  }
  
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        nombre,
        apellido,
        dni,
        email,
        password
      })
    });
    
    const data = await res.json();
    
    if (res.ok) {
      await showAlert('success', 'Registro Exitoso', 'Ahora inicia sesión');
      const modal = bootstrap.Modal.getInstance(document.getElementById('registroModal'));
      if (modal) modal.hide();
      mostrarLogin();
    } else {
      await showAlert('error', 'Error', data.message || 'No se pudo registrar');
    }
  } catch (err) {
    console.error('Error en registro:', err);
    await showAlert('error', 'Error', 'Error al conectar con el servidor');
  }
}

// ====================
// Login - Corregido
// ====================
function setupLoginForm() {
  const sesionForm = document.getElementById('sesionForm');
  if (sesionForm) {
    // Remover event listener anterior si existe
    sesionForm.removeEventListener('submit', handleLoginSubmit);
    // Agregar nuevo event listener
    sesionForm.addEventListener('submit', handleLoginSubmit);
  }
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const email = document.getElementById('Iemail').value;
  const password = document.getElementById('Ipassword').value;
  
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    
    const data = await res.json();
    
    if (res.ok) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userEmail', email);
      await showAlert('success', 'Sesión iniciada', 'Redirigiendo a tus Proyectos...');
      // Redirección después de 1.5 segundos para que se vea el mensaje
      setTimeout(() => {
        window.location.href = "proyectos.html";
      }, 1500);
    } else {
      await showAlert('error', 'Error', data.message || 'No se pudo iniciar sesión');
    }
  } catch (err) {
    console.error('Error en login:', err);
    await showAlert('error', 'Error', 'Error al conectar con el servidor');
  }
}

// ====================
// Inicialización
// ====================
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM cargado - Configurando formularios...');
  
  // Configurar formularios
  setupRegistroForm();
  setupLoginForm();
  
  // Verificar si ya está logueado
  const token = localStorage.getItem('authToken');
  if (token) {
    console.log('Usuario ya autenticado, token encontrado');
  }
  
  // Debug: mostrar en consola que los event listeners están configurados
  const registroForm = document.getElementById('registroForm');
  const loginForm = document.getElementById('sesionForm');
  
  if (registroForm) {
    console.log('Formulario de registro encontrado y configurado');
  }
  
  if (loginForm) {
    console.log('Formulario de login encontrado y configurado');
  }
});

// ====================
// Función de contacto
// ====================
function mostrarOpcionesContacto() {
  Swal.fire({
    title: '¿Cómo querés contactarnos?',
    icon: 'question',
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: '<i class="bi bi-instagram"></i> Instagram',
    denyButtonText: '<i class="bi bi-whatsapp"></i> WhatsApp',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#E1306C',
    denyButtonColor: '#25D366',
    cancelButtonColor: '#aaa'
  }).then((result) => {
    if (result.isConfirmed) {
      window.open('https://www.instagram.com/donatosantino/', '_blank');
    } else if (result.isDenied) {
      showAlert('info', 'Próximamente', 'La opción de WhatsApp estará disponible pronto.');
    }
  });
}

// ====================
// Función para debug
// ====================
function debugAuth() {
  console.log('Token en localStorage:', localStorage.getItem('authToken'));
  console.log('Email en localStorage:', localStorage.getItem('userEmail'));
}