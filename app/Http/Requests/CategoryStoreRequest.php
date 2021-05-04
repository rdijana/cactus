<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryStoreRequest extends FormRequest
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
                'unique:categories',
                'regex:/^[\wŠĐČĆŽšđčćž\d\/\-\s]{5,50}$/'
            ]
        ];
    }
    public function messages()
    {
        return[
            'required' => 'Polje :attribute je obavezno.',
            'name.unique'=>'Ime već postoji u bazi.',
            'name.regex'=>'Ime kategorije nije u dobrom formatu.Minimalan broj karaktera je 5,maksimalan 50.'
        ];
    }

}
