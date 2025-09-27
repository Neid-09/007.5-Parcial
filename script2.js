/* Obtener datos del usuario */
const userData = JSON.parse(sessionStorage.getItem("user"));

/* Constantes de elementos HTML */
const nameUser = document.getElementById("name-user");
const dateUser = document.getElementById("date-user");
const timeUser = document.getElementById("time-user");
const ageUser = document.getElementById("age-user");
const exactAge = document.getElementById("exact-age");

const currentDate = document.getElementById("current-date");
const btnReturn = document.getElementById("btn-return");

/* Mostrar datos del usuario */
nameUser.innerText = `Nombre: ${userData.name}`;

let fecha = `${userData.year}-${userData.month}-${userData.day}`;
dateUser.innerText = `Fecha de nacimiento: ${formatearFechaCompleta(fecha)}`;

let time = `${userData.hour}:${userData.minute}:${userData.second}`;
timeUser.innerText = `Hora de nacimiento: ${formatearHora(time)}`;

// Calcular edad simple
const edadSimple = calcularEdad(userData.year, userData.month, userData.day);
ageUser.innerText = `Edad: ${edadSimple} años`;

// Calcular tiempo exacto vivido
const tiempoVivido = calcularTiempoExactoVivido(
    userData.year, 
    userData.month, 
    userData.day, 
    userData.hour, 
    userData.minute, 
    userData.second
);

// Mostrar tiempo exacto vivido
if (typeof tiempoVivido === 'object') {
    exactAge.innerText = `Edad exacta: ${tiempoVivido.años} años, ${tiempoVivido.meses} meses, ${tiempoVivido.días} días, ${tiempoVivido.horas} horas, ${tiempoVivido.minutos} minutos y ${tiempoVivido.segundos} segundos`;
} else {
    exactAge.innerText = `Error: ${tiempoVivido}`;
}

currentDate.innerText = `Fecha y hora actual: ${new Date().toLocaleString("es-ES")}`;

btnReturn.addEventListener("click", () => {
    window.location.href = "./index1.html";
    sessionStorage.clear();
});

function calcularEdad(year, month, day) {
    const today = new Date();
    let age = today.getFullYear() - year;
    
    // Si no ha pasado el cumpleaños este año, restar un año
    if (today.getMonth() < month - 1 || 
        (today.getMonth() === month - 1 && today.getDate() < day)) {
        age--;
    }

    if (age < 0) {
        age = 0;
    }

    return age;
}

function formatearHora(horaString) {
    const [h, m, s] = horaString.split(":").map(Number);
    const date = new Date();
    date.setHours(h, m, s);

    return date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
}

function formatearFechaCompleta(fechaString) {
    const [year, month, day] = fechaString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function calcularTiempoExactoVivido(year, month, day, hour, minute, second) {
    const ahora = new Date();
    const fechaNacimiento = new Date(year, month - 1, day, hour, minute, second);
    
    // Calcular la diferencia total
    const diferenciaMs = ahora.getTime() - fechaNacimiento.getTime();
    
    if (diferenciaMs < 0) {
        return "Fecha de nacimiento inválida (es futura)";
    }
    
    // Calcular años completos
    let años = ahora.getFullYear() - year;
    let meses = ahora.getMonth() - (month - 1);
    let días = ahora.getDate() - day;
    let horas = ahora.getHours() - hour;
    let minutos = ahora.getMinutes() - minute;
    let segundos = ahora.getSeconds() - second;
    
    // Ajustar valores negativos
    if (segundos < 0) {
        segundos += 60;
        minutos--;
    }
    if (minutos < 0) {
        minutos += 60;
        horas--;
    }
    if (horas < 0) {
        horas += 24;
        días--;
    }
    if (días < 0) {
        const diasDelMesAnterior = new Date(ahora.getFullYear(), ahora.getMonth(), 0).getDate();
        días += diasDelMesAnterior;
        meses--;
    }
    if (meses < 0) {
        meses += 12;
        años--;
    }
    
    return {
        años: años,
        meses: meses,
        días: días,
        horas: horas,
        minutos: minutos,
        segundos: segundos
    };
}
