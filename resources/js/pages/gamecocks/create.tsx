import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { index, store } from "@/routes/admin/gamecocks";
import { Form, Head, Link } from "@inertiajs/react";

export default function CreateGamecocks() {
    return (
        <>
            <Head title="Add Maturities" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mt-20 space-y-2 px-6 lg:px-8">
                    <Form method="POST" action={store()}>
                        {({ processing, errors }) => (
                            <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="hatch_date">Gamecock Hatch Date</Label>
                                    <Input
                                        id="hatch_date"
                                        name="gamecock_hatch_date"
                                    />
                                    <InputError
                                        message={errors.gamecock_hatch_date}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="weight">
                                        Gamecock Weight
                                    </Label>
                                    <Input
                                        id="weight"
                                        name="gamecock_weight"
                                        type="number"
                                    />
                                    <InputError
                                        message={errors.gamecock_weight}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="price">
                                        Gamecock Price
                                    </Label>
                                    <Input
                                        id="price"
                                        name="gamecock_price"
                                        type="number"
                                    />
                                    <InputError
                                        message={errors.gamecock_price}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="status">
                                        Gamecock Status
                                    </Label>
                                    <Input
                                        id="status"
                                        name="gamecock_status"
                                    />
                                    <InputError
                                        message={errors.gamecock_status}
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

CreateGamecocks.layout = {
    breadcrumbs: [
        {
            title: "Gamecocks",
            href: index(),
        },
        {
            title: "Add Gamecocks",
            href: "#",
        },
    ],
};
