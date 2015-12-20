var main;

load();

//Charge les JSON
function load(){
	
	var nbJson = 2;
	var nbLoad = 0;
	var tabJson =  new Array(); 
	
	var loader = new THREE.JSONLoader();
	
	//Gazon
	loader.load('/models/grass.json', function (geometry, materials) {
		nbLoad ++;
		tabJson[0] = geometry;
			
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
	
	
	//bulding
	loader.load('/models/buildingtest.json', function (geometry, materials) {
		nbLoad ++;
		tabJson[1] = geometry;
			
		if(nbLoad === nbJson){
			main = new Main(tabJson);
		}
    });
}