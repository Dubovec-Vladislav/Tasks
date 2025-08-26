function debounce(func, ms) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

const f1 = () => console.log("Debounce");
debounce(f1, 2000)();

// ---------------------------------------- //

function deepArrayCopy(arr) {
  const copy = [];

  if (Array.isArray(arr)) {
    arr.forEach((item) => copy.push(deepArrayCopy(item)));
    return copy;
  }

  return arr;
}

const originalArray = [1, [2, 3, [4, 5]], 6];
const copiedArray = deepArrayCopy(originalArray);
copiedArray[1][1] = 9;
copiedArray[1][2][0] = 16;

console.log(originalArray);
console.log(copiedArray);

// ---------------------------------------- //

const input = [
  { value: "abcd", order: 4, expired: false },
  { value: "qwer", order: 2, expired: true },
  { value: "xyz1", order: 1, expired: false },
  { value: "abx2", order: 3, expired: false },
];

function getRow(mas) {
  mas = mas.filter((item) => !item.expired).sort((a, b) => a.order - b.order);

  let row = mas.map((item) => item.value.split("").reverse().join("")).join("");

  let resultRow = [...new Set(row.split(""))];
  return resultRow.join("");
}

console.log(getRow(input)); // 1zyx 2ba dc

// ---------------------------------------- //

const X = { a: 1, b: 2, c: 3, d: 4 };

function getProperty(obj, key) { 
  return obj[key];
}

function getProperty<T extends Record<string, any>, K extends keyof T>(
   obj: T,
   key: K
 ): T[K] {
   return obj[key];
 }

console.log(getProperty(X, "a"));
console.log(getProperty(X, "m"));

type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

// ---------------------------------------- //

const f2 = (row) => {
  const objectNameList = row.split(".");
  const resultObject = {};
  let current = resultObject;
  for (let i = 0; i < objectNameList.length; i++) {
    const key = objectNameList[i];
    current[key] = {};
    current = current[key];
  }
  return resultObject;
};

console.log(f2("a.b.c.d.e")); // { a: { b: { c: { d: { e: {} } } } } };

const customAll = async (promises) => {
  const results = [];
  let count = 0;
  return new Promise((res, rej) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((result) => {
          results[i] = result;
          count++;
          if (count === promises.length) {
            res(results);
          }
        })
        .catch((err) => rej(err));
    }
  });
};

const promise1 = new Promise((res, rej) => {
  res("Promise1 result");
});

const promise2 = new Promise((res, rej) => {
  res("Promise2 result");
});

const promise3 = new Promise((res, rej) => {
  res("Promise3 error");
});

customAll([promise1, promise2, promise3])
  .then((results) => console.log(results))
  .catch((error) => console.error(error));
