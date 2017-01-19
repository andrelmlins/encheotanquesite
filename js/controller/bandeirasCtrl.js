app.controller("BandeirasCtrl", function($scope, $http){
	$http.get('http://fuel.pe.hu/bandeiras')
		.success(function(data){
			$scope.bandeiras = data.bandeiras;
		});
});