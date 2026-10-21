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
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { approve, cancel } from "@/routes/admin/appointments";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Appointment = {
    id: number;
    user?: { id: number; name: string; email: string } | null;
    gamecock?: {
        id: number;
        bloodline?: { id: number; bloodline_name: string } | null;
    } | null;
    appointment_start_at: Date;
    appointment_end_at: Date;
    appointment_purpose: string;
    appointment_status: string;
    created_at: Date;
    updated_at: Date;
};

const statusStyles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    approved: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    cancelled: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        timeZone: "Asia/Manila",
    });
};

const formatDateTime = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Manila",
    });
};

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Appointment>();

const approveAppointment = (appointment: Appointment) => {
    router.patch(approve(appointment.id).url, {}, {
        preserveScroll: true,
        onSuccess: () => toast.success("Appointment approved."),
    });
};

const cancelAppointment = (appointment: Appointment) => {
    router.patch(cancel(appointment.id).url, {}, {
        preserveScroll: true,
        onSuccess: () => toast.success("Appointment cancelled."),
    });
};

export const columns = columnHelper.columns([
    columnHelper.accessor("appointment_start_at", {
        header: "Appointment Start At",
        cell: ({ row }) => {
            const formatted = formatDateTime(row.getValue("appointment_start_at"));
            return <div>{formatted}</div>;
        },
    }),
    columnHelper.accessor("appointment_end_at", {
        header: "Appointment End At",
        cell: ({ row }) => {
            const formatted = formatDateTime(row.getValue("appointment_end_at"));
            return <div>{formatted}</div>;
        },
    }),
    columnHelper.accessor("appointment_purpose", {
        header: "Appointment Purpose",
        cell: ({ row }) => {
            return <div className="capitalize">{row.getValue("appointment_purpose")}</div>;
        },
    }),
    columnHelper.display({
        id: "gamecock",
        header: "Gamecock",
        cell: ({ row }) => {
            return <div>{row.original.gamecock?.bloodline?.bloodline_name ?? "-"}</div>;
        },
    }),
    columnHelper.display({
        id: "user",
        header: "Requested By",
        cell: ({ row }) => {
            return <div>{row.original.user?.name ?? "-"}</div>;
        },
    }),
    columnHelper.accessor("appointment_status", {
        header: "Appointment Status",
        cell: ({ row }) => {
            const status = row.getValue<string>("appointment_status");

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
            const appointment = row.original;
            const canApprove = appointment.appointment_status === "pending";
            const canCancel = appointment.appointment_status !== "cancelled";

            if (!canApprove && !canCancel) {
                return null;
            }

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
                            {canApprove && (
                                <DropdownMenuItem
                                    onClick={() => approveAppointment(appointment)}
                                >
                                    Approve
                                </DropdownMenuItem>
                            )}
                            {canCancel && (
                                <DropdownMenuItem
                                    variant="destructive"
                                    onClick={() => cancelAppointment(appointment)}
                                >
                                    Cancel
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    }),
]);
