app.controller("CarroCtrl", function($scope, $http, $routeParams){
	$http.get('http://fuel.pe.hu/carro/'+$routeParams.carro)
		.success(function(data){
			$scope.carro = data.carro;
		});

	$http.get('http://fuel.pe.hu/carro/'+$routeParams.carro+'/modelos')
		.success(function(data){
			$scope.modelos = data.modelos;
		});
});