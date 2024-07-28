export default function truncate(name: string): string {
    return name.length >= 25 ? name.substring(0, 25) + '...' : name
}