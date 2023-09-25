function solution(a, m, k) {
  let count = 0;

  for (let i = 0; i < a.length - m + 1; i++) {
    const subarray = a.slice(i, i + m);
    let found = false;

    for (let j = 0; j < subarray.length - 1; j++) {
      for (let t = j + 1; t < subarray.length; t++) {
        if (subarray[j] + subarray[t] === k) {
          found = true;
          break;
        }
      }
      if (found) {
        break;
      }
    }

    if (found) {
      count++;
    }
  }

  return count;
}

const a1 = [2, 4, 7, 5, 3, 5, 8, 5, 1, 7];
const m1 = 4;
const k1 = 10;
console.log(solution(a1, m1, k1));

const a2 = [15, 8, 8, 2, 6, 4, 1, 7];
const m2 = 2;
const k2 = 8;
console.log(solution(a2, m2, k2)); 
