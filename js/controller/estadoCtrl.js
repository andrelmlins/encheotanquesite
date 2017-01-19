app.controller("EstadoCtrl", function($scope, $http, $routeParams){
	var map = new google.maps.Map(document.getElementById('mapstate'), {
		center: {lat: -8.2527229, lng: -37.9577029},
		zoom: 6
	});
	$http.get('http://fuel.pe.hu/estado/'+$routeParams.estado)
		.success(function(data){
			$scope.estado = data.estado;
			map.setCenter(new google.maps.LatLng(data.estado.latitude, data.estado.longitude));
		});

	$http.get('http://fuel.pe.hu/estado/'+$routeParams.estado+'/postos')
		.success(function(data){
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

	$http.get('http://fuel.pe.hu/bandeiras/estado/'+$routeParams.estado)
		.success(function(data){
			$scope.bandeiras = data.bandeiras;
		});

	function messageMarker(marker, posto) {
      marker.addListener('click', function() {
        location.href="posto/"+posto.hash;
      });
    }

    $scope.changecidade = function(combustivel){
		$scope.combustivel1 = combustivel;
		$http.get('http://fuel.pe.hu/ranking/estado/'+$routeParams.estado+'/'+combustivel)
			.success(function(data){
				$scope.cidades = data.cidades;
			});
	}

	$scope.changeposto = function(combustivel){
		$scope.combustivel = combustivel;
		$http.get('http://fuel.pe.hu/ranking/estado/'+$routeParams.estado+'/'+combustivel+'/posto')
			.success(function(data){
				$scope.postos = data.postos;
			});
	}

    $scope.changecidade("gasolina");
	$scope.changeposto("gasolina");    
});