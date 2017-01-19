app.controller("HomeCtrl", function($scope, $http){
	var sualocalizacao;
	var map = new google.maps.Map(document.getElementById('mapa'), {
		zoom: 14
	});

	navigator.geolocation.getCurrentPosition(success);

	function success(position){
		sualocalizacao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		map.setCenter(sualocalizacao);
		var marker = new google.maps.Marker({
		    position: sualocalizacao,
		    map: map,
		    title: 'Você',
		    icon:"https://lh3.googleusercontent.com/SE_CJ-dBlk94jRCMB5k4aP-MCX3DnjpOjk_PfqtazWFrbpzWEQn-b50qF2T8Gpse4vBPQliwLbNSiQSTQDp5fRg-amdgS8SzsKsV42W1FXW8wKa61MCWSpjaY9e1Zz2GOMBtV5WP6m9B9TmDQspear73_vNhuCq4HyqPFdbw_r5c2Tn8fN9XcOdGjmiE1s7uuez6HTgwmBo_8h7n4CelA8GLQ0nYVjV_qsMwFxSKQn0vCT4lqpoedhipHtd0Hcnr9mNiBjfm_boHGg8qQqs0K_pSiSIeLvAthIa60-qpI9Zm-u8WTHj8PTcCEckCG84s7ggi6TsWqdPp57EJroSQKjCWNo-MK0FojQipkxhs2IKekajhdPel5BIcViSZ3f5IK3rAmWbsAm-cPpBdaGgICTTUaJFwNE8fbV4FkJRMZPpsxj9JcyYxjJdAjOzA4z0ikSZFCUmkDAqm08NDUTqLuc2zZLQ_Lnqu2_N9gD-nCUBD6aTIGBFJKgJbQnmRGgTlpBVRTe2ElyAMH30VxBIxPT1jrDyFLEW4gvhOtqNskBxL3H2g9Tk7ndniYbazUotWazN4MwY5RDYd85C8dFbHW5xeshUOqWCs95nHd68WHxXoXRQx=w32-h42-no", 	
		});

		$http.get('http://fuel.pe.hu/postos/rota/'+position.coords.latitude+'/'+position.coords.longitude)
			.success(function(data){
				$scope.postos = data.postos;
				for(var i=0;i<data.postos.length;i++){
					var location = new google.maps.LatLng(data.postos[i].latitude, data.postos[i].longitude);
					var marker = new google.maps.Marker({
					    position: location,
					    map: map,
					    title: data.postos[i].razao,
					    icon:"https://lh3.googleusercontent.com/54RcJWvSwdznibKpnAvLTTezq2xFnZOzkmBuACbH5hQTTGTeKu2U5uZBrlJ9-mQcidi-YgL4fSf8JdoeBLbZNi-idpd3UFDVa5t_JxFEG4oc1RnChxtaTMAtyXc37k1Vx0dw4lDA14zTuAn9H7a5uNY_jIYMtVHzLDByXiRsiJsiTbOkN4cR0V36UrZEIljpXlEU0GA_fVqgyGTfgL8LMICvYxinac44vHQaWylUDhpzKlhwqKesjGn7aJnnJCNLoM3yarZX_6iT1KQzyMtM3J90TDTU39PZW95iVj6OMO-D49-_Ab_jSEPFFhZXvArtZT6lE5vnnE5CfS38WoR5U0CzDRbCJ6E74NhaAV1dVSqEy_vz0F00TLzwyq2jGeVtsTs7U-4Xbvm79HPeGsimfBcgwvJA_Sk-QzQLPDAURswBNPDj3er4Wg81iLShwcBPer0FZg2ZBYUvf92eM7fNc2UigYpWzAzo1KMPxl1-MLi-E82IWogU0Q4n_nirqSokhmeCb8q10mNe0Mu-RaqliYDazNw765Zjw8-bdATG2Si86qYwggwJjOsez_BlMt1vBBzTFVnymap1qyE2F_mh_fT6L4kI0tCaQVJWM-IeXWOp_sM0=w32-h47-no", 	
					});
					messageMarker(marker, data.postos[i]);
				}
			});
	}

	$scope.localizacao = function(destino){
		var map = new google.maps.Map(document.getElementById('mapa'), {
			zoom: 16
		});

		var directionsDisplay = new google.maps.DirectionsRenderer();
		var directionsService = new google.maps.DirectionsService();
		directionsDisplay.setDirections({routes: []});
		directionsDisplay.setMap(map);

		var request = { 
			origin: sualocalizacao,
			destination: destino,
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

    $scope.refresh = function(){
    	var map = new google.maps.Map(document.getElementById('mapa'), {
			zoom: 14
		});
		map.setCenter(sualocalizacao);
		var marker = new google.maps.Marker({
		    position: sualocalizacao,
		    map: map,
		    title: 'Você',
		    icon:"https://lh3.googleusercontent.com/SE_CJ-dBlk94jRCMB5k4aP-MCX3DnjpOjk_PfqtazWFrbpzWEQn-b50qF2T8Gpse4vBPQliwLbNSiQSTQDp5fRg-amdgS8SzsKsV42W1FXW8wKa61MCWSpjaY9e1Zz2GOMBtV5WP6m9B9TmDQspear73_vNhuCq4HyqPFdbw_r5c2Tn8fN9XcOdGjmiE1s7uuez6HTgwmBo_8h7n4CelA8GLQ0nYVjV_qsMwFxSKQn0vCT4lqpoedhipHtd0Hcnr9mNiBjfm_boHGg8qQqs0K_pSiSIeLvAthIa60-qpI9Zm-u8WTHj8PTcCEckCG84s7ggi6TsWqdPp57EJroSQKjCWNo-MK0FojQipkxhs2IKekajhdPel5BIcViSZ3f5IK3rAmWbsAm-cPpBdaGgICTTUaJFwNE8fbV4FkJRMZPpsxj9JcyYxjJdAjOzA4z0ikSZFCUmkDAqm08NDUTqLuc2zZLQ_Lnqu2_N9gD-nCUBD6aTIGBFJKgJbQnmRGgTlpBVRTe2ElyAMH30VxBIxPT1jrDyFLEW4gvhOtqNskBxL3H2g9Tk7ndniYbazUotWazN4MwY5RDYd85C8dFbHW5xeshUOqWCs95nHd68WHxXoXRQx=w32-h42-no", 	
		});
    	for(var i=0;i<$scope.postos.length;i++){
			var location = new google.maps.LatLng($scope.postos[i].latitude, $scope.postos[i].longitude);
			var marker = new google.maps.Marker({
			    position: location,
			    map: map,
			    title: $scope.postos[i].razao,
			    icon:"https://lh3.googleusercontent.com/54RcJWvSwdznibKpnAvLTTezq2xFnZOzkmBuACbH5hQTTGTeKu2U5uZBrlJ9-mQcidi-YgL4fSf8JdoeBLbZNi-idpd3UFDVa5t_JxFEG4oc1RnChxtaTMAtyXc37k1Vx0dw4lDA14zTuAn9H7a5uNY_jIYMtVHzLDByXiRsiJsiTbOkN4cR0V36UrZEIljpXlEU0GA_fVqgyGTfgL8LMICvYxinac44vHQaWylUDhpzKlhwqKesjGn7aJnnJCNLoM3yarZX_6iT1KQzyMtM3J90TDTU39PZW95iVj6OMO-D49-_Ab_jSEPFFhZXvArtZT6lE5vnnE5CfS38WoR5U0CzDRbCJ6E74NhaAV1dVSqEy_vz0F00TLzwyq2jGeVtsTs7U-4Xbvm79HPeGsimfBcgwvJA_Sk-QzQLPDAURswBNPDj3er4Wg81iLShwcBPer0FZg2ZBYUvf92eM7fNc2UigYpWzAzo1KMPxl1-MLi-E82IWogU0Q4n_nirqSokhmeCb8q10mNe0Mu-RaqliYDazNw765Zjw8-bdATG2Si86qYwggwJjOsez_BlMt1vBBzTFVnymap1qyE2F_mh_fT6L4kI0tCaQVJWM-IeXWOp_sM0=w32-h47-no", 	
			});
			messageMarker(marker, $scope.postos[i]);
		}
    }

    function messageMarker(marker, posto) {
      marker.addListener('click', function() {
        location.href="posto/"+posto.hash;
      });
    }
});