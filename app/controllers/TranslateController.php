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
		if(Input::has('infoid'))
		{
			$infoid=Input::get('infoid');
		}
		$info=Translate::find($infoid);
		if($info==null)
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
	public function postUploadtranslate()
	{
		if (Input::hasFile('translate'))
		{
			$file = Input::file('translate');
			$path = $file->getRealPath();
			$size = $file->getSize();
 			$path = $file -> move(app_path().'/storage/',uniqid(time(),true));
 			return array(
 					"errcode"=>0,
 					"errmsg"=>""
 			);
			$myfile = fopen($file,"r") or die ("Unable to open file.");
			while(!feof($myfile))
			{
				$line = fgets($myfile);
				{
					if(strrpos($line,"msgid")===0)
					{
						$arr1 = explode('"',$line);
						$infoid = uniqid(time(),true);
						$info = new Info;
						$info->info_id = $infoid;
						$info->info_content = $arr1[1];
						$info->info_language = Input::get('language');
						$info->save();
					}
					if(strrpos($line,"msgstr") === 0)
					{
						$arr2 = explode('"',$line);
						$info = new Translate;
						$info->translate_id = uniqid(time(),true);
						$info->translate_result = $arr2[1];
						$info->translate_language = Input::get('language'); 
						$info->info_id = $infoid;
						$info->save();
					}
				}
				
			}
			fclose($myfile);
		}
		return array(
				"errcode"=>1,
				"errmsg"=>"not found"
		);
	}
}

