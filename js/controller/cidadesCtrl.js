app.controller("CidadesCtrl", function($scope, $http){
	$http.get('http://fuel.pe.hu/cidades')
		.success(function(data){
			$scope.cidades = data.cidades;
		});
});