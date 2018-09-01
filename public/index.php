<?php
header('Content-type: text/html;charset=UTF-8');

$domain = "//" . $_SERVER['HTTP_HOST'];

$marker = '<script id=appContent></script>';

$index_file_template_path = $_SERVER['DOCUMENT_ROOT'] . '/index.tpl.html';

$config_file_path = $_SERVER['DOCUMENT_ROOT'] . '/configs/configs.json';	

$images_folder = [
	"home" => $_SERVER['DOCUMENT_ROOT'] . '/img/home',
	"personal" => $_SERVER['DOCUMENT_ROOT'] . '/img/personal',
	"commercial" => $_SERVER['DOCUMENT_ROOT'] . '/img/commercial'
];

$app_content = [
	"settings" => get_settings(),
	"slides" => get_slides(),
	"personal" => get_personal(),
	"commercial" => get_commercial()
];

if (file_exists($index_file_template_path)) {
	
	$content = file_get_contents($index_file_template_path);

	$script = '<script>window.$appContent = ' . stripslashes(json_encode($app_content)) . '</script>';

	echo str_replace($marker, $script, $content);
	
} else {
	
	header('Location: index.php', true, 200);
	
	echo 'Sorry, site isn\'t available';
	
}

function get_settings() {
	return file_exists($GLOBALS['config_file_path'])
		? json_decode(file_get_contents($GLOBALS['config_file_path']))
		: null;
}

function get_personal() {
	$folder = $GLOBALS['images_folder']['personal'];
	
	$projects = Array();
	
	if (file_exists($folder)) {		
		foreach(glob($folder . '/*') as $key => $item) {
			$name_project = create_id(str_replace($folder . '/', '', $item));

			$projects[$name_project] = get_project_item($name_project, $item);
		}
	}
	
	return $projects;
}

function get_slides() {
	$folder = $GLOBALS['images_folder']['home'];
	
	return file_exists($folder)
		? get_images($folder)
		: Array();
}

function get_commercial() {
	$folder = $GLOBALS['images_folder']['commercial'];
	
	$projects = Array();
	
	if (file_exists($folder)) {
		
		foreach(glob($folder . '/*') as $key => $item) {
			$info_filename = $item . '/info.json';
			
			$info = file_exists($info_filename)
				? json_encode(file_get_contents($info_filename))
				: null;

			$name_project = create_id(str_replace($folder . '/', '', $item));
			
			$projects[$name_project] = get_project_item($name_project, $item);
			$projects[$name_project]['info'] = $info;
		}
	}
	
	return $projects;
}

function get_images($path, $extension = 'jpg') {
	
	$images = Array();
	
	foreach(glob($path . '/*.' . $extension) as $key => $image) {
		$images[] = str_replace($_SERVER['DOCUMENT_ROOT'], $GLOBALS['domain'], $image);
	}
	
	return $images;
}

function get_cover($path) {
	$images = get_images($path);
	return $images[count($images) - 1];
}

function get_project_item($name, $folder) {
	return [
		"id"      => create_id($name),
		"name"    => prepare_name($name),
		"img"     => get_cover($folder),
		"images"  => get_images($folder)
	];
}

function prepare_name($name) {
	return str_replace('_', ' ', $name);
}

function create_id($name) {	
	return str_replace(' ', '-', strtolower($name));
}