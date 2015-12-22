
//Vérifie si la valeur ne dépasse pas le nombre maximal de batiment
//Ajuste si c'est le cas
function checkValue(value, element){
			
	if(value < 0){
		document.getElementById(element).value = 0;
		return;
	}
			
	var x = document.getElementById("dimX").value;
	var z = document.getElementById("dimZ").value;

	var somme = 0;
	if(element == 'commercial'){
		somme += parseInt(document.getElementById("residentiel").value);
		somme += parseInt(document.getElementById("site").value);
	}else if(element == 'residentiel'){
		somme += parseInt(document.getElementById("commercial").value);
		somme += parseInt(document.getElementById("site").value);
	}else{
		somme += parseInt(document.getElementById("residentiel").value);
		somme += parseInt(document.getElementById("commercial").value);
	}

	var totalEspace = ((x*3)*2) * ((z*3)*2);
			
	var dif = totalEspace - (somme); 
			
	if(dif < value){
		document.getElementById(element).value = dif;
	}
			
}
		
function checkDim (value, element){
		
	if(value < 1){
		document.getElementById(element).value = 1;
	}
		
}
		
function reset(){
	document.getElementById("dimX").value = 1;
	document.getElementById("dimZ").value = 1;
	document.getElementById("residentiel").value = 10;
	document.getElementById("site").value = 10;
	document.getElementById("commercial").value = 10;
	main.createVille();
}