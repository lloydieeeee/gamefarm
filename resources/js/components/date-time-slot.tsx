import React from "react";
import { format, startOfDay } from "date-fns";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays, Check } from "lucide-react";

export type DateTimeSlotValue = {
    start: Date;
    end: Date;
};

type DateTimeSlotProps = {
    /** Called with the picked slot, or `null` when the date is cleared. */
    onChange?: (value: DateTimeSlotValue | null) => void;
    startError?: string;
    endError?: string;
};

const START_HOUR = 8;
const END_HOUR = 17;
const SLOT_DURATION_MS = 60 * 60 * 1000;

const hours = Array.from(
    { length: END_HOUR - START_HOUR },
    (_, i) => START_HOUR + i,
);

function formatHour(hour: number) {
    const date = new Date(2000, 0, 1, hour);
    return format(date, "h:mm a");
}

export default function DateTimeSlot({
    onChange,
    startError,
    endError,
}: DateTimeSlotProps) {
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [selectedHour, setSelectedHour] = React.useState<number | null>(null);

    const start =
        date && selectedHour !== null
            ? new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate(),
                  selectedHour,
              )
            : undefined;

    const end = start ? new Date(start.getTime() + SLOT_DURATION_MS) : undefined;

    function handleSelectDate(nextDate: Date | undefined) {
        setDate(nextDate);
        setSelectedHour(null);
        onChange?.(null);
    }

    function handleSelectHour(hour: number) {
        setSelectedHour(hour);

        if (!date) {
            onChange?.(null);
            return;
        }

        const slotStart = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            hour,
        );

        onChange?.({
            start: slotStart,
            end: new Date(slotStart.getTime() + SLOT_DURATION_MS),
        });
    }

    return (
        <>
            <div className="grid gap-3">
                <label className="text-sm font-medium">Date</label>

                <Popover>
                    <PopoverTrigger
                        render={
                            <Button
                                variant="outline"
                                className="w-full justify-start gap-2"
                            >
                                <CalendarDays className="h-4 w-4" />
                                {date
                                    ? format(date, "MM/dd/yyyy")
                                    : "Select date"}
                            </Button>
                        }
                    />

                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleSelectDate}
                            disabled={{ before: startOfDay(new Date()) }}
                        />
                    </PopoverContent>
                </Popover>

                <InputError message={startError} />
            </div>

            <div className="grid gap-3">
                <label className="text-sm font-medium">Available hours</label>

                <div className="grid grid-cols-2 gap-2">
                    {hours.map((hour) => {
                        const isSelected = selectedHour === hour;

                        return (
                            <Button
                                key={hour}
                                type="button"
                                variant={isSelected ? "default" : "outline"}
                                className="justify-between"
                                onClick={() => handleSelectHour(hour)}
                            >
                                <span>
                                    {formatHour(hour)} – {formatHour(hour + 1)}
                                </span>
                                {isSelected && <Check className="h-4 w-4" />}
                            </Button>
                        );
                    })}
                </div>

                <InputError message={endError} />
            </div>

            {start && end && (
                <div className="rounded-lg bg-muted p-3">
                    <p className="text-sm text-muted-foreground">
                        Selected schedule
                    </p>
                    <p className="font-medium">
                        {format(start, "MM/dd/yyyy h:mm a")} –{" "}
                        {format(end, "h:mm a")}
                    </p>
                </div>
            )}
        </>
    );
}
