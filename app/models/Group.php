<?php

class Gruop extends Eloquent  {

	use SoftDeletingTrait;
	protected $primaryKey = 'group_id';
	public $incrementing=false;

}