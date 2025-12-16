/**
 * utils.js
 * Chứa các hàm tiện ích chung cho toàn bộ ứng dụng (Index, Cart, Checkout).
 */

// --- UTILITY FUNCTION 1: Định dạng tiền tệ ---
function formatCurrency(amount) {
    // Chuyển số nguyên thành chuỗi tiền tệ (ví dụ: 35000 -> 35.000đ)
    return amount.toLocaleString('vi-VN') + 'đ';
}

// --- UTILITY FUNCTION 2: Cập nhật số lượng giỏ hàng trên Header ---
function updateCartCountDisplay(count) {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        // Nếu có sản phẩm, hiển thị số lượng, nếu không thì để trống
        cartCountElement.textContent = count > 0 ? count : '';
        // Hiển thị badge nếu số lượng > 0, ngược lại ẩn đi
        cartCountElement.style.display = count > 0 ? 'flex' : 'none';
    }
    // Ghi chú: Hàm này được gọi từ app.js (Trang chủ), cart.js (Giỏ hàng), và checkout.js (Thanh toán)
}

// --- UTILITY FUNCTION 3: Hiển thị Toast Notification (chỉ dùng trên Index.html) ---
function showToast(message) {
    const toast = document.getElementById('cart-toast');
    // Kiểm tra xem toast có tồn tại không (chỉ có trên Index.html)
    if (!toast) return; 
    
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
    // Ghi chú: Hàm này được gọi từ app.js khi thêm sản phẩm thành công.
}