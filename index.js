var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('cities.geojson', 'utf8'));
var OSRM = require('osrm');
var osrm = new OSRM("nepal.osrm");
//var osrm = new OSRM("http://localhost:8888");

function SortByName(x, y) {
	return ((x.properties.name == y.properties.name) ? 0 : ((x.properties.name > y.properties.name) ? 1 : -1));
}
obj.features = obj.features.sort(SortByName);

for (var i = 0; i < 1; i++) {
	for (var j = 0; j < 2; j++) {
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
				console.log(result);

			});

		}


	};
};