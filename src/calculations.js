function currency(n) {
  n = parseFloat(n);
  return isNaN(n) ? false : n.toFixed(2);
}

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
  for (let i = 0; i <= nowMonth; i++) {
    datumList.push(months[i] + (Number(nowYear) + Number(years)));
  }
  return datumList;
}

export function rates(darlehens, years, fixRate) {
  let rateList = [currency(-darlehens)];
  for (let i = 0; i < years * 12; i++) {
    rateList.push(currency(fixRate));
  }
  return rateList;
}

export function rzta(darlehens, tilgung, sollzinses, fixRate, years) {
  let restList = [
    Number(darlehens),
    Math.ceil((darlehens - darlehens * tilgung) * 100) / 100
  ];
  let zinzenList = [currency(0), currency(darlehens * sollzinses)];
  let taList = [currency(-darlehens), currency(darlehens * tilgung)];
  for (let i = 2; i < years * 12 + 1; i++) {
    zinzenList.push(currency(restList[i - 1] * sollzinses));
    taList.push(currency(fixRate - zinzenList[i]));
    restList.push(
      currency(Math.ceil((restList[i - 1] - taList[i]) * 100) / 100)
    );
  }
  return { restList: restList, zinzenList: zinzenList, taList: taList };
}

export function footer(darlehens, rateList, rztaList) {
  const add = (a, b) => a + b;
  let footer = {};
  footer.rest = rztaList.restList[rztaList.restList.length - 1];
  footer.zinzen = currency(rztaList.zinzenList.reduce(add));
  footer.ta = currency(rztaList.taList.reduce(add) + Number(darlehens));
  footer.rate = currency(rateList.reduce(add) + Number(darlehens));
  return footer;
}
