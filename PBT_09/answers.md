# PHẦN C — DEBUG & PHÂN TÍCH

## Câu C1 (8đ) — Debug DOM Code

### Lỗi 1
```js
document.querySelector("#decrementBtn").addEventListener("onclick", function() {
```

Sai vì `addEventListener()` dùng tên sự kiện `"click"` chứ không phải `"onclick"`.

Sửa:

```js
document.querySelector("#decrementBtn").addEventListener("click", function() {
```

---

### Lỗi 2
```js
countDisplay = count;
```

Sai vì `countDisplay` là một DOM element được khai báo bằng `const`.

Sửa:

```js
countDisplay.textContent = count;
```

---

### Lỗi 3
```js
historyList.innerHTML = null;
```

Nên dùng chuỗi rỗng để xóa nội dung.

Sửa:

```js
historyList.innerHTML = "";
```

---

### Lỗi 4
```js
item.remove;
```

Thiếu dấu ngoặc `()`.

Sửa:

```js
item.remove();
```

---

### Lỗi 5
```js
count = localStorage.getItem("count");
```

`localStorage` luôn trả về chuỗi.

Sửa:

```js
count = Number(localStorage.getItem("count")) || 0;
```

---

### Lỗi 6

Load lại trang nhưng không khôi phục history đã lưu.

Thiếu:

```js
historyList.innerHTML =
    localStorage.getItem("history") || "";
```

---

### Lỗi 7

Các thẻ `<li>` được khôi phục từ localStorage không còn sự kiện click để xóa.

Cần:

- Gán lại event sau khi load
- Hoặc dùng Event Delegation

---

### Lỗi 8 (Logic)

Counter có thể giảm xuống âm vô hạn.

Nếu yêu cầu không cho phép số âm:

```js
if (count > 0) {
    count--;
}
```

---

## Đoạn Code Sửa Chính

```js
document.querySelector("#decrementBtn")
.addEventListener("click", function () {
    count--;
    countDisplay.textContent = count;
});

document.querySelector("#resetBtn")
.addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;
    historyList.innerHTML = "";
});

document.querySelector("#clearHistory")
.addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");

    items.forEach(item => {
        item.remove();
    });
});

window.addEventListener("load", () => {
    count = Number(localStorage.getItem("count")) || 0;

    countDisplay.textContent = count;

    historyList.innerHTML =
        localStorage.getItem("history") || "";
});
```

---

# Câu C2 (7đ) — Performance

## Vì sao bind event lên 1000 phần tử là Bad Practice?

Ví dụ:

```js
items.forEach(item => {
    item.addEventListener("click", handleClick);
});
```

Khi có 1000 phần tử:

- Tạo 1000 event listener
- Tốn RAM
- Tốn CPU
- Khó quản lý
- Khi thêm phần tử mới phải gắn listener tiếp

---

## Event Delegation

Thay vì gắn cho từng phần tử:

```js
parent.addEventListener("click", e => {
    if (e.target.matches(".item")) {
        console.log(e.target.textContent);
    }
});
```

### Ưu điểm

- Chỉ cần 1 listener
- Tiết kiệm bộ nhớ
- Hoạt động cho cả phần tử tạo động
- Dễ bảo trì

---

## Refactor bằng DocumentFragment

### Code gốc

```js
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);
}
```

Mỗi lần append:

- Browser phải cập nhật DOM
- Tính toán layout
- Reflow/Repaint

=> xảy ra 1000 lần

---

### Code tối ưu

```js
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;

    fragment.appendChild(div);
}

document.body.appendChild(fragment);
```

---

## Vì sao nhanh hơn?

`DocumentFragment` tồn tại ngoài DOM thật.

Trong vòng lặp:

- Không reflow
- Không repaint

Sau khi hoàn tất:

```js
document.body.appendChild(fragment);
```

Browser chỉ:

- Cập nhật DOM 1 lần
- Reflow 1 lần
- Repaint 1 lần

=> Hiệu năng tốt hơn rất nhiều khi thao tác số lượng lớn phần tử.
# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 — DOM Tree

```txt
div#app
├── header
│   ├── h1
│   │   └── "Todo App"
│   └── nav
│       ├── a.active
│       │   └── "All"
│       ├── a
│       │   └── "Active"
│       └── a
│           └── "Completed"
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    │       └── "Add"
    └── ul#todoList
        ├── li.todo-item
        │   └── "Learn HTML"
        └── li.todo-item.completed
            └── "Learn CSS"
```

## querySelector

```js
// Chọn thẻ h1
document.querySelector("h1");

// Chọn input trong form
document.querySelector("#todoForm input");

// Chọn tất cả .todo-item
document.querySelectorAll(".todo-item");

// Chọn link đang active
document.querySelector("a.active");

// Chọn li đầu tiên trong #todoList
document.querySelector("#todoList li:first-child");

// Chọn tất cả a bên trong nav
document.querySelectorAll("nav a");
```

---

# Câu A2 — innerHTML vs textContent

## `innerHTML`

Dùng để lấy hoặc gán **HTML bên trong element**.

```js
document.querySelector("#result").innerHTML = "<b>Hello</b>";
```

Kết quả: chữ **Hello** được in đậm.

## `textContent`

Dùng để lấy hoặc gán **văn bản thuần túy**.

```js
document.querySelector("#result").textContent = "<b>Hello</b>";
```

Kết quả: hiển thị nguyên chuỗi:

```txt
<b>Hello</b>
```

## Khi nào dùng?

| Thuộc tính    | Khi dùng                  |
| ------------- | ------------------------- |
| `innerHTML`   | Khi muốn chèn HTML thật   |
| `textContent` | Khi chỉ muốn hiển thị chữ |

## Vì sao `innerHTML` nguy hiểm?

Vì nếu đưa dữ liệu user nhập trực tiếp vào `innerHTML`, trình duyệt có thể hiểu nó là HTML/script độc hại.

Code nguy hiểm:

```js
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;
```

Nếu user nhập:

```html
<img src=x onerror="alert('Hacked!')">
```

trình duyệt sẽ render thẻ `<img>` và chạy `onerror`.

## Cách sửa an toàn

```js
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput;
```

Dùng `textContent` để biến input thành chữ thường, không thực thi HTML.

---

# Câu A3 — Event Bubbling

HTML:

```html
<div id="outer">
    <div id="inner">
        <button id="btn">Click me</button>
    </div>
</div>
```

Khi click vào button, event chạy từ phần tử trong ra ngoài:

```txt
button → inner → outer
```

Output:

```txt
BUTTON
INNER
OUTER
```

Nếu bỏ comment:

```js
e.stopPropagation();
```

trong button handler, event dừng tại button.

Output còn:

```txt
BUTTON
```
