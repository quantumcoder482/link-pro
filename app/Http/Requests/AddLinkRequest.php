<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddLinkRequest extends FormRequest
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
            'name'              => 'required|max:255',
            'url'               => 'sometimes|required',
            'email'             => 'sometimes|required|email',
            'phone'             => 'sometimes|required',
            'mailchimp_list_id' => 'sometimes|required',
            'shopify_products'  => 'sometimes|required',
            'description'       => 'sometimes',
            'icon'              => 'required',
        ];
    }
}
