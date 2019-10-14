import React, { useState, useEffect } from "react";
import { datum, rates, rzta, footer } from "./calculations";

export default function Results(props) {
  const [tableData, setTableData] = useState();
  const [reduced, setReduced] = useState();

  const db = props.info[0];
  const sz = props.info[1] / 100 / 12;
  const tg = props.info[2] / 100 / 12;
  const zb = props.info[3];
  const rate = (db * tg + db * sz).toFixed(2);

  useEffect(() => {
    let datumList = datum(zb);
    let ratesList = rates(db, zb, rate);
    let rztaList = rzta(db, tg, sz, rate, zb);
    formData(datumList, ratesList, rztaList);
    setReduced(footer(db, ratesList, rztaList));
  }, [props]);

  let formData = (dates, rateList, rztas) => {
    let table = [];
    for (let i = 0; i <= zb * 12; i++) {
      table.push({
        dates: dates[i],
        rest: rztas.restList[i],
        zinzen: rztas.zinzenList[i],
        ta: rztas.taList[i],
        rate: rateList[i]
      });
    }
    setTableData(table);
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
        {tableData &&
          tableData.map(tableData => {
            return (
              <tbody key={tableData.rest}>
                <tr>
                  <td>{tableData.dates}</td>
                  <td> - {tableData.rest} €</td>
                  <td> {tableData.zinzen} €</td>
                  <td> {tableData.ta} €</td>
                  <td> {tableData.rate} €</td>
                </tr>
              </tbody>
            );
          })}
        {reduced && (
          <tfoot>
            <tr>
              <th scope="row">Zinsbindugsende</th>
              <td> -{reduced.rest}€</td>
              <td> {reduced.zinzen}€</td>
              <td> {reduced.ta}€</td>
              <td> {reduced.rate}€</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
