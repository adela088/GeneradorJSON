function nombreCompleto() {
    return (
        nombres[Math.floor(Math.random() * nombres.length)] +
        " " +
        apellidos[Math.floor(Math.random() * apellidos.length)]
    );
}

function numeroEntero() {
    return Math.floor(Math.random() * 100);
}

function numeroReal() {
    return +(Math.random() * 100).toFixed(2);
}

function telefono() {
    return Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 10)
    ).join("");
}

function imei() {
    return "I" + Array.from({ length: 14 }, () =>
        Math.floor(Math.random() * 10)
    ).join() + "MD";
}
