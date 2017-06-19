export module Color {
    const m = 16777215;

    export function generateHex(strip?: boolean): string {
        let color = Math.floor(Math.random() * m).toString(16);

        return color.length === 6 ? `${strip ? '' : '#'}${color}` : generateHex(strip);
    }
};