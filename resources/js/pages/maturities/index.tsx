import { Button } from "@/components/ui/button";
import { index, create } from "@/routes/admin/maturities";
import { Head, Link } from "@inertiajs/react";
import { CirclePlus } from "lucide-react";
import { DataTable } from "./components/data-table";
import { columns, type Maturity } from "./components/columns";

interface MaturityProps {
    maturities: Maturity[];
}

export default function Maturities({ maturities }: MaturityProps) {
    return (
        <>
            <Head title="Maturities" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-between">
                    <h2 className="text-lg font-bold font-mono">Maturities</h2>
                    <Button
                        nativeButton={false}
                        variant="outline"
                        render={
                            <Link href={create()}>
                                <CirclePlus className="h-4 w-4" />
                                Add Maturity
                            </Link>
                        }
                    />
                </div>
                <DataTable columns={columns} data={maturities} />
            </div>
        </>
    );
}

Maturities.layout = {
    breadcrumbs: [
        {
            title: "Maturities",
            href: index(),
        },
    ],
};
