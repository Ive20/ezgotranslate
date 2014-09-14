<?php

class UserController extends BaseController {

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

	public function postLogin()
	{
		 $name=Input::get('username');	 
		 $password=Input::get('password');
		 $authre=Auth::attempt(array('user_name' => $name, 'password' => $password));
		if($authre)
		{
			$re=array ('errcode'=>'0');
			return $re;
		}
		else 
		{
			$re=array ('errcode'=>'1');
			return $re;
		}
	}
	public function postRegister()
	{
		$user = new User;
		$user->user_name = Input::get('username');
		$user->user_email = Input::get('email');
		$user->password = Hash::make(Input::get('password'));
		$user->save();
		return array('errcode'=>'0');
	}
	public function postLogout()
	{
		Auth::logout();
		return array('errcode'=>'0');
		
	}
	public function postHasuser()
	{
		$user = new User;
		$username = Input::get('username');
		$results = DB::select('select * from users where user_name = ?', array($username));
		if(count($results)>=1)
		{
			return array('errcode'=>1);
			 
		}
		else
			
		{
			return array('errcode'=>0);
		}
	}

}
