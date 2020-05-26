import React from "react";
import Autocomplete from "./components/Autocomplete/Autocomplete";
import "./App.css";
import Countries from "./Countries";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>Search for the Country</p>
            </header>
            <div className="App-Component">
                <Autocomplete options={Countries} />
            </div>
        </div>
    );
}

export default App;
