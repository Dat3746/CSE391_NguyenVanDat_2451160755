# Bài 4.1 — useState với số

## useState với number

```jsx id="mffv8y"
const [count, setCount] = useState(0);
```

* `count` = giá trị hiện tại
* `setCount()` = cập nhật state

---

# Ví dụ hoàn chỉnh

```jsx id="edrk4l"
import { useState } from "react";

function NumberState() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: "center" }}>
      <h1
        style={{
          color:
            count > 0
              ? "green"
              : count < 0
              ? "red"
              : "black"
        }}
      >
        {count}
      </h1>

      <p>
        {
          count > 0
            ? "Số dương"
            : count < 0
            ? "Số âm"
            : "Bằng 0"
        }
      </p>

      <button onClick={() => setCount(count + 1)}>
        +1
      </button>

      <button onClick={() => setCount(count - 1)}>
        -1
      </button>

      <button onClick={() => setCount(count + 5)}>
        +5
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

export default NumberState;
```

---

# Bài 4.2 — useState với chuỗi

## Controlled Input

```jsx id="8y4n2z"
<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

React kiểm soát toàn bộ input.

---

# Luồng hoạt động

```txt id="y0nnsh"
Người dùng nhập
      ↓
onChange chạy
      ↓
setState(value)
      ↓
Re-render
      ↓
Input cập nhật
```

---

# Ví dụ đếm ký tự

```jsx id="q1rrcc"
import { useState } from "react";

function CharacterCount() {
  const [text, setText] = useState("");

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={100}
      />

      <p>{text.length}/100 ký tự</p>
    </div>
  );
}

export default CharacterCount;
```

---

# Kiểm tra email hợp lệ

```jsx id="x1hmf0"
function EmailCheck() {
  const [email, setEmail] = useState("");

  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <p>
        {
          email.includes("@")
            ? "✅ Email hợp lệ"
            : "❌ Email chưa hợp lệ"
        }
      </p>
    </div>
  );
}
```

---

# Hiện / Ẩn mật khẩu

```jsx id="t7l3ow"
import { useState } from "react";

function PasswordToggle() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div>
      <input
        type={show ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={() => setShow(!show)}>
        {show ? "Ẩn" : "Hiện"}
      </button>
    </div>
  );
}

export default PasswordToggle;
```

---

# Bài 4.3 — useState với boolean

## Boolean state

```jsx id="xjlwmg"
const [isDarkMode, setIsDarkMode] = useState(false);
```

chỉ có:

* true
* false

---

# Toggle Pattern

```jsx id="p5qz0n"
setIsDarkMode(!isDarkMode);
```

Ý nghĩa:

```txt id="t3p2t1"
true → false
false → true
```

---

# Ví dụ Dark Mode

```jsx id="s34ryx"
import { useState } from "react";

function DarkMode() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div
      style={{
        background: isDark ? "#222" : "#fff",
        color: isDark ? "#fff" : "#000",
        padding: "20px"
      }}
    >
      <button onClick={() => setIsDark(!isDark)}>
        {
          isDark
            ? "☀️ Light"
            : "🌙 Dark"
        }
      </button>
    </div>
  );
}

export default DarkMode;
```

---

# Accordion

```jsx id="y0uxru"
function Accordion() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h2 onClick={() => setOpen(!open)}>
        Câu hỏi thường gặp
      </h2>

      {
        open && (
          <p>
            Đây là nội dung accordion
          </p>
        )
      }
    </div>
  );
}
```

---

# Bài 4.4 — Nhiều useState

## Một component có thể có nhiều state

```jsx id="a89q6x"
const [name, setName] = useState("");
const [age, setAge] = useState("");
const [submitted, setSubmitted] = useState(false);
```

---

# Form đầy đủ

```jsx id="8kgt7m"
import { useState } from "react";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (
      name.trim() === "" ||
      email.trim() === ""
    ) {
      alert("Nhập thiếu thông tin");
      return;
    }

    if (age <= 0 || age >= 100) {
      alert("Tuổi không hợp lệ");
      return;
    }

    setSubmitted(true);
  }

  return (
    <div>
      {
        !submitted ? (
          <div>
            <input
              placeholder="Tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="number"
              placeholder="Tuổi"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <button onClick={handleSubmit}>
              Đăng ký
            </button>

            {
              name && (
                <h3>
                  Xin chào {name}!
                </h3>
              )
            }
          </div>
        ) : (
          <div>
            <h2>✅ Đăng ký thành công</h2>

            <p>Tên: {name}</p>
            <p>Email: {email}</p>
            <p>Tuổi: {age}</p>
          </div>
        )
      }
    </div>
  );
}

export default RegisterForm;
```

---

# Tổng kết useState

## Number

```jsx id="yr2kk8"
const [count, setCount] = useState(0);
```

dùng cho:

* đếm
* tính toán

---

## String

```jsx id="r6b8hq"
const [text, setText] = useState("");
```

dùng cho:

* input
* form

---

## Boolean

```jsx id="7n4h6i"
const [isOpen, setIsOpen] = useState(false);
```

dùng cho:

* toggle
* hiện/ẩn
* dark mode

---

# React Flow

```txt id="13v27x"
User action
      ↓
setState()
      ↓
Re-render
      ↓
JSX mới
      ↓
UI cập nhật
```

---


