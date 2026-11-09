export function formatDuracio(temps: number): string {
    const minutes = Math.floor(temps / 60);
    const seconds = temps % 60;

    return `${String(minutes)}:${String(seconds)}`;
}
