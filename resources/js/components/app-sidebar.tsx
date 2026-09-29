import { Link } from '@inertiajs/react';
import { Bird, BookOpen, CalendarDays, Egg, FolderGit2, LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes/admin';
import { index as appointments } from '@/routes/admin/appointments';
import { index as gamecocks } from '@/routes/admin/gamecocks';
import { index as maturities } from '@/routes/admin/maturities';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Appointments',
        href: appointments(),
        icon: CalendarDays,
    },
    {
        title: 'Gamecocks',
        href: gamecocks(),
        icon: Egg,
    },
    {
        title: 'Maturities',
        href: maturities(),
        icon: Bird,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" render={
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        } />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
