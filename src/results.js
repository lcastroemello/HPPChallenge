import React, { useState, useEffect } from "react";

export default function Results(props) {
  const [datum, setDatum] = useState();
  const [restschuld, setRestschuld] = useState([]);
  const [zinzen, setZinsen] = useState([]);
  const [ta, setTa] = useState([]);
  const [rates, setRates] = useState();
  const [calculated, setCalculated] = useState(false);

  const db = props.info[0];
  const sz = props.info[1] / 100 / 12;
  const tg = props.info[2] / 100 / 12;
  const zb = props.info[3];

  useEffect(() => {
    datumCalc();
    rateCalc();
    restZinzenTaCalc();
  }, [props]);

  const add = (a, b) => a + b;
  let rate = (db * tg + db * sz).toFixed(2);

  let restZinzenTaCalc = () => {
    let restList = [db + ".00", Math.ceil((db - db * tg) * 100) / 100];
    let zinzenList = [Number("0.00"), Number((db * sz).toFixed(2))];
    let taList = [Number(-db), Number((db * tg).toFixed(2))];
    for (let i = 2; i < zb * 12 + 1; i++) {
      zinzenList.push(Number((restList[i - 1] * sz).toFixed(2)));
      taList.push(Number((rate - zinzenList[i]).toFixed(2)));
      restList.push(
        Number(Math.ceil((restList[i - 1] - taList[i]) * 100) / 100)
      );
    }
    zinzenList.push(zinzenList.reduce(add).toFixed(2));
    taList.push((taList.reduce(add) + Number(db)).toFixed(2));
    setRestschuld(restList);
    setZinsen(zinzenList);
    setTa(taList);
    setCalculated(true);
  };

  let rateCalc = () => {
    let rateList = [Number(-db)];
    for (let i = 0; i < zb * 12; i++) {
      rateList.push(Number(rate));
    }
    rateList.push((rateList.reduce(add) + Number(db)).toFixed(2));
    setRates(rateList);
  };

  let datumCalc = () => {
    let datumList = [];
    let nowMonth = new Date().getMonth();
    let nowYear = new Date().getFullYear();
    let months = [
      "31.Jan.",
      "28/29.Feb.",
      "31.Mar.",
      "30.Apr.",
      "31.Mai.",
      "30.Jun.",
      "31.Jul.",
      "31.Aug.",
      "30.Sep.",
      "31.Oct.",
      "30.Nov.",
      "31.Dec."
    ];
    for (let i = nowMonth; i < 12; i++) {
      datumList.push(months[i] + nowYear);
    }
    for (let i = 1; i <= zb - 1; i++) {
      for (let l = 0; l < 12; l++) {
        datumList.push(months[l] + (nowYear + i));
      }
    }
    for (let i = 0; i < nowMonth; i++) {
      datumList.push(months[i] + (Number(nowYear) + Number(zb)));
    }
    setDatum(datumList);
  };

  console.log("r", restschuld, "z", zinzen, "ta", ta, "rate", rates);

  return (
    <div>
      {calculated && (
        <table>
          <caption>Dein Tilgungsplan</caption>
          <thead>
            <tr>
              <th scope="col">Datum</th>
              <th scope="col">Restschuld</th>
              <th scope="col">Zinsen</th>
              <th scope="col">Tilgung(+)/Auszahlung(-)</th>
              <th scope="col">Rate</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              {datum &&
                datum.map(datum => {
                  return (
                    <th scope="row">
                      <td>{datum}</td>
                    </th>
                  );
                })}

              {restschuld &&
                restschuld.map(restschuld => {
                  return <td> - {restschuld} €</td>;
                })}

              {zinzen &&
                zinzen.map(zinzen => {
                  return <td> {zinzen} €</td>;
                })}

              {ta &&
                ta.map(ta => {
                  return <td> {ta} €</td>;
                })}

              {rates &&
                rates.map(rates => {
                  return <td> {rates} €</td>;
                })}
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Zinsbindugsende</th>
              <td> {restschuld[restschuld.length - 1]}</td>
              <td> {zinzen[zinzen.length - 1]}</td>
              <td> {ta[ta.length - 1]}</td>
              <td> {rates[rates.length - 1]}</td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
