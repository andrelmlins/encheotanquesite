app.controller("RankingCtrl", function($scope, $http){
	$('.collapsible').collapsible({
      accordion : false
    });
    $scope.combustiveis = ["Gasolina", "Etanol", "Diesel", "GNV", "Diesel S10"]

	$scope.changeposto = function(combustivel){
		$scope.combustivel = combustivel;
		$http.get('http://fuel.pe.hu/ranking/postos/'+combustivel)
			.success(function(data){
				$scope.postos = data.postos;
			});
	}

	$scope.changeestado = function(combustivel){
		$scope.combustivel2= combustivel;
		$http.get('http://fuel.pe.hu/ranking/estados/'+combustivel)
			.success(function(data){
				$scope.estados = data.estados;
			});
	}

	$scope.changecidade = function(combustivel){
		$scope.combustivel1 = combustivel;
		$http.get('http://fuel.pe.hu/ranking/cidades/'+combustivel)
			.success(function(data){
				$scope.cidades = data.cidades;
			});
	}

	$scope.changebandeira = function(combustivel){
		$scope.combustivel3 = combustivel;
		$http.get('http://fuel.pe.hu/ranking/bandeiras/'+combustivel)
			.success(function(data){
				$scope.bandeiras = data.bandeiras;
			});
	}

	$scope.changecarro = function(combustivel){
		$scope.combustivel4 = combustivel;
		$http.get('http://fuel.pe.hu/ranking/carros/'+combustivel)
			.success(function(data){
				$scope.carros = data.carros;
			});
	}

	$scope.changemarca = function(combustivel){
		$scope.combustivel5 = combustivel;
		$http.get('http://fuel.pe.hu/ranking/marcas/'+combustivel)
			.success(function(data){
				$scope.marcas = data.marcas;
			});
	}


	$scope.changeposto("gasolina");
	$scope.changeestado("gasolina");
	$scope.changecidade("gasolina");
	$scope.changebandeira("gasolina");
	$scope.changecarro("gasolina");
	$scope.changemarca("gasolina");
});