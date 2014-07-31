<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return 'hello';
});
Route::post('user/login', 'UserController@Login');
Route::post('user/register','UserController@register');
Route::post('user/logout','UserController@logout');
Route::controller('info','InfoController');