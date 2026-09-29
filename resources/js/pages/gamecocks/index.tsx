import { Button } from "@/components/ui/button";
import { index, create } from "@/routes/admin/gamecocks";
import { Head, Link } from "@inertiajs/react";
import { CirclePlus } from "lucide-react";
import { DataTable } from "./components/data-table";
import { columns, type Gamecock } from "./components/columns";

interface GamecockProps {
    gamecocks: Gamecock[];
}

export default function Gamecocks({ gamecocks }: GamecockProps) {
  return (
    <>
      <Head title="Gamecocks" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="flex justify-between">
            <h2 className="text-lg font-bold font-mono">Gamecocks</h2>
            <Button
                nativeButton={false}
                variant="outline"
                render={
                    <Link href={create()}>
                        <CirclePlus className="h-4 w-4" />
                        Add Gamecock
                    </Link>
                }
            />
        </div>
        <DataTable columns={columns} data={gamecocks} />
      </div>
    </>
  )
}

Gamecocks.layout = {
    breadcrumbs: [
        {
            title: 'Gamecocks',
            href: index(),
        },
    ],
};