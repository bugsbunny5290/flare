exports.handlers = {};
exports.notifications = {};

exports.handlers['north'] = function(socket, message, object) {
	object.position.y++;
	exports.notifications.notifyPosition(socket, message, object);
};

exports.handlers['south'] = function(socket, message, object) {
	object.position.y--;
	exports.notifications.notifyPosition(socket, message, object);
};

exports.handlers['east'] = function(socket, message, object) {
	object.position.x++;
	exports.notifications.notifyPosition(socket, message, object);
};

exports.handlers['west'] = function(socket, message, object) {
	object.position.x--;
	exports.notifications.notifyPosition(socket, message, object);
};

exports.handlers['up'] = function(socket, message, object) {
	object.position.z++;
	exports.notifications.notifyPosition(socket, message, object);
};

exports.handlers['down'] = function(socket, message, object) {
	object.position.z--;
	exports.notifications.notifyPosition(socket, message, object);
};

var defaultColors = ['red','orange','yellow','green','blue','purple'];

exports.handlers['previousColor'] = function(socket, message, object) {
	var colors = object.data.options
	if (colors == undefined) colors = defaultColors
	var index = colors.indexOf(object.data.color);
	if (index != -1) {
		index--;
		if (index < 0) index += colors.length
		index = index % colors.length;
		object.set('data.color', colors[index]); // must use this syntax to trigger change!
		exports.notifications.notifyData(socket, message, object, 'color');
	}
};

exports.handlers['nextColor'] = function(socket, message, object) {
	var colors = object.data.options
	if (colors == undefined) colors = defaultColors
	var index = colors.indexOf(object.data.color);
	if (index != -1) {
		index++;
		index = index % colors.length;
		object.set('data.color', colors[index]); // must use this syntax to trigger change!
		exports.notifications.notifyData(socket, message, object, 'color');
	}
};

exports.handlers['lighter'] = function(socket, message, object) {
	var brightness = (object.data.brightness * 10.0 + 1.0) / 10.0;
	if (brightness > 1.0) brightness = 1.0;
	object.set('data.brightness', brightness); 
	exports.notifications.notifyData(socket, message, object, 'brightness');
};

exports.handlers['darker'] = function(socket, message, object) {
	var brightness = brightness = (object.data.brightness * 10.0 - 1.0) / 10.0;
	if (brightness < 0.0) brightness = 0.0;
	object.set('data.brightness', brightness); 
	exports.notifications.notifyData(socket, message, object, 'brightness');
};

exports.handlers['counterclockwise'] = function(socket, message, object) {
	var angle = object.data.angle - 30;
	if (object.data.angle < 0) angle += 360;
	object.set('data.angle', angle); 
	exports.notifications.notifyData(socket, message, object, 'angle');
};

exports.handlers['clockwise'] = function(socket, message, object) {
	var angle = object.data.angle + 30;
	if (angle >= 360) angle -= 360;
	object.set('data.angle', angle); 
	exports.notifications.notifyData(socket, message, object, 'angle');
};

exports.handlers['on'] = function(socket, message, object) {
	object.set('data.on', true);
	exports.notifications.notifyData(socket, message, object, 'on');
};

exports.handlers['off'] = function(socket, message, object) {
	object.set('data.on', false);
	exports.notifications.notifyData(socket, message, object, 'on');
};

exports.handlers['open'] = function(socket, message, object) {
	object.set('data.open', true);
	exports.notifications.notifyData(socket, message, object, 'open');
};

exports.handlers['close'] = function(socket, message, object) {
	object.set('data.open', false);
	exports.notifications.notifyData(socket, message, object, 'open');
};

exports.handlers['lock'] = function(socket, message, object) {
	object.set('data.locked', true);
	exports.notifications.notifyData(socket, message, object, 'locked');
};

exports.handlers['unlock'] = function(socket, message, object) {
	object.set('data.locked', false);
	exports.notifications.notifyData(socket, message, object, 'locked');
};

exports.handlers['play'] = function(socket, message, object) {
  object.set('data.playback', 1.0);
  exports.notifications.notifyData(socket, message, object, 'playback');
};

exports.handlers['pause'] = function(socket, message, object) {
  object.set('data.playback', 0.0);
  exports.notifications.notifyData(socket, message, object, 'playback');
};
 
exports.handlers['channelDown'] = function(socket, message, object) {
	var channel = object.data.channel - 1;
	if (channel < 1) channel += 100;
	object.set('data.channel', channel); 
	exports.notifications.notifyData(socket, message, object, 'channel');
};

exports.handlers['channelUp'] = function(socket, message, object) {
	var channel = object.data.channel + 1;
	if (channel > 100) channel -= 100;
	object.set('data.channel', channel); 
	exports.notifications.notifyData(socket, message, object, 'channel');
};

exports.handlers['volumeDown'] = function(socket, message, object) {
	var volume = object.data.volume - 1;
	if (volume <= 0) volume = 0;
	object.set('data.volume', volume); 
	exports.notifications.notifyData(socket, message, object, 'volume');
};

exports.handlers['volumeUp'] = function(socket, message, object) {
	var volume = object.data.volume + 1;
	if (volume > 10) volume = 10;
	object.set('data.volume', volume); 
	exports.notifications.notifyData(socket, message, object, 'volume');
};

