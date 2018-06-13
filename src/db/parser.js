// @flow

export function prepareUpdateRoutes(data: {}, keyArr?: []) {
  let routes = {};
  for (let i in data) {
    if ((data[i]) && data.hasOwnProperty(i) && data[i].toString && data[i].toString() === "[object Object]") {
      let newArr = [];
      if (keyArr) {
        newArr = [...keyArr];
      }
      newArr.push(i);
      routes = {
        ...routes,
        ...prepareUpdateRoutes(data[i], newArr)
      };
    }
    else {
      let path = '';
      if (keyArr) {
        keyArr.map(item => {
          path = path + item + '/';
        });
      }
      path = path + i;
      routes[path] = data[i];
    }
  }
  return routes;
}
