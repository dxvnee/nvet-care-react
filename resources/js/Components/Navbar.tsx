import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import {
    BellIcon,
    ChevronDownIcon,
    ClipboardListIcon,
    CloseIcon,
    LogoutIcon,
    MenuIcon,
    UserCircleIcon,
} from '@/Components/Icons';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface NavbarProps {
    user?: User;
    className?: string;
}

export default function Navbar({
    user: propUser,
    className = '',
}: NavbarProps = {}) {
    const authUser = usePage().props.auth.user;
    const user = propUser || authUser;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const getInitials = (name?: string) => {
        if (!name) return 'NV';
        const parts = name.trim().split(' ');
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    return (
        <nav
            className={`shadow-xs sticky top-0 z-40 border-b border-nvet-light/30 bg-white/95 backdrop-blur-md ${className}`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between sm:h-20">
                    {/* Clinic Logo and Brand */}
                    <div className="flex items-center space-x-6 sm:space-x-8">
                        <Link
                            href="/"
                            className="group flex items-center gap-3"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center transition-transform duration-200 group-hover:scale-105 sm:h-14 sm:w-14">
                                <ApplicationLogo className="h-full w-full object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-heading text-lg font-bold tracking-tight text-nvet-dark sm:text-2xl">
                                    NVet Care
                                </span>
                                <span className="sm:inline-block hidden text-[11px] font-medium tracking-wide text-nvet-primary/80">
                                    Layanan Kesehatan Anabul Digital
                                </span>
                            </div>
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden md:flex md:space-x-1 md:ps-10 lg:space-x-2">
                            <NavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                                className="rounded-xl px-3.5 py-2 text-sm font-medium transition-colors"
                            >
                                Dashboard
                            </NavLink>
                        </div>
                    </div>

                    {/* User Avatar */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-4">
                        {/* Notifications Button */}
                        <button
                            type="button"
                            aria-label="Notifikasi"
                            className="relative rounded-xl p-2 text-stone-500 transition-colors hover:bg-nvet-cream/50 hover:text-nvet-dark focus:outline-none focus:ring-2 focus:ring-nvet-primary/30"
                        >
                            <BellIcon className="h-5 w-5" />
                            <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
                            </span>
                        </button>

                        {/* User Dropdown */}
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="shadow-xs group flex items-center gap-3 rounded-2xl border border-nvet-light/40 bg-white p-1.5 pr-3 text-sm font-medium text-nvet-dark transition-all duration-150 hover:border-nvet-primary/50 hover:bg-nvet-bg focus:outline-none focus:ring-2 focus:ring-nvet-primary/30"
                                    >
                                        <div className="shadow-xs flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-nvet-dark to-nvet-primary text-xs font-bold tracking-wider text-white">
                                            {getInitials(user?.name)}
                                        </div>

                                        <div className="flex flex-col text-left">
                                            <span className="line-clamp-1 max-w-[120px] font-semibold leading-tight text-nvet-dark">
                                                {user?.name}
                                            </span>
                                            <span className="text-[10px] font-medium text-nvet-primary">
                                                Pemilik Anabul
                                            </span>
                                        </div>

                                        <ChevronDownIcon className="h-4 w-4 text-stone-400 transition-transform duration-150 group-hover:text-nvet-dark" />
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content contentClasses="py-1 bg-white rounded-2xl border border-nvet-light/50 shadow-xl overflow-hidden min-w-[200px]">
                                    <div className="border-b border-stone-100 bg-nvet-bg/40 px-4 py-3">
                                        <p className="text-xs text-stone-500">
                                            Masuk sebagai
                                        </p>
                                        <p className="truncate text-sm font-semibold text-nvet-dark">
                                            {user?.name}
                                        </p>
                                        <p className="truncate text-xs text-stone-400">
                                            {user?.email}
                                        </p>
                                    </div>

                                    <Dropdown.Link
                                        href={route('profile.edit')}
                                        className="flex items-center gap-2 text-stone-700 hover:bg-nvet-cream/40"
                                    >
                                        <UserCircleIcon className="h-4 w-4 text-stone-500" />
                                        Profil Saya
                                    </Dropdown.Link>

                                    <Dropdown.Link
                                        href={route('dashboard')}
                                        className="flex items-center gap-2 text-stone-700 hover:bg-nvet-cream/40"
                                    >
                                        <ClipboardListIcon className="h-4 w-4 text-stone-500" />
                                        Riwayat Konsultasi
                                    </Dropdown.Link>

                                    <div className="my-1 border-t border-stone-100"></div>

                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="flex w-full items-center gap-2 text-rose-600 hover:bg-rose-50"
                                    >
                                        <LogoutIcon className="h-4 w-4 text-rose-500" />
                                        Keluar
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center gap-2 sm:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState,
                                )
                            }
                            aria-label="Toggle menu"
                            className="inline-flex items-center justify-center rounded-xl p-2.5 text-stone-600 hover:bg-nvet-cream/50 hover:text-nvet-dark focus:outline-none focus:ring-2 focus:ring-nvet-primary/30"
                        >
                            {showingNavigationDropdown ? (
                                <CloseIcon className="h-6 w-6" />
                            ) : (
                                <MenuIcon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
                className={
                    (showingNavigationDropdown ? 'block' : 'hidden') +
                    ' border-t border-nvet-light/30 bg-white/95 px-4 pb-4 pt-3 shadow-lg sm:hidden'
                }
            >
                <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                    <div className="shadow-xs flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-nvet-dark to-nvet-primary text-sm font-bold text-white">
                        {getInitials(user?.name)}
                    </div>
                    <div>
                        <div className="text-base font-semibold text-nvet-dark">
                            {user?.name}
                        </div>
                        <div className="text-xs text-stone-500">
                            {user?.email}
                        </div>
                    </div>
                </div>

                <div className="mt-3 space-y-1">
                    <ResponsiveNavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        className="rounded-xl"
                    >
                        Dashboard
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route('profile.edit')}
                        className="rounded-xl"
                    >
                        Profil Saya
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        method="post"
                        href={route('logout')}
                        as="button"
                        className="rounded-xl text-rose-600"
                    >
                        Keluar
                    </ResponsiveNavLink>
                </div>
            </div>
        </nav>
    );
}
