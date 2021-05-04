<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MenuStoreRequest extends FormRequest
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
                'unique:menus',
                'regex:/^[\wŠĐČĆŽšđčćž\d\s]{3,50}$/'
            ],
            'route'=>[
                'bail',
                'unique:menus',
                'required',
                'regex:/^[\wŠĐČĆŽšđčćž\d\.\/\s]{3,50}$/'
            ],
            'order'=>[
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
            'name.unique'=>'Naziv već postoji u bazi.',
            'route.unique'=>'Ruta već postoji u bazi.',
            'name.regex'=>'Ime linka nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.',
            'route.regex'=>'Naziv rute nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.',
            'order.regex'=>'Raspored može da sadrži samo cifre.'
        ];
    }
}
