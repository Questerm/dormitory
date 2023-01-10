// 拷贝对象
export default function deepCopy(els) {
    let result = {};
    for (let i in els) {
        result[i] = els[i];
    }
    return result;
}