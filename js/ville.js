//Créer un ville qui fait appel a "plancher"
//pour ajouter les element
//Camera et lumière est géré ici
Ville = function (tabGeo){
	

	this.scene; //Scene de la ville
	this.camera; //Camera de la ville
	this.plancher;
	this.tabGeo = tabGeo;
	
	//Grosseur du terrain
	this.dimX = parseInt(document.getElementById("dimX").value);
	this.dimZ = parseInt(document.getElementById("dimZ").value);
	
	//Grosseur de chaque cellule
	this.celluleX = 2;
	this.celluleZ = 2;
	
	//Gérer les tween
	this.tweenRotation;
	this.isTweenRotation = false;
	
	this.direction = 0 ; // 0 = nord, 1 = Est, 2 = sud, 3 = ouest
	this.cameraX = 0; //Position dans le tableau
	this.cameraZ = 0; 
	
	this.tweenPosition;
	this.isTweenPosition = false;

}

Ville.prototype.initialize = function (){
	// Initialisation du canvas
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x77DDFF, 1);
    canvasWidth = 1000;
    canvasHeight = 600;
    renderer.setSize(canvasWidth, canvasHeight);
	document.getElementById("canvas").innerHTML = "";
    document.getElementById("canvas").appendChild(renderer.domElement);
	
	// Initialisation de la scène et de la caméra
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, 100);

	//Initialise a 0,0
	this.camera.position.set(0,0.1,0);
	this.camera.rotation.y = Math.PI;
	
	
    //this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);
	
	// De la lumière
	var light = new THREE.AmbientLight( 0xaaaaaa );
	this.scene.add( light );
	
	//Créer le plancher
	this.plancher = new Plancher(this.dimX,this.dimZ,2,2,this.scene);
	
	//Déposer batiment sur le plancher
	this.plancher.createVille(this.tabGeo);
	
	
	var scene = this.scene;
	
} 
Ville.prototype.animate = function (){
	
	for (var x = 0; x < this.plancher.anime.length; x++){
		this.plancher.anime[x].update(0.01);
	}
	TWEEN.update();
    this.render();
} 

Ville.prototype.render = function (){
	renderer.render(this.scene, this.camera);
}