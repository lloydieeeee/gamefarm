import { Button } from "@/components/ui/button";
import { index, create } from "@/routes/admin/bloodlines";
import { Head, Link } from "@inertiajs/react";
import { CirclePlus } from "lucide-react";
import { DataTable } from "./components/data-table";
import { columns, type Bloodline } from "./components/columns";

interface BloodlineProps {
    bloodlines: Bloodline[];
}

export default function Bloolines({ bloodlines }: BloodlineProps) {
    return (
        <>
            <Head title="Bloodlines" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-between">
                    <h2 className="text-lg font-bold font-mono">Bloodlines</h2>
                    <Button
                        nativeButton={false}
                        variant="outline"
                        render={
                            <Link href={create()}>
                                <CirclePlus className="h-4 w-4" />
                                Add Bloodline
                            </Link>
                        }
                    />
                </div>
                <DataTable columns={columns} data={bloodlines} />
            </div>
        </>
    );
}

Bloolines.layout = {
    breadcrumbs: [
        {
            title: "Bloodlines",
            href: index(),
        },
    ],
};
