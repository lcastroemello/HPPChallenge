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
          Willkommen zu unseren Tilgungsplanrechner
        </h1>
        <div>
          <label htmlFor="darlehensbetrage">Darlehensbetrage</label>
          <input
            className="darlehensbetrage"
            id="darlehensbetrage"
            type="numbers"
            onChange={e => setDb(e.target.value)}
          />
          €
          <br />
          <label htmlFor="sollzinse">Sollzinse(in Prozent)</label>
          <input
            className="sollzinse"
            id="sollzinse"
            type="numbers"
            min="1"
            max="100"
            onChange={e => setSz(e.target.value)}
          />
          %
          <br />
          <label htmlFor="tilgung">Anfänglichen Tilgung (in Prozent)</label>
          <input
            className="tilgung"
            id="tilgung"
            type="numbers"
            min="1"
            max="100"
            onChange={e => setTg(e.target.value)}
          />
          %
          <br />
          <label htmlFor="zinsbuildung">Zinsbuildung</label>
          <input
            className="zinsbuildung"
            id="zinsbuildung"
            type="numbers"
            step="1"
            onChange={e => setZb(e.target.value)}
          />
          Jahre
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
              path="/"
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
