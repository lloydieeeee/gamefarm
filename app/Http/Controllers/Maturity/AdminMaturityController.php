<?php

namespace App\Http\Controllers\Maturity;

use App\Http\Controllers\Controller;
use App\Models\Maturity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminMaturityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('maturities/index', [
            'maturities' => Maturity::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('maturities/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'maturity_name' => ['required', 'unique:maturities,maturity_name', 'max:50'],
            'maturity_min_age' => ['required', 'numeric'],
            'maturity_max_age' => ['required', 'numeric'],
        ], [
            'maturity_name.required' => 'The maturity name field is required.',
            'maturity_name.unique' => 'The maturity name has already been taken.',
            'maturity_min_age.required' => 'The maturity min age field is required.',
            'maturity_min_age.numeric' => 'The maturiy min age field must be a number.',
            'maturity_max_age.required' => 'The maturity max age field is required.',
            'maturity_max_age.numeric' => 'The maturity max age field must be a number.',
        ]);

        Maturity::create($validated);

        return redirect()->intended(route('admin.maturities.index', absolute: false));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Maturity $maturity)
    {
        return Inertia::render('maturities/edit', [
            'maturity' => $maturity,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Maturity $maturity)
    {
        $validated = $request->validate([
            'maturity_name' => ['required', 'unique:room_statuses, name', 'max:50'],
            'maturity_min_age' => ['required', 'numeric'],
            'maturity_max_age' => ['required', 'numeric'],
        ], [
            'maturity_name.required' => 'The maturity name field is required.',
            'maturity_name.unique' => 'The maturity name has already been taken.',
            'maturity_min_age.required' => 'The maturity min age field is required.',
            'maturity_min_age.numeric' => 'The maturiy min age field must be a number.',
            'maturity_max_age.required' => 'The maturity max age field is required.',
            'maturity_max_age.numeric' => 'The maturity max age field must be a number.',
        ]);

        $maturity->update($validated);

        return redirect()->intended(route('admin.maturities.index', absolute: false));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Maturity $maturity)
    {
        $maturity->delete();

        return redirect()->intended(route('admin.maturities.index', absolute: false));
    }
}
