function pad(s, n) {
    return ("0".repeat(n) + s.toString()).slice(n * -1);
}
export function format_time(time, duration, mode = "ms") {
    if(time < 0) return mode == "frame" ? "?:?" : (duration > 60 ? "?:?" : "") + "?.???";
    let f = time % 30;
    let ms = Math.round((time%30) / 30 * 1000);
    let total_s = Math.floor(time / 30); 
    let s = total_s % 60; 
    let m = Math.floor(time / 30 / 60) % 60;
    let output_string = "";
    if(mode == "frame") {
        output_string += total_s + ":" + f;
    }
    else {
        output_string += "." + pad(ms, 3);
        if(duration > 60) output_string = m + ":" + pad(s, 2) + output_string;
        else output_string = s + output_string;
    }
    return output_string;

}
