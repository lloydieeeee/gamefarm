import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { index, store } from "@/routes/admin/bloodlines";
import { Form, Head, Link } from "@inertiajs/react";
import { Bloodline } from "./components/columns";

interface BloodlineProps {
    bloodline: Bloodline;
}

export default function EditBloodlines({ bloodline }: BloodlineProps) {
    return (
        <>
            <Head title="Update Maturities" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mt-20 space-y-2 px-6 lg:px-8">
                    <Form method="POST" action={store()}>
                        {({ processing, errors }) => (
                            <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Bloodline Name</Label>
                                    <Input
                                        id="name"
                                        name="bloodline_name"
                                        defaultValue={bloodline.bloodline_name}
                                    />
                                    <InputError
                                        message={errors.bloodline_name}
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

EditBloodlines.layout = {
    breadcrumbs: [
        {
            title: "Bloodlines",
            href: index(),
        },
        {
            title: "Update Bloodlines",
            href: "#",
        },
    ],
};
