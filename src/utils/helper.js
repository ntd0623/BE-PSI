const shuffleArray = (array) => {
    const arr = [...array]; // clone để tránh thay đổi mảng gốc
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // chọn index ngẫu nhiên từ 0 -> i
        [arr[i], arr[j]] = [arr[j], arr[i]]; // hoán đổi vị trí
    }
    return arr;
}
module.exports = { shuffleArray }