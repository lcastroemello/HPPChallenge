import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [formInfo, setFormInfo] = useState();
  const [db, setDb] = useState();
  const [sz, setSz] = useState();
  const [tg, setTg] = useState();
  const [zb, setZb] = useState();

  if (formInfo) {
    console.log(formInfo);
  }

  return (
    <div className="App">
      <h1 className="App-header">Willkommen in unseren Tilgungsplan</h1>
      <div>
        <label for="darlehensbetrage">Darlehensbetrage</label>
        <input
          className="darlehensbetrage"
          id="darlehensbetrage"
          type="numbers"
          onChange={e => setDb(e.target.value)}
        />
        <label for="sollzinse">Sollzinse</label>
        <input
          className="sollzinse"
          id="sollzinse"
          type="numbers"
          onChange={e => setSz(e.target.value)}
        />
        <label for="tilgung">Tilgung</label>
        <input
          className="tilgung"
          id="tilgung"
          type="numbers"
          onChange={e => setTg(e.target.value)}
        />
        <label for="zinsbuildung">Zinsbuildung</label>
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
          onClick={e =>
            setFormInfo({
              darlehensbetrage: db,
              sollzinse: sz,
              tilgung: tg,
              zinsbuildung: zb
            })
          }
        >
          Meiner Tilgungsplan Rechnen
        </button>
      </div>
    </div>
  );
}

export default App;
