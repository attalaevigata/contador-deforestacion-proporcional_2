const segundosEnUnAño = 365 * 24 * 60 * 60;

// Datos iniciales para el contador nacional
const areaNacional = 59277461; // Área nacional de bosque natural en hectáreas
const tasaNacional = 123517; // Tasa de deforestación nacional anual en hectáreas

// Datos para contadores regionales
const datosRegionales = {
    amazonia: { area: areaNacional * 0.66, tasa: 71185 },
    andes: { area: areaNacional * 0.19, tasa: 22163 },
    pacifico: { area: areaNacional * 0.09, tasa: 13299 },
    caribe: { area: areaNacional * 0.03, tasa: 10483 },
    orinoquia: { area: areaNacional * 0.03, tasa: 6387 }
};

// Función para formatear los números con comas y puntos
function formatearNumero(numero) {
    return new Intl.NumberFormat('es-CO', { style: 'decimal', maximumFractionDigits: 2 }).format(numero);
}

function calcularPerdidaAcumulada(areaInicial, tasaDeforestacion) {
    const ahora = new Date();
    const inicioDelAño = new Date(ahora.getFullYear(), 0, 1);
    const segundosTranscurridos = (ahora - inicioDelAño) / 1000;
    const perdidaAcumulada = segundosTranscurridos * (tasaDeforestacion / segundosEnUnAño);
    return Math.max(areaInicial - perdidaAcumulada, 0);
}

function actualizarContador(idTicker, areaInicial, tasaDeforestacion) {
    let areaRestante = calcularPerdidaAcumulada(areaInicial, tasaDeforestacion);

    setInterval(() => {
        areaRestante -= (tasaDeforestacion / segundosEnUnAño);
        if (areaRestante < 0) areaRestante = 0;
        // Utiliza la función formatearNumero para actualizar el texto del contador
        document.getElementById(idTicker).innerText = formatearNumero(areaRestante) + ' ha';
    }, 1000); // Actualiza cada segundo
}

function inicializarContadores() {
    // Asegúrate de que los ID coincidan con los definidos en el HTML
    actualizarContador('reloj-deforestacion', areaNacional, tasaNacional);
    for (const region in datosRegionales) {
        const idTicker = `reloj-${region}`;
        actualizarContador(idTicker, datosRegionales[region].area, datosRegionales[region].tasa);
    }
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarContadores);
} else {
    inicializarContadores();
}
