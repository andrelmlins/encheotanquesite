app.controller("PostoCtrl", function($scope, $http, $routeParams){
	var sualocalizacao;
	var location;

	navigator.geolocation.getCurrentPosition(success);
	function success(position){
		sualocalizacao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	}

	var map = new google.maps.Map(document.getElementById('mapfuel'), {
		center: {lat: -8.2527229, lng: -37.9577029},
		zoom: 15
	});

	$http.get('http://fuel.pe.hu/posto/'+$routeParams.posto)
		.success(function(data){
			$http.get('http://fuel.pe.hu/estado/'+data.posto.estadoabrev)
				.success(function(data){
					$scope.estado = data.estado;
				});
			$http.get('http://fuel.pe.hu/cidade/'+data.posto.estadoabrev+'/'+data.posto.cidade)
				.success(function(data){
					$scope.cidade = data.cidade
				});

			location = new google.maps.LatLng(data.posto.latitude, data.posto.longitude);
			map.setCenter(location);
			new google.maps.Marker({
			    position: location,
			    map: map,
			    title: data.posto.razao,
			    icon:"https://lh3.googleusercontent.com/54RcJWvSwdznibKpnAvLTTezq2xFnZOzkmBuACbH5hQTTGTeKu2U5uZBrlJ9-mQcidi-YgL4fSf8JdoeBLbZNi-idpd3UFDVa5t_JxFEG4oc1RnChxtaTMAtyXc37k1Vx0dw4lDA14zTuAn9H7a5uNY_jIYMtVHzLDByXiRsiJsiTbOkN4cR0V36UrZEIljpXlEU0GA_fVqgyGTfgL8LMICvYxinac44vHQaWylUDhpzKlhwqKesjGn7aJnnJCNLoM3yarZX_6iT1KQzyMtM3J90TDTU39PZW95iVj6OMO-D49-_Ab_jSEPFFhZXvArtZT6lE5vnnE5CfS38WoR5U0CzDRbCJ6E74NhaAV1dVSqEy_vz0F00TLzwyq2jGeVtsTs7U-4Xbvm79HPeGsimfBcgwvJA_Sk-QzQLPDAURswBNPDj3er4Wg81iLShwcBPer0FZg2ZBYUvf92eM7fNc2UigYpWzAzo1KMPxl1-MLi-E82IWogU0Q4n_nirqSokhmeCb8q10mNe0Mu-RaqliYDazNw765Zjw8-bdATG2Si86qYwggwJjOsez_BlMt1vBBzTFVnymap1qyE2F_mh_fT6L4kI0tCaQVJWM-IeXWOp_sM0=w32-h47-no", 	
			});

			$scope.posto = data.posto;
		});

	$scope.direction = function(){
		map = new google.maps.Map(document.getElementById('mapfuel'), {
			zoom: 16
		});

		var directionsDisplay = new google.maps.DirectionsRenderer();
		var directionsService = new google.maps.DirectionsService();
		directionsDisplay.setDirections({routes: []});
		directionsDisplay.setMap(map);

		var request = { 
			origin: sualocalizacao,
			destination: location,
			travelMode: google.maps.TravelMode.DRIVING
		};

		directionsService.route(request, function(result) {
			directionsDisplay.setDirections(result);
		});

		var aux = JSON.parse(JSON.stringify(sualocalizacao));
		$http.get('http://fuel.pe.hu/direction/'+aux.lat+','+aux.lng+"/"+destino)
			.success(function(data){
				for(var i=0;i<data.direction.marker.length;i++){
					var location = new google.maps.LatLng(data.direction.marker[i].latitude, data.direction.marker[i].longitude);
					var marker = new google.maps.Marker({
					    position: location,
					    map: map,
					    title: data.direction.marker[i].razao,
					    icon:"https://lh3.googleusercontent.com/54RcJWvSwdznibKpnAvLTTezq2xFnZOzkmBuACbH5hQTTGTeKu2U5uZBrlJ9-mQcidi-YgL4fSf8JdoeBLbZNi-idpd3UFDVa5t_JxFEG4oc1RnChxtaTMAtyXc37k1Vx0dw4lDA14zTuAn9H7a5uNY_jIYMtVHzLDByXiRsiJsiTbOkN4cR0V36UrZEIljpXlEU0GA_fVqgyGTfgL8LMICvYxinac44vHQaWylUDhpzKlhwqKesjGn7aJnnJCNLoM3yarZX_6iT1KQzyMtM3J90TDTU39PZW95iVj6OMO-D49-_Ab_jSEPFFhZXvArtZT6lE5vnnE5CfS38WoR5U0CzDRbCJ6E74NhaAV1dVSqEy_vz0F00TLzwyq2jGeVtsTs7U-4Xbvm79HPeGsimfBcgwvJA_Sk-QzQLPDAURswBNPDj3er4Wg81iLShwcBPer0FZg2ZBYUvf92eM7fNc2UigYpWzAzo1KMPxl1-MLi-E82IWogU0Q4n_nirqSokhmeCb8q10mNe0Mu-RaqliYDazNw765Zjw8-bdATG2Si86qYwggwJjOsez_BlMt1vBBzTFVnymap1qyE2F_mh_fT6L4kI0tCaQVJWM-IeXWOp_sM0=w32-h47-no", 	
					});
					messageMarker(marker, data.direction.marker[i]);
				}
			});
	}
});