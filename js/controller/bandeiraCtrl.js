app.controller("BandeiraCtrl", function($scope, $http, $routeParams){
	var map = new google.maps.Map(document.getElementById('mapflag'), {
		center: {lat: -14.235004, lng: -51.92528},
		zoom: 3
	});
	$http.get('http://fuel.pe.hu/bandeira/'+$routeParams.bandeira)
		.success(function(data){
			$scope.bandeira = data.bandeira;
			$scope.estadost = [];
			for(var i=0;i<$scope.bandeira.estados.length/4;i++){
				$scope.estadost.push(i);
			}
			for(var i=0;i<data.bandeira.estados.length;i++){
				var location = new google.maps.LatLng(data.bandeira.estados[i].latitude, data.bandeira.estados[i].longitude);
				var marker = new google.maps.Marker({
				    position: location,
				    map: map,
				    title: data.bandeira.estados[i].bandeira
				});
				messageMarker(marker, data.bandeira.estados[i]);
			}
		});

	$http.get('http://fuel.pe.hu/bandeira/'+$routeParams.bandeira+'/postos')
		.success(function(data){
			$scope.postos = data.postos;
		});

	function messageMarker(marker, estado) {
      marker.addListener('click', function() {
        location.href="estado/"+estado.estadoabrev;
      });
    }
});