import { Link, router } from '@inertiajs/react';
import { IdCard, LogIn, LogOut, Settings } from 'lucide-react';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout as adminLogout } from '@/routes/admin';
import { login, register, logout as userLogout } from '@/routes';
import { edit as adminEdit } from '@/routes/admin/profile';
import { edit as userEdit } from '@/routes/profile';
import type { User } from '@/types';
import { useAdminRoute } from '@/hooks/use-admin-route';

type Props = {
    user: User;
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();
    const isAdminRoute = useAdminRoute();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <>
            {user && (
                <>
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <UserInfo user={user} showEmail={true} />
                            </div>
                        </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                </>
            )}
            {user ? (
                <>
                    <DropdownMenuGroup>
                        <DropdownMenuItem render={
                            <Link
                                className="block w-full cursor-pointer"
                                href={isAdminRoute ? adminEdit() : userEdit()}
                                prefetch
                                onClick={cleanup}
                            >
                                <Settings className="mr-2" />
                                Settings
                            </Link>
                        } />
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem nativeButton render={
                        <Link
                            className="block w-full cursor-pointer"
                            href={isAdminRoute ? adminLogout() : userLogout()}
                            as="button"
                            onClick={handleLogout}
                            data-test="logout-button"
                        >
                            <LogOut className="mr-2" />
                            Log out
                        </Link>
                    } />
                </>
            ) : (
                <>
                    <DropdownMenuGroup>
                        <DropdownMenuItem render={
                            <Link
                                className="block w-full cursor-pointer"
                                href={login()}
                            >
                                <LogIn className="mr-2" />
                                Log in
                            </Link>
                        } />
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem render={
                        <Link
                            className="block w-full cursor-pointer"
                            href={register()}
                        >
                            <IdCard className="mr-2" />
                            Register
                        </Link>
                    } />
                </>
            )}
        </>
    );
}
