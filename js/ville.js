//Créer un ville qui fait appel a "plancher"
//pour ajouter les element
//Camera et lumière est géré ici
Ville = function (tabGeo){
	this.scene; //Scene de la ville
	this.camera; //Camera de la ville
	this.plancher;
	this.distance = 40;
	this.tabGeo = tabGeo;
	
	//Grosseur du terrain
	this.dimX = parseInt(document.getElementById("dimX").value);
	this.dimZ = parseInt(document.getElementById("dimZ").value);
	
	//Grosseur de chaque cellule
	this.celluleX = 2;
	this.celluleZ = 2;
}

Ville.prototype.initialize = function (){
	// Initialisation du canvas
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x77DDFF, 1);
    canvasWidth = 800;
    canvasHeight = 600;
    renderer.setSize(canvasWidth, canvasHeight);
	document.getElementById("canvas").innerHTML = "";
    document.getElementById("canvas").appendChild(renderer.domElement);
	
	// Initialisation de la scène et de la caméra
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, 100);
    // this.camera.position.set(0, this.distance / 2, this.distance);
	// this.camera.lookAt(this.scene.position);
    
	//Initialise a 0,0
	this.camera.position.set(0,1,0);
	this.camera.rotation.y = 3.5;
	
	
    //this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);
	
	// De la lumière
	var light = new THREE.PointLight( 0xffffff, 1.0);
	light.position.set( -100,1000,-100);
	//this.scene.add( light );
	
	var light = new THREE.AmbientLight( 0xaaaaaa );
	this.scene.add( light );
	
	
    // var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // directionalLight.position.set(0, 10, 0);
    // this.scene.add(directionalLight);
    //var ambientLight = new THREE.AmbientLight(0xF0F0F0);
    //this.scene.add(ambientLight);
	
	//Créer le plancher
	this.plancher = new Plancher(this.dimX,this.dimZ,2,2,this.scene);
	
	//Déposer batiment sur le plancher
	this.plancher.createVille(this.tabGeo);
	
	
	var scene = this.scene;
	
	// load the model and create everything
    // var loader = new THREE.JSONLoader();
    // loader.load('/models/banlancoir3.json', function (geometry, materials) {
        // var mesh, material;

        // // create a mesh
        // mesh = new THREE.SkinnedMesh(
          // geometry,
          // new THREE.MeshFaceMaterial(materials)
        // );

        // // define materials collection
        // material = mesh.material.materials;

        // // enable skinning
        // for (var i = 0; i < materials.length; i++) {
          // var mat = materials[i];
          // mat.skinning = true;
        // }

        // // create animation
        // animation = new THREE.AnimationAction(mesh.geometry.animations[0]);
        // mixer = new THREE.AnimationMixer(mesh);
        // mixer.addAction(animation);
        // scene.add(mesh);
    // });
	
	
	
} 
Ville.prototype.animate = function (){
	
	for (var x = 0; x < this.plancher.anime.length; x++){
		this.plancher.anime[x].update(0.01);
	}
	var timer = new Date().getTime() * 0.0002;
	//if (mixer) mixer.update(0.01);
    // this.camera.position.x = -this.distance * Math.cos(timer);
    // this.camera.position.z = this.distance * Math.sin(timer);
    // this.camera.lookAt(this.scene.position);
    this.render();
} 

Ville.prototype.render = function (){
	renderer.render(this.scene, this.camera);
}