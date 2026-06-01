// Game đoán số - JavaScript

// Random số từ 1 đến 100
const secretNumber = Math.floor(Math.random() * 100) + 1;

// Số lượt tối đa
const maxAttempts = 7;

// Đếm lượt đoán
let attempts = 0;

// Lưu các số đã đoán
let guessedNumbers = [];

alert("🎮 Chào mừng đến với game đoán số!");
alert("Bạn có 7 lượt để đoán số từ 1 đến 100.");

while (attempts < maxAttempts) {

    let input = prompt(
        `Lượt ${attempts + 1}/${maxAttempts}\nNhập số từ 1-100:`
    );

    // Nếu bấm Cancel
    if (input === null) {
        alert("Bạn đã thoát game!");
        break;
    }

    // Ép kiểu sang number
    let guess = Number(input);

    // Validate input
    if (
        isNaN(guess) ||
        guess < 1 ||
        guess > 100 ||
        !Number.isInteger(guess)
    ) {
        alert("⚠️ Vui lòng nhập số nguyên từ 1 đến 100!");
        continue;
    }

    // Kiểm tra đoán trùng
    if (guessedNumbers.includes(guess)) {
        alert("⚠️ Bạn đã đoán số này rồi!");
        continue;
    }

    // Lưu số đã đoán
    guessedNumbers.push(guess);

    // Tăng số lượt
    attempts++;

    // So sánh
    if (guess === secretNumber) {

        alert(
            `🎉 Đúng rồi!\nBạn đoán đúng sau ${attempts} lần!`
        );

        break;

    } else if (guess < secretNumber) {

        alert("📈 Cao hơn!");

    } else {

        alert("📉 Thấp hơn!");
    }

    // Hết lượt
    if (attempts === maxAttempts) {

        alert(
            `💀 Bạn đã thua!\nSố đúng là: ${secretNumber}`
        );
    }
}