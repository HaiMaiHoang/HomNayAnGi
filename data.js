/**
 * menuData: Dữ liệu của tất cả các món ăn và đồ uống.
 * Key của mỗi object (ví dụ: 'uudai-homnay') phải khớp với ID của Section trong Index.html.
 */
const menuData = {
    'uudai-homnay': [
        {
            name: "Combo 6 Bánh + 4 Nước",
            description: "5 Bánh Dân Tổ + 1 Bánh Nem Ngô + 4 Trà Chanh",
            price: 35000,
            image: "images/u1.webp"
        },
        {
            name: "Combo 5 Bánh + 3 Nước",
            description: "3 Bánh Dân Tổ + 2 Bánh Nem Ngô + 3 Trà Chanh",
            price: 39000,
            image: "images/u2.webp"
        },
        {
            name: "Combo 4 Bánh + 3 Nước",
            description: "2 Bánh Dân Tổ + 2 Bánh Nem Ngô + 3 Trà Chanh",
            price: 45000,
            image: "images/u3.webp"
        },
        {
            name: "Combo 3 Bánh + 2 Nước",
            description: "2 Dân Tổ + 1 Bánh Nem Ngô + 2 Trà Chanh",
            price: 45000,
            image: "images/u4.webp"
        },
        {
            name: "Combo 2 Bánh + 1 Nước",
            description: "2 Bánh Dân Tổ + 1 Trà Chanh",
            price: 45000,
            image: "images/u5.webp"
        },
    ],
    'combo': [
        {
            name: "Bánh Mì Pate Trứng + Trà Chanh",
            description: "Bánh mì pate trứng thơm ngon, kèm trà chanh mát lạnh, hòa quyện vị béo và chua dịu.",
            price: 39000,
            image: "images/c1.webp"
        },
        {
            name: "Bánh Mì Pate + Trà Chanh",
            description: "Bánh Mì Pate mềm mại, Trà Chanh mát lạnh, hòa quyện hương vị đặc trưng.",
            price: 39000,
            image: "images/c2.webp"
        },
        {
            name: "Combo Bánh Mì Xúc Xích + Trà Chanh",
            description: "Bánh mì xúc xích giòn, chua ngọt trà chanh mát lạnh, hòa quyện tuyệt vời.",
            price: 39000,
            image: "images/c3.webp"
        },
         {
            name: "Bánh mì Trứng Bò Khô + Trà Chanh",
            description: "Bánh mì giòn tan, trứng mềm, bò khô thơm kèm trà chanh mát lạnh",
            price: 39000,
            image: "images/c4.webp"
        },
        {
            name: "Combo Bánh Thịt Nướng + Trà",
            description: "Thịt nướng thơm ngon, bánh mì giòn, kèm trà thanh mát.",
            price: 39000,
            image: "images/c5.webp"
        },
    ],
    'banhmy': [
        {
            name: "Bánh Mì Nướng Mật Ong",
            description: "Bánh mì nướng mật ong thơm ngon, kết hợp thịt nguội, hành và nước sốt mật ong ngọt ngào.",
            price: 25000,
            image: "images/bm1.webp"
        },
        {
            name: "Bánh Mì Trứng Bò Khô",
            description: "Bánh mì giòn tan với trứng, bò khô thơm lừng, hòa quyện vị ngon đặc trưng.",
            price: 30000,
            image: "images/bm2.webp"
        },
        {
            name: "Bánh Mì Nem Ngô",
            description: "Bánh mì nem ngô giòn tan, thơm phức, hòa quyện vị mặn và ngọt.",
            price: 35000,
            image: "images/bm3.webp"
        },
        {
            name: "Bánh Mì Thịt Nướng",
            description: "Bánh mì giòn, thịt nướng thơm, rau sống tươi mát, sốt đặc biệt.",
            price: 28000,
            image: "images/bm4.webp"
        },
        {
            name: "Bánh Mì Pate Trứng",
            description: "Bánh mì pate trứng đậm đà, thơm ngon, kết hợp hoàn hảo giữa pate mịn và trứng mềm.",
            price: 25000,
            image: "images/bm5.webp"
        },
        {
            name: "Bánh Mì Pate",
            description: "Pate Ngon",
            price: 29000,
            image: "images/bm6.webp"
        },
        {
            name: "Bánh Mì Dân Tổ",
            description: "Bánh mì Dân Tổ Đặc Biệt: Bánh mì giòn, nhân đậm đà, rau tươi mát . Bùng nổ vị giác sau lần đầu tiên trải nghiệm !",
            price: 29000,
            image: "images/bm7.webp"
        }
    ],
    'douong': [
        {
            name: "Sữa Đậu Nành",
            description: "Sữa đậu nành mịn, thơm ngon, giàu dinh dưỡng cho sức khỏe.",
            price: 30000,
            image: "images/d1.webp"
        },
        {
            name: "Trà Chanh",
            description: "Trà chanh mát lạnh, hòa quyện chanh tươi và đá lạnh, sảng khoái ngày hè.",
            price: 20000,
            image: "images/d2.webp"
        },
    ]
};