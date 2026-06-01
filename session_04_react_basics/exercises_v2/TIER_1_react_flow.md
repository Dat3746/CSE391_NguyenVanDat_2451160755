# Bài 1.1 — Component render lần đầu

## Tại sao component chỉ render 1 lần?

Khi React chạy lần đầu:

```jsx
<LifecycleDemo />
```

React sẽ:

1. Gọi function `LifecycleDemo()`
2. Lấy JSX trong `return`
3. Hiển thị lên màn hình

Sau đó không có gì thay đổi nữa nên component không cần render lại.

---

## Khi nào component render lại?

Component sẽ render lại khi:

* `state` thay đổi (`useState`)
* `props` thay đổi
* component cha render lại

Ví dụ:

```jsx
setCount(count + 1)
```

→ React gọi lại component function
→ tạo JSX mới
→ cập nhật UI.

---

# Bài 1.2 — useState vs biến thường

## BadCounter

```jsx
let count = 0;
```

Khi click:

```jsx
count = count + 1;
```

Console tăng:

```txt
1
2
3
```

NHƯNG giao diện không đổi vì:

* React không biết biến đã thay đổi
* Không có re-render.

---

## GoodCounter

```jsx
const [count, setCount] = useState(0);
```

Khi click:

```jsx
setCount(count + 1);
```

React sẽ:

1. cập nhật state
2. gọi lại component
3. render JSX mới
4. cập nhật UI.

---

# Chạy thử sẽ thấy gì?

## BadCounter

Nhấn nút:

 Console tăng
 UI không đổi

---

## GoodCounter

Nhấn nút:

 Console tăng
 UI cập nhật luôn

---

# Vì sao useState đặc biệt?

```jsx
useState()
```

là “biến đặc biệt” mà React theo dõi.

Khi gọi:

```jsx
setState()
```

React hiểu rằng:

> “UI cần cập nhật rồi!”

---

# React Flow — Luồng hoạt động

```txt
User click button
        ↓
setState(newValue)
        ↓
React re-render component
        ↓
Component return JSX mới
        ↓
React update DOM
        ↓
UI thay đổi
```

---

# Giải thích FlowDemo

```jsx
const [step, setStep] = useState(1);
```

State ban đầu:

```txt
step = 1
```

---

Khi click:

```jsx
setStep(step + 1)
```

React:

* đổi state
* render lại component
* JSX mới xuất hiện.

---

# Tại sao React nhanh?

React không reload cả trang.

Nó chỉ update phần thay đổi:

```txt
"Bước hiện tại: 1"
→
"Bước hiện tại: 2"
```

Đây gọi là:

```txt
Virtual DOM diffing
```

---

# Tổng kết quan trọng

## Component là function

```jsx
function App() {
  return <h1>Hello</h1>
}
```

---

## useState dùng để lưu dữ liệu thay đổi

```jsx
const [value, setValue] = useState()
```

---

## setState sẽ làm:

```txt
setState()
   ↓
Re-render
   ↓
JSX mới
   ↓
UI cập nhật
```

---

