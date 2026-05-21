# Phan A:
## Cau A1:
# Phân tích Grid Layout Bootstrap

HTML:

```html
<div class="col-12 col-md-6 col-lg-3">
```

Ý nghĩa:

* `col-12` → chiếm toàn bộ 12 cột
* `col-md-6` → từ `md` trở lên chiếm 6/12 cột
* `col-lg-3` → từ `lg` trở lên chiếm 3/12 cột

---

# Bảng kết quả

| Kích thước     | `< 768px`    | `768px - 991px` | `≥ 992px`    |
| -------------- | ------------ | --------------- | ------------ |
| Số cột mỗi box | 12           | 6               | 3            |
| Box layout     | 1 box / hàng | 2 box / hàng    | 4 box / hàng |

---

# 1. Mobile `< 768px`

Dùng:

```html
col-12
```

→ mỗi box chiếm toàn bộ chiều ngang.

## Layout

```text
+------------+
|   Box 1    |
+------------+

+------------+
|   Box 2    |
+------------+

+------------+
|   Box 3    |
+------------+

+------------+
|   Box 4    |
+------------+
```

* 1 cột
* 4 hàng

---

# 2. Tablet `768px - 991px`

Dùng:

```html
col-md-6
```

→ mỗi box chiếm 6/12 cột = 50%.

## Layout

```text
+-----------+-----------+
|   Box 1   |   Box 2   |
+-----------+-----------+

+-----------+-----------+
|   Box 3   |   Box 4   |
+-----------+-----------+
```

* 2 cột
* 2 hàng

---

# 3. Desktop `≥ 992px`

Dùng:

```html
col-lg-3
```

→ mỗi box chiếm 3/12 cột = 25%.

## Layout

```text
+------+------+------+------+
| Box1 | Box2 | Box3 | Box4 |
+------+------+------+------+
```

* 4 cột
* 1 hàng

---

# Câu hỏi thêm

## `col-md-6` nghĩa là gì?

* `md` = medium breakpoint (`≥ 768px`)
* `6` = chiếm 6 trên 12 cột Bootstrap Grid

Tức là:

```text
6/12 = 50%
```

→ mỗi hàng chứa được 2 box.

---

# Tại sao không cần viết `col-sm-12`?

Vì Bootstrap dùng Mobile-First.

Nếu đã có:

```html
col-12
```

thì mặc định:

* mobile và màn hình nhỏ đều dùng `12 cột`
* không cần viết thêm `col-sm-12`

Bootstrap sẽ tự kế thừa lên cho tới khi gặp breakpoint mới (`md`, `lg`...).
## Cau A2:
# 1. Giải thích `d-none d-md-block`

```html
<div class="d-none d-md-block"></div>
```

## Ý nghĩa

### `d-none`

```css
display: none;
```

→ Ẩn element.

---

### `d-md-block`

Từ breakpoint `md` (`≥ 768px`) trở lên:

```css
display: block;
```

→ Hiện element lại.

---

# Kết quả

| Kích thước màn hình | Hiển thị? |
| ------------------- | --------- |
| `< 768px`           | ❌ Ẩn      |
| `≥ 768px`           | ✅ Hiện    |

---

# Use case

Thường dùng để:

* ẩn sidebar trên mobile;
* ẩn quảng cáo;
* ẩn menu desktop trên điện thoại.

---

# 2. 5 Spacing Utilities Bootstrap

Bootstrap dùng:

```text
m = margin
p = padding
```

và:

```text
t = top
b = bottom
s = start (left)
e = end (right)
x = left + right
y = top + bottom
```

---

## Ví dụ 1 — `mt-3`

```html
<div class="mt-3"></div>
```

→ margin-top.

```css
margin-top: 1rem;
```

---

## Ví dụ 2 — `px-4`

```html
<div class="px-4"></div>
```

→ padding trái + phải.

```css
padding-left: 1.5rem;
padding-right: 1.5rem;
```

---

## Ví dụ 3 — `mb-auto`

```html
<div class="mb-auto"></div>
```

→ margin-bottom tự động.

Thường dùng với flexbox.

---

## Ví dụ 4 — `py-2`

```html
<div class="py-2"></div>
```

→ padding trên + dưới.

```css
padding-top: 0.5rem;
padding-bottom: 0.5rem;
```

---

## Ví dụ 5 — `ms-5`

```html
<div class="ms-5"></div>
```

→ margin-left.

```css
margin-left: 3rem;
```

---

# 3. Khác nhau giữa `.container`, `.container-fluid`, `.container-md`

---

# `.container`

```html
<div class="container"></div>
```

## Đặc điểm

* Có max-width theo breakpoint.
* Responsive.
* Căn giữa.

## Ví dụ

| Screen  | Width   |
| ------- | ------- |
| Mobile  | 100%    |
| Desktop | ~1140px |

## Use case

Trang web thông thường.

---

# `.container-fluid`

```html
<div class="container-fluid"></div>
```

## Đặc điểm

* Luôn chiếm 100% chiều ngang màn hình.

## Use case

* banner;
* hero section;
* full-width layout.

---

# `.container-md`

```html
<div class="container-md"></div>
```

## Đặc điểm

* Mobile: full width.
* Từ `md` (`≥768px`) trở lên:

  * có max-width như `.container`.

## Use case

Muốn mobile full width nhưng tablet/desktop có giới hạn chiều rộng.

---

# So sánh nhanh

| Class              | Mobile     | Desktop                 |
| ------------------ | ---------- | ----------------------- |
| `.container`       | responsive | có max-width            |
| `.container-fluid` | full width | full width              |
| `.container-md`    | full width | max-width từ md trở lên |

