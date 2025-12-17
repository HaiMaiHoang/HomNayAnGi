// --- MODAL HANDLERS (Chỉ dùng riêng cho trang Checkout) ---
function showModal(modalId) {
    // BƯỚC CHẠY MODAL 1: Hiển thị lớp phủ và modal được chọn
    document.getElementById('modal-container').style.display = 'flex';
    document.getElementById('confirm-modal').style.display = 'none';
    document.getElementById('success-modal').style.display = 'none';

    document.getElementById(modalId).style.display = 'block';
}

function hideAllModals() {
    // BƯỚC CHẠY MODAL 2: Ẩn tất cả modal
    document.getElementById('modal-container').style.display = 'none';
    document.getElementById('confirm-modal').style.display = 'none';
    document.getElementById('success-modal').style.display = 'none';
}


document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo các biến/hằng số
    const checkoutItemsList = document.getElementById('checkout-items-list');
    const noteCheckbox = document.getElementById('add-note');
    const deliveryNoteArea = document.getElementById('delivery-note');
    const confirmCheckoutBtn = document.getElementById('confirm-checkout-btn');
    
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryShipping = document.getElementById('summary-shipping');
    const summaryDiscount = document.getElementById('summary-discount');
    const summaryTotal = document.getElementById('summary-total');
    
    const confirmPaymentBtn = document.getElementById('confirm-payment-btn');
    const cancelPaymentBtn = document.getElementById('cancel-payment-btn');
    const goHomeBtn = document.getElementById('go-home-btn');
    const viewOrderBtn = document.getElementById('view-order-btn');

    const shippingPrice = 15000;
    const freeShippingThreshold = 100000;
    let currentDiscount = 0; 

    // BƯỚC CHẠY 1: Tải Giỏ hàng từ LocalStorage
    let cart = JSON.parse(localStorage.getItem('homnayangi_cart')) || [];
    
    // BƯỚC CHẠY 2: Render chi tiết đơn hàng & Tính Tạm tính
    function renderOrderDetails() {
        checkoutItemsList.innerHTML = '';
        let subtotal = 0;

        if (cart.length === 0) {
            // Xử lý giỏ hàng trống trên trang Checkout
            checkoutItemsList.innerHTML = '<p style="font-style: italic; color: #999;">Không có sản phẩm nào trong giỏ hàng. Vui lòng quay lại trang chủ.</p>';
            confirmCheckoutBtn.disabled = true;
            confirmCheckoutBtn.textContent = 'Giỏ hàng trống';
        } else {
             confirmCheckoutBtn.disabled = false;
             confirmCheckoutBtn.textContent = 'Xác nhận thanh toán';
             
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;

                const itemHTML = `
                    <div class="checkout-item">
                        <div class="checkout-item-details">
                            <img src="${item.image}" alt="${item.name}">
                            <span class="item-quantity">x${item.quantity}</span>
                            <span>${item.name}</span>
                        </div>
                        <span class="item-price">${formatCurrency(itemTotal)}</span>
                    </div>
                `;
                checkoutItemsList.innerHTML += itemHTML;
            });
        }
        
        // BƯỚC CHẠY 3: Cập nhật tóm tắt và số lượng trên Header
        updateSummary(subtotal);
        updateCartCountDisplay(cart.length);
    }
    
    // BƯỚC CHẠY 4: Tính toán và cập nhật Tổng thanh toán
    function updateSummary(subtotal) {
        const calculatedShipping = subtotal >= freeShippingThreshold ? 0 : shippingPrice;
        const total = subtotal + calculatedShipping - currentDiscount;
        
        // Cập nhật các element summary (sử dụng formatCurrency từ utils.js)
        summarySubtotal.textContent = formatCurrency(subtotal);
        summaryShipping.textContent = calculatedShipping === 0 ? 'Miễn phí' : formatCurrency(calculatedShipping);
        summaryShipping.style.color = calculatedShipping === 0 ? 'green' : 'var(--text-color)';
        
        summaryDiscount.textContent = `- ${formatCurrency(currentDiscount)}`; 
        summaryTotal.textContent = formatCurrency(total);
    }

    // BƯỚC CHẠY 5: Xử lý logic ghi chú (kích hoạt/vô hiệu hóa textarea)
    noteCheckbox.addEventListener('change', function() {
        if (this.checked) {
            deliveryNoteArea.disabled = false;
            deliveryNoteArea.focus();
        } else {
            deliveryNoteArea.disabled = true;
            deliveryNoteArea.value = ''; 
        }
    });
    
    // BƯỚC CHẠY 6: Xử lý áp dụng Mã giảm giá (demo)
    document.getElementById('apply-promo-btn').addEventListener('click', function() {
        const promoCode = document.getElementById('promo-code-input').value.toUpperCase();
        
        if (promoCode === 'COMBO20') {
            currentDiscount = 20000;
            alert(`Áp dụng mã ${promoCode} thành công! Giảm ${formatCurrency(currentDiscount)}.`);
            document.getElementById('promo-code-input').value = promoCode; 
        } else {
            currentDiscount = 0;
            alert('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
            document.getElementById('promo-code-input').value = ''; 
        }
        renderOrderDetails(); // Tính toán lại tổng tiền sau khi áp dụng/hủy mã
    });
    
    // --- BẮT SỰ KIỆN NÚT THANH TOÁN VÀ MODAL ---
    
    // BƯỚC CHẠY 7: Khi bấm nút "Xác nhận thanh toán" (trên trang)
    confirmCheckoutBtn.addEventListener('click', function() {
        // Kiểm tra validation form
        const name = document.getElementById('customer-name').value;
        const phone = document.getElementById('customer-phone').value;
        const address = document.getElementById('customer-address').value;

        if (!name || !phone || !address) {
            alert("Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng.");
            return;
        }

        // Hiển thị Modal Xác nhận
        showModal('confirm-modal');
    });

    // BƯỚC CHẠY 8: Khi bấm "Có" (trong Modal Xác nhận) -> Hoàn tất đơn hàng
    confirmPaymentBtn.addEventListener('click', function() {
        
        hideAllModals(); 
        
        // 8a. Xóa giỏ hàng khỏi LocalStorage sau khi thanh toán thành công
        localStorage.removeItem('homnayangi_cart'); 
        cart = []; // Reset giỏ hàng trong bộ nhớ
        
        // 8b. Cập nhật lại số lượng giỏ hàng trên Header thành 0
        updateCartCountDisplay(0);
        
        // 8c. Render lại chi tiết đơn hàng thành "trống" và vô hiệu hóa nút thanh toán
        renderOrderDetails();
        
        // 8d. Hiển thị Modal Thành công
        showModal('success-modal'); 
    });

    // BƯỚC CHẠY 9: Khi bấm "Không" (trong Modal Xác nhận)
    cancelPaymentBtn.addEventListener('click', hideAllModals);

    // BƯỚC CHẠY 10: Chuyển hướng khi hoàn tất
    goHomeBtn.addEventListener('click', function() {
        window.location.href = 'homepage.html'; 
    });
    
    // BƯỚC CHẠY CUỐI: Khởi chạy render chi tiết đơn hàng khi DOM tải xong
    renderOrderDetails();
});