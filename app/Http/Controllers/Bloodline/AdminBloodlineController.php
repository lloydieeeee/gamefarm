<?php

namespace App\Http\Controllers\Bloodline;

use App\Http\Controllers\Controller;
use App\Models\Bloodline;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminBloodlineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('bloodlines/index', [
            'bloodlines' => Bloodline::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('bloodlines/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'bloodline_name' => ['required', 'unique:bloodlines,bloodline_name', 'max:50'],
        ], [
            'bloodline_name.required' => 'The bloodline name field is required.',
            'bloodline_name.unique' => 'The bloodline name has already been taken.',
            'bloodline_name.max' => 'The bloodline name field must not exceed :max characters.',
        ]);

        Bloodline::create($validated);

        return redirect()->intended(route('admin.bloodlines.index', absolute: false));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bloodline $bloodline)
    {
        return Inertia::render('bloodlines/edit', [
            'bloodline' => $bloodline,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bloodline $bloodline)
    {
        $validated = $request->validate([
            'bloodline_name' => ['required', 'unique:bloodlines,bloodline_name', 'max:50'],
        ], [
            'bloodline_name.required' => 'The bloodline name field is required.',
            'bloodline_name.unique' => 'The bloodline name has already been taken.',
        ]);

        $bloodline->update($validated);

        return redirect()->intended(route('admin.bloodlines.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bloodline $bloodline)
    {
        $bloodline->delete();

        return redirect()->intended(route('admin.bloodlines.index'));
    }
}
