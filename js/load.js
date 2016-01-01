var main;

load();

//Charge les JSON
function load(){
	
	var nbJson = 13;
	var nbLoad = 0;
	var tabJson =  new Array(); 
	
	var loader = new THREE.JSONLoader();
	
	//Gazon
	loader.load('/models/grass.json', function (geometry, materials) {
		nbLoad ++;
		var material = new THREE.MeshFaceMaterial(materials);
		tabJson[0] = new ModelJson(geometry,material);
			
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
	
	//Street
	loader.load('/models/street_l.json', function (geometry, materials) {
		nbLoad ++;
		var material = new THREE.MeshFaceMaterial(materials);
		tabJson[2] = new ModelJson(geometry,material);
			
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
	
	//Street
	loader.load('/models/street_n.json', function (geometry, materials) {
		nbLoad ++;
		var material = new THREE.MeshFaceMaterial(materials);
		tabJson[3] = new ModelJson(geometry,material);
			
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
	
	
	//bulding
	loader.load('/models/appartement.json', function (geometry, materials) {
		nbLoad ++;
		
		var material = new THREE.MeshFaceMaterial(materials);
		tabJson[1] = new ModelJson(geometry,material);
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
	
	loader.load('/models/maisonCfini.json', function (geometry, materials) {
		nbLoad ++;
		
		var material = new THREE.MeshFaceMaterial(materials);
		tabJson[4] = new ModelJson(geometry,material);
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
	
	loader.load('/models/maison.json', function (geometry, materials) {
		nbLoad ++;
		
		var material = new THREE.MeshFaceMaterial(materials);
		tabJson[5] = new ModelJson(geometry,material);
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
	
	loader.load('/models/market.json', function (geometry, materials) {
		nbLoad ++;
		
		var material = new THREE.MeshFaceMaterial(materials);
		tabJson[6] = new ModelJson(geometry,material);
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
	
	loader.load('/models/entreprise.json', function (geometry, materials) {
		nbLoad ++;
		
		var material = new THREE.MeshFaceMaterial(materials);
		tabJson[7] = new ModelJson(geometry,material);
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
	
	//module
	loader.load('/models/rondt.json', function (geometry, materials) {
		nbLoad ++;
		
		var material = new THREE.MeshFaceMaterial(materials);
		tabJson[11] = new ModelJson(geometry,material);
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
	
	loader.load('/models/banlancoir.json', function (geometry, materials) {
		nbLoad ++;
		
		var material = new THREE.MeshFaceMaterial(materials);
		tabJson[10] = new ModelJson(geometry,material);
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
	
	loader.load('/models/tige.json', function (geometry, materials) {
		nbLoad ++;
		
		var material = new THREE.MeshFaceMaterial(materials);
		tabJson[8] = new ModelJson(geometry,material);
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
	
	loader.load('/models/moduleB.json', function (geometry, materials) {
		nbLoad ++;
		
		var material = new THREE.MeshFaceMaterial(materials);
		tabJson[9] = new ModelJson(geometry,material);
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
	
	loader.load('/models/banc.json', function (geometry, materials) {
		nbLoad ++;
		
		var material = new THREE.MeshFaceMaterial(materials);
		tabJson[12] = new ModelJson(geometry,material);
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
	
	
}