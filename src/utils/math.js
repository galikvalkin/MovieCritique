// @flow

export function evaluateRate(reviews) {
  let rate = 0,
      summ = 0,
      keys = reviews ? Object.keys(reviews) : [];

  keys.map(key => {
    summ = summ + reviews[key].rate;
  });

  rate = Math.round(summ / keys.length);

  return rate;
}


export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
