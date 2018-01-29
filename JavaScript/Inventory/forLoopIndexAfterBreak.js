// 0 이후에는 2를 넣는 반복문

var arr, i, len;
arr = [1, 1, 1, 0, 1, 1, 1, 1, 1, 1];

for (i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === 0) {
        console.log("before break : ", i);
        break;
    }
}
console.log("after break : ", i);
for (; i < len; i++) {
    arr[i] = 2;
}

console.log("arr : ", arr);
console.log();

arr = [1, 1, 1, 0, 1, 1, 1, 1, 1, 1];

for (i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === 0) {
        console.log("before break : ", i);
        i = i + 1;
        break;
    }
}
console.log("after break : ", i);
for (; i < len; i++) {
    arr[i] = 2;
}

console.log("arr : ", arr);