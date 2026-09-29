import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';
import { edit as adminEditAppearance } from '@/routes/admin/appearance';
import { edit as userEditAppearance } from '@/routes/appearance';
import { edit as adminEditProfile } from '@/routes/admin/profile';
import { edit as userEditProfile } from '@/routes/profile';
import { edit as adminEditSecurity } from '@/routes/admin/security';
import { edit as userEditSecurity } from '@/routes/security';
import type { NavItem } from '@/types';
import { useAdminRoute } from '@/hooks/use-admin-route';

const getSidebarNavItems = (isAdminRoute: boolean): NavItem[] => [
    {
        title: 'Profile',
        href: isAdminRoute ? adminEditProfile() : userEditProfile(),
        icon: null,
    },
    {
        title: 'Security',
        href: isAdminRoute ? adminEditSecurity() : userEditSecurity(),
        icon: null,
    },
    {
        title: 'Appearance',
        href: isAdminRoute ? adminEditAppearance() : userEditAppearance(),
        icon: null,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();
    const isAdminRoute = useAdminRoute();
    const sidebarNavItems = getSidebarNavItems(isAdminRoute);

    return (
        <div className="px-4 py-6">
            <Heading
                title="Settings"
                description="Manage your profile and account settings"
            />

            <div className="flex flex-col lg:flex-row lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav
                        className="flex flex-col space-y-1 space-x-0"
                        aria-label="Settings"
                    >
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${toUrl(item.href)}-${index}`}
                                size="sm"
                                variant="ghost"
                                className={cn('w-full justify-start', {
                                    'bg-muted': isCurrentOrParentUrl(item.href),
                                })}
                                nativeButton={false}
                                render={
                                    <Link href={item.href}>
                                        {item.icon && (
                                            <item.icon className="h-4 w-4" />
                                        )}
                                        {item.title}
                                    </Link>
                                }
                            />
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 lg:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
