<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoleStoreRequest extends FormRequest
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
                'unique:roles',
                'regex:/^[\wŠĐČĆŽšđčćž\d\s]{3,50}$/'
            ]
        ];
    }
    public function messages()
    {
        return[
            'required' => 'Polje :attribute je obavezno.',
            'name.unique'=>'Ime već postoji u bazi.',
            'name.regex'=>'Ime uloge nije u dobrom formatu.Minimalan broj karaktera je 3,maksimalan 50.'
        ];
    }
}
