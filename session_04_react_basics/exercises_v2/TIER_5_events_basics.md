# Bài 5.1 — Click Events

## Click Event là gì?

Khi người dùng:

* click chuột
* nhấn button

React sẽ gọi function xử lý event.

---

# Ví dụ cơ bản

```jsx id="7xjlwm"
<button onClick={handleClick}>
  Click
</button>
```

---

# Vì sao KHÔNG viết `handleClick()`?

## Sai

```jsx id="bpt5wk"
<button onClick={handleClick()}>
```

→ function chạy NGAY khi render.

---

## Đúng

```jsx id="u7p9y8"
<button onClick={handleClick}>
```

→ chỉ chạy khi click.

---

# Ví dụ đổi màu ngẫu nhiên

```jsx id="1v4qjw"
import { useState } from "react";

function RandomColor() {
  const [color, setColor] = useState("skyblue");

  function handleChangeColor() {
    const colors = [
      "red",
      "green",
      "blue",
      "orange",
      "purple"
    ];

    const random =
      colors[Math.floor(Math.random() * colors.length)];

    setColor(random);
  }

  return (
    <div>
      <div
        style={{
          width: "200px",
          height: "200px",
          background: color
        }}
      />

      <button onClick={handleChangeColor}>
        Đổi màu
      </button>
    </div>
  );
}

export default RandomColor;
```

---

# Like Button ❤️

```jsx id="wd15yx"
import { useState } from "react";

function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
    >
      {
        liked
          ? "❤️ Đã thích"
          : "🤍 Thích"
      }
    </button>
  );
}

export default LikeButton;
```

---

# Bài 5.2 — Input Events

## onChange

```jsx id="r6c5z5"
onChange={(e) => setText(e.target.value)}
```

Khi nhập:

1. event xảy ra
2. lấy giá trị:

```jsx id="4thjpm"
e.target.value
```

3. cập nhật state.

---

# Đếm số từ

```jsx id="8bjlwm"
import { useState } from "react";

function WordCounter() {
  const [text, setText] = useState("");

  const words =
    text.trim() === ""
      ? 0
      : text.trim().split(/\s+/).length;

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <p>Số từ: {words}</p>
    </div>
  );
}

export default WordCounter;
```

---

# Validate Email

```jsx id="kwazqs"
function EmailValidation() {
  const [email, setEmail] = useState("");

  const isValid = email.includes("@");

  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <p>
        {
          isValid
            ? "✅ Email hợp lệ"
            : "❌ Email chưa hợp lệ"
        }
      </p>
    </div>
  );
}
```

---

# Bài 5.3 — Keyboard Events

## onKeyDown

```jsx id="ph2v86"
onKeyDown={(e) => console.log(e.key)}
```

React sẽ biết:

* Enter
* Escape
* Arrow keys
* Ctrl
* Shift
* ...

---

# Enter để gửi

```jsx id="uwi4v4"
function EnterDemo() {
  const [text, setText] = useState("");

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      alert(text);
    }
  }

  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
```

---

# Escape để xóa

```jsx id="mjlbv8"
if (e.key === "Escape") {
  setText("");
}
```

---

# Di chuyển bằng phím mũi tên

```jsx id="m0krm1"
import { useState } from "react";

function MoveBox() {
  const [x, setX] = useState(0);

  function handleKeyDown(e) {
    if (e.key === "ArrowRight") {
      setX(x + 20);
    }

    if (e.key === "ArrowLeft") {
      setX(x - 20);
    }
  }

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ height: "200px" }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          background: "red",
          transform: `translateX(${x}px)`
        }}
      />
    </div>
  );
}

export default MoveBox;
```

---

# Bài 5.4 — Form Events

## Form submit

```jsx id="h71d4h"
<form onSubmit={handleSubmit}>
```

---

# event.preventDefault()

```jsx id="48u06q"
event.preventDefault();
```

ngăn:

* reload trang
* gửi form mặc định.

---

# Vì sao cần?

Nếu không có:

```txt id="7g9suv"
Submit
   ↓
Trang reload
   ↓
State mất hết
```

---

# Ví dụ validate email

```jsx id="g5qscq"
function handleSubmit(e) {
  e.preventDefault();

  if (!formData.email.includes("@")) {
    alert("Email không hợp lệ");
    return;
  }

  alert("Gửi thành công");
}
```

---

# Confirm Password

```jsx id="fvl1zx"
if (password !== confirmPassword) {
  alert("Mật khẩu không khớp");
}
```

---

# React Event Flow

```txt id="1dth4y"
User action
      ↓
Event xảy ra
      ↓
Handler function chạy
      ↓
setState()
      ↓
Re-render
      ↓
UI cập nhật
```

---

# Tổng kết Events

## Click

```jsx id="uvfdot"
<button onClick={handleClick}>
```

---

## Input

```jsx id="vwzy0z"
<input onChange={(e) => setValue(e.target.value)} />
```

---

## Keyboard

```jsx id="7wvv55"
onKeyDown={(e) => {
  if (e.key === "Enter") {
    ...
  }
}}
```

---

## Form

```jsx id="z1cnh8"
<form onSubmit={handleSubmit}>
```

---


