import { Head } from "@inertiajs/react";
import { Dot } from "lucide-react";

const procedures = [
    {
        id: 1,
        title: "Browse Available Gamecocks",
        description:
            "Explore our available high-quality gamecocks and their details.",
    },
    {
        id: 2,
        title: "Check Bloodline & Details",
        description:
            "View bloodlines, physical details and other important information.",
    },
    {
        id: 3,
        title: "Schedule Your Farm Visit",
        description:
            "Choose a convenient date and time to personally inspect gamecock's condition and finalize your purchase.",
    },
];

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <div className="space-y-20 mt-20">
                <div className="flex gap-4 border border-border rounded-lg p-10 shadow-lg/30">
                    <div className="w-1/2 my-auto space-y-5">
                        <div className="flex text-sm text-emerald-900 text-shadow-lg/10 font-semibold">
                            <p className="uppercase">Premium Gamecocks</p>
                            <Dot />
                            <p className="uppercase">Quality Bloodlines</p>
                            <Dot />
                            <p className="uppercase">Trusted Farm</p>
                        </div>
                        <div className="text-5xl text-shadow-lg/30 font-bold">
                            <p className="text-emerald-900">Book Your</p>
                            <p className="text-yellow-300">
                                Gamecock Farm Visit
                            </p>
                        </div>
                        <p className="text-sm text-neutral-600 text-shadow-lg/10 font-semibold">
                            Inspect our available gamecocks, check their
                            bloodlines, body condition, and arrange a convenient
                            farm visit at your preferred schedule.
                        </p>
                    </div>
                    <div className="w-1/2 flex justify-center">
                        <img
                            className="size-80 rounded-full drop-shadow-lg/90"
                            src="/hero-section.jpg"
                        />
                    </div>
                </div>
                <div className="space-y-8 mb-20">
                    <div className="space-y-2">
                        <p className="uppercase text-lg text-yellow-300 text-shadow-lg/30 font-bold">
                            How it works
                        </p>
                        <p className="text-5xl text-emerald-900 text-shadow-lg/30 fold-bold">
                            Simple Steps to{" "}
                            <span className="block">Book Your Visit</span>
                        </p>
                        <p className="text-neutral-600 text-shadow-lg/10">
                            Getting your preferred gamecock is easy.
                            <span className="block">
                                Just follow these 3 simple steps.
                            </span>
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-16">
                        {procedures.map((procedure) => (
                            <div
                                key={procedure.id}
                                className="flex items-center gap-8 p-8 border rounded-lg shadow-lg/30"
                            >
                                <div className="bg-yellow-300 size-18 aspect-square flex items-center justify-center rounded-full">
                                    <p className="text-emerald-900 font-bold text-2xl">
                                        {procedure.id}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 text-shadow-lg">
                                    <p className="font-bold">
                                        {procedure.title}
                                    </p>
                                    <p className="text-sm text-neutral-600">
                                        {procedure.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
