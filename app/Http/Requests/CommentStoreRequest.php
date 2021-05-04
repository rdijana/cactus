<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentStoreRequest extends FormRequest
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
            'content'=>[
                'bail',
                'required',
                'regex:/^[\w\d\.\s\?]{5,60}$/'
            ]
        ];
    }
    public function messages()
    {
        return[
            'required' => 'Polje :attribute je obavezno.',
            'content.regex'=>"Komentar nije u dobrom formatu minimalan broj karaktera je 5,maksimalan 60.Može da sadrži slova,cifre,tačku,?."
        ];
    }
}
