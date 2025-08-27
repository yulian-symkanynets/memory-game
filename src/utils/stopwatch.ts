export function timeFormat(seconds: number){
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const ss = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
}