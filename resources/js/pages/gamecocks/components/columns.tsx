import { createColumnHelper, Row } from "@tanstack/react-table";

import { type DataTableFeatures } from "./data-table-features";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Link } from "@inertiajs/react";
import { destroy, edit } from "@/routes/admin/gamecocks";
import { Bloodline } from "@/pages/bloodlines/components/columns";
import { Maturity } from "@/pages/maturities/components/columns";
import { Badge } from "@/components/ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Gamecock = {
    id: number;
    bloodline_id: number;
    bloodline: Bloodline;
    maturity_id: number;
    maturity: Maturity;
    gamecock_image: string;
    gamecock_hatch_date: Date;
    gamecock_weight: number;
    gamecock_price: number;
    gamecock_status: string;
    created_at: Date;
    updated_at: Date;
};

const statusStyles: Record<string, string> = {
    reserved: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    available: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    sold: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        timeZone: "Asia/Manila",
    });
};

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Gamecock>();

export const columns = columnHelper.columns([
    columnHelper.accessor("gamecock_hatch_date", {
        header: "Gamecock Hatch Date",
        cell: ({ row }) => {
            const formatted = formatDate(row.getValue("gamecock_hatch_date"));
            return <div>{formatted}</div>;
        },
    }),
    columnHelper.accessor("gamecock_weight", {
        header: "Gamecock Weight",
        cell: ({ row }) => {
            const gamecock = row.original;

            return <div>{gamecock.gamecock_weight} {gamecock.gamecock_weight !== 1 ? "lbs" : "lb"}</div>;
        },
    }),
    columnHelper.accessor("gamecock_price", {
        header: "Gamecock Price",
        cell: ({ row }) => {
            const gamecock = row.original;

            return <div>&#8369; {gamecock.gamecock_price}</div>;
        },
    }),
    columnHelper.accessor("gamecock_status", {
        header: "Gamecock Status",
        cell: ({ row }) => {
            const status = row.getValue<string>("gamecock_status");

            return (
                <Badge
                    variant="outline"
                    className={`capitalize ${statusStyles[status] ?? ""}`}
                >
                    {status}
                </Badge>
            );
        },
    }),
    columnHelper.accessor("created_at", {
        header: "Created At",
        cell: ({ row }) => {
            const formatted = formatDate(row.getValue("created_at"));
            return <div>{formatted}</div>;
        },
    }),
    columnHelper.accessor("updated_at", {
        header: "Updated At",
        cell: ({ row }) => {
            const formatted = formatDate(row.getValue("updated_at"));
            return <div>{formatted}</div>;
        },
    }),
    columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
            const gamecock = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button variant="ghost" className="h-8 w-8 p-0" />
                        }
                    >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="start">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem nativeButton={false} render={
                                <Link href={edit(gamecock.id)}>Update</Link>
                            } />
                            <DropdownMenuItem
                                variant="destructive"
                                nativeButton 
                                render={
                                    <Link href={destroy(gamecock.id)} className="w-full">Delete</Link>
                                }
                            />
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    }),
]);
