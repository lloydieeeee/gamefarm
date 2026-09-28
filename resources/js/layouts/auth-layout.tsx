import { useAdminRoute } from '@/hooks/use-admin-route';
import AuthCardLayout from '@/layouts/auth/auth-card-layout';
import AuthSplitLayout from '@/layouts/auth/auth-split-layout';

export default function AuthLayout({
    title = '',
    description = '',
    children,
}: {
    title?: string;
    description?: string;
    children: React.ReactNode;
}) {
    const isAdminRoute = useAdminRoute();

    return isAdminRoute ? (
        <AuthCardLayout title={title} description={description}>
            {children}
        </AuthCardLayout>
    ) : (
        <AuthSplitLayout title={title} description={description}>
            {children}
        </AuthSplitLayout>
    );
}
