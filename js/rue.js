Rue = function (plancher, scene){
	this.plancher = plancher;
	this.scene = scene;
	this.jumpX = 5;
	this.jumpZ = 5;
	
	this.createStreet();
}

//Créer un des rue a chaque jumpX et jumpZ
Rue.prototype.createStreet = function (){
	
	var loader = new THREE.JSONLoader();
	
	var plancher = this.plancher;
	var scene = this.scene;
	var jumpX = this.jumpX;
	var jumpZ = this.jumpZ;
	
	loader.load('/models/grass.json',function (geometry) {
		for (var z = 0; z < plancher.dimZ; z++){
			console.log("a");
			for (var x = 0; x < plancher.dimX; x++){
					var isStreerX = x%jumpX === 0;
					var isStreerZ = z%jumpZ === 0;
					
					if(isStreerX && isStreerZ){
						var material = new THREE.MeshBasicMaterial({color: 0xFF0000});
					}else if(isStreerX){
						var material = new THREE.MeshBasicMaterial({color: 0x0000FF});
					}else if(isStreerZ){
						var material = new THREE.MeshBasicMaterial({color: 0x555555});
					}else{
						continue;
					}

					var object = new THREE.Mesh(geometry,material);
					object.position.x = plancher.tabCellule[z][x].x;
					object.position.z = plancher.tabCellule[z][x].z;
					//object.position.y = 5;
					scene.add(object);
				}
				
			}
		}
	);
} 