- get recent osm data of the areas as `.osm.pbf` file
 using http://rub21.github.io/download-osm-data/#5.00/40.110/-91.366
http://download.geofabrik.de/asia.html


- install `node-osrm`


https://github.com/Project-OSRM/node-osrm

- run `osrm-extract` on the file using the `car` profile

#### Build OSRM
https://github.com/Project-OSRM/osrm-backend/wiki/Building%20OSRM

`git clone https://github.com/Project-OSRM/osrm-backend.git`

`ln -s osrm-backend/profiles/car.lua profile.lua`

`ln -s osrm-backend/profiles/lib`


	 2015  cd apps/
	 2016  git clone https://github.com/Project-OSRM/osrm-backend
	 2017  cd osrm-backend/
	 2018  ls
	 2019  cd ..
	 2020  ln -s osrm-backend/profiles/car.lua profile.lua
	 2021  ln -s osrm-backend/profiles/lib
	 2022  ls
	 2023  cd connectivity-roads/.git/
	 2024  cd ..
	 2025  osrm-extract nepal.osm
	 2026  ls
	 2027  osrm-extract nepal.osm.pbf 
	 2028  ./osrm-extract nepal.osm.pbf 
	 2029  osrm-extract nepal.osm.pbf 
	 2030  osrm-extract nepal.osm
	 2031  history



- run `osrm-prepare` on the result from above
- See the example in the README on https://github.com/Project-OSRM/node-osrm on how to write a nodejs script that queries the data
- acquire coordinates of the cities given in the table
- run `osrm.route` queries for each pair (don't use the `osrm.table` query, it returns travel times!)
- the result objects will contain `result.route_summary.total_distance` which is the route distance in meters
- compare results