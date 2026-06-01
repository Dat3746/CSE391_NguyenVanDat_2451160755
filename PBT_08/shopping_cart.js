function createCart() {
    let items = [];
    let discountType = null;
    let discountValue = 0;

    return {
        // Thêm sản phẩm
        addItem(product, quantity = 1) {
            const existing = items.find(item => item.id === product.id);

            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({
                    ...product,
                    quantity
                });
            }
        },

        // Xóa sản phẩm
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            const item = items.find(item => item.id === productId);

            if (item) {
                if (newQuantity <= 0) {
                    this.removeItem(productId);
                } else {
                    item.quantity = newQuantity;
                }
            }
        },

        // Tổng tiền trước giảm giá
        getTotal() {
            return items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
        },

        // Áp dụng mã giảm giá
        applyDiscount(code) {
            switch (code) {
                case "SALE10":
                    discountType = "percent";
                    discountValue = 10;
                    break;

                case "SALE20":
                    discountType = "percent";
                    discountValue = 20;
                    break;

                case "FREESHIP":
                    discountType = "fixed";
                    discountValue = 30000;
                    break;

                default:
                    console.log("Mã giảm giá không hợp lệ!");
            }
        },

        // In giỏ hàng
        printCart() {
            if (items.length === 0) {
                console.log("Giỏ hàng trống!");
                return;
            }

            const tableData = items.map((item, index) => ({
                "#": index + 1,
                "Sản phẩm": item.name,
                "SL": item.quantity,
                "Đơn giá": item.price.toLocaleString("vi-VN"),
                "Tổng": (item.price * item.quantity).toLocaleString("vi-VN")
            }));

            console.table(tableData);

            let total = this.getTotal();

            if (discountType === "percent") {
                total -= total * discountValue / 100;
            } else if (discountType === "fixed") {
                total -= discountValue;
            }

            console.log(
                "Tổng cộng:",
                total.toLocaleString("vi-VN") + "đ"
            );
        },

        // Tổng số lượng sản phẩm
        getItemCount() {
            return items.reduce(
                (sum, item) => sum + item.quantity,
                0
            );
        },

        // Xóa toàn bộ giỏ hàng
        clearCart() {
            items = [];
            discountType = null;
            discountValue = 0;
        }
    };
}

// ================= TEST =================

const cart = createCart();

cart.addItem(
    { id: 1, name: "iPhone 16", price: 25990000 },
    1
);

cart.addItem(
    { id: 3, name: "AirPods Pro", price: 6990000 },
    2
);

cart.addItem(
    { id: 1, name: "iPhone 16", price: 25990000 },
    1
);

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount());

cart.removeItem(3);

console.log("Sau xóa:", cart.getItemCount());