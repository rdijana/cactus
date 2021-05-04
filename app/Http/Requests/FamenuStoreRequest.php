<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FamenuStoreRequest extends FormRequest
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
            'name'=>[
                'bail',
                'required',
                'unique:famenus',
                'regex:/^[\wŠĐČĆŽšđčćž\d\.\-\/\s]{3,50}$/'
            ],
            'path'=>[
                'bail',
                'required',
                'unique:famenus',
                'regex:/^[\wŠĐČĆŽšđčćž\d\.\/]{3,50}$/'
            ]
        ];
    }
    public function messages()
    {
        return[
            'required' => 'Polje :attribute je obavezno.',
            'name.unique'=>'Ime već postoji u bazi',
            'path.unique'=>'Putanja već postoji u bazi',
            'name.regex'=>'Ime linka nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.',
            'path.regex'=>'Naziv putanje nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.'

        ];
    }
}
