// Keyboard interaction
// document.onkeydown = function(e) {
    // //console.log(camera.quaternion);
    // switch (e.keyCode) {
        // case 37: // Left arrow
            // //tweenYRotation(0.25*Math.PI);
			
			// main.ville.camera.position.x += 0.5;
            // break;
        // case 39: // Right arrow
            // //tweenYRotation(-0.25*Math.PI);
			
			// main.ville.camera.position.x -= 0.5;
            // break;
        // case 38: // Up arrow
            // //tweenZMove(-3.0);
			
			// main.ville.camera.position.z += 0.5;
            // break;
        // case 40: // Down arrow
            // //tweenZMove(3.0);
			
			// main.ville.camera.position.z -= 0.5;
            // break;
        // case 85: // U key
            // main.ville.camera.position.y += 0.5;
            // break;
        // case 68: // D key
            // main.ville.camera.position.y -= 0.5;
            // break;
    // }
// };

//document.addEventListener( 'keydown', onKeyDown, false );


// Keyboard interaction
document.onkeydown = function(e) {
    var camera = main.ville.camera;
	
    switch (e.keyCode) {
        case 37: // Left arrow
            camera.rotation.y += 0.05;
            break;
        case 39: // Right arrow
            camera.rotation.y -= 0.05;
            break;
        case 38: // Up arrow
			var posX = camera.position.x;
			var posZ = camera.position.z;
            camera.translateZ(-0.1);
			
			if(camera.position.x < -1 || camera.position.z < -1){
				camera.position.x = posX;
				camera.position.z = posZ;
			}
			
            break;
        case 40: // Down arrow
            camera.translateZ(0.1);
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
