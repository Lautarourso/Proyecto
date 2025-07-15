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

function mostrarLogin() {
  const form = document.getElementById('sesionForm');
  form.reset();
  new bootstrap.Modal(document.getElementById('loginModal')).show();
}

function mostrarRegistro() {
  const form = document.getElementById('registroForm');
  form.reset();
  new bootstrap.Modal(document.getElementById('registroModal')).show();
}

// ====================
// Registro
// ====================
document.getElementById('registroForm').addEventListener('submit', async (e) => {
  e.preventDefault();

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
    const res = await fetch('http://10.4.13.29:9000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, dni, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      await showAlert('success', 'Registro Exitoso', 'Ahora inicia sesión');
      bootstrap.Modal.getInstance(document.getElementById('registroModal')).hide();
      mostrarLogin();
    } else {
      await showAlert('error', 'Error', data.message || 'No se pudo registrar');
    }
  } catch (err) {
    console.error(err);
    await showAlert('error', 'Error', 'Error al conectar con el servidor');
  }
});

// ====================
// Login
// ====================
document.getElementById('sesionForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('Iemail').value;
  const password = document.getElementById('Ipassword').value;

  try {
    const res = await fetch('http://10.4.13.29:9000//auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('authToken', data.token);
      await showAlert('success', 'Sesión iniciada', 'Redirigiendo a videos...');
      window.location.href = "videos.html";
    } else {
      await showAlert('error', 'Error', data.message || 'No se pudo iniciar sesión');
    }
  } catch (err) {
    console.error(err);
    await showAlert('error', 'Error', 'Error al conectar con el servidor');
  }
});
