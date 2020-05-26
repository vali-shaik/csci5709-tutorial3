import React from "react";
import Catlogs from "./components/Catalogs/Catalogs";
import "./App.css";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>Search for the Country</p>
            </header>
            <div className="App-Component">
                <Catlogs />
            </div>
        </div>
    );
}

export default App;
