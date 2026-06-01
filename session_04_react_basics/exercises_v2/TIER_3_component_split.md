# Bài 3.1 — Tại sao phải chia component?

## Vấn đề khi viết tất cả trong 1 file

Ví dụ:

```jsx id="3gb1wf"
function App() {
  return (
    <div>
      <Header />
      <Products />
      <Footer />
    </div>
  )
}
```

Nếu mọi thứ viết chung:

* file rất dài
* khó đọc
* khó sửa
* khó tái sử dụng.

---

# Giải pháp: Chia component

## Ví dụ

### Header.jsx

```jsx id="t6knn2"
function Header() {
  return (
    <header>
      <h1>Website</h1>
    </header>
  )
}

export default Header;
```

---

### Footer.jsx

```jsx id="vr6wgt"
function Footer() {
  return (
    <footer>
      <p>© 2026 Company</p>
    </footer>
  )
}

export default Footer;
```

---

### App.jsx

```jsx id="jlwmze"
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <div>
      <Header />

      <main>
        <h2>Nội dung</h2>
      </main>

      <Footer />
    </div>
  )
}

export default App;
```

---

# Lợi ích của việc chia component

| Không chia       | Có chia              |
| ---------------- | -------------------- |
| File rất dài     | File nhỏ gọn         |
| Khó tìm code     | Dễ sửa               |
| Copy-paste nhiều | Tái sử dụng          |
| Khó teamwork     | Mỗi người làm 1 phần |

---

# Bài 3.2 — Tách ProductCard

## Cấu trúc thư mục

```txt id="0n2h8p"
src/
 ├── components/
 │    └── ProductCard.jsx
 │
 ├── App.jsx
 └── main.jsx
```

---

# ProductCard.jsx

```jsx id="ecvpnl"
function ProductCard({ name, price, image }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        margin: "10px",
        width: "220px"
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: "100%",
          borderRadius: "4px"
        }}
      />

      <h3>{name}</h3>

      <p
        style={{
          color: "red",
          fontWeight: "bold"
        }}
      >
        {price}đ
      </p>

      <button>
        Thêm vào giỏ
      </button>
    </div>
  );
}

export default ProductCard;
```

---

# App.jsx

```jsx id="1jhhqk"
import ProductCard from "./components/ProductCard";

function App() {
  const products = [
    {
      id: 1,
      name: "iPhone 15",
      price: "25.000.000",
      image: "https://via.placeholder.com/200"
    },

    {
      id: 2,
      name: "Samsung S24",
      price: "22.000.000",
      image: "https://via.placeholder.com/200"
    },

    {
      id: 3,
      name: "Xiaomi 14",
      price: "15.000.000",
      image: "https://via.placeholder.com/200"
    }
  ];

  return (
    <div>
      <h1>Cửa hàng điện thoại</h1>

      <div style={{ display: "flex" }}>
        {
          products.map(product => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
```

---

# Bài 3.3 — Props là gì?

## Props = dữ liệu truyền từ cha → con

---

# Component con

```jsx id="y5kwe9"
function Greeting({ name, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{age}</p>
    </div>
  );
}
```

---

# Component cha

```jsx id="8r9n8f"
<Greeting name="Minh" age={20} />
```

---

# React sẽ truyền dữ liệu

```txt id="ft6c8x"
name = "Minh"
age = 20
```

vào component con.

---

# Props nhận bằng destructuring

```jsx id="s7yrn4"
function Greeting({ name, age })
```

tương đương:

```jsx id="u71zbi"
function Greeting(props)
```

---

# Ví dụ UserCard

```jsx id="cl4z5m"
function UserCard({ name, email, avatar }) {
  return (
    <div>
      <img src={avatar} alt={name} />

      <h2>{name}</h2>

      <p>{email}</p>
    </div>
  );
}

export default UserCard;
```

---

# Dùng UserCard

```jsx id="1jlc53"
<UserCard
  name="Minh"
  email="minh@gmail.com"
  avatar="https://via.placeholder.com/100"
/>
```

---

# Props có thể là gì?

## String

```jsx id="4mhtx0"
name="Minh"
```

---

## Number

```jsx id="g88hq6"
age={20}
```

---

## Boolean

```jsx id="fy00sm"
isStudent={true}
```

---

## Array

```jsx id="94ybql"
hobbies={["Code", "Game"]}
```

---

## Object

```jsx id="pqvg77"
address={{
  city: "Hà Nội"
}}
```

---




