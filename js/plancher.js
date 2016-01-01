
//Créer un planché cellule par cellule, on ajoute le gazon / batiment
//aux endroits appropriés
Plancher = function (dimX, dimZ, sizeX, sizeZ, scene){
	this.dimX = (dimX * 12) + 1;
	this.dimZ = (dimZ * 12) + 1;
	this.sizeX = sizeX;
	this.sizeZ = sizeZ;
	this.scene = scene;
	
	this.jumpX = 4;
	this.jumpZ = 4;
	
	this.anime = [];
	
	this.tabCellule = new Array(); //Contient les position de chacun des cellules
	
	
	//Chaque ligne a 8 espace libre sur 11
	//on obtient 8 -> 4 puisque chaque batiment prend 2x2
	var totalEspace = ((dimX*3)*2) * ((dimZ*3)*2)
	this.commercial = parseInt(document.getElementById("commercial").value);
	this.residentiel = parseInt(document.getElementById("residentiel").value);
	this.site = parseInt(document.getElementById("site").value);
	this.rien = totalEspace - (this.commercial + this.residentiel + this.site);
}

//Créer un tableau 2 dimension pour le planché et position les object
Plancher.prototype.createVille = function (tabGeo){
	
	for (var z = 0; z < this.dimZ; z++){
		this.tabCellule[z] = new Array();
		for (var x = 0; x < this.dimX; x++){
			var xTmp = x*this.sizeX;
			var zTmp = z*this.sizeZ;
			this.tabCellule[z][x] = new Cellule(xTmp,zTmp);
					
					
			var modX = x%this.jumpX;
			var modZ = z%this.jumpZ;
					
			var isStreerX = modX === 0; 
			var isStreerZ = modZ === 0;
					
			//Vérifie s'il est impaire et entre un route (ajout d'un batiment)
			var isImpaire = (modX%2 !== 0) && (modZ%2 !== 0);
					
			//Route intersection
			if(isStreerX && isStreerZ){
				this.createStreetNormal(tabGeo,xTmp,zTmp);
			//Route horizontale
			}else if(isStreerX){
				this.createStreet(tabGeo,xTmp,zTmp, 0);
			//Route verticale
			}else if(isStreerZ){
				this.createStreet(tabGeo,xTmp,zTmp, Math.PI/2);
			}else{
						
				if(isImpaire){
					//console.log("a");
					//Ajouter un batiment (gazon)
					console.log(modZ);
					
					var isRotate = modX != 3;
					
					this.createBuilding(tabGeo,xTmp,zTmp,isRotate);
				}
		
				//Ajouter un cellule (gazon)
				this.createSimpleCellule(tabGeo,xTmp,zTmp);
			}
		}
				
	}
}

Plancher.prototype.createBuilding = function (tabGeo, xTmp, zTmp, isRotate){
	//Variable pour le choix de cellule
	var type = 0; //0 = rien, 1 = commercial, 2 = residentiel, 3 = site 
	var tabTmp = new Array();
						
	//Choisi le type de cellule
	if(this.commercial >0){
		tabTmp.push(1);
	}
	if(this.residentiel >0){
		tabTmp.push(2);
	}
	if(this.site >0){
		tabTmp.push(3);
	}
	if(this.rien >0){
		var tmp = tabTmp.length;
		for(i = 0; i <= tmp; i++){
			tabTmp.push(0);
		}
	}

	var random = Math.floor(Math.random() * tabTmp.length);
	
	type = tabTmp[random];
						
	switch(type){
		case 1: this.commercial--;
				this.createCommercial(tabGeo,xTmp,zTmp, isRotate);
			break;
		case 2:	this.residentiel--;
				this.createHome(tabGeo,xTmp,zTmp);
			break;
		case 3: this.site--;
				this.createSite(tabGeo,xTmp,zTmp);
			break;
		case 0:
				this.rien--;
			break;
	}
}

Plancher.prototype.createCommercial = function (tabGeo, xTmp, zTmp, isRotate){
	
	var random = Math.random();
	
	if(random < 0.5){ //Marche
		var object = new THREE.Mesh(tabGeo[6].geometrie,tabGeo[6].material);
	}else{ //Tour d'etage
		var object = new THREE.Mesh(tabGeo[7].geometrie,tabGeo[7].material);
	}
	object.position.x = xTmp;
	object.position.z = zTmp;
	
	if(isRotate){
		object.rotation.y = Math.PI;
	}
	
	
	this.scene.add(object);
}
Plancher.prototype.createHome = function (tabGeo, xTmp, zTmp){
	
	var random = Math.random();
	
	if(random < 0.33){ //appartement	
		var object = new THREE.SkinnedMesh(tabGeo[1].geometrie, tabGeo[1].material);
	}else if(random < 0.66){ //Moderne
		var object = new THREE.SkinnedMesh(tabGeo[4].geometrie, tabGeo[4].material);
	}else{ //Normal
		var object = new THREE.Mesh(tabGeo[5].geometrie,tabGeo[5].material);
	}
	object.position.x = xTmp;
	object.position.z = zTmp;
	this.scene.add(object);
	
}

Plancher.prototype.createSite = function (tabGeo, xTmp, zTmp){
	
	//Rond
	var object = new THREE.SkinnedMesh(tabGeo[11].geometrie, tabGeo[11].material);

	var material = object.material.materials;

    for (var i = 0; i < material.length; i++) {
		var mat = material[i];
		mat.skinning = true;
	}
	
	object.position.x = xTmp;
	object.position.z = zTmp;
	object.position.y = -0.2;
	
	this.scene.add(object);
	
	var animation = new THREE.AnimationAction(object.geometry.animations[0]);
	var mixer = new THREE.AnimationMixer(object);
	mixer.addAction(animation);
	this.anime.push(mixer);
	
	//Tige
	var object3 = new THREE.Mesh(tabGeo[8].geometrie,tabGeo[8].material);
	object3.position.x = xTmp;
	object3.position.z = zTmp;
	object3.position.y = -0.2;
	this.scene.add(object3);
	
	
	
	
	//banlacoir	
	var object2 = new THREE.SkinnedMesh(tabGeo[10].geometrie, tabGeo[10].material);//,tabGeo[4].material);
	
    var material2 = object2.material.materials;

	for (var i = 0; i < material2.length; i++) {
		var mat = material2[i];
		mat.skinning = true;
    }
	
	object2.position.x = xTmp;
	object2.position.z = zTmp;
	this.scene.add(object2);
	
	var animation2 = new THREE.AnimationAction(object2.geometry.animations[0]);
	var mixer2 = new THREE.AnimationMixer(object2);
	mixer2.addAction(animation2);
	this.anime.push(mixer2);
	
	//Module
	var object4 = new THREE.Mesh(tabGeo[9].geometrie,tabGeo[9].material);
	object4.position.x = xTmp;
	object4.position.z = zTmp;
	this.scene.add(object4);
	
}

Plancher.prototype.createStreet = function (tabGeo, xTmp, zTmp, rotation){
	var object = new THREE.Mesh(tabGeo[2].geometrie,tabGeo[2].material);
	object.position.x = xTmp;
	object.position.z = zTmp;
	object.rotation.y = rotation;
	this.scene.add(object);
}

Plancher.prototype.createStreetNormal = function (tabGeo, xTmp, zTmp){
	var object = new THREE.Mesh(tabGeo[3].geometrie,tabGeo[3].material);
	object.position.x = xTmp;
	object.position.z = zTmp;
	this.scene.add(object);
}

Plancher.prototype.createSimpleCellule = function (tabGeo, xTmp, zTmp){
	//Ajouter un cellule
	var texture = tabGeo[0].material;
	
	var material = new THREE.MeshBasicMaterial(texture);
				
	var object = new THREE.Mesh(tabGeo[0].geometrie,tabGeo[0].material);
	object.position.x = xTmp;
	object.position.z = zTmp;
	this.scene.add(object);
}