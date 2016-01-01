
//Créer un main qui gère la ville
Main = function(tabGeo){
	this.tabGeo = tabGeo;
	this.createVille();
	this.request;
}

Main.prototype.createVille = function (){
	this.ville = new Ville(this.tabGeo);
	this.ville.initialize();
	
	if(this.request){
		cancelAnimationFrame(this.request);
		requestId = undefined;
	}
	
	this.animate();
}

Main.prototype.animate = function (){
	this.ville.animate();
	this.request = requestAnimationFrame(this.update);
}

Main.prototype.update = function (){
	main.ville.animate();
	main.request = requestAnimationFrame(main.update);
}