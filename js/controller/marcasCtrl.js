app.controller("MarcasCtrl", function($scope, $http){
	$http.get('http://fuel.pe.hu/marcas')
		.success(function(data){
			$scope.marcas = data.marcas;
		});
});