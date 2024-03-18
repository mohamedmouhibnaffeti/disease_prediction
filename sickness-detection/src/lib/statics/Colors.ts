export const Colors: Array<{bg: string, text: string}> = [
    {bg: '#B3F9E4', text: "#000000"},
    {bg: '#67CBF7', text: "#000000"},
    {bg: '#F6CE67', text: "#000000"},
    {bg: '#EE7666', text: "#FFFFFF"},
    {bg: '#9A4BFF', text: "#FFFFFF"},
    {bg: '#E55AC7', text: "#FFFFFF"},
]

export function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * Colors.length);
    return Colors[randomIndex];
}