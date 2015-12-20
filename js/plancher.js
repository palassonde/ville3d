Plancher = function (dimX, dimZ, sizeX, sizeZ, scene){
	this.dimX = (dimX * 12) + 1;
	this.dimZ = (dimZ * 12) + 1;
	this.sizeX = sizeX;
	this.sizeZ = sizeZ;
	this.scene = scene;
	
	this.jumpX = 4;
	this.jumpZ = 4;
	
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
				var material = new THREE.MeshBasicMaterial({color: 0xFF0000});
				this.createStreet(tabGeo,xTmp,zTmp, material);
			//Route horizontale
			}else if(isStreerX){
				var material = new THREE.MeshBasicMaterial({color: 0x0000FF});
				this.createStreet(tabGeo,xTmp,zTmp, material);
			//Route verticale
			}else if(isStreerZ){
				var material = new THREE.MeshBasicMaterial({color: 0x555555});
				this.createStreet(tabGeo,xTmp,zTmp, material);
			}else{
						
				if(isImpaire){
					//console.log("a");
					//Ajouter un batiment (gazon)
					this.createBuilding(tabGeo,xTmp,zTmp);
				}
		
				//Ajouter un cellule (gazon)
				this.createSimpleCellule(tabGeo,xTmp,zTmp);
			}
		}
				
	}
}

Plancher.prototype.createBuilding = function (tabGeo, xTmp, zTmp){
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
				this.createCommercial(tabGeo,xTmp,zTmp);
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

Plancher.prototype.createCommercial = function (tabGeo, xTmp, zTmp){
	
	var material = new THREE.MeshBasicMaterial({color: 0xF300EB});
	var object = new THREE.Mesh(tabGeo[1],material);
	object.position.x = xTmp;
	object.position.z = zTmp;
	//object.position.y = 5;
	this.scene.add(object);
}
Plancher.prototype.createHome = function (tabGeo, xTmp, zTmp){
	
	var material = new THREE.MeshBasicMaterial({color: 0xFFE600});
	var object = new THREE.Mesh(tabGeo[1],material);
	object.position.x = xTmp;
	object.position.z = zTmp;
	//object.position.y = 5;
	this.scene.add(object);
}
Plancher.prototype.createSite = function (tabGeo, xTmp, zTmp){
	
	var material = new THREE.MeshBasicMaterial({color: 0xFFD7FF});
	var object = new THREE.Mesh(tabGeo[1],material);
	object.position.x = xTmp;
	object.position.z = zTmp;
	//object.position.y = 5;
	this.scene.add(object);
}

Plancher.prototype.createStreet = function (tabGeo, xTmp, zTmp, material){
	var object = new THREE.Mesh(tabGeo[0],material);
	object.position.x = xTmp;
	object.position.z = zTmp;
	//object.position.y = 5;
	this.scene.add(object);
}

Plancher.prototype.createSimpleCellule = function (tabGeo, xTmp, zTmp){
		
	//Ajouter un cellule
	var material = new THREE.MeshBasicMaterial({color: 0x00FF00});
				
	var object = new THREE.Mesh(tabGeo[0],material);
	object.position.x = xTmp;
	object.position.z = zTmp;
	this.scene.add(object);
}