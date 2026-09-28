import { usePage } from "@inertiajs/react";

export function useAdminRoute() {
    const { url } = usePage();
    return url.startsWith('/admin');
}