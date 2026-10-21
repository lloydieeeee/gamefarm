import { Link } from '@inertiajs/react';
import { BicepsFlexed, Bird, CalendarDays, Dna, LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';
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
import { index as bloodlines } from '@/routes/admin/bloodlines';
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
        title: 'Bloodlines',
        href: bloodlines(),
        icon: Dna,
    },
    {
        title: 'Gamecocks',
        href: gamecocks(),
        icon: Bird,
    },
    {
        title: 'Maturities',
        href: maturities(),
        icon: BicepsFlexed,
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
