# Bài 2.1 — Hiển thị biến trong JSX

## Giải thích `{}` trong JSX

Trong JSX:

```jsx id="ec5vrv"
<h1>{ten}</h1>
```

`{}` dùng để nhúng JavaScript vào HTML.

Có thể dùng:

* biến
* phép tính
* gọi hàm
* ternary
* map()

---

# Ví dụ

```jsx id="3o22j9"
function SimpleVariables() {
  const ten = "Minh";
  const tuoi = 20;

  return (
    <div>
      <h1>{ten}</h1>
      <p>{tuoi}</p>
      <p>Năm sau: {tuoi + 1}</p>
    </div>
  );
}
```

---

# Thử thách 1 — Thông tin cá nhân

```jsx id="9yzvuj"
function PersonalInfo() {
  const ten = "Đạt";
  const tuoi = 19;
  const queQuan = "Hà Nội";

  return (
    <div>
      <h1>Thông tin cá nhân</h1>

      <p>Họ tên: {ten}</p>
      <p>Tuổi: {tuoi}</p>
      <p>Quê quán: {queQuan}</p>
    </div>
  );
}

export default PersonalInfo;
```

---

# Thử thách 2 — Chào buổi sáng/chiều/tối

```jsx id="zkcs8d"
function Greeting() {
  const hour = new Date().getHours();

  return (
    <div>
      <h1>
        {
          hour < 12
            ? "Chào buổi sáng"
            : hour < 18
            ? "Chào buổi chiều"
            : "Chào buổi tối"
        }
      </h1>
    </div>
  );
}

export default Greeting;
```

---

# Thử thách 3 — Tính BMI

Công thức BMI:

BMI = \frac{c\hat{a}n\ n\ặng}{chi\ều\ cao^2}

```jsx id="sxkty0"
function BMI() {
  const canNang = 70;
  const chieuCao = 1.75;

  const bmi = canNang / (chieuCao * chieuCao);

  return (
    <div>
      <h1>Tính BMI</h1>

      <p>Cân nặng: {canNang} kg</p>
      <p>Chiều cao: {chieuCao} m</p>

      <h2>BMI: {bmi.toFixed(2)}</h2>
    </div>
  );
}

export default BMI;
```

---

# Bài 2.2 — Conditional Rendering

## 1. Ternary

Cú pháp:

```jsx id="6qccfz"
condition ? "Đúng" : "Sai"
```

Ví dụ:

```jsx id="1uhgdc"
<p>{score >= 5 ? "Đậu" : "Rớt"}</p>
```

---

# Ví dụ Online / Offline

```jsx id="j7c4y7"
function OnlineStatus() {
  const isOnline = true;

  return (
    <div>
      <h1>
        {isOnline ? "🟢 Online" : "🔴 Offline"}
      </h1>
    </div>
  );
}

export default OnlineStatus;
```

---

# 2. && (Hiện hoặc không hiện)

Ví dụ:

```jsx id="d8ff7i"
{hasNotification && <div>Có thông báo</div>}
```

Nếu:

```txt id="l0hf6x"
hasNotification = true
```

→ hiện `<div>`

Nếu:

```txt id="6nh3c3"
false
```

→ không hiện gì.

---

# Ví dụ hiện/ẩn menu

```jsx id="2p8x6i"
function MenuDemo() {
  const isLoggedIn = true;

  return (
    <div>
      <h1>Trang chủ</h1>

      {isLoggedIn && (
        <ul>
          <li>Profile</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      )}
    </div>
  );
}

export default MenuDemo;
```

---

# Ví dụ Hết hàng

```jsx id="s4k0v6"
function ProductStock() {
  const stock = 0;

  return (
    <div>
      <h2>iPhone 15</h2>

      {
        stock > 0
          ? <p>Còn hàng</p>
          : <p style={{ color: "red" }}>Hết hàng</p>
      }
    </div>
  );
}

export default ProductStock;
```

---

# Bài 2.3 — Render danh sách

## `.map()` dùng để render nhiều phần tử

```jsx id="jlwmj5"
const fruits = ["Táo", "Cam", "Nho"];
```

```jsx id="jlwmj6"
{
  fruits.map((fruit) => (
    <li>{fruit}</li>
  ))
}
```

---

# Ví dụ sản phẩm

```jsx id="9kqqgo"
function ProductList() {
  const products = [
    { id: 1, name: "iPhone", price: 25000000 },
    { id: 2, name: "Laptop", price: 18000000 },
    { id: 3, name: "Tai nghe", price: 500000 }
  ];

  const total = products.reduce(
    (sum, product) => sum + product.price,
    0
  );

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>

      {
        products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>

            <p
              style={{
                color: product.price > 1000000
                  ? "red"
                  : "black"
              }}
            >
              {product.price.toLocaleString()}đ
            </p>
          </div>
        ))
      }

      <h2>
        Tổng tiền:
        {total.toLocaleString()}đ
      </h2>
    </div>
  );
}

export default ProductList;
```

---

# Vì sao cần `key`?

```jsx id="sxowbh"
<div key={product.id}>
```

React dùng `key` để:

* nhận biết phần tử nào thay đổi
* tối ưu re-render.

---

# Không nên dùng index

```jsx id="smij8z"
key={index}
```

vì khi:

* xóa
* thêm
* đổi vị trí

React dễ render sai.

---

# Tổng kết quan trọng

## Nhúng JS vào JSX

```jsx id="1q00y5"
{variable}
```

---

## Điều kiện

```jsx id="td0z8o"
condition ? A : B
```

---

## Hiện / ẩn

```jsx id="5k9uvg"
condition && <Component />
```

---

## Render danh sách

```jsx id="tjlwmr"
items.map(item => (
  <div key={item.id}>
    {item.name}
  </div>
))
```




