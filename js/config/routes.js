app.config(function($routeProvider, $locationProvider, ezfbProvider){

	ezfbProvider.setInitParams({
	    appId: '1845002622395242',
	    version: 'v2.7'
	}); 

	$routeProvider.when("/",{
		templateUrl: "views/home.html",
		controller: "HomeCtrl"
	})

	$routeProvider.when("/estados",{
		templateUrl: "views/estados.html",
		controller: "EstadosCtrl"
	})

	$routeProvider.when("/cidades",{
		templateUrl: "views/cidades.html",
		controller: "CidadesCtrl"
	})

	$routeProvider.when("/bandeiras",{
		templateUrl: "views/bandeiras.html",
		controller: "BandeirasCtrl"
	})

	$routeProvider.when("/marcas",{
		templateUrl: "views/marcas.html",
		controller: "MarcasCtrl"
	})

	$routeProvider.when("/carros",{
		templateUrl: "views/carros.html",
		controller: "CarrosCtrl"
	})

	$routeProvider.when("/estado/:estado",{
		templateUrl: "views/estado.html",
		controller: "EstadoCtrl"
	})

	$routeProvider.when("/combustiveis",{
		templateUrl: "views/combustiveis.html",
		controller: "CombustiveisCtrl"
	})

	$routeProvider.when("/cidade/:estado/:cidade",{
		templateUrl: "views/cidade.html",
		controller: "CidadeCtrl"
	})

	$routeProvider.when("/marca/:marca",{
		templateUrl: "views/marca.html",
		controller: "MarcaCtrl"
	})

	$routeProvider.when("/bandeira/:bandeira",{
		templateUrl: "views/bandeira.html",
		controller: "BandeiraCtrl"
	})

	$routeProvider.when("/sobre",{
		templateUrl: "views/sobre.html",
		controller: "SobreCtrl"
	})

	$routeProvider.when("/posto/:posto",{
		templateUrl: "views/posto.html",
		controller: "PostoCtrl"
	})

	$routeProvider.when("/carro/:carro",{
		templateUrl: "views/carro.html",
		controller: "CarroCtrl"
	})

	$routeProvider.when("/ranking",{
		templateUrl: "views/ranking.html",
		controller: "RankingCtrl"
	})

	$routeProvider.when("/erro",{
		templateUrl: "views/erro.html"
	})

	$routeProvider.when("/.well-known/acme-challenge/7d8f4FzasqfigaNKzXZmops0MbqnZAdtTsTx-XxvzlE",{
		templateUrl: "well-known/acme-challenge/7d8f4FzasqfigaNKzXZmops0MbqnZAdtTsTx-XxvzlE"
	})

	$routeProvider.otherwise({redirectTo: "/erro"});

	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix("!");
});