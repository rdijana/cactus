<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title'=>[
                'bail',
                'required',
                'regex:/^[\wŠĐČĆŽšđčćž\d\/\-\s]{5,50}$/'
            ],
            'description'=>[
                'bail',
                'required'
            ],
            'content'=>[
                'bail',
                'required'
            ],
            'picture'=>[
                'bail',
                'image',
                'mimes:jpg,jpeg,png',
                'max:2000'
            ],
            'category'=>[
                'bail',
                'required',
                'exists:categories,id'
            ]
        ];
    }
    public function messages()
    {
        return[
            'required' => 'Polje :attribute je obavezno.',
            'picture.image' => 'Fajl mora biti slika.',
            'picture.mimes' => 'Formati slike mogu biti jpg,jpeg,png.',
            'picture.max' => 'Uploaded fajl ne može biti veći od :max kilobajta.',
            'category.exists' => 'Kategorija ne postoji u bazi.'
        ];
    }
}
