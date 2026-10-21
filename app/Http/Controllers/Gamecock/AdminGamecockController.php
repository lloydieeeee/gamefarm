<?php

namespace App\Http\Controllers\Gamecock;

use App\Enums\GamecockStatus;
use App\Http\Controllers\Controller;
use App\Models\Bloodline;
use App\Models\Gamecock;
use App\Models\Maturity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminGamecockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('gamecocks/index', [
            'gamecocks' => Gamecock::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('gamecocks/create', [
            'bloodlines' => Bloodline::all(),
            'maturities' => Maturity::all(),
            'gamecock_statuses' => GamecockStatus::options()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'bloodline_id' => ['required', 'integer', 'exists:bloodlines,id'],
            'maturity_id' => ['required', 'integer', 'exists:maturities,id'],
            'gamecock_hatch_date' => ['required'],
            'gamecock_weight' => ['required', 'numeric'],
            'gamecock_price' => ['required', 'numeric'],
            'gamecock_status' => ['required', 'max:50'],
            'gamecock_image' => ['nullable', 'image', 'mimetypes:image/*', 'max:2048'],
        ], [
            'bloodline_id.required' => 'The gamecock bloodline field is required.',
            'maturity_id.required' => 'The gamecock maturity field is required.',
            'gamecock_hatch_date.required' => 'The gamecock hatch date field is required.',
            'gamecock_weight.required' => 'The gamecock weight field is required.',
            'gamecock_weight.numeric' => 'The gamecock weight field must be a number.',
            'gamecock_price.required' => 'The gamecock price field is required.',
            'gamecock_price.numeric' => 'The gamecock price field must be a number.',
            'gamecock_status.required' => 'The gamecock price field is required.',
            'gamecock_status.max' => 'The gamecock price field must not exceed :max characters.',
        ]);

        if ($request->hasFile('gamecock_image')) {
            $file = $request->file('gamecock_image');
            $filename = time() . '_' . $file->getClientOriginalName();

            $path = $file->storeAs('images', $filename, 'public');
            $validated['gamecock_image'] = '/storage/' . $path;
        }

        Gamecock::create($validated);

        return redirect()->intended(route('admin.gamecocks.index', absolute: false));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gamecock $gamecock)
    {
        return Inertia::render('gamecocks/edit', [
            'bloodlines' => Bloodline::all(),
            'maturities' => Maturity::all(),
            'gamecock' => $gamecock,
            'gamecock_statuses' => GamecockStatus::options()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gamecock $gamecock)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gamecock $gamecock)
    {
        //
    }
}
