const TIPOS = [
    "",
    "Ciudad",
    "Nombre Completo",
    "Objeto",
    "Vehiculo",
    "Numero Entero",
    "Numero Real",
    "Numero Telefonico",
    "Booleano",
    "IMEI"
];

function Columnas({ columnas, setColumnas }) {

    function agregar() {
        setColumnas([...columnas, { nombre: "", tipo: "" }]);
    }

    function eliminar(i) {
        setColumnas(columnas.filter((_, idx) => idx !== i));
    }

    function actualizar(i, campo, valor) {
        setColumnas(columnas.map((c, idx) =>
            idx === i ? { ...c, [campo]: valor } : c
        ));
    }

    return (
        <>
            <h3>Columnas</h3>

            {columnas.map((c, i) => (
                <div className="campo-alt" key={i}>
                    <input
                        className="input-clave-alt"
                        placeholder="Nombre"
                        value={c.nombre}
                        onChange={e => actualizar(i, "nombre", e.target.value)}
                    />

                    <select
                        className="input-valor-alt"
                        value={c.tipo}
                        onChange={e => actualizar(i, "tipo", e.target.value)}
                    >
                        {TIPOS.map(t => <option key={t}>{t}</option>)}
                    </select>

                    <button className="boton-eliminar" onClick={() => eliminar(i)}>✕</button>
                </div>
            ))}

            <button onClick={agregar}>➕ Agregar columna</button>
        </>
    );
}
