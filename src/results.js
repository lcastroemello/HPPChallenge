import React, { useState, useEffect } from "react";

export default function Results(props) {
  const [db, setDb] = useState(props.info[0]);
  const [sz, setSz] = useState(props.info[1] / 100);
  const [tg, setTg] = useState(props.info[2] / 100);
  const [zb, setZb] = useState(props.info[3]);
  const [datum, setDatum] = useState();
  const [restschuld, setRestschuld] = useState();
  const [zinzen, setZinsen] = useState();
  const [ta, setTa] = useState();
  const [rate, setRate] = useState();

  useEffect(
    () => {
      datumCalc();
      rateCalc();
      restSchuldCalc();
      zinzenCalc();
      taCalc();
    },
    [props]
  );

  console.log("this is the date list", datum);
  console.log("this is rate", rate);

  let restSchuldCalc = () => {};
  let zinzenCalc = () => {
    let zinzenList = [0];
  };
  let taCalc = () => {};
  let rateCalc = () => {
    let rateList = [-db];
    let rate = (db * (tg / 12) + db * (sz / 12)).toFixed(2);
    for (let i = 0; i < zb * 12 - 1; i++) {
      rateList.push(rate);
    }
    setRate(rateList);
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
          <tr scope="row">
            {datum &&
              datum.map(datum => {
                return <td>{datum}</td>;
              })}
          </tr>
          <tr>
            {datum &&
              datum.map(datum => {
                return <td>{datum}</td>;
              })}
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="col">Zinsbindugsende</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
