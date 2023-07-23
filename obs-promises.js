const { Observable } = require("rxjs");
const { filter } = require("rxjs/operators");

const doSomething = () => {
  return new Promise((resolve) => resolve("Valor 1"));
};

const doSomething$ = () => {
  return new Observable((observer) => {
    observer.next("Valor 1 $");
    observer.next("Valor 2 $");
    observer.next("Valor 3 $");
    observer.next(null);
    setTimeout(() => {
      observer.next("Valor 4 $");
    }, 2000);
    setTimeout(() => {
      observer.next(null);
    }, 5000);
    setTimeout(() => {
      observer.next("Valor 5 $");
    }, 7000);
  });
};

// (async () => {
//   const res = await doSomething();
//   console.log(res);
// })();

(() => {
  const obs$ = doSomething$();
  obs$
    .pipe(filter((value) => value !== null))
    .subscribe((rta) => console.log(rta));
})();
