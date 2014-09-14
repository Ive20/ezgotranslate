<?php
class Infos extends Eloquent 
{
	protected $primaryKey = 'info_id';
	public $incrementing=false;
	protected $fillable = array('info_id', 'info_content', 'info_language');
}