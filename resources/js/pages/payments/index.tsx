import { Button } from "@/components/ui/button";
import { index as payments } from "@/routes/admin/payments";
import { Head, Link } from "@inertiajs/react";
import { CirclePlus } from "lucide-react";

export default function Payments() {
  return (
    <>
      <Head title="Payments" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="flex justify-between">
            <h2 className="text-lg font-bold font-mono">Payments</h2>
            <Button
                nativeButton={false}
                variant="outline"
                render={
                    <Link>
                        <CirclePlus className="h-4 w-4" />
                        Add Payment
                    </Link>
                }
            />
        </div>
      </div>
    </>
  )
}

Payments.layout = {
    breadcrumbs: [
        {
            title: 'Payments',
            href: payments(),
        },
    ],
};