function pipe(...fns) {
    return function (value) {
        return fns.reduce((result, fn) => fn(result), value);
    };
}

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);

console.log(process(5));
// Kết quả: 20


// ==========================
// 2. memoize()
// ==========================
function memoize(fn) {
    const cache = {};

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache[key] !== undefined) {
            console.log("Lấy từ cache...");
            return cache[key];
        }

        const result = fn(...args);
        cache[key] = result;

        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");

    let result = 0;

    for (let i = 0; i < n; i++) {
        result += i;
    }

    return result;
});

console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));


// ==========================
// 3. debounce()
// ==========================
function debounce(fn, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

search("i");
search("ip");
search("iph");
search("iphone");

// Chỉ in:
// Searching: iphone


// ==========================
// 4. retry()
// ==========================
async function retry(fn, maxAttempts = 3) {
    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        }
        catch (error) {
            lastError = error;

            console.log(
                `Lần thử ${attempt} thất bại: ${error.message}`
            );
        }
    }

    throw lastError;
}


// ==========================
// TEST retry()
// ==========================
let count = 0;

retry(async () => {
    count++;

    console.log("Thực hiện lần", count);

    if (count < 3) {
        throw new Error("Lỗi kết nối");
    }

    return "Thành công!";
})
.then(result => {
    console.log(result);
})
.catch(error => {
    console.log("Thất bại:", error.message);
});