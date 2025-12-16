// --- LOGIC CHUNG CHO TRANG CHỦ (INDEX.HTML) ---

// *LƯU Ý: menuData được tải từ data.js trước*

/**
 * Tạo thẻ HTML cho một sản phẩm.
 * Sử dụng formatCurrency() từ utils.js
 */
function createMenuItemHTML(item) {
    return `
        <div class="menu-item-card">
            <img src="${item.image}" alt="${item.name}">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p class="description">${item.description}</p>
                <div class="price-action">
                    <span class="price">${formatCurrency(item.price)}</span>
                    <button class="add-btn">Thêm vào giỏ</button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Lặp qua dữ liệu (menuData từ data.js) và render tất cả các section menu.
 */
function renderMenuSections() {
    // BƯỚC CHẠY 1: Render dữ liệu menu lên HTML
    for (const sectionId in menuData) {
        if (menuData.hasOwnProperty(sectionId)) {
            const items = menuData[sectionId];
            
            const sectionElement = document.getElementById(sectionId);
            // Xử lý class grid khác nhau giữa Đồ uống và các menu khác
            const gridClass = (sectionId === 'douong') ? '.drink-grid' : '.menu-grid';
            const gridContainer = sectionElement ? sectionElement.querySelector(gridClass) : null;

            if (gridContainer) {
                let htmlContent = '';
                items.forEach(item => {
                    htmlContent += createMenuItemHTML(item);
                });
                
                gridContainer.innerHTML = htmlContent;
            } else {
                console.error(`Không tìm thấy container grid cho section #${sectionId}`);
            }
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // 1. Chạy render menu khi DOM tải xong
    renderMenuSections();
    
    const addToCartButtons = document.querySelectorAll('.add-btn');

    // 2. Xử lý sự kiện khi click nút "Thêm vào giỏ"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Lấy thông tin sản phẩm từ thẻ cha (.menu-item-card)
            const card = this.closest('.menu-item-card');
            const itemName = card.querySelector('h3').textContent;
            
            let productData = null;
            
            // 2a. Tìm sản phẩm trong menuData (data.js) để lấy đủ thông tin
            for (const sectionId in menuData) {
                const found = menuData[sectionId].find(item => item.name === itemName);
                if (found) {
                    productData = {...found, sectionId}; 
                    break;
                }
            }
            
            if (!productData) {
                console.error(`Lỗi: Không tìm thấy dữ liệu sản phẩm "${itemName}"!`);
                return;
            }

            // 2b. Tạo đối tượng sản phẩm để lưu vào giỏ
            const product = {
                name: productData.name,
                price: productData.price, 
                image: productData.image,
                description: productData.description,
                id: productData.name.replace(/\s/g, '-').toLowerCase(), // ID duy nhất
                quantity: 1
            };
            
            // 2c. Đọc giỏ hàng từ LocalStorage
            let cart = JSON.parse(localStorage.getItem('homnayangi_cart')) || [];
            
            const existingItemIndex = cart.findIndex(item => item.id === product.id);

            // 2d. Cập nhật giỏ hàng: Tăng số lượng hoặc Thêm mới
            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push(product);
            }

            // 2e. Ghi lại giỏ hàng vào LocalStorage
            localStorage.setItem('homnayangi_cart', JSON.stringify(cart));
            
            // 2f. Cập nhật hiển thị (sử dụng hàm từ utils.js)
            updateCartCountDisplay(cart.length);
            showToast(`Đã thêm "${itemName}" vào giỏ hàng.`);
        });
    });
    
    // 3. Xử lý cuộn và đổi trạng thái active cho menu điều hướng
    document.querySelectorAll('.section-nav .nav-item').forEach(navItem => {
         navItem.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Logic cập nhật trạng thái active
            const activeItem = document.querySelector('.section-nav .nav-item.active');
            if (activeItem) {
                activeItem.classList.remove('active');
            }
            this.classList.add('active');
            
            // Logic cuộn mượt mà đến khu vực (section) tương ứng
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80; // Trừ đi chiều cao Header cố định
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    
    // 4. Khởi tạo số lượng giỏ hàng khi tải trang (sử dụng hàm từ utils.js)
    const initialCart = JSON.parse(localStorage.getItem('homnayangi_cart')) || [];
    updateCartCountDisplay(initialCart.length);
});