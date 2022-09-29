<?php
/**
 * Fabrik List Javascript
 *
 * @package     Joomla.Plugin
 * @subpackage  Fabrik.list.js
 * @copyright   Copyright (C) 2005-2020  Media A-Team, Inc. - All rights reserved.
 * @license     GNU/GPL http://www.gnu.org/copyleft/gpl.html
 */

// No direct access
defined('_JEXEC') or die('Restricted access');

// Require the abstract plugin class
require_once COM_FABRIK_FRONTEND . '/models/plugin-list.php';

/**
 *  Add an action button to run PHP
 *
 * @package     Joomla.Plugin
 * @subpackage  Fabrik.list.js
 * @since       3.0
 */

class PlgFabrik_ListFrontAdmin extends PlgFabrik_List {

		/*
	* Init function
	*/
	protected function init() {
		$opts = new StdClass;

		//get base uri
		// $opts->baseUri = "http://" . $_SERVER['SERVER_NAME'];
		$opts->baseUri = JURI::base();
		
		$opts->elements = $this->processElements($this->model->elements["0.1"]);
		$opts->elementsNames = $this->processElementsNames($this->model->elements["0.1"]);
		$opts->listUrl = $this->createListLink($this->getModel()->getId());
		
		// Load the JS code and pass the opts
		$this->loadJS($opts);

	}

	/*
	* Function to load the javascript code for the plugin
	*/
	protected function loadJS($opts) {
		$optsJson = json_encode($opts);
		$jsFiles = array();
		$jsFiles['Fabrik'] = 'media/com_fabrik/js/fabrik.js';
		$jsFiles['FabrikFrontAdmin'] = '/plugins/fabrik_list/frontadmin/frontadmin.js';
		// $script = "var workflow = new FabrikAction($options);";
		$script = "var fabrikFrontAdmin = new FabrikFrontAdmin($optsJson);";
		FabrikHelperHTML::script($jsFiles, $script);
	}

	protected function processElements($elements) {
		$processedElements = new stdClass;
		foreach($elements as $key => $value) {
			$fullElementName = $this->processFullElementName($key);
			// $processedElements->$fullElementName = $value->element->id;
			$processedElements->$fullElementName = $this->createLink($value->element->id);	
		}
		return $processedElements;
	}

	protected function processElementsNames($elements) {
		$processedElements = new stdClass;
		foreach($elements as $key => $value) {
			$fullElementName = $this->processFullElementName($key);
			$processedElements->$fullElementName = $value->element->label;	
		}
		return $processedElements;
	}

	protected function processFullElementName($key) {
		// Select point on str
		$pos = strpos($key, '.');
		
		// Get first part
		$firstName = substr ($key , 1, $pos-2);
		// Get second part
		$lastName = substr ($key , $pos+2);
		// Remove last char from secont part
		$lastName = substr ($lastName , 0, strlen($lastName) - 1);
		// Join them to the full name
		$processedKey = $firstName . "___" . $lastName;
		return $processedKey;
	}

	protected function createLink($elementId) {
		$baseUri = JURI::base();
		return $baseUri . "administrator/index.php?option=com_fabrik&view=element&layout=edit&id=". $elementId . "&modalView=1";
	}

	protected function createListLink($listId) {
		$baseUri = JURI::base();
		return $baseUri ."administrator/index.php?option=com_fabrik&view=list&layout=edit&id=". $listId . "&modalView=1";
	}

	/*
	* Function run on when list is being loaded
	* Used to trigger the init function
	*/
	public function onLoadData(&$args) {
		$this->init();
	}
}
