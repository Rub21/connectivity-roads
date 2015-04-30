var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('cities.geojson', 'utf8'));
var OSRM = require('osrm');
var osrm = new OSRM("nepal.osrm");

function SortByName(x, y) {
	return ((x.properties.name == y.properties.name) ? 0 : ((x.properties.name > y.properties.name) ? 1 : -1));
}
obj.features = obj.features.sort(SortByName);

for (var i = 0; i < obj.features.length; i++) {
	for (var j = 0; j < obj.features.length; j++) {
		if (obj.features[i].properties.name !== obj.features[j].properties.name) {

			console.log(obj.features[i].properties.name + "-->:" + obj.features[j].properties.name);
			console.log(obj.features[i].geometry.coordinates + "-->:" + obj.features[j].geometry.coordinates);
			var query = {
				coordinates: [
					obj.features[i].geometry.coordinates,
					obj.features[j].geometry.coordinates
				]
			};
			osrm.route(query, function(err, result) {
				console.log(result.route_summary.total_distance);

			});

		}


	};
};