<?php

class TranslateController extends BaseController {

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

	public function postGettranslate()
	{
		return Translate::all();
	}
	public function getIndex()
	{
		return 'hello';
	}
	public function postInserttranslate()
	{
		$info=new Translate;
		$info->translate_id=uniqid(time(),true);
		$info->translate_result= Input::get('result');
		$info->translate_language=Input::get('language');
		$info->info_id=Input::get('infoid');
		$info->save();
		return array(
				"errcode"=>0
		);
	}
	public function postUpdatetranslate()
	{
		if(Input::has('translateid'))
		{
		$translateid=Input::get('translateid');
		}
		$translate=Translate::find($translateid);
		if($translate==null)
		{
			return array(
				"errcode"=>1,
				"errmsg"=>"update fail"
			);
		}
		if(Input::has('content'))
		{
		$translate->translate_result= Input::get('result');
		}
		if(Input::has('language'))
		{
			$translate->translate_language= Input::get('language');
		}
		$translate->save();
		return array(
			"errcode"=>0
		);
	}
	public function postDeletetranslate()
	{
		if(Input::has('translateid'))
		{
			$translateid=Input::get('translateid');
		}
		$translate=Translate::find($translateid);
		if($translate==null)
		{
			return array(
				"errcode"=>1,
				"errmsg"=>"delete fail"
			);
		}
		$translate->delete();
		return array(
				"errcode"=>0
		);
	}
	public function postSearchtranslate()
	{
		if(Input::has('translateid'))
		{
			$translateid=Input::get('translateid');
		}
		$translate=Translate::find($translateid);
		if($translate==null)
		{
			return array(
				"errcode"=>1,
				"errmsg"=>"not found"
			);
		}
		else
		{
			return $translate;
		}
	}
}
