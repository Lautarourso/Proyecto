
document.getElementById('registroForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = {
    nombre: document.getElementById('nombre').value,
    apellido: document.getElementById('apellido').value,
    dni: document.getElementById('dni').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };
try {
    const res = await fetch('http://localhost:9000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });

    const data = await res.json();

    if (res.ok) {
      alert('Registro exitoso! Ahora inicia sesion');
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error('Error en el registro:', error);
    alert('Error en la conexión con el servidor.');
  }

  return false; // previene que el formulario se envíe tradicionalmente
}
)
