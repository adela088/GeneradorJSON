const { useState, useEffect } = React;

function SunIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
            <path stroke="currentColor" strokeWidth="2" d="
        M12 1v2
        M12 21v2
        M4.22 4.22l1.42 1.42
        M18.36 18.36l1.42 1.42
        M1 12h2
        M21 12h2
        M4.22 19.78l1.42-1.42
        M18.36 5.64l1.42-1.42
      " />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
                d="M21 12.79A9 9 0 1111.21 3
           7 7 0 0021 12.79z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
            />
        </svg>
    );
}

function normalizarNombre(nombre) {
    return nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z\s]/g, "")
        .trim()
        .replace(/\s+/g, ".");
}

function generarEmail(schema, objActual) {
    const colNombre = schema.find(c => c.tipo === "Nombre Completo");

    if (colNombre && objActual[colNombre.nombre]) {
        const base = normalizarNombre(objActual[colNombre.nombre]);
        const num = Math.floor(Math.random() * 100);
        return `${base}${num}@gmail.com`;
    }

    const rand = Math.random().toString(36).slice(2, 8);
    return `user_${rand}@correo.com`;
}


/* =========================
   GENERATOR MAP
========================= */

const randomFrom = arr =>
    arr[Math.floor(Math.random() * arr.length)];

const GENERATOR_MAP = {
    "Ciudad": () => randomFrom(ciudades),
    "Nombre Completo": () => nombreCompleto(),
    "Objeto": () => randomFrom(objetosAleatorios),
    "Vehiculo": () => randomFrom(vehiculos),
    "Numero Entero": () => numeroEntero(),
    "Numero Real": () => numeroReal(),
    "Numero Telefonico": () => telefono(),
    "Booleano": () => Math.random() > 0.5,
    "IMEI": () => imei(),
    "Email": () => email(),
    "UUID": () => uuid(),
    "Fecha": () => fecha(),
    "IBAN": () => iban(),
    "Codigo Postal": () => codigoPostal(),

};

/* =========================
   GENERADOR GENERICO
========================= */

function generateObjectFromSchema(schema) {
    const obj = {};

    schema.forEach(col => {
        if (!col.nombre || !col.tipo) return;

        if (col.tipo === "Email") {
            obj[col.nombre] = generarEmail(schema, obj);
            return;
        }

        const gen = GENERATOR_MAP[col.tipo];
        if (gen) obj[col.nombre] = gen();
    });

    return obj;
}


/* =========================
   TIPOS UI
========================= */

const TIPOS = [
    { value: "", label: "Tipo de dato", disabled: true },
    { value: "Ciudad", label: "Ciudad" },
    { value: "Nombre Completo", label: "Nombre Completo" },
    { value: "Objeto", label: "Objeto" },
    { value: "Vehiculo", label: "Vehículo" },
    { value: "Numero Entero", label: "Número Entero" },
    { value: "Numero Real", label: "Número Real" },
    { value: "Numero Telefonico", label: "Número Telefónico" },
    { value: "Booleano", label: "Booleano" },
    { value: "IMEI", label: "IMEI" },
    { value: "Email", label: "Email" },
    { value: "UUID", label: "UUID" },
    { value: "Fecha", label: "Fecha" },
    { value: "IBAN", label: "IBAN" },
    { value: "Codigo Postal", label: "Código Postal" },

];

/* =========================
   COMPONENTES
========================= */

function Stats({ columnas, data }) {
    return (
        <div className="stats-grid">
            <div className="stat-card">
                <span>Columnas</span>
                <strong>{columnas.length}</strong>
            </div>
            <div className="stat-card">
                <span>Objetos</span>
                <strong>{data.length}</strong>
            </div>
            <div className="stat-card">
                <span>Claves</span>
                <strong>{columnas.filter(c => c.nombre && c.tipo).length}</strong>
            </div>
        </div>
    );
}

function Columnas({ columnas, setColumnas }) {
    function agregar() {
        setColumnas([...columnas, { nombre: "", tipo: "" }]);
    }

    function actualizar(i, campo, valor) {
        setColumnas(
            columnas.map((c, idx) =>
                idx === i ? { ...c, [campo]: valor } : c
            )
        );
    }

    function eliminar(i) {
        setColumnas(columnas.filter((_, idx) => idx !== i));
    }

    /* ---------- VALIDACIONES ---------- */

    const hayColumnasInvalidas =
        columnas.length > 0 &&
        columnas.some(c => !c.nombre.trim() || !c.tipo);

    const nombresNormalizados = columnas
        .map(c => c.nombre.trim().toLowerCase())
        .filter(Boolean);

    const nombresDuplicados = nombresNormalizados.filter(
        (n, i) => nombresNormalizados.indexOf(n) !== i
    );

    const hayDuplicados = nombresDuplicados.length > 0;

    return (
        <div className="columnas-box">
            <h3>Columnas</h3>

            {columnas.map((c, i) => {
                const nombreNormalizado = c.nombre.trim().toLowerCase();
                const esDuplicado =
                    nombreNormalizado &&
                    nombresDuplicados.includes(nombreNormalizado);

                return (
                    <div className="campo-alt" key={i}>
                        <input
                            className={`input-clave-alt ${!c.nombre
                                ? "input-error"
                                : esDuplicado
                                    ? "input-duplicado"
                                    : ""
                                }`}
                            placeholder="Nombre de columna"
                            value={c.nombre}
                            onChange={e => actualizar(i, "nombre", e.target.value)}
                        />

                        <select
                            className={`input-valor-alt ${!c.tipo ? "select-placeholder input-error" : ""
                                }`}
                            value={c.tipo}
                            onChange={e => actualizar(i, "tipo", e.target.value)}
                        >
                            {TIPOS.map((t, idx) => (
                                <option
                                    key={idx}
                                    value={t.value}
                                    disabled={t.disabled}
                                    hidden={t.disabled}
                                >
                                    {t.label}
                                </option>
                            ))}
                        </select>

                        <button
                            className="boton-eliminar"
                            onClick={() => eliminar(i)}
                        >
                            ✕
                        </button>
                    </div>
                );
            })}

            <button className="btn-add-col" onClick={agregar}>
                ➕ Agregar columna
            </button>

            {hayColumnasInvalidas && (
                <p className="mensaje-error">
                    Completa nombre y tipo en todas las columnas
                </p>
            )}

            {hayDuplicados && (
                <p className="mensaje-error">
                    Los nombres de columna no pueden repetirse
                </p>
            )}
        </div>
    );
}

function Tabla({ data }) {
    if (!data.length) return null;
    const cols = Object.keys(data[0]);

    function copiarFila(fila) {
        navigator.clipboard.writeText(
            JSON.stringify(fila, null, 2)
        );
    }

    return (
        <table className="tablita">
            <thead>
                <tr>
                    <th>#</th>
                    {cols.map(c => <th key={c}>{c}</th>)}
                    <th>📋 COPIAR FILA</th>
                </tr>
            </thead>
            <tbody>
                {data.map((fila, i) => (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        {cols.map(c => (
                            <td key={c}>{String(fila[c])}</td>
                        ))}
                        <td>
                            <button
                                className="btn-copy-row"
                                onClick={() => copiarFila(fila)}
                            >
                                📋
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}


const PLANTILLAS = {
    "Usuario Básico": [
        { nombre: "Nombre", tipo: "Nombre Completo" },
        { nombre: "Email", tipo: "Email" },
        { nombre: "Telefono", tipo: "Numero Telefonico" },
        { nombre: "UUID", tipo: "UUID" },
        { nombre: "FechaNacimiento", tipo: "Fecha" }
    ],
    "Dirección": [
        { nombre: "Ciudad", tipo: "Ciudad" },
        { nombre: "CodigoPostal", tipo: "Codigo Postal" },
        { nombre: "IBAN", tipo: "IBAN" }
    ],
    "Producto": [
        { nombre: "Producto", tipo: "Objeto" },
        { nombre: "Precio", tipo: "Numero Real" },
        { nombre: "Stock", tipo: "Numero Entero" },
        { nombre: "UUID", tipo: "UUID" }
    ]
};


/* =========================
   APP
========================= */

function App() {
    const [columnas, setColumnas] = useState([]);
    const [data, setData] = useState([]);
    const [cantidad, setCantidad] = useState(1);
    const [history, setHistory] = useState([]);
    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved === "dark";

        return window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;
    });
    const [copiado, setCopiado] = useState(false);
    const [toast, setToast] = React.useState(null);


    function showToast(msg, type = "success") {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 1800);
    }

    function copiarJSON() {
        if (!data.length) {
            showToast("⚠️ No hay datos para copiar", "warning");
            return;
        }

        navigator.clipboard
            .writeText(JSON.stringify(data, null, 2))
            .then(() => showToast("✓ JSON copiado", "success"))
            .catch(() => showToast("❌ Error al copiar", "error"));
    }

    function exportarCSV() {
        if (!data.length) {
            showToast("❌ No hay datos para exportar");
            return;
        }

        const columnas = Object.keys(data[0]);

        const csv = [
            columnas.join(","), // header
            ...data.map(row =>
                columnas.map(col =>
                    `"${String(row[col]).replace(/"/g, '""')}"`
                ).join(",")
            )
        ].join("\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "datos.csv";
        a.click();

        URL.revokeObjectURL(url);

        showToast("✓ CSV exportado");
    }





    /* ---------- VALIDACIÓN GLOBAL ---------- */

    const nombresNormalizados = columnas
        .map(c => c.nombre.trim().toLowerCase())
        .filter(Boolean);

    const hayDuplicados =
        new Set(nombresNormalizados).size !== nombresNormalizados.length;

    const columnasValidas =
        columnas.length > 0 &&
        columnas.every(c => c.nombre.trim() && c.tipo) &&
        !hayDuplicados;

    /* ---------- THEME ---------- */

    useEffect(() => {
        document.body.classList.add("theme-transition");

        document.body.classList.remove("light", "dark");
        document.body.classList.add(dark ? "dark" : "light");

        localStorage.setItem("theme", dark ? "dark" : "light");

        const timeout = setTimeout(() => {
            document.body.classList.remove("theme-transition");
        }, 300);

        return () => clearTimeout(timeout);
    }, [dark]);


    /* ---------- CTRL + Z ---------- */

    function pushHistory(newData) {
        setHistory(h => [...h, data]);
        setData(newData);
    }

    function undo() {
        if (!history.length) return;
        const prev = history[history.length - 1];
        setHistory(history.slice(0, -1));
        setData(prev);
        showToast("ℹ️ Cambios deshechos", "info");

    }

    function generar() {
        const nuevos = Array.from({ length: cantidad }, () =>
            generateObjectFromSchema(columnas)
        ).filter(o => Object.keys(o).length);

        pushHistory([...data, ...nuevos]);

        showToast("✓ Datos generados", "success");

    }

    function borrar() {
        if (!data.length) {
            showToast("⚠️ No hay datos para borrar", "warning");
            return;
        }

        pushHistory([]);
        showToast("🗑️ Datos borrados", "error");
    }


    function guardar() {
        if (!data.length) {
            showToast("⚠️ No hay datos para guardar", "warning");
            return;
        }

        try {
            const blob = new Blob(
                [JSON.stringify(data, null, 2)],
                { type: "application/json" }
            );

            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "salida.json";
            a.click();
            URL.revokeObjectURL(url);

            showToast("💾 JSON guardado correctamente", "success");
        } catch (e) {
            showToast("❌ Error al guardar JSON", "error");
        }
    }


    return (
        <div className="article">
            <div className="top-bar">
                <h2>Generador JSON</h2>
                <div
                    className={`theme-toggle ${dark ? "dark" : "light"}`}
                    onClick={() => setDark(!dark)}
                    title="Cambiar tema"
                >
                    <span className="icon moon">
                        <MoonIcon />
                    </span>

                    <span className="icon sun">
                        <SunIcon />
                    </span>

                    <span className="thumb" />
                </div>
            </div>

            {toast && (
                <div className={`toast ${toast.type}`}>
                    {toast.msg}
                </div>
            )}

            <div className="plantillas-container">
                <label>Plantillas:</label>
                <select
                    onChange={(e) => {
                        const sel = e.target.value;
                        if (sel && PLANTILLAS[sel]) {
                            setColumnas(PLANTILLAS[sel]);
                        }
                    }}
                >
                    <option value="">📦 Seleccionar plantilla</option>
                    <option value="Usuario Básico">👤 Usuario Básico</option>
                    <option value="Producto">📦 Producto</option>
                    <option value="Dirección">📍 Dirección</option>

                </select>
            </div>


            <Stats columnas={columnas} data={data} />

            <Columnas columnas={columnas} setColumnas={setColumnas} />

            <div className="campos">

                {/* Cantidad */}
                <div className="campo-cantidad">
                    <label>Cantidad de datos</label>
                    <input
                        type="number"
                        min="1"
                        value={cantidad}
                        onChange={e => setCantidad(+e.target.value)}
                    />
                    <small>Número de objetos a generar</small>
                </div>

                <button onClick={generar} disabled={!columnasValidas}>
                    ⚙️ Generar
                </button>

                <button onClick={guardar}>
                    💾 Guardar JSON
                </button>

                <button
                    onClick={copiarJSON}
                    disabled={!data.length}
                >
                    {copiado ? "✓ Copiado" : "📋Copiar JSON"}
                </button>

                <button onClick={undo} disabled={!history.length}>
                    ↩️ Ctrl + Z
                </button>

                <button className="boton-eliminar" onClick={borrar}>
                    🗑️ Borrar
                </button>

                <button onClick={exportarCSV} disabled={!data.length}>
                    📊 Exportar CSV
                </button>


            </div>


            <pre id="json-output">
                {JSON.stringify(data, null, 2)}
            </pre>

            <Tabla data={data} />
        </div>
    );
}

/* =========================
   RENDER
========================= */

ReactDOM.createRoot(
    document.getElementById("react-root")
).render(<App />);
