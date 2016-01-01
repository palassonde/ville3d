//C'est ici qu'on gère les mouvement possible dans l'application

// Keyboard interaction
document.onkeydown = function(e) {
    var camera = main.ville.camera;
	
    switch (e.keyCode) {
        case 37: // Left arrow
			
			//Une rotation a la fois
			if(main.ville.isTweenRotation)break;
			
			tweenYRotation (Math.PI/2);
			
			if(main.ville.direction <= 0){
				main.ville.direction = 4;
			}
			
			main.ville.direction--;
			main.ville.direction = main.ville.direction % 4;
            break;
			
        case 39: // Right arrow
			
			//Une rotation a la fois
			if(main.ville.isTweenRotation)break;
			
			tweenYRotation (-Math.PI/2);
			main.ville.direction++;
			main.ville.direction = main.ville.direction % 4;
			
            break;
			
        case 38: // Up arrow
			
			if(main.ville.isTweenPosition)break
			
			tweenPosition(main.ville.direction);
			
            break;
        case 40: // Down arrow
			if(main.ville.isTweenPosition)break;
			
			var direction = (main.ville.direction + 2) % 4;
			tweenPosition(direction);
		
            break;
        case 85: // U key
			if(camera.position.y > 4.9){
				return;
			}
            main.ville.camera.position.y += 0.1;
            break;
        case 68: // D key
			if(camera.position.y < 0.2){
				return;
			}
            main.ville.camera.position.y -= 0.1;
            break;
    }
};


//mouvement en tween
function tweenPosition(direction){
	
	var ville = main.ville;
	
	var x = ville.cameraX;
	var z = ville.cameraZ;
	
	switch(direction){
		//NORD
		case 0 :
			if((ville.cameraZ + 1) >= ville.plancher.dimZ) return;
			ville.cameraZ ++;
			break;
		//EST
		case 1 :
			if((ville.cameraX ) <= 0) return;
			ville.cameraX --;
			break;
		//SUD
		case 2 :
			if((ville.cameraZ ) <= 0) return;
			ville.cameraZ --;
			break;
		//OUEST
		case 3 :
			if((ville.cameraX + 1) >= ville.plancher.dimX) return;
			ville.cameraX ++;
			break;
	}
	
	if(ville.plancher.tabCellule[ville.cameraZ][ville.cameraX].occuper){
		ville.cameraX = x;
		ville.cameraZ = z;
		return;
	} 
	
	ville.isTweenPosition = true;
	
	var position = {x: ville.camera.position.x, 
					z: ville.camera.position.z};
	var target = {x: ville.plancher.tabCellule[ville.cameraZ][ville.cameraX].x, 
				  z: ville.plancher.tabCellule[ville.cameraZ][ville.cameraX].z};
	
	ville.tweenPosition = new TWEEN.Tween(position).to(target, 1000);
	
	ville.tweenPosition.onUpdate(function(){
		 ville.camera.position.x = position.x;
		 ville.camera.position.z = position.z;
		 
		 if((ville.camera.position.x === target.x) && (ville.camera.position.z === target.z)){
			 ville.isTweenPosition = false;
		 }

	});
	
	ville.tweenPosition.start();
	
}

// Tweening rotation
function tweenYRotation(deltaY) {
	
	var ville = main.ville;
	
	ville.isTweenRotation = true;
	
	var position = {y: ville.camera.rotation.y};
	var target = {y: ville.camera.rotation.y + deltaY};
	
	ville.tweenRotation = new TWEEN.Tween(position).to(target, 1000);
	
	ville.tweenRotation.onUpdate(function(){
		 ville.camera.rotation.y = position.y;
		 
		 if(ville.camera.rotation.y === target.y){
			 ville.isTweenRotation = false;
		 }

	});
	
	ville.tweenRotation.start();
	
}