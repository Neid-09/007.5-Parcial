/* Obtener datos del usuario */
const userData = JSON.parse(sessionStorage.getItem("user"));
/* Constantes de elementos HTML */
const nameUser = document.getElementById("name-user");
const dateUser = document.getElementById("date-user");
const timeUser = document.getElementById("time-user");
const ageUser = document.getElementById("age-user");
const currentDate = document.getElementById("current-date");

const btnReturn = document.getElementById("btn-return");

/* Mostrar datos del usuario */
nameUser.innerText = `Nombre: ${userData.name}`;

let fecha = `${userData.year}-${userData.month}`;
dateUser.innerText = `Fecha de nacimiento: ${formatearFecha(fecha)}`;

let time = `${userData.hour}:${userData.minute}:${userData.second}`;
timeUser.innerText = `Hora de nacimiento: ${formatearHora(time)}`;

ageUser.innerText = `Edad: ${calcularEdad(userData.year, userData.month)} años`;

currentDate.innerText = `Fecha actual: ${new Date().toLocaleDateString("es-ES")}`;

btnReturn.addEventListener("click", () => {
    window.location.href = "./index1.html";
    sessionStorage.clear();
});

function calcularEdad(year, month) {
    const today = new Date();
    let age = today.getFullYear() - year;
    if (today.getMonth() + 1 < month) {
        age--;
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

function formatearFecha(fechaString) {
  const [year, month] = fechaString.split("-").map(Number);
  const date = new Date(year, month - 1);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
  });
}
