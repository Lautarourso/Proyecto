// API Base - Simulada para desarrollo
const API_BASE = "https://proyecto-zvzl.onrender.com";

// Proyectos de ejemplo (simulando base de datos)
let proyectos = [
    { id: 1, nombre: "Gasoducto Norte", fechaCreacion: "2024-01-15", videos: 3 },
    { id: 2, nombre: "Proyecto Sur", fechaCreacion: "2024-01-10", videos: 1 },
    { id: 3, nombre: "Tramo Central", fechaCreacion: "2024-01-05", videos: 0 }
];

document.addEventListener("DOMContentLoaded", function() {
    console.log('DOM cargado - Configurando proyectos...');
    
    // Verificar autenticación
    const token = localStorage.getItem("authToken");
    if (!token) {
        window.location.href = "mainpage.html";
        return;
    }
    
    // Configurar formulario de crear proyecto
    setupCrearProyectoForm();
    
    // Cargar proyectos
    cargarProyectos();
});

function setupCrearProyectoForm() {
    const form = document.getElementById('crearProyectoForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            crearProyecto();
        });
    }
}

async function crearProyecto() {
    const nombreInput = document.getElementById('nombreProyecto');
    const nombre = nombreInput.value.trim();
    
    if (!nombre) {
        await showAlert('error', 'Error', 'Ingresá un nombre para el proyecto');
        return;
    }
    
    try {
        // Simular llamada a API
        const nuevoProyecto = {
            id: proyectos.length + 1,
            nombre: nombre,
            fechaCreacion: new Date().toISOString().split('T')[0],
            videos: 0
        };
        
        proyectos.push(nuevoProyecto);
        
        // Cerrar modal y limpiar formulario
        const modal = bootstrap.Modal.getInstance(document.getElementById('crearProyectoModal'));
        if (modal) modal.hide();
        nombreInput.value = '';
        
        await showAlert('success', 'Éxito', 'Proyecto creado correctamente');
        
        // Recargar lista de proyectos
        cargarProyectos();
        
    } catch (err) {
        console.error('Error creando proyecto:', err);
        await showAlert('error', 'Error', 'No se pudo crear el proyecto');
    }
}

function cargarProyectos() {
    const container = document.getElementById("proyectosContainer");
    const info = document.getElementById("proyectosInfo");
    
    if (!container) return;
    
    if (proyectos.length === 0) {
        info.classList.replace("alert-info", "alert-warning");
        info.textContent = "No tenés proyectos creados.";
        container.innerHTML = '';
        return;
    }
    
    info.style.display = "none";
    container.innerHTML = '';
    
    proyectos.forEach(proyecto => {
        const div = document.createElement("div");
        div.className = "proyecto-card";
        div.onclick = () => abrirProyecto(proyecto.id);
        
        div.innerHTML = `
            <div class="proyecto-header">
                <h3 class="proyecto-title">${proyecto.nombre}</h3>
            </div>
            <div class="proyecto-body">
                <div class="proyecto-info">
                    <span>Creado: ${formatearFecha(proyecto.fechaCreacion)}</span>
                    <span><i class="bi bi-play-circle me-1"></i>${proyecto.videos} videos</span>
                </div>
            </div>
        `;
        
        container.appendChild(div);
    });
}

function abrirProyecto(proyectoId) {
    // Redirigir a la página del proyecto
    window.location.href = `proyecto.html?id=${proyectoId}`;
}

function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-AR');
}

// Función de ayuda para alertas
function showAlert(icon, title, text) {
    return Swal.fire({
        icon,
        title,
        text,
        confirmButtonColor: '#E24B16'
    });
}