var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('cities.geojson', 'utf8'));
var OSRM = require('osrm-client');
var _ = require('underscore');
var osrm = new OSRM("http://router.project-osrm.org/");

function SortByName(x, y) {
	return ((x.properties.name == y.properties.name) ? 0 : ((x.properties.name > y.properties.name) ? 1 : -1));
}
obj.features = obj.features.sort(SortByName);

var start = _.map(obj, _.clone);
var end = _.map(obj, _.clone);

console.log(start[2].length);
console.log(end[2].length);


for (var i = 0; i < start[2].length; i++) {
	var coor_start = _.map(start[2][i].geometry.coordinates, _.clone);
	coor_start = coor_start.reverse();

	for (var j = 0; j < end[2].length; j++) {
		var coor_end = _.map(end[2][j].geometry.coordinates, _.clone);
		coor_end = coor_end.reverse();

		if (start[2][i].properties.name != end[2][j].properties.name) {
			var url = "http://map.project-osrm.org/?hl=de&loc=" + coor_start + "&loc=" + coor_end;
			console.log(start[2][i].properties.name + "-->" + end[2][j].properties.name + " | " + url);
			var query = {
				coordinates: [
					coor_start,
					coor_end
				]
			};
			osrm.route(query, function(err, result) {
				if ( result.route_summary !== undefined) {
					console.log(result.route_summary);
				}else{

					console.log('test');
				}

			});

		}


	};
};

// _.each(obj.features, function(start) {

// 	_.each(obj.features, function(end) {

// 		if (start.properties.name != end.properties.name) {
// 			var url = "http://map.project-osrm.org/?hl=de&loc=" + start.geometry.coordinates.reverse() + "&loc=" + end.geometry.coordinates;

// 			console.log(start.properties.name + "-->:" + end.properties.name +" | "+url);

// 			// var query = {
// 			// 	coordinates: [
// 			// 		start.geometry.coordinates,
// 			// 		end.geometry.coordinates
// 			// 	]
// 			// };
// 			// osrm.route(query, function(err, result) {

// 			// 	//typeof way.tags().oneway !== 'undefined'
// 			// 		if (typeof result !== 'undefined') {
// 			// 			console.log(result.route_summary);
// 			// 		}
// 			// 	});
// 		}
// 	});
// });