export function datum(years) {
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
  for (let i = 1; i <= years - 1; i++) {
    for (let l = 0; l < 12; l++) {
      datumList.push(months[l] + (nowYear + i));
    }
  }
  for (let i = 0; i <= nowMonth + 1; i++) {
    datumList.push(months[i] + (Number(nowYear) + Number(years)));
  }
  return datumList;
}

const add = (a, b) => a + b;

export function rates(darlehens, years, fixRate) {
  let rateList = [Number(-darlehens)];
  for (let i = 0; i < years * 12; i++) {
    rateList.push(Number(fixRate));
  }
  rateList.push((rateList.reduce(add) + Number(darlehens)).toFixed(2));
  return rateList;
}

export function rzta(darlehens, tilgung, sollzinses, fixRate, years) {
  let restList = [
    Number(darlehens),
    Math.ceil((darlehens - darlehens * tilgung) * 100) / 100
  ];
  let zinzenList = [
    Number("0.00"),
    Number((darlehens * sollzinses).toFixed(2))
  ];
  let taList = [Number(-darlehens), Number((darlehens * tilgung).toFixed(2))];
  for (let i = 2; i < years * 12 + 1; i++) {
    zinzenList.push(Number((restList[i - 1] * sollzinses).toFixed(2)));
    taList.push(Number((fixRate - zinzenList[i]).toFixed(2)));
    restList.push(
      Number(Math.ceil((restList[i - 1] - taList[i]) * 100) / 100).toFixed(2)
    );
  }
  restList.push(restList[restList.length - 1]);
  zinzenList.push(zinzenList.reduce(add).toFixed(2));
  taList.push((taList.reduce(add) + Number(darlehens)).toFixed(2));
  return { restList: restList, zinzenList: zinzenList, taList: taList };
}
