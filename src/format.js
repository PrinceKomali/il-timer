function pad(s, n) {
    return ("0".repeat(n) + s.toString()).slice(n * -1);
}
export function format_time(time, mode = "ms") {

    let ms = Math.round((time%30) / 30 * 1000);
    let s = Math.floor(time / 30) % 60; 
    let m = Math.floor(time / 30 / 60) % 60
    return `${m}:${pad(s, 2)}.${pad(ms,3)}`
}
