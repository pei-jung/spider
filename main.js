#!/usr/bin/env casperjs

var conf = require('config.json');
conf.casper.viewportSize = conf.viewport[0];
var casper = require('casper').create(conf.casper);

var colorizer = require('colorizer').create('Colorizer');
var fs = require('fs');
var ImageComparator = require('modules/image-comparator').ImageComparator;
var Login = require('modules/login').Login;
var Spider = require('modules/spider').Spider;
var TreeModel = require('tree-model');
var utils = require('utils');
var x = require('casper').selectXPath;

var loginInstance = new Login();
var tree = new TreeModel();
var spiderInstance = new Spider(conf.homepage.url);

var styleType = {
	'error': 'red',
	'pass': 'green',
	'status': 'magenta',
	'info': 'cyan',
	'warning': 'yellow'
};

function styleMsg(msg, type) {
	var tag = colorizer.format('[' + type.toUpperCase() + ']', {
		bg: 'black',
		fg: styleType[type],
		bold: true
	});

	return tag + ' ' + msg;
};

casper.start(
	conf.homepage.url,
	function() {
		console.log(styleMsg('Liferay web crawler is running...', 'status'));
		spiderInstance.crawl();
	}
);

casper.run(
	function() {
		casper.echo('Crawling complete.');

		casper.exit();
	}
);