// ====================================
// 核心資料與儲存 (使用 LocalStorage 模擬資料庫)
// ====================================

// 產品初始資料 (不變)
const INITIAL_PRODUCTS_DATA = [
    { id: "CAM001", title: "極光 Pro 4K 網路攝影機", category: "Camera", categoryText: "高清監控", price: 8990, description: "...", image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231f1f1f'/><circle cx='50' cy='45' r='20' fill='%2300ffff'/><path d='M30 65H70L50 85Z' fill='%2300ffff'/><text x='50' y='95' font-size='10' fill='%23aaa' text-anchor='middle'>Camera 001</text></svg>", stock: 10, isFeatured: true },
    { id: "ACC002", title: "智能指紋辨識鎖", category: "Access", categoryText: "門禁系統", price: 12500, description: "...", image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231f1f1f'/><rect x='30' y='30' width='40' height='40' rx='5' fill='%230077b6'/><path d='M40 40H60V60H40Z' fill='white'/><text x='50' y='95' font-size='10' fill='%23aaa' text-anchor='middle'>Access 002</text></svg>", stock: 5, isFeatured: true },
    { id: "NET003", title: "企業級 Wi-Fi 6 路由器", category: "Network", categoryText: "網路設備", price: 5200, description: "...", image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231f1f1f'/><rect x='20' y='40' width='60' height='20' rx='2' fill='%2300ffff'/><path d='M30 40V20M70 40V20' stroke='%2300ffff' stroke-width='3'/><text x='50' y='95' font-size='10' fill='%23aaa' text-anchor='middle'>Network 003</text></svg>", stock: 20, isFeatured: true },
    { id: "CAM004", title: "超廣角魚眼監控器", category: "Camera", categoryText: "高清監控", price: 6500, description: "...", image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231f1f1f'/><circle cx='50' cy='50' r='35' fill='%2300ffff20' stroke='%2300ffff' stroke-width='2'/><circle cx='50' cy='50' r='5' fill='%2300ffff'/><text x='50' y='95' font-size='10' fill='%23aaa' text-anchor='middle'>Camera 004</text></svg>", stock: 3, isFeatured: false },
    { id: "NET005", title: "Cat.6A 無氧銅網路線", category: "Network", categoryText: "網路佈線", price: 850, description: "...", image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231f1f1f'/><path d='M20 50C40 30 60 70 80 50' stroke='%230077b6' stroke-width='5' fill='none'/><text x='50' y='95' font-size='10' fill='%23aaa' text-anchor='middle'>Cable 005</text></svg>", stock: 50, isFeatured: false },
    { id: "ACC006", title: "RFID 門禁讀卡機", category: "Access", categoryText: "門禁系統", price: 1800, description: "...", image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231f1f1f'/><rect x='30' y='35' width='40' height='30' rx='2' fill='%230077b6'/><path d='M40 40L60 60M60 40L40 60' stroke='white' stroke-width='2'/><text x='50' y='95' font-size='10' fill='%23aaa' text-anchor='middle'>RFID 006</text></svg>", stock: 0, isFeatured: false }
];

// 模擬訂單資料 (不變)
const MOCK_ORDERS_DATA = [
    { id: 10, memberId: 108, date: '2024-12-05', total: 12500, items: [{ productId: 'ACC002', qty: 1, price: 12500 }] },
    { id: 11, memberId: 101, date: '2024-12-30', total: 17980, items: [{ productId: 'CAM001', qty: 2, price: 8990 }] },
    { id: 1, memberId: 101, date: '2025-01-15', total: 8990, items: [{ productId: 'CAM001', qty: 1, price: 8990 }] },
    { id: 2, memberId: 102, date: '2025-01-20', total: 12500, items: [{ productId: 'ACC002', qty: 1, price: 12500 }] },
    { id: 3, memberId: 101, date: '2025-02-01', total: 17980, items: [{ productId: 'CAM001', qty: 2, price: 8990 }] },
    { id: 4, memberId: 103, date: '2025-03-05', total: 5200, items: [{ productId: 'NET003', qty: 1, price: 5200 }] },
    { id: 5, memberId: 104, date: '2025-03-20', total: 6500, items: [{ productId: 'CAM004', qty: 1, price: 6500 }] },
    { id: 6, memberId: 102, date: '2025-04-10', total: 850 * 5, items: [{ productId: 'NET005', qty: 5, price: 850 }] },
    { id: 7, memberId: 105, date: '2025-05-01', total: 8990, items: [{ productId: 'CAM001', qty: 1, price: 8990 }] },
    { id: 8, memberId: 106, date: '2025-05-25', total: 1800, items: [{ productId: 'ACC006', qty: 1, price: 1800 }] },
    { id: 9, memberId: 107, date: '2025-06-10', total: 5200, items: [{ productId: 'NET003', qty: 1, price: 5200 }] },
];

// 模擬使用者資料
const MOCK_MEMBERS_DATA = [
    { id: 101, name: "陳小明", account: "chen.x.m", password: "encrypted_123", email: "chen@example.com" },
    { id: 102, name: "林美華", account: "lin.m.h", password: "encrypted_456", email: "lin@example.com" },
    { id: 103, name: "王大山", account: "wang.d.s", password: "encrypted_789", email: "wang@example.com" },
    { id: 104, name: "張志偉", account: "zhang.z.w", password: "encrypted_abc", email: "zhang@example.com" },
    { id: 105, name: "吳雅婷", account: "wu.y.t", password: "encrypted_def", email: "wu@example.com" },
    { id: 106, name: "許家豪", account: "xu.j.h", password: "encrypted_ghi", email: "xu@example.com" },
    { id: 107, name: "周宜靜", account: "zhou.y.j", password: "encrypted_jkl", email: "zhou@example.com" },
    { id: 108, name: "李文傑", account: "li.w.j", password: "encrypted_mno", email: "li@example.com" }
];

let PRODUCTS = [];
let ALL_USERS = []; // 儲存處理後的會員資料
let currentModalMode = 'add';

// 載入與儲存資料 (不變)
function loadData() {
    const storedProducts = localStorage.getItem('adminProducts');
    if (storedProducts) {
        PRODUCTS = JSON.parse(storedProducts);
    } else {
        PRODUCTS = INITIAL_PRODUCTS_DATA;
        saveProducts();
    }
}
function saveProducts() {
    localStorage.setItem('adminProducts', JSON.stringify(PRODUCTS));
}

// ====================================
// NEW: 註冊/諮詢資料讀取與管理
// ====================================

/**
 * 從 localStorage 讀取前端 index.html 提交的註冊/諮詢資料。
 */
function loadRegistrations() {
    // 這是用於 "諮詢" 的 key，與 "註冊" (userManagementData) 不同
    const storedRegistrations = localStorage.getItem('USER_REGISTRATIONS');
    return storedRegistrations ? JSON.parse(storedRegistrations) : [];
}

/**
 * 清空 localStorage 中的註冊/諮詢資料。
 */
function clearRegistrations() {
    if (confirm('確定要清空所有前台諮詢登記嗎？此操作無法復原。')) {
        localStorage.removeItem('USER_REGISTRATIONS');
        alert('前台諮詢登記已全部清空！');
        renderRegistrationTable(); // 重新渲染表格
    }
}

// 變數用於映射諮詢類別的顯示名稱
const REG_TYPE_MAP = {
    'service': '預約現場勘查/服務諮詢',
    'product': '產品購買/規格詢問',
    'other': '其他'
};

/**
 * 渲染前台新註冊/諮詢列表
 */
function renderRegistrationTable() {
    const tableBody = document.querySelector('#registrationTable tbody');
    // 💡 安全檢查：確保 tableBody 存在
    if (!tableBody) return;
    
    const registrations = loadRegistrations().reverse(); // 最新登記顯示在最上面
    tableBody.innerHTML = '';
    
    if (registrations.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; color: var(--color-text-dim);">目前尚無新的前台諮詢登記 (LocalStorage: USER_REGISTRATIONS)</td></tr>';
        return;
    }

    registrations.forEach(reg => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>
                <span style="font-size: 0.8em; color: var(--color-text-dim);">${reg.date}</span><br>
                <span style="font-weight: bold; color: var(--color-primary);">${reg.id.substring(0, 12)}...</span>
            </td>
            <td>${reg.name}</td>
            <td><a href="mailto:${reg.email}" style="color: var(--color-primary);">${reg.email}</a></td>
            <td>${reg.phone}</td>
            <td>
                <span style="color: ${reg.type === 'service' ? 'var(--color-success)' : 'var(--color-secondary)'}; font-weight: bold;">
                    ${REG_TYPE_MAP[reg.type] || reg.type}
                </span>
            </td>
        `;
    });
}


/**
 * 準備使用者數據（計算消費金額和購買清單）
 * (功能 4: 整合 index.html 的註冊資料)
 */
function prepareUserData() {
    const userStats = {};
    
    // 1. 初始化 MOCK 使用者統計數據
    MOCK_MEMBERS_DATA.forEach(user => {
        userStats[user.id] = { totalConsumption: 0, purchasedItems: {} };
    });

    // 2. 處理訂單數據 (不變)
    MOCK_ORDERS_DATA.forEach(order => {
        const stats = userStats[order.memberId];
        if (stats) {
            stats.totalConsumption += order.total;
            order.items.forEach(item => {
                const product = PRODUCTS.find(p => p.id === item.productId);
                const productName = product ? product.title : '未知商品';

                if (!stats.purchasedItems[productName]) {
                    stats.purchasedItems[productName] = { qty: 0, id: item.productId };
                }
                stats.purchasedItems[productName].qty += item.qty;
            });
        }
    });

    // 3. 合併 MOCK 使用者數據
    const mockUsers = MOCK_MEMBERS_DATA.map(user => {
        const stats = userStats[user.id] || { totalConsumption: 0, purchasedItems: {} };
        const purchasedList = Object.keys(stats.purchasedItems).map(name => {
            return `${name} (x${stats.purchasedItems[name].qty})`;
        }).join('; ');

        const storedPassword = localStorage.getItem(`userPassword_${user.id}`);
        const currentPassword = storedPassword || user.password;
        
        return {
            ...user,
            password: currentPassword, 
            totalConsumption: stats.totalConsumption,
            purchasedItemsText: purchasedList || '無購買紀錄',
            isRegistration: false // 標記為模擬使用者
        };
    });

    // 4. 載入並映射 index.html 註冊的真實使用者
    // 💡 安全檢查：確保 JSON.parse 不會因 null 出錯
    const storedData = localStorage.getItem('userManagementData');
    const storedRealUsers = storedData ? JSON.parse(storedData) : [];
    
    const realUsers = storedRealUsers.map(regUser => {
        // 嘗試將註冊會員與模擬訂單資料關聯 (透過 email)
        const mockUserForOrders = MOCK_MEMBERS_DATA.find(m => m.email === regUser.email);
        let consumption = 0;
        let itemsText = '無購買紀錄';

        if (mockUserForOrders) {
            const stats = userStats[mockUserForOrders.id] || { totalConsumption: 0, purchasedItems: {} };
            consumption = stats.totalConsumption;
            itemsText = Object.keys(stats.purchasedItems).map(name => {
                return `${name} (x${stats.purchasedItems[name].qty})`;
            }).join('; ') || '無購買紀錄';
        }

        // 讀取是否有被後台修改過的密碼
        const storedPassword = localStorage.getItem(`userPassword_${regUser.id}`);
        const currentPassword = storedPassword || regUser.password; // 使用儲存的密碼，或註冊時的密碼

        return {
            id: regUser.id, // 使用註冊時的 ID
            name: regUser.name,
            account: regUser.email, // 使用 email 作為 account
            password: currentPassword, // 顯示密碼 (功能 4)
            email: regUser.email,
            totalConsumption: consumption, // 顯示模擬的消費
            purchasedItemsText: itemsText, // 顯示模擬的購買紀錄
            isRegistration: true // 標記為真實註冊使用者
        };
    });

    // 5. 合併兩個列表
    const realUserEmails = new Set(realUsers.map(u => u.email));
    const filteredMockUsers = mockUsers.filter(u => !realUserEmails.has(u.email));

    // 將真實註冊使用者放在最前面
    ALL_USERS = [...realUsers, ...filteredMockUsers];
}


/**
 * 處理檔案輸入，並進行圖片預覽，同時將 Base64 數據儲存到隱藏欄位。
 */
function previewImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const preview = document.getElementById('productImagePreview');
    const urlInput = document.getElementById('productImageUrl');

    // 💡 安全檢查：確保元素都存在
    if (!file || !preview || !urlInput) return;

    reader.onload = function(e) {
        const dataUrl = e.target.result;
        preview.src = dataUrl;
        preview.style.display = 'block';
        urlInput.value = dataUrl; // 儲存 Base64 數據
    };
    reader.readAsDataURL(file);
}


// ====================================
// 1. 商品管理 (CRUD) 邏輯 
// ====================================
function renderProductTable() {
    const tableBody = document.querySelector('#productTable tbody');
    // 💡 安全檢查：
    if (!tableBody) return;
    tableBody.innerHTML = '';

    PRODUCTS.forEach(product => {
        const featuredStatus = product.isFeatured ? 
            '<span class="featured-indicator yes" title="是"></span> 是' : 
            '<span class="featured-indicator no" title="否"></span> 否';

        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>
                <img src="${product.image || 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><rect width=\'100\' height=\'100\' fill=\'%23555\'/><text x='50' y='50' font-size='10' fill='%23fff' text-anchor='middle'>No Image</text></svg>'}" 
                    alt="圖" class="thumb-img">
            </td>
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>NT$ ${product.price.toLocaleString()}</td>
            <td>${product.stock}</td>
            <td>${featuredStatus}</td>
            <td>
                <button class="btn btn-edit" onclick="openProductModal('edit', '${product.id}')"><i class="fas fa-edit"></i> 編輯</button>
                <button class="btn btn-delete" onclick="deleteProduct('${product.id}')"><i class="fas fa-trash"></i> 刪除</button>
            </td>
        `;
    });
}

function openProductModal(mode, id = null) {
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    const title = document.getElementById('modalTitle');
    const preview = document.getElementById('productImagePreview');
    const imageFile = document.getElementById('productImageFile');
    
    // 💡 安全檢查：
    if (!modal || !form || !title || !preview || !imageFile) {
        console.error("openProductModal: 找不到必要的 HTML 元素。");
        return;
    }
    
    form.reset(); 
    imageFile.value = ''; 
    preview.style.display = 'none';
    preview.src = '';

    currentModalMode = mode;
    title.textContent = mode === 'add' ? '新增商品' : '編輯商品';
    
    if (mode === 'edit' && id) {
        const product = PRODUCTS.find(p => p.id === id);
        if (product) {
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.title;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productStock').value = product.stock;
            document.getElementById('productDescription').value = product.description;
            document.getElementById('productIsFeatured').checked = !!product.isFeatured;
            document.getElementById('productImageUrl').value = product.image || '';
            if (product.image) {
                preview.src = product.image;
                preview.style.display = 'block';
            }
        }
    } else if (mode === 'add') {
        document.getElementById('productId').value = '';
        document.getElementById('productIsFeatured').checked = false; // 新增時預設不推薦
        document.getElementById('productImageUrl').value = '';
    }

    modal.style.display = 'block';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function deleteProduct(id) {
    if (confirm(`確定要刪除商品 ID: ${id} 嗎？`)) {
        PRODUCTS = PRODUCTS.filter(p => p.id !== id);
        saveProducts();
        renderProductTable();
        alert('商品已刪除！');
    }
}


// ====================================
// 2. 數據分析 (Analytics) 邏輯
// ====================================
function calculateAnalytics() {
    let totalSalesAmount = 0;
    const productSales = {}; 
    const monthlyTransactions = {}; 
    const yearlyTransactions = {}; 

    MOCK_ORDERS_DATA.forEach(order => {
        totalSalesAmount += order.total;
        const date = new Date(order.date);
        const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        const year = date.getFullYear().toString();
        monthlyTransactions[yearMonth] = (monthlyTransactions[yearMonth] || 0) + 1;
        yearlyTransactions[year] = (yearlyTransactions[year] || 0) + 1;

        order.items.forEach(item => {
            if (!productSales[item.productId]) {
                const product = PRODUCTS.find(p => p.id === item.productId) || { title: '未知商品', price: 0 };
                productSales[item.productId] = { 
                    title: product.title, 
                    qty: 0, 
                    amount: 0,
                    id: item.productId 
                };
            }
            productSales[item.productId].qty += item.qty;
            productSales[item.productId].amount += item.qty * item.price;
        });
    });

    const salesArray = Object.values(productSales)
        .filter(p => p.qty > 0)
        .sort((a, b) => b.qty - a.qty); 

    const totalMemberCount = ALL_USERS.length;

    return {
        memberCount: totalMemberCount, 
        totalSalesAmount,
        salesArray,
        monthlyTransactions,
        yearlyTransactions
    };
}

function renderAnalytics() {
    prepareUserData(); // 確保 ALL_USERS 是最新的
    const data = calculateAnalytics();
    
    const statsGrid = document.getElementById('statsGrid');
    const salesTableBody = document.querySelector('#salesTable tbody');
    const transactionsTableBody = document.querySelector('#transactionsTable tbody');
    
    // 💡 安全檢查：
    if (!statsGrid || !salesTableBody || !transactionsTableBody) return;
    
    statsGrid.innerHTML = `
        <div class="stat-card"><h3>總會員數</h3><p>${data.memberCount.toLocaleString()}</p><span class="icon"><i class="fas fa-users"></i></span></div>
        <div class="stat-card" style="border-left-color: var(--color-success);"><h3>售出總金額 (模擬)</h3><p>NT$ ${data.totalSalesAmount.toLocaleString()}</p><span class="icon" style="color: var(--color-success);"><i class="fas fa-dollar-sign"></i></span></div>
        <div class="stat-card" style="border-left-color: var(--color-secondary);"><h3>總產品數</h3><p>${PRODUCTS.length}</p><span class="icon" style="color: var(--color-secondary);"><i class="fas fa-box-open"></i></span></div>
        <div class="stat-card" style="border-left-color: var(--color-warning);"><h3>總交易次數 (模擬)</h3><p>${MOCK_ORDERS_DATA.length}</p><span class="icon" style="color: var(--color-warning);"><i class="fas fa-receipt"></i></span></div>
    `;

    salesTableBody.innerHTML = '';
    if (data.salesArray.length === 0) {
        salesTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">尚無任何銷售數據</td></tr>';
    } else {
        data.salesArray.forEach(sale => {
            const row = salesTableBody.insertRow();
            row.innerHTML = `
                <td>${sale.title}</td>
                <td>${sale.id}</td>
                <td>${sale.qty.toLocaleString()}</td>
                <td>NT$ ${sale.amount.toLocaleString()}</td>
            `;
        });
    }

    transactionsTableBody.innerHTML = '';
    Object.keys(data.yearlyTransactions).sort().reverse().forEach(year => {
        const row = transactionsTableBody.insertRow();
        row.innerHTML = `
            <td><strong>${year} 年度總計</strong></td>
            <td><strong>${data.yearlyTransactions[year].toLocaleString()} 次</strong></td>
        `;
    });
    Object.keys(data.monthlyTransactions)
        .sort().reverse() 
        .forEach(monthKey => {
            const [year, month] = monthKey.split('-');
            const row = transactionsTableBody.insertRow();
            row.innerHTML = `
                <td style="padding-left: 20px;">${year} 年 ${parseInt(month)} 月</td>
                <td>${data.monthlyTransactions[monthKey].toLocaleString()} 次</td>
            `;
        });
}

// 匯出功能
function exportSalesData() {
    const data = calculateAnalytics().salesArray;
    let csvContent = "商品名稱,商品ID,售出數量,銷售金額\n";
    
    data.forEach(item => {
        csvContent += `"${item.title.replace(/"/g, '""')}",${item.id},${item.qty},${item.amount}\n`;
    });
    
    const blob = new Blob([new TextDecoder('utf-8').decode(new Uint8Array([0xEF, 0xBB, 0xBF, ...new TextEncoder('utf-8').encode(csvContent)]))], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    
    if (link.download !== undefined) { 
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "銷售數據報表_" + new Date().toISOString().slice(0, 10) + ".csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert('銷售數據已匯出為 CSV 檔案！');
    } else {
        alert('您的瀏覽器不支持自動匯出功能。');
    }
}


// ====================================
// 3. 訂單管理 (Order Management) (新)
// ====================================
function renderOrderTable() {
    const tableBody = document.querySelector('#orderTable tbody');
    // 💡 安全檢查：
    if (!tableBody) return;
    tableBody.innerHTML = '';
    
    if (!PRODUCTS || PRODUCTS.length === 0) {
        loadData();
    }

    const orders = MOCK_ORDERS_DATA.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (orders.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">尚無任何訂單資料 (MOCK_ORDERS_DATA)</td></tr>';
        return;
    }

    orders.forEach(order => {
        const itemsHtml = order.items.map(item => {
            const product = PRODUCTS.find(p => p.id === item.productId);
            const title = product ? product.title : '未知商品';
            return `<li style="font-size: 0.9em;">${title} (x${item.qty}) - NT$ ${item.price.toLocaleString()}</li>`;
        }).join('');

        const member = MOCK_MEMBERS_DATA.find(m => m.id === order.memberId);
        const memberName = member ? member.name : '未知會員';
        
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.date}</td>
            <td>${memberName} (ID: ${order.memberId})</td>
            <td>
                <ul style="padding-left: 15px; margin: 0; max-width: 300px;">${itemsHtml}</ul>
            </td>
            <td style="font-weight: bold; color: var(--color-primary);">NT$ ${order.total.toLocaleString()}</td>
        `;
    });
}


// ====================================
// 4. 使用者管理 (User Management)
// ====================================

function renderUserTable(usersToRender) {
    const tableBody = document.querySelector('#userTable tbody');
    // 💡 安全檢查：
    if (!tableBody) return;
    
    const usersToDisplay = usersToRender;
    tableBody.innerHTML = '';
    
    if (usersToDisplay.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" style="text-align:center;">找不到任何使用者 (請嘗試從前台註冊)</td></tr>';
        return;
    }

    usersToDisplay.forEach(user => {
        const row = tableBody.insertRow();
        const userType = user.isRegistration ? 
            '<span style="color: var(--color-success); font-weight: bold;">[註冊會員]</span>' : 
            '<span style="color: var(--color-text-dim); font-style: italic;">[模擬資料]</span>';

        row.innerHTML = `
            <td>${user.id} ${userType}</td>
            <td>${user.name}</td>
            <td>${user.account}</td>
            <td><span title="密碼(明文/模擬加密)">${user.password}</span></td>
            <td>
                <button class="btn btn-edit" onclick="openPasswordModal('${user.id}', '${user.name}')" style="padding: 5px 10px; background-color: var(--color-warning); color: black; font-weight: bold;">
                    <i class="fas fa-sync"></i> 變更
                </button>
            </td>
            <td>${user.email}</td>
            <td>NT$ ${user.totalConsumption.toLocaleString()}</td>
            <td title="${user.purchasedItemsText.replace(/; /g, '\n')}">${user.purchasedItemsText}</td>
        `;
    });
}

function searchUsers() {
    const queryInput = document.getElementById('userSearchInput');
    // 💡 安全檢查：
    if (!queryInput) return;
    
    const query = queryInput.value.toLowerCase().trim();
    if (!query) {
        renderUserTable(ALL_USERS); // 重設時顯示所有使用者
        return;
    }
    
    const filteredUsers = ALL_USERS.filter(user => 
        (user.name.toLowerCase().includes(query) || 
         user.account.toLowerCase().includes(query))
    );

    renderUserTable(filteredUsers);
}

// 密碼變更 Modal 邏輯
function openPasswordModal(userId, userName) {
    const modal = document.getElementById('passwordModal');
    const userIdInput = document.getElementById('modalUserId');
    const userNameDisplay = document.getElementById('modalUserNameDisplay');
    
    // 💡 安全檢查：
    if (!modal || !userIdInput || !userNameDisplay) {
         console.error("openPasswordModal: 找不到必要的 HTML 元素。");
        return;
    }
    
    userIdInput.value = userId;
    userNameDisplay.textContent = `正在為使用者 [${userName}] 變更密碼`;
    document.getElementById('newIndividualPassword').value = '';
    document.getElementById('confirmIndividualPassword').value = '';
    modal.style.display = 'block';
}

function closePasswordModal() {
    const modal = document.getElementById('passwordModal');
    if (modal) {
        modal.style.display = 'none';
    }
}


// ====================================
// 5. 登出與總控 
// ====================================

function handleLogout() {
    if (confirm('確定要登出管理者帳號嗎？')) {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('currentUserName');
        window.location.href = 'index.html'; 
    }
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    const activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    const navLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
    if (navLink) {
        navLink.classList.add('active');
    }

    // 根據 Tab ID 載入對應的資料
    if (tabId === 'products') {
        renderProductTable();
    } else if (tabId === 'analytics') {
        renderAnalytics();
    } else if (tabId === 'orders') {
        renderOrderTable();
    } else if (tabId === 'users') { 
        prepareUserData(); 
        renderUserTable(ALL_USERS); 
        renderRegistrationTable(); 
    }
}

// ====================================
// 7. 程式進入點 (Entry Point)
// (*** 重大修改：所有事件綁定移至此處 ***)
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    
    // 檢查登入狀態
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'admin') {
        alert('您無權訪問此頁面，請先從首頁登入管理者帳號。');
        window.location.href = 'index.html';
        return; 
    }

    // 載入基本資料
    loadData(); 
    prepareUserData(); 

    // --- 綁定所有事件監聽器 (💡 新增安全檢查) ---

    // 綁定所有導航連結 (側邊欄)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            switchTab(this.getAttribute('data-tab'));
        });
    });
    
    // 綁定登出按鈕
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }

    // 綁定銷售匯出按鈕
    const exportSalesBtn = document.getElementById('exportSalesButton');
    if (exportSalesBtn) {
        exportSalesBtn.addEventListener('click', exportSalesData);
    }

    // 綁定使用者搜尋按鈕
    const userSearchBtn = document.getElementById('userSearchButton');
    if (userSearchBtn) {
        userSearchBtn.addEventListener('click', searchUsers);
    }
    
    // 綁定清空諮詢按鈕
    const clearRegBtn = document.getElementById('clearRegistrationsButton');
    if (clearRegBtn) {
        clearRegBtn.addEventListener('click', clearRegistrations);
    }

    // 綁定產品表單 (Modal)
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const id = form.productId.value;
            const title = form.title.value;
            const category = form.category.value;
            const price = parseInt(form.price.value, 10);
            const stock = parseInt(form.stock.value, 10);
            const description = form.description.value;
            const imageBase64 = form.image.value;
            const isFeatured = form.isFeatured.checked;

            const getNewId = () => 'PROD' + (PRODUCTS.length + 10).toString().padStart(3, '0');
            const newId = currentModalMode === 'add' ? getNewId() : id;
            const categoryText = form.productCategory.options[form.productCategory.selectedIndex].text.split('(')[0];

            const newProduct = {
                id: newId, title, category, categoryText: categoryText,
                price, description, stock, isFeatured,
                image: imageBase64 || 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><rect width=\'100\' height=\'100\' fill=\'%23555\'/><text x=\'50\' y=\'50\' font-size=\'10' fill='%23fff' text-anchor='middle'>No Image</text></svg>'
            };

            if (currentModalMode === 'add') {
                PRODUCTS.push(newProduct);
                alert('商品新增成功！');
            } else if (currentModalMode === 'edit') {
                const index = PRODUCTS.findIndex(p => p.id === id);
                if (index !== -1) {
                    PRODUCTS[index] = newProduct;
                    alert('商品編輯成功！');
                }
            }

            saveProducts();
            renderProductTable();
            closeProductModal();
        });
    }
    
    // 綁定產品 Modal 關閉按鈕
    const closeProductModalBtn = document.getElementById('closeProductModalBtn');
    if(closeProductModalBtn) {
        closeProductModalBtn.addEventListener('click', closeProductModal);
    }
    
    // 綁定產品圖片預覽
    const productImageFile = document.getElementById('productImageFile');
    if (productImageFile) {
        productImageFile.addEventListener('change', previewImage);
    }

    // 綁定修改使用者密碼表單 (Modal)
    const indPasswordForm = document.getElementById('individualPasswordForm');
    if (indPasswordForm) {
        indPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userId = document.getElementById('modalUserId').value;
            const newPwd = document.getElementById('newIndividualPassword').value;
            const confirmPwd = document.getElementById('confirmIndividualPassword').value;

            if (newPwd !== confirmPwd) {
                alert('兩次輸入的新密碼不一致！');
                return;
            }
            if (newPwd.length < 6) {
                alert('密碼長度必須至少為 6 位。');
                return;
            }

            const userIndex = ALL_USERS.findIndex(u => u.id == userId);
            
            if (userIndex !== -1) {
                const user = ALL_USERS[userIndex];
                user.password = newPwd; // 💡 儲存明文密碼，以便真實顯示
                
                localStorage.setItem(`userPassword_${user.id}`, user.password);

                if (user.isRegistration) {
                    const storedRealUsers = JSON.parse(localStorage.getItem('userManagementData')) || [];
                    const realUserIndex = storedRealUsers.findIndex(u => u.id == userId);
                    if (realUserIndex !== -1) {
                        storedRealUsers[realUserIndex].password = user.password;
                        localStorage.setItem('userManagementData', JSON.stringify(storedRealUsers));
                    }
                }
                
                alert(`使用者 ${user.name} 的密碼已變更成功！`);
                
                renderUserTable(ALL_USERS); 
                closePasswordModal();
            } else {
                alert('找不到該使用者。');
            }
        });
    }
    
    // 綁定使用者密碼 Modal 關閉按鈕
    const closePasswordModalBtn = document.getElementById('closePasswordModalBtn');
    if(closePasswordModalBtn) {
        closePasswordModalBtn.addEventListener('click', closePasswordModal);
    }

    // 綁定修改管理者密碼表單 (Settings)
    const adminPasswordForm = document.getElementById('adminPasswordForm');
    if (adminPasswordForm) {
        adminPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newPwd = document.getElementById('newAdminPassword').value;
            const confirmPwd = document.getElementById('confirmAdminPassword').value;
            
            if (newPwd !== confirmPwd) {
                alert('兩次輸入的新密碼不一致！');
                return;
            }
            if (newPwd.length < 6) {
                alert('密碼長度必須至少為 6 位。');
                return;
            }

            sessionStorage.setItem('adminPassword', newPwd);
            alert('您的管理者密碼已成功變更！\n(請注意：模擬登入用的密碼 admin123 不會被修改)');
            
            document.getElementById('adminPasswordForm').reset();
        });
    }

    // 綁定設定表單 (模擬)
    const adminProfileForm = document.getElementById('adminProfileForm');
    if (adminProfileForm) {
        adminProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newAccount = document.getElementById('adminAccount').value;
            const newEmail = document.getElementById('adminEmail').value;
            alert(`(模擬) 管理者資料已更新！\n帳號: ${newAccount}\nEmail: ${newEmail}`);
        });
    }

    const secondAdminForm = document.getElementById('secondAdminForm');
    if (secondAdminForm) {
        secondAdminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('(模擬) 已創建第二管理者帳戶！\n(此功能需要真實後端資料庫支援權限管理)');
        });
    }

    // --- 預設載入 ---
    
    // 預設顯示數據分析頁面
    switchTab('analytics');
});