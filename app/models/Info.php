<?php
class Info extends Eloquent 
{
	use SoftDeletingTrait;
	protected $primaryKey = 'info_id';
	public $incrementing=false;
	protected $fillable = array('info_id', 'info_content', 'info_language');
}