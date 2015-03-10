<?php

class AndroidController extends Controller {

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */
public function postLogin()
	{
		 $name=Input::get('username');	 
		 $password=Input::get('password');
		 $authre=Auth::attempt(array('user_name' => $name, 'password' => $password));
		if($authre)
		{
			$re=array (
					'errcode'=>'0',
					'email'=>Auth::user()->user_email,
					'translate'=>Auth::user()->user_translate,
					'sex'=>Auth::user()->user_sex,
					'location'=>Auth::user()->user_location,
					'nickname'=>Auth::user()->user_nickname,
					'about'=>Auth::user()->user_about,
			);
			return $re;
		}
		else 
		{
			$re=array ('errcode'=>'1');
			return $re;
		}
	}

}
