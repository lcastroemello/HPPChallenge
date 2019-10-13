import React, { useState, useEffect } from "react";

export default function Results(props) {
  const [db, setDb] = useState(props.info[0]);
  const [sz, setSz] = useState(props.info[1] / 100 / 12);
  const [tg, setTg] = useState(props.info[2] / 100 / 12);
  const [zb, setZb] = useState(props.info[3]);
  const [datum, setDatum] = useState();
  const [restschuld, setRestschuld] = useState([]);
  const [zinzen, setZinsen] = useState([]);
  const [ta, setTa] = useState([]);
  const [rates, setRates] = useState();

  useEffect(
    () => {
      datumCalc();
      rateCalc();
      restZinzenTaCalc();
    },
    [props]
  );

  let restZinzenTaCalc = () => {
    let restList = [db + ".00", Math.ceil((db - db * tg) * 100) / 100];
    let zinzenList = ["0.00", (db * sz).toFixed(2)];
    let taList = ["-" + db + ".00", (db * tg).toFixed(2)];
    for (let i = 2; i < zb * 12; i++) {
      zinzenList.push((restList[i - 1] * sz).toFixed(2));
      taList.push((rate - zinzenList[i]).toFixed(2));
      restList.push(Math.ceil((restList[i - 1] - taList[i]) * 100) / 100);
    }
    console.log(
      "restlist",
      restList,
      "zinzenlist",
      zinzenList,
      "talist",
      taList
    );
  };

  let rate = (db * (tg / 12) + db * (sz / 12)).toFixed(2);
  let rateCalc = () => {
    let rateList = ["-" + db + ".00"];
    for (let i = 0; i < zb * 12 - 1; i++) {
      rateList.push(rate);
    }
    setRates(rateList);
  };

  let datumCalc = () => {
    console.log("in", zb);
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

  return (
    <div>
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
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
