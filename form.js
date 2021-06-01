var circleClusterremove = [];
var buffer_circle = null;

        // To load google map
        function initialize() {
            var mapOptions = {
                //center: new google.maps.LatLng(23.215704, 77.409974),//manit bhopal 
				 center: new google.maps.LatLng(24.470306, 81.576251),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        }

        // set onclick listener to pick a location on map
        function setListenerBuffer() {
            map.setOptions({ draggableCursor: 'crosshair' });
            google.maps.event.addListenerOnce(map, "click", function (latlng) {
                map.setOptions({ draggableCursor: '' });
				cntr = latlng.latLng;
				dropmMarker(cntr); //drop a marker at center(layer 0= L0)
				
				rad = document.getElementById("radiuslength").value; // can input dynamically
				rad *= 1000; // convert to meters if in miles
                
				regular_rad = rad / Math.sqrt(3);
				
				//createCircle(cntr,rad);
				drawHexagonL1(map,cntr,rad);
				
				
				
				drawHorizontalHexagonGridL1(map,cntr,regular_rad);
				
				drawHexagonL2(map,cntr,2*rad);
				
				//createCircle(cntr,2*rad);
				
				drawHorizontalHexagonGridL2(map,cntr,regular_rad);
				
				//createCircle(cntr,rad);
				//createCircle(cntr,2*rad);
				map.setCenter(startPosition);
				
				//createArray();
				//savefile();
            });
            return false;
        }
		


	
		//Layer 1 points
		function drawHexagonL1(map,position,radius){
			 coordinatesL1 = [];
			for(var angle= 30;angle < 390; angle+=60) {
			 var cod = google.maps.geometry.spherical.computeOffset(position, radius, angle);
			 dropmMarker(cod);
			 coordinatesL1.push(cod); 
						 
		}
	  
		// Construct the big layer 1 polygon.
		var polygon = new google.maps.Polygon({
			paths: coordinatesL1,
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 3,
			fillColor: '#F8FCFC',
			fillOpacity: 0.20
		});
		polygon.setMap(map);
		map.setCenter(position);
		}
		
		function drawHorizontalHexagonGridL1(map,startPosition,radius){
			
			for(var i = 0;i < 6; i++){
				var curPos = coordinatesL1[i];
				drawHexagon(map,curPos,regular_rad);
				
								
			}
		}
		
		//Layer 2 points
		function drawHexagonL2(map,position,radius){
			 coordinatesL2 = [];
			for(var angle= 30;angle < 390; angle+=60) {
			 var cod = google.maps.geometry.spherical.computeOffset(position, radius, angle);
			 dropmMarker(cod);
			 coordinatesL2.push(cod); 
						 
		}
	  
		// Construct the big layer 2 polygon.
		var polygon = new google.maps.Polygon({
			paths: coordinatesL2,
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 3,
			fillColor: '#F8FCFC',
			fillOpacity: 0.20
		});
		polygon.setMap(map);
		map.setCenter(position);
		}
		
		function drawHorizontalHexagonGridL2(map,startPosition,radius){
			
			for(var i = 0;i < 6; i++){
				var curPos = coordinatesL2[i];
				drawHexagon(map,curPos,regular_rad);
				
								
			}
			//fuction to draw remaining hexagon on layer 2
			for(var i = 0;i < 6; i++){
				
				var curPos = google.maps.geometry.spherical.interpolate(coordinatesL2[i],coordinatesL2[(i+1)%6], 0.5);
				dropmMarker(curPos);
				drawHexagon(map,curPos,regular_rad);
				coordinatesL2.push(curPos);
				
								
			}
		}
		
		
	
		
		//draw grid hexagon 
		function drawHexagon(map,position,radius){
		var coordinates = [];
		for(var angle= 0;angle < 360; angle+=60) {
		 var cod = google.maps.geometry.spherical.computeOffset(position, radius, angle);
		 coordinates.push(cod);    
		}
		
	  
		// Construct the polygon.
		var polygon = new google.maps.Polygon({
			paths: coordinates,
			strokeColor: '#FFFF00',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#F8FCFC',
			fillOpacity: 0.10
		});
		polygon.setMap(map);
		map.setCenter(position);
		}
		
		function createArray(){
		locations=[];
		var j=0;
			for(var i=0; i < 6;i++){
				locations[j]=coordinatesL1[i];
				//dropmMarker(coordinatesL1[i]);
				j++;
			}
			for(var i=0; i < 12;i++){
				locations[j]=coordinatesL2[i];
				//dropmMarker(coordinatesL2[i]);
				
				j++;
			}
		}
	//function to drop a marker at corners of hexagon
		function dropmMarker(cntre){
			var marker = new google.maps.Marker({position:cntre,map:map});
		}
	
/*	
	var fs = require("fs");
console.log("Going to write into existing file");
// Open a new file with name input.txt and write Simply Easy Learning! to it.
fs.writeFile('input.txt', 'Simply Easy Learning!', function(err) {
   if (err) {
      return console.error(err);
   }
   console.log("Data written successfully!");
   console.log("Let's read newly written data");
   // Read the newly written file and print all of its content on the console
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("Asynchronous read: " + data.toString());
   });
});
*/
 // Draw circle with in radius
        function createCircle(cntr,rad) {
			   /*  if (buffer_circle != null) {
                buffer_circle.setMap(null);
            }
			*/	
            buffer_circle = new google.maps.Circle({
                center: cntr,
                radius: rad,
                strokeColor: "#530408",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FFFFFF",
                fillOpacity: 0.05,
                map: map
            });
            circleClusterremove.push(buffer_circle);
			
        }




	function savefile(){
		createArray()
		content = 'locations ';
		uriContent ="data:application/octet-stream," + encodeURIComponent(content);;
		for(var i=0; i < 18;i++){	
			var  content = locations[i];
			uriContent = uriContent  + encodeURIComponent(content);

		}
		document.getElementById("dlink").innerHTML = "<a href=" + uriContent + " download=\"savedfile.txt\">Here is the download link</a>";
	}