# Todo App React — Giải thích tổng hợp

## Mục tiêu project

Xây dựng ứng dụng Todo App có:

✅ Thêm công việc
✅ Hiển thị danh sách
✅ Toggle hoàn thành
✅ Xóa todo
✅ Filter todos
✅ Đếm số việc
✅ Tách component

Nguồn bài học: 

---

# Kiến trúc project

```txt id="mjlwm0"
src/
├── components/
│   ├── TodoItem.jsx
│   └── TodoFilter.jsx
│
├── App.jsx
└── main.jsx
```

---

# App.jsx — Component chính

## State chính

```jsx id="4q0hwl"
const [todos, setTodos] = useState([]);
const [inputValue, setInputValue] = useState("");
const [filter, setFilter] = useState("all");
```

---

# Ý nghĩa từng state

| State      | Chức năng           |
| ---------- | ------------------- |
| todos      | Danh sách công việc |
| inputValue | Giá trị input       |
| filter     | Bộ lọc hiện tại     |

---

# CREATE — Thêm todo

## Hàm addTodo()

```jsx id="jlwmc1"
function addTodo() {
  if (inputValue.trim() === "") return;

  const newTodo = {
    id: Date.now(),
    text: inputValue,
    done: false
  };

  setTodos([...todos, newTodo]);

  setInputValue("");
}
```

---

# Luồng hoạt động

```txt id="jlwmc2"
Nhập text
    ↓
Click Thêm
    ↓
Tạo object todo mới
    ↓
setTodos()
    ↓
Re-render
    ↓
Todo xuất hiện
```

---

# Vì sao dùng `Date.now()`?

```jsx id="jlwmc3"
id: Date.now()
```

để tạo:

* id duy nhất
* dùng cho `key`.

---

# Keyboard Event — Enter

```jsx id="jlwmc4"
function handleKeyPress(event) {
  if (event.key === "Enter") {
    addTodo();
  }
}
```

---

# Gắn vào input

```jsx id="jlwmc5"
onKeyPress={handleKeyPress}
```

→ nhấn Enter sẽ thêm todo.

---

# READ — Hiển thị danh sách

```jsx id="jlwmc6"
filteredTodos.map(todo => (
  <TodoItem
    key={todo.id}
    todo={todo}
  />
))
```

---

# Vì sao cần key?

```jsx id="jlwmc7"
key={todo.id}
```

React dùng key để:

* tối ưu render
* biết item nào thay đổi.

---

# UPDATE — Toggle done

```jsx id="jlwmc8"
function toggleTodo(id) {
  setTodos(
    todos.map(todo =>
      todo.id === id
        ? { ...todo, done: !todo.done }
        : todo
    )
  );
}
```

---

# Giải thích

Nếu đúng todo:

```jsx id="jlwmc9"
{ ...todo, done: !todo.done }
```

→ đảo:

* true ↔ false

---

# DELETE — Xóa todo

```jsx id="jlwmca"
function deleteTodo(id) {
  setTodos(
    todos.filter(todo => todo.id !== id)
  );
}
```

---

# Filter todos

```jsx id="jlwmcb"
const filteredTodos = todos.filter(todo => {
  if (filter === "active") return !todo.done;

  if (filter === "completed") return todo.done;

  return true;
});
```

---

# Các chế độ filter

| Filter    | Kết quả    |
| --------- | ---------- |
| all       | Tất cả     |
| active    | Chưa xong  |
| completed | Hoàn thành |

---

# Đếm số việc

## Chưa hoàn thành

```jsx id="jlwmcc"
const activeCount =
  todos.filter(todo => !todo.done).length;
```

---

## Đã hoàn thành

```jsx id="jlwmcd"
const completedCount =
  todos.filter(todo => todo.done).length;
```

---

# TodoItem.jsx

## Component con

```jsx id="rgctxce"
function TodoItem({
  todo,
  onToggle,
  onDelete
})
```

---

# Props nhận được

| Props    | Chức năng    |
| -------- | ------------ |
| todo     | Dữ liệu todo |
| onToggle | Toggle done  |
| onDelete | Xóa todo     |

---

# Checkbox toggle

```jsx id="rgctxcf"
<input
  type="checkbox"
  checked={todo.done}
  onChange={() => onToggle(todo.id)}
/>
```

---

# Style khi hoàn thành

```jsx id="rgctxcg"
textDecoration:
  todo.done
    ? "line-through"
    : "none"
```

---

# TodoFilter.jsx

## Filter buttons

```jsx id="rgctxch"
const filters = [
  { key: "all", label: "Tất cả" },
  { key: "active", label: "Chưa xong" },
  { key: "completed", label: "Hoàn thành" }
];
```

---

# Active button

```jsx id="rgctxci"
background:
  filter === f.key
    ? "#3498db"
    : "#f0f0f0"
```

---

# React Flow trong Todo App

```txt id="rgctxcj"
User nhập
      ↓
setInputValue()

User click Thêm
      ↓
addTodo()
      ↓
setTodos()

React re-render
      ↓
Todo list cập nhật
```

---

# Kiến thức đã dùng

| Tier   | Nội dung        |
| ------ | --------------- |
| Tier 0 | Component       |
| Tier 1 | React Flow      |
| Tier 2 | JSX variables   |
| Tier 3 | Component split |
| Tier 4 | useState        |
| Tier 5 | Events          |
| Tier 6 | CRUD            |

---

# Tổng kết CRUD

## CREATE

```jsx id="rgctxck"
setTodos([...todos, newTodo])
```

---

## READ

```jsx id="rgctxcl"
todos.map(...)
```

---

## UPDATE

```jsx id="rgctxcm"
todos.map(todo =>
  todo.id === id
    ? updatedTodo
    : todo
)
```

---

## DELETE

```jsx id="rgctxcn"
todos.filter(todo =>
  todo.id !== id
)
```

