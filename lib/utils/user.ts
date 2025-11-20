export function getInitials(name: string | null | undefined): string {
  return (name || "A").slice(0, 2).toUpperCase();
}

