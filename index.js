var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('cities.geojson', 'utf8'));

var _ = require('underscore');
//var OSRM = require('osrm-client');
//var osrm = new OSRM("http://router.project-osrm.org/");

var OSRM = require('osrm');
var osrm = new OSRM("nepal.osrm");

var async = require("async");

function SortByName(x, y) {
	return ((x.properties.name == y.properties.name) ? 0 : ((x.properties.name > y.properties.name) ? 1 : -1));
}
obj.features = obj.features.sort(SortByName);
var start = _.map(obj, _.clone);
var end = _.map(obj, _.clone);



_.each(start[2], function(start) {
	var coor_start = _.map(start.geometry.coordinates, _.clone);
	coor_start = coor_start.reverse();

	_.each(end[2], function(end) {

		var coor_end = _.map(end.geometry.coordinates, _.clone);
		coor_end = coor_end.reverse();

		if (start.properties.name != end.properties.name) {
			var url = "http://map.project-osrm.org/?hl=de&loc=" + coor_start + "&loc=" + coor_end;
			//console.log(start.properties.name + "-->:" + end.properties.name + " | " + url);

			var query = {
				coordinates: [
					coor_start,
					coor_end
				]
			};
			osrm.route(query, function(err, result) {
				if (result.route_summary !== undefined) {
					console.log(result.route_summary);
				} else {

					console.log('Fail');
				}

			});
		}
	});
});


// async.each(start[2], function(start, callback) {
// 	var coor_start = _.map(start.geometry.coordinates, _.clone);
// 	coor_start = coor_start.reverse();

// 	async.each(end[2], function(end, callback) {

// 		var coor_end = _.map(end.geometry.coordinates, _.clone);
// 		coor_end = coor_end.reverse();

// 		if (start.properties.name != end.properties.name) {
// 			var url = "http://map.project-osrm.org/?hl=de&loc=" + coor_start + "&loc=" + coor_end;
// 			//console.log(start.properties.name + "-->:" + end.properties.name + " | " + url);

// 			var query = {
// 				coordinates: [
// 					coor_start,
// 					coor_end
// 				]
// 			};
// 			osrm.route(query, function(err, result, callbackroutes) {
// 				if (result.route_summary !== undefined) {
// 					console.log(result.route_summary);
// 					callbackroutes;
// 				} else {

// 					console.log('test');
// 				}



// 			});


// 		}


// 		callback();
// 	}, function(err) {
// 		console.log('--');

// 	});
// 	callback();

// }, function(err) {
// 	console.log('+++');

// });



// function callbackroutes() {
// 	console.log('+=');
// }