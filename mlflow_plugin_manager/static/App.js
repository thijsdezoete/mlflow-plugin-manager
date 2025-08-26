function AvailablePlugins() {
    const [plugins, setPlugins] = React.useState([]);

    React.useEffect(() => {
        fetch('/plugin-manager/available-plugins')
            .then(response => response.json())
            .then(data => setPlugins(data));
    }, []);

    return (
        <div>
            <h2>Available Plugins</h2>
            <ul>
                {plugins.map(plugin => (
                    <li key={plugin}>{plugin} <button>Install</button></li>
                ))}
            </ul>
        </div>
    );
}

function InstalledPlugins() {
    // Fetch installed plugins from the backend and display them
    // (Omitted for brevity)
    return <div>List of installed plugins</div>;
}

function App() {
    return (
        <div>
            <h1>MLflow Plugin Manager</h1>
            <AvailablePlugins />
            <InstalledPlugins />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

