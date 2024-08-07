"use client"
import React from "react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/context/AuthStore";
import { Asterisk, Bell, Book, CircleDollarSign, FlagTriangleRightIcon, House, Menu, MessageCircleMore, MountainIcon, Search, Tag, UserIcon } from "lucide-react";

const UsernameLayout = ({ children }: { children: React.ReactNode }) => {
    const user = useAuthStore((state) => state.user);

    const pathname = usePathname();

    const sideNav = user?.is_superuser && pathname.includes('/admin') ? [
        {
            name: "Purchase",
            icon: <CircleDollarSign className="h-5 w-5" />,
            href: `/user/${user?.username}/admin/purchase`,
        },
        {
            name: "Add Notification",
            icon: <Bell className="h-5 w-5" />,
            href: `/user/${user?.username}/admin/add-notification`,
        },
        {
            name: "Add Report",
            icon: <FlagTriangleRightIcon className="h-5 w-5" />,
            href: `/user/${user?.username}/admin/add-report`,
        },
        {
            name: "Feedback",
            icon: <MessageCircleMore className="h-5 w-5" />,
            href: `/user/${user?.username}/admin/feedback`,
        },
        {
            name: "Courses",
            icon: <Book className="h-5 w-5" />,
            href: `/user/${user?.username}/admin/courses`,
        },
        {
            name: "Users",
            icon: <UserIcon className="h-5 w-5" />,
            href: `/user/${user?.username}/admin/users`,
        },
        {
            name: "Cupone Codes",
            icon: <Asterisk className="h-5 w-5" />,
            href: `/user/${user?.username}/admin/cupone-codes`,
        },
    ] : [
        {
            name: "Dashboard",
            icon: <House className="h-5 w-5" />,
            href: `/user/${user?.username}`,
        },
        {
            name: "Courses",
            icon: <Book className="h-5 w-5" />,
            href: `/user/${user?.username}/purchesed-courses`,
        },
        {
            name: "Transactions",
            icon: <CircleDollarSign className="h-5 w-5" />,
            href: `/user/${user?.username}/transactions`,
        },
        {
            name: "Feedback",
            icon: <FlagTriangleRightIcon className="h-5 w-5" />,
            href: `/user/${user?.username}/feedback`,
        },
        {
            name: "Referrals",
            icon: <Tag className="h-5 w-5" />,
            href: `/user/${user?.username}/referrals`,
        }
    ]

    return <main className="flex min-h-screen w-full">
        <aside className="fixed inset-y-0 left-0 z-50 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Link href="/"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                        prefetch={false}>
                        <MountainIcon className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    {
                        sideNav.map((item, i) => {
                            return <Tooltip key={i}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.href}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground"
                                        prefetch={false}
                                    >
                                        {item.icon}
                                        <span className="sr-only">
                                            {item.name}
                                        </span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    {item.name}
                                </TooltipContent>
                            </Tooltip>
                        })
                    }
                </TooltipProvider>
            </nav>
        </aside>
        <section className="sm:gap-4 sm:pl-14 w-full">
            <header className="sticky top-0 flex h-14 w-full items-center justify-between sm:justify-end gap-4 px-4 sm:px-6 bg-background">
                <div className="sm:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link href="/" className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base" prefetch={false}>
                                    <MountainIcon className="h-4 w-4 transition-all group-hover:scale-110" />
                                    <span className="sr-only">
                                        Acme Inc
                                    </span>
                                </Link>
                                {
                                    sideNav.map((item, i) => {
                                        return <Link href={item.href} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" prefetch={false} key={i}>
                                            {item.icon}
                                            <span>
                                                {item.name}
                                            </span>
                                        </Link>
                                    })
                                }
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="relative flex-1 sm:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search courses..."
                        className="w-full rounded-lg bg-background pl-8 sm:w-[400px] lg:w-[536px]"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" className="rounded-full">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                                <UserIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            {children}
        </section>
    </main>
}

export default UsernameLayout