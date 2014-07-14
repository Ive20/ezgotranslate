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

	public function Login()
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
	public function register()
	{
		$user = new User;
		$user->user_name = Input::get('username');
		$user->user_email = Input::get('email');
		$user->password = Hash::make(Input::get('password'));
		$user->save();
		return array('errcode'=>'0');
	}
	public function logout()
	{
		Auth::logout();
		return array('errcode'=>'0');
		
	}

}
