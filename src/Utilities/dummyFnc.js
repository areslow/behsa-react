const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#"

export const randomString = (length) => {
    let res = '';
    let range = chars.length;
    for(let i = 0; i < range; i++){
        res += chars.charAt(Math.floor(Math.random() * range));
    }
    return res
}