import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { index, store } from "@/routes/admin/maturities";
import { Form, Head, Link } from "@inertiajs/react";
import { Maturity } from "./components/columns";

interface MaturityProps {
    maturity: Maturity;
}

export default function EditMaturities({ maturity }: MaturityProps) {
    return (
        <>
            <Head title="Update Maturities" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mt-20 space-y-2 px-6 lg:px-8">
                    <Form method="POST" action={store()}>
                        {({ processing, errors }) => (
                            <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Maturity Name</Label>
                                    <Input
                                        id="name"
                                        name="maturity_name"
                                        defaultValue={maturity.maturity_name}
                                        autoComplete="off"
                                    />
                                    <InputError
                                        message={errors.maturity_name}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="min_age">
                                        Maturity Min Age (in months)
                                    </Label>
                                    <Input
                                        id="min_age"
                                        name="maturity_min_age"
                                        type="number"
                                        defaultValue={maturity.maturity_min_age}
                                    />
                                    <InputError
                                        message={errors.maturity_max_age}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="max_age">
                                        Maturity Max Age (in months)
                                    </Label>
                                    <Input
                                        id="max_age"
                                        name="maturity_max_age"
                                        type="number"
                                        defaultValue={maturity.maturity_max_age}
                                    />
                                    <InputError
                                        message={errors.maturity_max_age}
                                    />
                                </div>
                                <div className="flex justify-end gap-3">
                                    <Button type="submit" disabled={processing}>
                                        {processing && <Spinner />}
                                        Save
                                    </Button>
                                    <Button
                                        nativeButton={false}
                                        variant="secondary"
                                        render={
                                            <Link href={index()}>
                                                Cancel
                                            </Link>
                                        }
                                    />
                                </div>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
}

EditMaturities.layout = {
    breadcrumbs: [
        {
            title: "Maturities",
            href: index(),
        },
        {
            title: "Update Maturities",
            href: "#",
        },
    ],
};
