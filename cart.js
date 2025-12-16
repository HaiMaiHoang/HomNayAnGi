document.addEventListener('DOMContentLoaded', function() {
    const cartItemsList = document.querySelector('.cart-items-list');
    const shippingPrice = 15000;
    const freeShippingThreshold = 100000;

    // --- MAIN RENDER FUNCTION ---
    function renderCart() {
        // BƯỚC CHẠY 1: Lấy giỏ hàng từ LocalStorage
        let cart = JSON.parse(localStorage.getItem('homnayangi_cart')) || [];
        cartItemsList.innerHTML = ''; 

        let subtotal = 0;

        if (cart.length === 0) {
            // Xử lý giỏ hàng trống
            document.querySelector('.checkout-btn').style.pointerEvents = 'none'; // Vô hiệu hóa nút Thanh toán
            document.querySelector('.checkout-btn').style.opacity = '0.5';
            cartItemsList.innerHTML = '<p style="text-align: center; margin-top: 50px; font-size: 1.2em; color: var(--text-color);">Giỏ hàng của bạn đang trống.</p>';
        } else {
            document.querySelector('.checkout-btn').style.pointerEvents = 'auto'; // Kích hoạt nút Thanh toán
            document.querySelector('.checkout-btn').style.opacity = '1';
            
            // BƯỚC CHẠY 2: Lặp qua từng sản phẩm và tạo HTML
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity; 
                subtotal += itemTotal; // Tính tổng tạm tính

                // Tạo cấu trúc HTML cho từng món
                const itemHTML = `
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}" class="item-thumbnail">
                        <div class="item-details">
                            <h3>${item.name}</h3>
                            <p class="item-description">${item.description || ''}</p>
                        </div>
                        <div class="item-quantity">
                            <button class="qty-btn minus" data-id="${item.id}">-</button>
                            <input type="number" value="${item.quantity}" min="1" class="qty-input" data-id="${item.id}" readonly>
                            <button class="qty-btn plus" data-id="${item.id}">+</button>
                        </div>
                        <div class="item-actions">
                            <span class="item-price">${formatCurrency(itemTotal)}</span>
                            <a href="#" class="item-remove" data-id="${item.id}"><i class="fas fa-trash-alt"></i> Xóa</a>
                        </div>
                    </div>
                `;
                cartItemsList.innerHTML += itemHTML;
            });
        }
        
        // BƯỚC CHẠY 3: Cập nhật tóm tắt và số lượng giỏ hàng trên Header
        updateSummary(subtotal);
        updateCartCountDisplay(cart.length);
        addCartEventListeners(); // Thêm lại sự kiện sau khi render xong
    }

    // --- SUMMARY UPDATE FUNCTION ---
    function updateSummary(subtotal) {
        // BƯỚC CHẠY 4: Tính toán phí vận chuyển (Miễn phí nếu Subtotal >= 100.000đ)
        const calculatedShipping = subtotal >= freeShippingThreshold ? 0 : shippingPrice;
        const total = subtotal + calculatedShipping;
        
        // Cập nhật các element Tóm tắt (sử dụng formatCurrency từ utils.js)
        const summarySubtotalElement = document.querySelector('.summary-subtotal-price');
        if(summarySubtotalElement) {
            summarySubtotalElement.textContent = formatCurrency(subtotal);
        }
        
        const summaryShippingElement = document.querySelector('.summary-shipping-price');
        if(summaryShippingElement) {
            summaryShippingElement.textContent = calculatedShipping === 0 ? 'Miễn phí' : formatCurrency(calculatedShipping);
            summaryShippingElement.classList.toggle('free-shipping', calculatedShipping === 0);
        }

        const summaryTotalPrice = document.querySelector('.total-price');
        if(summaryTotalPrice) {
            summaryTotalPrice.textContent = formatCurrency(total);
        }

        // Cập nhật ghi chú vận chuyển
        const shippingNoteElement = document.querySelector('.shipping-note');
        if (shippingNoteElement) {
            if (calculatedShipping === 0) {
                 shippingNoteElement.innerHTML = '<i class="fas fa-truck"></i> Đã miễn phí vận chuyển!';
                 shippingNoteElement.style.color = 'green';
            } else {
                 shippingNoteElement.innerHTML = `<i class="fas fa-truck"></i> Miễn phí vận chuyển cho đơn hàng trên ${formatCurrency(freeShippingThreshold)}`;
                 shippingNoteElement.style.color = 'gray';
            }
        }
    }

    // --- EVENT LISTENERS (Tăng/Giảm/Xóa) ---
    function addCartEventListeners() {
        // BƯỚC CHẠY 5: Gắn sự kiện cho nút Tăng/Giảm
        document.querySelectorAll('.qty-btn').forEach(button => {
            button.onclick = function() {
                const id = this.dataset.id;
                const action = this.classList.contains('plus') ? 'increase' : 'decrease';
                updateCartQuantity(id, action);
            };
        });

        // BƯỚC CHẠY 6: Gắn sự kiện cho nút Xóa
        document.querySelectorAll('.item-remove').forEach(button => {
            button.onclick = function(e) {
                e.preventDefault();
                const id = this.dataset.id;
                if (confirm('Bạn có chắc chắn muốn xóa món này khỏi giỏ hàng?')) {
                    removeItemFromCart(id);
                }
            };
        });
    }

    // --- LOCALSTORAGE HANDLERS ---
    function updateCartQuantity(id, action) {
        let cart = JSON.parse(localStorage.getItem('homnayangi_cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === id);

        if (itemIndex > -1) {
            if (action === 'increase') {
                cart[itemIndex].quantity++;
            } else if (action === 'decrease') {
                cart[itemIndex].quantity--;
                
                // Xóa mục khi số lượng về 0
                if (cart[itemIndex].quantity === 0) {
                    cart.splice(itemIndex, 1);
                }
            }
        }

        // BƯỚC CHẠY 7: Lưu thay đổi vào LocalStorage và render lại giỏ
        localStorage.setItem('homnayangi_cart', JSON.stringify(cart));
        renderCart(); 
    }

    function removeItemFromCart(id) {
        let cart = JSON.parse(localStorage.getItem('homnayangi_cart')) || [];
        cart = cart.filter(item => item.id !== id); 

        // BƯỚC CHẠY 8: Lưu thay đổi vào LocalStorage và render lại giỏ
        localStorage.setItem('homnayangi_cart', JSON.stringify(cart));
        renderCart(); 
    }

    // BƯỚC CHẠY CUỐI: Bắt đầu render khi trang tải xong
    renderCart(); 
});