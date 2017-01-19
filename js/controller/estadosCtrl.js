app.controller("EstadosCtrl", function($scope, $http){
	$http.get('http://fuel.pe.hu/estados')
		.success(function(data){
			$scope.estados = data.estados;
			$scope.estadost = [];
			for(var i=0;i<$scope.estados.length/4;i++){
				$scope.estadost.push(i);
			}
		});
});