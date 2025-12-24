function App() {
    const [columnas, setColumnas] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [cantidad, setCantidad] = React.useState(1);
    const [toast, setToast] = React.useState(null);
    const [dark, setDark] = React.useState(true);

    /* =========================
       THEME EFFECT
    ========================= */
    React.useEffect(() => {
        document.body.classList.remove("dark", "light");
        document.body.classList.add(dark ? "dark" : "light");
    }, [dark]);

    /* =========================
       GENERAR
    ========================= */
    function generar() {
        let nuevos = [];

        for (let i = 0; i < cantidad; i++) {
            let obj = {};

            columnas.forEach(c => {
                if (!c.nombre || !c.tipo) return;

                switch (c.tipo) {
                    case "Ciudad":
                        obj[c.nombre] = ciudades[Math.floor(Math.random() * ciudades.length)];
                        break;
                    case "Nombre Completo":
                        obj[c.nombre] = nombreCompleto();
                        break;
                    case "Objeto":
                        obj[c.nombre] = objetosAleatorios[Math.floor(Math.random() * objetosAleatorios.length)];
                        break;
                    case "Vehiculo":
                        obj[c.nombre] = vehiculos[Math.floor(Math.random() * vehiculos.length)];
                        break;
                    case "Numero Entero":
                        obj[c.nombre] = numeroEntero();
                        break;
                    case "Numero Real":
                        obj[c.nombre] = numeroReal();
                        break;
                    case "Numero Telefonico":
                        obj[c.nombre] = telefono();
                        break;
                    case "Booleano":
                        obj[c.nombre] = Math.random() > 0.5;
                        break;
                    case "IMEI":
                        obj[c.nombre] = imei();
                        break;
                }
            });

            if (Object.keys(obj).length) nuevos.push(obj);
        }

        setData(prev => [...prev, ...nuevos]);
        showToast("✓ Datos generados");
    }

    function copiarJSON() {
        if (!data.length) return;

        navigator.clipboard.writeText(JSON.stringify(data, null, 2))
            .then(() => {
                showToast("✓ JSON copiado");
            })
            .catch(() => {
                showToast("❌ Error al copiar");
            });
    }


    /* =========================
       GUARDAR JSON
    ========================= */
    function guardarJSON() {
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

        showToast("✓ JSON guardado");
    }

    /* =========================
       TOAST
    ========================= */
    function showToast(msg) {
        setToast(msg);
        setTimeout(() => setToast(null), 1800);
    }

    /* =========================
       RENDER
    ========================= */
    return (
        <>
            <div className="article">
                <div className="top-bar">
                    <h2>Generador JSON</h2>

                    <div
                        className="theme-toggle"
                        onClick={() => setDark(d => !d)}
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

                <Stats columnas={columnas} data={data} />

                <Columnas
                    columnas={columnas}
                    setColumnas={setColumnas}
                />

                <div className="campos">
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

                    <button onClick={generar}>
                        Generar
                    </button>

                    <button onClick={guardarJSON}>
                        Guardar JSON
                    </button>
                </div>

                <button onClick={copiarJSON} disabled={!data.length}>
                    Copiar JSON
                </button>


                <pre id="json-output">
                    {JSON.stringify(data, null, 2)}
                </pre>

                <Tabla data={data} />
            </div>

            {toast && (
                <div className="toast">
                    {toast}
                </div>
            )}
        </>
    );
}
