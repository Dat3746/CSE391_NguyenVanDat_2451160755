const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmInput = document.querySelector("#confirmPassword");
const phoneInput = document.querySelector("#phone");

const submitBtn = document.querySelector("#submitBtn");

const strengthBar = document.querySelector("#strengthBar");

const modal = document.querySelector("#modal");
const modalInfo = document.querySelector("#modalInfo");

let valid = {
  name: false,
  email: false,
  password: false,
  confirm: false,
  phone: false
};

function updateSubmitButton() {
  submitBtn.disabled = !Object.values(valid).every(v => v);
}

// NAME
nameInput.addEventListener("input", () => {
  const value = nameInput.value.trim();

  if (value.length >= 2 && value.length <= 50) {
    valid.name = true;
    nameMessage.textContent = "✅ Hợp lệ";
    nameMessage.className = "success";
  } else {
    valid.name = false;
    nameMessage.textContent = "❌ Tên phải từ 2-50 ký tự";
    nameMessage.className = "error";
  }

  updateSubmitButton();
});

// EMAIL
emailInput.addEventListener("input", () => {

  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (regex.test(emailInput.value)) {
    valid.email = true;
    emailMessage.textContent = "✅ Email hợp lệ";
    emailMessage.className = "success";
  } else {
    valid.email = false;
    emailMessage.textContent = "❌ Email không hợp lệ";
    emailMessage.className = "error";
  }

  updateSubmitButton();
});

// PASSWORD
passwordInput.addEventListener("input", () => {

  const value = passwordInput.value;

  let strength = 0;

  if (value.length >= 8) strength++;

  if (/[A-Za-z]/.test(value) && /\d/.test(value)) {
    strength++;
  }

  if (
    /[a-z]/.test(value) &&
    /[A-Z]/.test(value) &&
    /\d/.test(value) &&
    /[^A-Za-z0-9]/.test(value)
  ) {
    strength++;
  }

  if (strength === 1) {
    strengthBar.style.width = "33%";
    strengthBar.style.background = "red";
    passwordMessage.textContent = "Yếu";
    valid.password = false;
  }

  else if (strength === 2) {
    strengthBar.style.width = "66%";
    strengthBar.style.background = "orange";
    passwordMessage.textContent = "Trung bình";
    valid.password = true;
  }

  else if (strength === 3) {
    strengthBar.style.width = "100%";
    strengthBar.style.background = "green";
    passwordMessage.textContent = "Mạnh";
    valid.password = true;
  }

  else {
    strengthBar.style.width = "0%";
    valid.password = false;
  }

  checkConfirm();
  updateSubmitButton();
});

// CONFIRM
function checkConfirm() {

  if (
    confirmInput.value &&
    confirmInput.value === passwordInput.value
  ) {

    valid.confirm = true;

    confirmMessage.textContent =
      "✅ Password khớp";

    confirmMessage.className = "success";
  }

  else {

    valid.confirm = false;

    confirmMessage.textContent =
      "❌ Password không khớp";

    confirmMessage.className = "error";
  }
}

confirmInput.addEventListener("input", () => {
  checkConfirm();
  updateSubmitButton();
});

// PHONE
phoneInput.addEventListener("input", () => {

  let numbers =
    phoneInput.value.replace(/\D/g, "");

  numbers = numbers.substring(0, 10);

  let formatted = numbers;

  if (numbers.length > 4) {
    formatted =
      numbers.slice(0,4) + "-" +
      numbers.slice(4);
  }

  if (numbers.length > 7) {
    formatted =
      numbers.slice(0,4) + "-" +
      numbers.slice(4,7) + "-" +
      numbers.slice(7);
  }

  phoneInput.value = formatted;

  if (numbers.length === 10) {

    valid.phone = true;

    phoneMessage.textContent =
      "✅ Số điện thoại hợp lệ";

    phoneMessage.className = "success";
  }

  else {

    valid.phone = false;

    phoneMessage.textContent =
      "❌ Phải đủ 10 số";

    phoneMessage.className = "error";
  }

  updateSubmitButton();
});

// SUBMIT
registerForm.addEventListener("submit", e => {

  e.preventDefault();

  modal.classList.remove("hidden");

  modalInfo.textContent =
    `Tên: ${nameInput.value}
Email: ${emailInput.value}
Phone: ${phoneInput.value}`;
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});