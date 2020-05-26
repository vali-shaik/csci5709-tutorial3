import React from "react";
import "./App.css";
import AutoComplete from "./components/AutoComplete/AutoComplete";
import Countries from "./Countries";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>Search for the Country</p>
            </header>
            <div className="App-Component">
                <div className="App-Component">
                    <AutoComplete items={Countries} />
                </div>
            </div>
        </div>
    );
}

export default App;
