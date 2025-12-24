function App() {
    const [columnas, setColumnas] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [cantidad, setCantidad] = React.useState(1);

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

        setData([...data, ...nuevos]);
    }

    function guardarJSON() {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "salida.json";
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div className="article">
            <h2>Generador JSON </h2>

            <Columnas columnas={columnas} setColumnas={setColumnas} />

            <div className="campos">
                <input type="number" min="1" value={cantidad}
                    onChange={e => setCantidad(+e.target.value)} />
                <button onClick={generar}>Generar</button>
                <button onClick={guardarJSON}>Guardar JSON</button>
            </div>

            <pre id="json-output">{JSON.stringify(data, null, 2)}</pre>
            <Tabla data={data} />
        </div>
    );
}
