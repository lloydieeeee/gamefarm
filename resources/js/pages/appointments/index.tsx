import { Button } from "@/components/ui/button";
import { index as appointments } from "@/routes/admin/appointments";
import { Head, Link } from "@inertiajs/react";
import { CirclePlus } from "lucide-react";
import { DataTable } from "./components/data-table";
import { columns, type Appointment } from "./components/columns";

interface AppointmentProps {
    appointments: Appointment[];
}

export default function Appointments({ appointments }: AppointmentProps) {
  return (
    <>
      <Head title="Appointments" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="flex justify-between">
            <h2 className="text-lg font-bold font-mono">Appointments</h2>
        </div>
        <DataTable columns={columns} data={appointments} />
      </div>
    </>
  )
}

Appointments.layout = {
    breadcrumbs: [
        {
            title: 'Appointments',
            href: appointments(),
        },
    ],
};