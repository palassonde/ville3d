Ville = function (tabGeo){
	this.scene; //Scene de la ville
	this.camera; //Camera de la ville
	this.plancher;
	this.distance = 50;
	this.tabGeo = tabGeo;
	
	//Grosseur du terrain
	this.dimX = 1;
	this.dimZ = 1;
	
	//Grosseur de chaque cellule
	this.celluleX = 2;
	this.celluleZ = 2;
}

Ville.prototype.initialize = function (){
	// Initialisation du canvas
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x000000, 1);
    canvasWidth = 800;
    canvasHeight = 600;
    renderer.setSize(canvasWidth, canvasHeight);
    document.getElementById("canvas").appendChild(renderer.domElement);
	
	// Initialisation de la scène et de la caméra
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 1000);
    this.camera.position.set(0, this.distance / 2, this.distance);
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);
	
	// De la lumière
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 100, 0);
    this.scene.add(directionalLight);
    var ambientLight = new THREE.AmbientLight(0xF0F0F0);
    this.scene.add(ambientLight);
	
	//Créer le plancher
	this.plancher = new Plancher(this.dimX,this.dimZ,2,2,this.scene);
	
	//Déposer batiment sur le plancher
	this.plancher.createVille(this.tabGeo);
} 

Ville.prototype.animate = function (){
	var timer = new Date().getTime() * 0.0002;
    this.camera.position.x = -this.distance * Math.cos(timer);
    this.camera.position.z = this.distance * Math.sin(timer);
    this.camera.lookAt(this.scene.position);
    this.render();
} 

Ville.prototype.render = function (){
	renderer.render(this.scene, this.camera);
}