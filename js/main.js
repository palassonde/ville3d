Main = function(tabGeo){
	this.tabGeo = tabGeo;
	this.createVille();
}

Main.prototype.createVille = function (){
	this.ville = new Ville(this.tabGeo);
	this.ville.initialize();
	this.animate();
}

Main.prototype.animate = function (){
	this.ville.animate();
	requestAnimationFrame(this.update);
}

Main.prototype.update = function (){
	main.ville.animate();
	requestAnimationFrame(main.update);
}