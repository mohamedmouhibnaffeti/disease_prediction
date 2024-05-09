export function DistanceEuclidienne({x1, y1, x2, y2}: { x1: number, y1: number, x2: number, y2: number }) {
    const earthRadiusKm = 6371; // Radius of the Earth in kilometers
    const dx = (x2 - x1) * Math.PI / 180 * earthRadiusKm; // Convert degree to radian and scale by Earth's radius
    const dy = (y2 - y1) * Math.PI / 180 * earthRadiusKm; // Convert degree to radian and scale by Earth's radius
    return Math.sqrt(dx * dx + dy * dy);
}