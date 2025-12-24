function Tabla({ data }) {
    if (!data.length) return null;

    const cols = Object.keys(data[0]);

    return (
        <table className="tablita">
            <thead>
                <tr>
                    <th>#</th>
                    {cols.map(c => <th key={c}>{c}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((fila, i) => (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        {cols.map(c => <td key={c}>{String(fila[c])}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
