import { format, formatDistanceToNow } from "date-fns";

export function formatDate(date: Date | number | string | null | undefined, formatStr: string = "PPP"): string {
    if (!date) return "No date";
    const d = date instanceof Date ? date : new Date(date);
    return format(d, formatStr);
}

export function formatTimeAgo(date: Date | number | string | null | undefined): string {
    if (!date) return "";
    const d = date instanceof Date ? date : new Date(date);
    return formatDistanceToNow(d, { addSuffix: true });
}
