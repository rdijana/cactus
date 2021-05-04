<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MenuUpdateRequest extends FormRequest
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
                'regex:/^[\wŠĐČĆŽšđčćž\d\s]{3,50}$/'
            ],
            'routeE'=>[
                'bail',
                'required',
                'regex:/^[\wŠĐČĆŽšđčćž\d\.\/\s]{3,50}$/'
            ],
            'orderE'=>[
                'bail',
                'required',
                'regex:/^[0123456789]{1,}$/'
            ]
        ];
    }
    public function messages()
    {
        return[
            'required' => 'Polje :attribute je obavezno.',
            'nameE.regex'=>'Ime linka nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.',
            'routeE.regex'=>'Naziv rute nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.',
            'orderE.regex'=>'Raspored može da sadrži samo cifre.'
        ];
    }
}
