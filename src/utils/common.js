export function Myfor(array, cb) {
    console.warn('Myfor');
    for (let index = 0; index < array.length; index++) {
        cb(array[index])
    }
}