import AlertError from "@/components/alert-error";
import DateTimeSlot, { DateTimeSlotValue } from "@/components/date-time-slot";
import InputError from "@/components/input-error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Gamecock } from "@/pages/gamecocks/components/columns";
import { login } from "@/routes";
import { store as appointmentStore } from "@/routes/appointments";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import React from "react";

interface AppointmentPurpose {
    label: string;
    value: string;
}

interface GamecockProps {
    gamecocks: Gamecock[];
    appointment_purposes: AppointmentPurpose[];
}

export default function Gamecocks({ gamecocks, appointment_purposes }: GamecockProps) {
    return (
        <>
            <Head title="Gamecocks" />

            <div className="space-y-10 mt-20">
                <div className="grid auto-rows-min gap-x-4 gap-y-12 md:grid-cols-3 last:mb-20">
                    {gamecocks.map((gamecock) => (
                        <Card
                            className="relative mx-auto w-full max-w-sm pt-0"
                            key={gamecock.id}
                        >
                            <div className="absolute inset-0 z-30 aspect-video" />
                            <img
                                src={gamecock.gamecock_image}
                                alt="Event cover"
                                className="relative z-20 aspect-video w-full object-cover"
                            />
                            <CardHeader>
                                <CardAction>
                                    <Badge
                                        variant="outline"
                                        className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 capitalize"
                                    >
                                        {gamecock.gamecock_status}
                                    </Badge>
                                </CardAction>
                                <CardTitle>
                                    {gamecock.bloodline.bloodline_name}
                                </CardTitle>
                                <CardDescription>
                                    <div className="grid">
                                        <span className="flex gap-1">
                                            Weight:{" "}
                                            {gamecock.gamecock_weight}{" "}
                                            {gamecock.gamecock_weight !== 1 ? "lbs" : "lb"}
                                        </span>
                                        <span>
                                            Maturity:{" "}
                                            {gamecock.maturity.maturity_name}
                                        </span>
                                    </div>
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <AppointmentDialog
                                    gamecockId={gamecock.id}
                                    purposes={appointment_purposes}
                                />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

function AppointmentDialog({
    gamecockId,
    purposes,
}: {
    gamecockId: number;
    purposes: AppointmentPurpose[];
}) {
    const { auth } = usePage().props;
    const [open, setOpen] = React.useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        gamecock_id: gamecockId,
        appointment_start_at: "",
        appointment_end_at: "",
        appointment_purpose: "",
    });

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen);

        if (!nextOpen) {
            reset();
            clearErrors();
        }
    };

    const handleSlotChange = (slot: DateTimeSlotValue | null) => {
        setData({
            ...data,
            appointment_start_at: slot ? slot.start.toISOString() : "",
            appointment_end_at: slot ? slot.end.toISOString() : "",
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(appointmentStore().url, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Your appointment has been scheduled.");
                reset();
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger
                render={<Button className="w-full">Make appointment</Button>}
            />
            <DialogContent>
                {!auth.user ? (
                    <div className="space-y-4">
                        <DialogTitle className="text-lg font-semibold">
                            Log in to book
                        </DialogTitle>
                        <DialogDescription>
                            You need an account to schedule a time slot for this
                            gamecock.
                        </DialogDescription>
                        <Button
                            className="w-full"
                            nativeButton={false}
                            render={<Link href={login().url}>Log in</Link>}
                        />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <DialogTitle className="text-lg font-semibold">
                                Schedule a time slot
                            </DialogTitle>
                            <DialogDescription>
                                Choose a date and a one-hour slot.
                            </DialogDescription>
                        </div>

                        <DateTimeSlot
                            onChange={handleSlotChange}
                            startError={errors.appointment_start_at}
                            endError={errors.appointment_end_at}
                        />

                        <div className="grid gap-3">
                            <Label htmlFor={`appointment-purpose-${gamecockId}`}>
                                Appointment Purpose
                            </Label>
                            <Select
                                id={`appointment-purpose-${gamecockId}`}
                                items={purposes}
                                name="appointment_purpose"
                                value={data.appointment_purpose || null}
                                onValueChange={(value) =>
                                    setData("appointment_purpose", value ?? "")
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select purpose" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Purpose</SelectLabel>
                                        {purposes.map((item) => (
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
                            <InputError message={errors.appointment_purpose} />
                        </div>

                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing && <Spinner />}
                            Confirm schedule
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
