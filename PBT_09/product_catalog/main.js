const products = [
  { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200", rating: 4.5, inStock: true },
  { id: 2, name: "Samsung S24", price: 22990000, category: "phone", image: "https://placehold.co/200", rating: 4.4, inStock: true },
  { id: 3, name: "Pixel 9", price: 19990000, category: "phone", image: "https://placehold.co/200", rating: 4.6, inStock: true },
  { id: 4, name: "MacBook Pro", price: 45990000, category: "laptop", image: "https://placehold.co/200", rating: 4.8, inStock: true },
  { id: 5, name: "Dell XPS 15", price: 35990000, category: "laptop", image: "https://placehold.co/200", rating: 4.7, inStock: true },
  { id: 6, name: "ThinkPad X1", price: 32990000, category: "laptop", image: "https://placehold.co/200", rating: 4.5, inStock: false },
  { id: 7, name: "iPad Air", price: 16990000, category: "tablet", image: "https://placehold.co/200", rating: 4.6, inStock: true },
  { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", image: "https://placehold.co/200", rating: 4.2, inStock: true },
  { id: 9, name: "Galaxy Tab S9", price: 18990000, category: "tablet", image: "https://placehold.co/200", rating: 4.4, inStock: false },
  { id: 10, name: "AirPods Pro", price: 6990000, category: "accessory", image: "https://placehold.co/200", rating: 4.3, inStock: true },
  { id: 11, name: "Galaxy Buds", price: 3490000, category: "accessory", image: "https://placehold.co/200", rating: 4.1, inStock: true },
  { id: 12, name: "Apple Watch", price: 9990000, category: "accessory", image: "https://placehold.co/200", rating: 4.6, inStock: true }
];

let currentCategory = "all";
let currentSearch = "";
let currentSort = "default";
let cartCount = 0;

const app = document.createElement("div");
app.className = "app";
document.body.appendChild(app);

const header = document.createElement("div");
header.className = "header";

const title = document.createElement("h1");
title.textContent = "Product Store";

const cart = document.createElement("div");
cart.className = "cart";
cart.textContent = "🛒";

const badge = document.createElement("span");
badge.className = "badge";
badge.textContent = "0";

cart.appendChild(badge);
header.appendChild(title);
header.appendChild(cart);
app.appendChild(header);

const controls = document.createElement("div");
controls.className = "controls";

const searchInput = document.createElement("input");
searchInput.placeholder = "Tìm sản phẩm...";

const sortSelect = document.createElement("select");

const sortOptions = [
  { value: "default", text: "Mặc định" },
  { value: "price-asc", text: "Giá tăng" },
  { value: "price-desc", text: "Giá giảm" },
  { value: "name-az", text: "Tên A-Z" },
  { value: "rating-desc", text: "Đánh giá cao nhất" }
];

sortOptions.forEach(optionData => {
  const option = document.createElement("option");
  option.value = optionData.value;
  option.textContent = optionData.text;
  sortSelect.appendChild(option);
});

const darkBtn = document.createElement("button");
darkBtn.textContent = "🌙 Dark Mode";

controls.appendChild(searchInput);
controls.appendChild(sortSelect);
controls.appendChild(darkBtn);
app.appendChild(controls);

const categories = document.createElement("div");
categories.className = "categories";
app.appendChild(categories);

const productGrid = document.createElement("div");
productGrid.className = "product-grid";
app.appendChild(productGrid);

function formatMoney(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

function renderCategories() {
  const categoryList = ["all", "phone", "laptop", "tablet", "accessory"];

  categoryList.forEach(category => {
    const btn = document.createElement("button");
    btn.textContent = category === "all" ? "All" : category;
    btn.dataset.category = category;

    if (category === currentCategory) {
      btn.classList.add("active");
    }

    categories.appendChild(btn);
  });
}

function filterByCategory(productList) {
  if (currentCategory === "all") {
    return productList;
  }

  return productList.filter(product => product.category === currentCategory);
}

function searchProducts(productList) {
  return productList.filter(product =>
    product.name.toLowerCase().includes(currentSearch.toLowerCase())
  );
}

function sortProducts(productList) {
  const newList = [...productList];

  if (currentSort === "price-asc") {
    newList.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-desc") {
    newList.sort((a, b) => b.price - a.price);
  } else if (currentSort === "name-az") {
    newList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (currentSort === "rating-desc") {
    newList.sort((a, b) => b.rating - a.rating);
  }

  return newList;
}

function renderProducts() {
  productGrid.textContent = "";

  let result = products;
  result = filterByCategory(result);
  result = searchProducts(result);
  result = sortProducts(result);

  if (result.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Không tìm thấy sản phẩm.";
    productGrid.appendChild(empty);
    return;
  }

  result.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = product.id;

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    const name = document.createElement("h3");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = formatMoney(product.price);

    const rating = document.createElement("p");
    rating.textContent = "⭐ " + product.rating;

    const stock = document.createElement("p");
    stock.textContent = product.inStock ? "Còn hàng" : "Hết hàng";
    stock.className = product.inStock ? "stock" : "out";

    const addBtn = document.createElement("button");
    addBtn.textContent = "Thêm giỏ";
    addBtn.className = "add-cart";

    if (!product.inStock) {
      addBtn.disabled = true;
      addBtn.textContent = "Hết hàng";
    }

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(rating);
    card.appendChild(stock);
    card.appendChild(addBtn);

    productGrid.appendChild(card);
  });
}

function showModal(product) {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  const modal = document.createElement("div");
  modal.className = "modal";

  const img = document.createElement("img");
  img.src = product.image;

  const title = document.createElement("h2");
  title.textContent = product.name;

  const price = document.createElement("p");
  price.textContent = "Giá: " + formatMoney(product.price);

  const category = document.createElement("p");
  category.textContent = "Danh mục: " + product.category;

  const rating = document.createElement("p");
  rating.textContent = "Đánh giá: " + product.rating;

  const stock = document.createElement("p");
  stock.textContent = product.inStock ? "Còn hàng" : "Hết hàng";

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Đóng";
  closeBtn.className = "close-btn";

  modal.appendChild(img);
  modal.appendChild(title);
  modal.appendChild(price);
  modal.appendChild(category);
  modal.appendChild(rating);
  modal.appendChild(stock);
  modal.appendChild(closeBtn);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  closeBtn.addEventListener("click", function () {
    overlay.remove();
  });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.remove();
    }
  });
}

searchInput.addEventListener("input", function () {
  currentSearch = searchInput.value;
  renderProducts();
});

sortSelect.addEventListener("change", function () {
  currentSort = sortSelect.value;
  renderProducts();
});

categories.addEventListener("click", function (e) {
  if (e.target.tagName !== "BUTTON") return;

  currentCategory = e.target.dataset.category;

  const buttons = categories.querySelectorAll("button");
  buttons.forEach(btn => btn.classList.remove("active"));
  e.target.classList.add("active");

  renderProducts();
});

productGrid.addEventListener("click", function (e) {
  const card = e.target.closest(".card");
  if (!card) return;

  const id = Number(card.dataset.id);
  const product = products.find(item => item.id === id);

  if (e.target.classList.contains("add-cart")) {
    e.stopPropagation();
    cartCount++;
    badge.textContent = cartCount;
    return;
  }

  showModal(product);
});

darkBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    darkBtn.textContent = "☀️ Light Mode";
  } else {
    darkBtn.textContent = "🌙 Dark Mode";
  }
});

renderCategories();
renderProducts();