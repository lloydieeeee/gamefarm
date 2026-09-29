<?php

namespace App\Http\Controllers\Gamecock;

use App\Http\Controllers\Controller;
use App\Models\Gamecock;
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
        return Inertia::render('gamecocks/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'gamecock_hatch_date' => ['required', 'unique:maturities,maturity_name', 'max:50'],
            'gamecock_weight' => ['required', 'numeric'],
            'gamecock_price' => ['required', 'numeric'],
        ], [
            'maturity_name.required' => 'The maturity name field is required.',
            'maturity_name.unique' => 'The maturity name has already been taken.',
            'maturity_min_age.required' => 'The maturity min age field is required.',
            'maturity_min_age.numeric' => 'The maturiy min age field must be a number.',
            'maturity_max_age.required' => 'The maturity max age field is required.',
            'maturity_max_age.numeric' => 'The maturity max age field must be a number.',
        ]);

        Gamecock::create($validated);

        return redirect()->intended(route('admin.gamecocks.index', absolute: false));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gamecock $gamecock)
    {
        //
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
