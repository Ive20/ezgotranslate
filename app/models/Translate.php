<?php
class Translate extends Eloquent
{
	use SoftDeletingTrait;
	protected $primaryKey = 'translate_id';
	public $incrementing=false;
	protected $fillable = array('translate_id', 'translate_relsult', 'translate_language','info_id');
}