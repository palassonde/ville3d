var main;

load();

//Charge les JSON
function load(){
	
	var nbJson = 4;
	var nbLoad = 0;
	var tabJson =  new Array(); 
	
	var loader = new THREE.JSONLoader();
	
	//Gazon
	loader.load('/models/grass1.json', function (geometry, materials) {
		nbLoad ++;
		var material = new THREE.MeshFaceMaterial(materials);
		//console.log(material);
		tabJson[0] = new ModelJson(geometry,material);
			
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
	
	//Street
	loader.load('/models/street_l.json', function (geometry, materials) {
		nbLoad ++;
		var material = new THREE.MeshFaceMaterial(materials);
		//console.log(material);
		tabJson[2] = new ModelJson(geometry,material);
			
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
	
	//Street
	loader.load('/models/street_n.json', function (geometry, materials) {
		nbLoad ++;
		var material = new THREE.MeshFaceMaterial(materials);
		//console.log(material);
		tabJson[3] = new ModelJson(geometry,material);
			
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
	
	
	//bulding
	loader.load('/models/buildingtest.json', function (geometry, materials) {
		nbLoad ++;
		
		
		tabJson[1] = new ModelJson(geometry,materials);
		console.log(materials);
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
}