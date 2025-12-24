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

function email() {
    const nombres = [
        "juan", "maria", "carlos", "ana",
        "luis", "laura", "pedro", "sofia",
        "diego", "lucia"
    ];

    const dominios = [
        "gmail.com",
        "hotmail.com",
        "yahoo.com",
        "outlook.com"
    ];

    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
    const numero = Math.floor(Math.random() * 1000);

    return `${nombre}${numero}@${randomFrom(dominios)}`;
}


function uuid() {
    return crypto.randomUUID();
}

function fecha() {
    const start = new Date(2015, 0, 1).getTime();
    const end = Date.now();
    return new Date(
        start + Math.random() * (end - start)
    ).toISOString().split("T")[0];
}

function codigoPostal() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}

function iban() {
    const pais = "ES";
    const control = Math.floor(10 + Math.random() * 89);
    const cuenta = Math.floor(Math.random() * 1e16)
        .toString()
        .padStart(16, "0");
    return `${pais}${control}${cuenta}`;
}
