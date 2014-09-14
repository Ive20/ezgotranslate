<?php

class InfoController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/

	public function postGetinfo()
	{
		return Infos::all();
	}
	public function getIndex()
	{
		return 'hello';
	}
	public function postInsertinfo()
	{
		$info=new Infos;
		$info->info_id=uniqid(time(),true);
		$info->info_content= Input::get('content');
		$info->info_language=Input::get('language');
		$info->save();
		return array(
				"errcode"=>0
		);
	}

}
