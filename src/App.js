import React, { useState } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Results from "./results";

function App() {
  const [formInfo, setFormInfo] = useState();
  const [resultsOpen, setResultsOpen] = useState(false);
  const [db, setDb] = useState();
  const [sz, setSz] = useState();
  const [tg, setTg] = useState();
  const [zb, setZb] = useState();

  return (
    <BrowserRouter>
      <div className="App">
        <h1 className="App-header">
          Willkommen in unseren Tilgungsplanrechner
        </h1>
        <div>
          <label htmlFor="darlehensbetrage">Darlehensbetrage</label>
          <input
            className="darlehensbetrage"
            id="darlehensbetrage"
            type="numbers"
            onChange={e => setDb(e.target.value)}
          />
          <label htmlFor="sollzinse">Sollzinse</label>
          <input
            className="sollzinse"
            id="sollzinse"
            type="numbers"
            onChange={e => setSz(e.target.value)}
          />
          <label htmlFor="tilgung">Anfänglichen Tilgung</label>
          <input
            className="tilgung"
            id="tilgung"
            type="numbers"
            onChange={e => setTg(e.target.value)}
          />
          <label htmlFor="zinsbuildung">Zinsbuildung</label>
          <input
            className="zinsbuildung"
            id="zinsbuildung"
            type="numbers"
            step="1"
            onChange={e => setZb(e.target.value)}
          />
          <br />
          <button
            className="button"
            onClick={e => {
              setFormInfo([db, sz, tg, zb]);
              setResultsOpen(true);
            }}
          >
            Meiner Tilgungsplan Rechnen
          </button>
        </div>
        {resultsOpen && (
          <div className="resultsTable">
            <Route
              exact
              path="/deinTilgungsplan"
              render={() => (
                <div>
                  <Results info={formInfo} />
                </div>
              )}
            />
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
