import { useAdminRoute } from '@/hooks/use-admin-route';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    const isAdminRoute = useAdminRoute();

    return isAdminRoute ? (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            {children}
        </AppSidebarLayout>
    ) : (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            {children}
        </AppHeaderLayout>
    );
}
