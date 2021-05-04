<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
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
                'regex:/^[\w\d\.\-\_\&]{5,60}$/'
            ],
            'email' => [
                'bail',
                'required',
                'regex:/^[a-z][a-z\d\.\-\_]+\@[a-z\d]+(\.[a-z]{2,4})+$/'
            ],
            'active'=>[
                'bail',
                'required',
                'regex:/^[0-1]{1}$/'
            ],
            'password' => [
                'bail',
                'required',
                'regex:/^[\d\w\.\_\-\*\/]{6,40}$/'],
            'role'=>[
                'bail',
                'required',
                'exists:roles,id'
            ]
        ];
    }
    public function messages()
    {
        return [
            'required' => 'Polje :attribute je obavezno.',
            'first_name.regex'=>'Ime nije u dobrom formatu.Mora da počne velikim slovom i minimalan broj karaktera je 3 maksimalan 20 po imenu.',
            'last_name.regex'=>'Prezime nije u dobrom formatu.Mora da počne velikim slovom i minimalan broj karaktera je 3 maksimalan 30 po prezimenu.',
            'username.regex'=>'Korisničko ime nije u dobrom formatu.Minimalan broj karaktera je 5.',
            'email.regex'=>'Email nije u dobrom formatu.Primer dijana.radovanovic.10.18@ict.edu.rs',
            'password.regex'=>'Lozinka nije u dobrom formatu.Minimalan broj karaktera je 6.',
            'active.regex'=>'Polje može imati samo jednu cifru 0 ili 1.',
            'role.exists' => 'Uloga ne postoji u bazi.'
        ];
    }
}
