<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegistrationRequest extends FormRequest
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
            'first_name' => [
                'bail',
                'required',
                'regex:/^[A-ZŠĐĆŽČ][a-zšđčćž]{2,19}(\s[A-ZŠĐČĆŽ][a-zšđčćž]{2,19})*$/'
                ],
            'last_name' => [
                'bail',
                'required',
                'regex:/^[A-ZŠĐČĆŽ][a-zšđčćž]{2,29}(\s[A-ZŠĐČĆŽ][a-zšđčćž]{2,29})*$/'
                ],
            'username'=>[
                'bail',
                'required',
                'unique:users',
                'regex:/^[\w\d\.\-\_\&]{5,60}$/'
            ],
            'email' => [
                'bail',
                'required',
                'unique:users',
                'regex:/^[a-z][a-z\d\.\-\_]+\@[a-z\d]+(\.[a-z]{2,4})+$/'
                ],
            'password' => [
                'bail',
                'required',
                'regex:/^[\d\w\.\_\-\*\/]{6,40}$/']
        ];
    }
    public function messages()
    {
        return [
            'required' => 'Polje :attribute je obavezno.',
            'email.unique'=>'Email već postoji u bazi.',
            'username.unique'=>'Username postoji u bazi'
        ];
    }

}
