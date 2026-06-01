# Bài 6.1 — Render danh sách

## Render list bằng `.map()`

```jsx id="ynhqga"
items.map(item => (
  <div>{item.name}</div>
))
```

React sẽ:

* lặp qua từng phần tử
* tạo JSX cho từng item.

---

# Ví dụ hiển thị STT

```jsx id="bl3stx"
{
  students.map((student, index) => (
    <div key={student.id}>
      {index + 1}. {student.name}
    </div>
  ))
}
```

---

# Highlight sinh viên >= 20 tuổi

```jsx id="p63o03"
{
  students.map(student => (
    <div
      key={student.id}
      style={{
        color:
          student.age >= 20
            ? "green"
            : "black"
      }}
    >
      {student.name} - {student.age}
    </div>
  ))
}
```

---

# Tính tuổi trung bình

```jsx id="n47j7y"
const averageAge =
  students.reduce(
    (sum, student) => sum + student.age,
    0
  ) / students.length;
```

---

# Bài 6.2 — CREATE (Thêm phần tử)

## State mảng

```jsx id="9s3r21"
const [items, setItems] = useState([]);
```

---

# Thêm phần tử mới

```jsx id="v1qkq5"
setItems([...items, newItem]);
```

---

# Vì sao dùng `...items`?

```txt id="pk3t5n"
items cũ
   +
new item
   =
mảng mới
```

React cần:

* tạo mảng mới
* không sửa trực tiếp state cũ.

---

# Ví dụ hoàn chỉnh

```jsx id="g1tfuv"
import { useState } from "react";

function CreateItem() {
  const [items, setItems] = useState([]);
  const [newName, setNewName] = useState("");
  const [success, setSuccess] = useState("");

  function handleAdd() {
    if (newName.trim() === "") return;

    const newItem = {
      id: Date.now(),
      name: newName
    };

    setItems([...items, newItem]);

    setSuccess("✅ Đã thêm thành công!");

    setNewName("");
  }

  return (
    <div>
      <input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />

      <button onClick={handleAdd}>
        Thêm
      </button>

      <p>{success}</p>

      {
        items.map(item => (
          <div key={item.id}>
            {item.name}
          </div>
        ))
      }
    </div>
  );
}

export default CreateItem;
```

---

# Bài 6.3 — DELETE (Xóa)

## Xóa bằng filter()

```jsx id="9x0yiz"
setItems(
  items.filter(item => item.id !== id)
);
```

---

# Cách hoạt động

```txt id="3o71uo"
Giữ lại:
item.id !== id
```

→ item cần xóa sẽ biến mất khỏi mảng.

---

# Ví dụ confirm trước khi xóa

```jsx id="d34aq8"
function handleDelete(id) {
  const confirmDelete =
    window.confirm("Bạn có chắc?");

  if (!confirmDelete) return;

  setItems(
    items.filter(item => item.id !== id)
  );
}
```

---

# Hiển thị item vừa xóa

```jsx id="wl5pnk"
const deletedItem =
  items.find(item => item.id === id);

alert("Đã xóa " + deletedItem.name);
```

---

# Bài 6.4 — UPDATE (Sửa)

## Update bằng map()

```jsx id="9whn3u"
setItems(
  items.map(item =>
    item.id === editingId
      ? { ...item, name: editName }
      : item
  )
);
```

---

# Ý nghĩa

```txt id="ckv8q5"
Nếu đúng item cần sửa
    ↓
Tạo object mới

Nếu không
    ↓
Giữ nguyên
```

---

# Vì sao dùng `{ ...item }`?

```jsx id="jlwm4u"
{ ...item, name: editName }
```

copy:

* id
* age
* field khác

rồi chỉ sửa:

* `name`

---

# Enter và Escape

```jsx id="6dyjlwm"
if (event.key === "Enter") {
  saveEdit();
}

if (event.key === "Escape") {
  cancelEdit();
}
```

---

# CRUD là gì?

| CRUD   | Ý nghĩa  |
| ------ | -------- |
| Create | Thêm     |
| Read   | Hiển thị |
| Update | Sửa      |
| Delete | Xóa      |

---

# Tổng kết CRUD React

## CREATE

```jsx id="i4ddyk"
setItems([...items, newItem]);
```

---

## READ

```jsx id="jlwmb0"
items.map(item => ...)
```

---

## UPDATE

```jsx id="jlwmb1"
items.map(item =>
  item.id === id
    ? updatedItem
    : item
)
```

---

## DELETE

```jsx id="jlwmb2"
items.filter(item =>
  item.id !== id
)
```

---

# React Data Flow

```txt id="r9qgh6"
User action
      ↓
setState()
      ↓
State mới
      ↓
Re-render
      ↓
List UI cập nhật
```


