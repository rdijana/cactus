<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FamenuUpdateRequest extends FormRequest
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
            'nameE'=>[
                'bail',
                'required',
                'regex:/^[\wŠĐČĆŽšđčćž\d\.\-\/\s]{3,50}$/'
            ],
            'pathE'=>[
                'bail',
                'required',
                'regex:/^[\wŠĐČĆŽšđčćž\d\.\/]{3,50}$/'
            ]
        ];
    }
    public function messages()
    {
        return[
            'required' => 'Polje :attribute je obavezno.',
            'nameE.regex'=>'Ime linka nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.',
            'pathE.regex'=>'Naziv putanje nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.'

        ];
    }
}
