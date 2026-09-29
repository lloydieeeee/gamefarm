import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import { Head } from "@inertiajs/react";

export default function Gamecocks() {
    return (
        <>
            <Head title="Gamecocks" />

            <div className="space-y-10 mt-20">
                <div className="flex justify-between">
                    <h1 className="text-xl font-bold font-mono">Gamecock Maturity Classification:</h1>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card>
                        <div className="px-6">
                            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            </div>
                        </div>
                        <CardHeader>
                            <CardTitle>Stag</CardTitle>
                            <CardDescription className="grid gap-2">
                                <div className="space-x-1">
                                    <span className="font-bold">
                                        Age/Maturity:
                                    </span>
                                    <span>4 - 12 months</span>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <div className="px-6">
                            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            </div>
                        </div>
                        <CardHeader>
                            <CardTitle>Bull Stag</CardTitle>
                            <CardDescription className="grid gap-2">
                                <div className="space-x-1">
                                    <span className="font-bold">
                                        Age/Maturity:
                                    </span>
                                    <span>12 - 18 months</span>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <div className="px-6">
                            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            </div>
                        </div>
                        <CardHeader>
                            <CardTitle>Cock</CardTitle>
                            <CardDescription className="grid gap-2">
                                <div className="space-x-1">
                                    <span className="font-bold">
                                        Age/Maturity:
                                    </span>
                                    <span>18 - 24 months</span>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <div className="px-6">
                            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            </div>
                        </div>
                        <CardHeader>
                            <CardTitle>Brood Stag</CardTitle>
                            <CardDescription className="grid gap-2">
                                <div className="space-x-1">
                                    <span className="font-bold">
                                        Age/Maturity:
                                    </span>
                                    <span>24 - 36 months</span>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </>
    );
}
