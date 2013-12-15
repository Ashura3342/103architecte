var nb_trans = 0;
var restant = 0;

function delete_trans(id)
{
	$(id).remove();
	restant--;
	if (restant == 0)
	{
		$(".bouton_valider").html("");
	}
}

function add_transformation()
{
	var choix = $("#liste_trans").val();
	var place = $(".new_trans");
	var id = "";
	
	if (choix != 0)
	{
		restant++;
		nb_trans++;
	}
	if (choix == 1)
	{
		place.append('<div class="transformation" id="'+nb_trans+'">');
		place = $("#"+nb_trans);
		id = "#"+nb_trans;
		place.append('<input onclick=delete_trans("'+id+'") class="delete_button" id="delete-'+nb_trans+'" value="X" type="button">');
		place.append('<h3>Translation</h3>');
		place.append('<h5>Suivant un vecteur de coordonnées <i>(i, j)</i> : T i j.</h5>');
		place.append('<label for="translation-i-'+nb_trans+'">i</label><input type="text" id="translation-i-'+nb_trans+'" /><br>');
		place.append('<label for="translation-j-'+nb_trans+'">j</label><input type="text" id="translation-j-'+nb_trans+'" />');
	}
	else if (choix == 2)
	{
		place.append('<div class="transformation" id="'+nb_trans+'">');
		place = $("#"+nb_trans);
		id = "#"+nb_trans;
		place.append('<input onclick=delete_trans("'+id+'") class="delete_button" id="delete-'+nb_trans+'" value="X" type="button">');
		place.append('<h3>Rotation</h3>');
		place.append('<h5>de centre O et d\'angle <i>a</i> degrés : R <i>a</i>.</h5><br>');
		place.append('<label for="rotation-a-'+nb_trans+'">a</label><input type="text" id="rotation-a-'+nb_trans+'" />');
	}
	else if (choix == 3)
	{
		place.append('<div class="transformation" id="'+nb_trans+'">');
		place = $("#"+nb_trans);
		id = "#"+nb_trans;
		place.append('<input onclick=delete_trans("'+id+'") class="delete_button" id="delete-'+nb_trans+'" value="X" type="button">');
		place.append('<h3>Homothétie</h3>');
		place.append('<h5>De centre O et de rapport m suivant <i>(0x)</i> et n suivant <i>(Oy)</i> : H m n.</h5>');
		place.append('<label for="homothetie-m-'+nb_trans+'">m</label><input type="text" id="homothetie-m-'+nb_trans+'" /><br>');
		place.append('<label for="homothetie-n'+nb_trans+'">n</label><input type="text" id="homothetie-n-'+nb_trans+'" />');
	}
	else if (choix == 4)
	{
		place.append('<div class="transformation" id="'+nb_trans+'">');
		place = $("#"+nb_trans);
		id = "#"+nb_trans;
		place.append('<input onclick=delete_trans("'+id+'") class="delete_button" id="delete-'+nb_trans+'" value="X" type="button">');
		place.append('<h3>Symétrie</h3>');
		place.append('<h5>Par rapport à un axe passant par O incliné de <i>a</i> degrés : S <i>a</i>.</h5><br>');
		place.append('<label for="symetrie-a-'+nb_trans+'">a</label><input type="text" id="symetrie-a-'+nb_trans+'" />');
	}
	if (restant == 1)
	{
		$(".bouton_valider").append('<input type="button" class="button_valider" value="Calculer" />');
	}
}