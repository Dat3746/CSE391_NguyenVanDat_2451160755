# Bài 0.1 — Giải thích React đầu tiên

## 1. File `.jsx` khác gì `.js`?

### `.js`

* File JavaScript bình thường.
* Chỉ viết logic JS.

Ví dụ:

```js
function sum(a, b) {
  return a + b;
}
```

---

### `.jsx`

* Là JavaScript + JSX.
* JSX cho phép viết HTML bên trong JavaScript.

Ví dụ:

```jsx
function App() {
  return <h1>Hello React</h1>;
}
```

React sẽ convert JSX → JavaScript bằng Babel/Vite.

---

## 2. Tại sao phải `export default App`?

```jsx
export default App;
```

để component có thể được import ở file khác.

Ví dụ trong `main.jsx`:

```jsx
import App from './App'
```

Nếu không export:

* file khác không dùng được component App
* React không render được.

---

## 3. Nếu xóa `export default` thì sao?

Ví dụ:

```jsx
function App() {
  return <h1>Hello</h1>
}
```

→ Khi chạy sẽ lỗi import:

```txt
does not provide an export named 'default'
```

vì `main.jsx` đang import:

```jsx
import App from './App'
```

nhưng App không được export nữa.

---

# Bài 0.2 — JSX là HTML “xịn hơn”

## JSX khác HTML ở đâu?

| HTML                  | JSX                   |
| --------------------- | --------------------- |
| class                 | className             |
| for                   | htmlFor               |
| Có thể không đóng thẻ | Bắt buộc đóng         |
| Viết HTML thuần       | HTML trong JavaScript |

---

# Bài 1 — Component UserProfile

```jsx
function UserProfile() {
  return (
    <div className="profile">
      <h1>Hồ sơ cá nhân</h1>

      <img src="photo.jpg" alt="Ảnh đại diện" />

      <table>
        <tbody>
          <tr>
            <td>Họ tên:</td>
            <td>DAT</td>
          </tr>

          <tr>
            <td>Email:</td>
            <td>fixyoungboy2245@gmail.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserProfile;
```

---

# Bài 2 — Component ProductInfo

```jsx
function ProductInfo() {
  return (
    <div className="product">
      <h2>iPhone 15</h2>

      <p className="price">25.000.000đ</p>

      <ul>
        <li>Màn hình: 6.1 inch</li>
        <li>Camera: 48MP</li>
        <li>Pin: 3349 mAh</li>
      </ul>

      <button>Mua ngay</button>
    </div>
  );
}

export default ProductInfo;
```

---

# Giải thích nhanh

## Vì sao dùng `className`?

Trong JavaScript:

* `class` là keyword đặc biệt
* React dùng `className` thay thế.

---

## Vì sao dùng `htmlFor`?

Trong JS:

* `for` là keyword của vòng lặp

nên React đổi thành:

```jsx
htmlFor
```

---

## Vì sao phải đóng thẻ?

JSX nghiêm ngặt hơn HTML.

Sai:

```jsx
<img>
<input>
```

Đúng:

```jsx
<img />
<input />
```

---

# Tổng kết React cơ bản

## React Component

Là function trả về JSX:

```jsx
function App() {
  return <h1>Hello</h1>
}
```

---

## JSX

Là:

* HTML + JavaScript
* dùng để tạo UI dễ hơn.



