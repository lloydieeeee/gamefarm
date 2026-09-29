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
import { destroy, edit } from "@/routes/admin/maturities";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Appointment = {
    id: number;
    appointment_start_at: Date;
    appointment_end_at: Date;
    appointment_purpose: string;
    appointment_status: string;
    created_at: Date;
    updated_at: Date;
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        timeZone: "Asia/Manila",
    });
};

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Appointment>();

export const columns = columnHelper.columns([
    columnHelper.accessor("appointment_start_at", {
        header: "Appointment Start At",
    }),
    columnHelper.accessor("appointment_end_at", {
        header: "Appointment End At",
    }),
    columnHelper.accessor("appointment_purpose", {
        header: "Appointment Purpose",
    }),
    columnHelper.accessor("appointment_status", {
        header: "Appointment Status",
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
            const maturity = row.original;

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
                    <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem render={
                                <Link href={edit(maturity.id)}>Update</Link>
                            } />
                            <DropdownMenuItem render={
                                <Link href={destroy(maturity.id)}>Delete</Link>
                            } />
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    }),
]);
