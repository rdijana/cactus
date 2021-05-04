<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MessageRequest extends FormRequest
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
            'email'=>[
                'bail',
                'required',
                'regex:/^[a-z][a-z\d\.\-\_]+\@[a-z\d]+(\.[a-z]{2,4})+$/'
            ],
            'purpose'=>[
                'bail',
                'required',
                'regex:/^[\d\wžšđčćŽĐŠČĆ\-\.]{5,50}(\s[\d\wžšđčćŽĐŠČĆ\-\.]{1,50})*$/'
            ],
            'message'=>[
                'required'
            ]
        ];
    }
    public function messages()
    {
        return[
            'required' => 'Polje :attribute je obavezno.',
            'email.regex'=>'Email nije u dobrom formatu.Primer dijana.radovanovic.10.18@ict.edu.rs',
            'purpose.regex'=>'Svrha poruke nije u dobrom formatu.Može imati minimalno 5 karaktera.Može sadržati cifre,slova,tačku,i crtu.',
        ];
    }
}
