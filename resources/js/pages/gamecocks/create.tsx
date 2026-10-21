import React from "react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { index, store } from "@/routes/admin/gamecocks";
import { Form, Head, Link } from "@inertiajs/react";
import { Bloodline } from "@/pages/bloodlines/components/columns";
import { Maturity } from "@/pages/maturities/components/columns";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface GamecockStatus {
    label: string;
    value: string;
}

interface GamecockProps {
    bloodlines: Bloodline[];
    maturities: Maturity[];
    gamecock_statuses: GamecockStatus[];
}

export default function CreateGamecock({
    bloodlines,
    maturities,
    gamecock_statuses
}: GamecockProps) {
    console.log(gamecock_statuses)
    const bloodlineItems = bloodlines.map((option) => ({
        value: option.id,
        label: option.bloodline_name,
    }));

    const maturityItems = maturities.map((option) => ({
        value: option.id,
        label: option.maturity_name,
    }));

    const [preview, setPreview] = React.useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <Head title="Add Gamecock" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mt-20 space-y-2 px-6 lg:px-8">
                    <Form method="POST" action={store()}>
                        {({ processing, errors }) => (
                            <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="bloodline">
                                        Gamecock Bloodline
                                    </Label>
                                    <Select id="bloodline" items={bloodlineItems} name="bloodline_id">
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Bloodlines
                                                </SelectLabel>
                                                {bloodlineItems.map((item) => (
                                                    <SelectItem
                                                        key={item.value}
                                                        value={item.value}
                                                    >
                                                        {item.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.bloodline_id} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="hatch_date">
                                        Gamecock Hatch Date
                                    </Label>
                                    <Input
                                        id="hatch_date"
                                        name="gamecock_hatch_date"
                                        type="date"
                                    />
                                    <InputError
                                        message={errors.gamecock_hatch_date}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="maturity">
                                        Gamecock Maturity
                                    </Label>
                                    <Select id="maturity" items={maturityItems} name="maturity_id">
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Maturities
                                                </SelectLabel>
                                                {maturityItems.map((item) => (
                                                    <SelectItem
                                                        key={item.value}
                                                        value={item.value}
                                                    >
                                                        {item.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.bloodline_id} />
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
                                    <Select id="status" items={gamecock_statuses} name="gamecock_status">
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Status
                                                </SelectLabel>
                                                {gamecock_statuses.map((item) => (
                                                    <SelectItem
                                                        key={item.value}
                                                        value={item.value}
                                                    >
                                                        {item.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <InputError
                                        message={errors.gamecock_status}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="image">
                                        Gamecock Image
                                    </Label>
                                    <Input
                                        id="image"
                                        name="gamecock_image"
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                    <InputError
                                        message={errors.gamecock_image}
                                    />
                                </div>
                                {preview && (
                                    <div className="mb-3">
                                        <p className="font-medium text-sm mb-2">
                                            Gamecock Image Preview
                                        </p>
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-80 object-cover rounded"
                                        />
                                    </div>
                                )}
                                <div className="flex justify-end gap-3">
                                    <Button type="submit" disabled={processing}>
                                        {processing && <Spinner />}
                                        Save
                                    </Button>
                                    <Button
                                        nativeButton={false}
                                        variant="secondary"
                                        render={
                                            <Link href={index()}>Cancel</Link>
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

CreateGamecock.layout = {
    breadcrumbs: [
        {
            title: "Gamecocks",
            href: index(),
        },
        {
            title: "Add Gamecock",
            href: "#",
        },
    ],
};
