app.controller("CarrosCtrl", function($scope, $http){
	$http.get('http://fuel.pe.hu/carros')
		.success(function(data){
			$scope.carros = data.carros;
		});
});