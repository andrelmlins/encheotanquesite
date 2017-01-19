app.controller("MarcaCtrl", function($scope, $http, $routeParams){
	$http.get('http://fuel.pe.hu/marca/'+$routeParams.marca)
		.success(function(data){
			$scope.marca = data.marca;
		});

	$http.get('http://fuel.pe.hu/marca/'+$routeParams.marca+'/modelos')
		.success(function(data){
			$scope.modelos = data.modelos;
		});
});