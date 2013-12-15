var mat;

function conv_rad(a) {
	return (a * Math.PI / 180); 
}

function setAttr(el, tag, value)
{
	el.setAttribute(tag, value);
}
function getId(el)
{
	return (document.getElementById(el));
}

function create(el)
{
	return (document.createElement(el));
}

function append(p, ch)
{
	p.appendChild(ch);
}

function round(v, p)
{
	return (Math.round(v * p) / p);
}

function intToFloat(num, decPlaces) { 
	var nb = new Number(parseFloat(num));
	alert(typeof(nb));
	return nb.toFixed(decPlaces); 
}

function get_T(x, y)
{
	intToFloat(x, 3);
	intToFloat(y, 3);
	return ([[1.000, 0.000, x], 
			[0.000, 1.000, y], 
			[0.000, 0.000, 1.000]]);
}

function get_H(x, y)
{
	intToFloat(x, 3);
	intToFloat(y, 3);
	return ([[x, 0.000, 0.000], 
			 [0.000, y, 0.000], 
			[0.000, 0.000, 1.000]]);
}

function get_R(a)
{
	a = conv_rad(a);
	return ([[Math.cos(a), -Math.sin(a), 0.000], 
			[Math.sin(a), Math.cos(a), 0.000], 
			[0.000,	0.000, 1.000]]);
}

function get_S(a)
{
	a = conv_rad(2 * a);
	return ([[Math.cos(a), Math.sin(a), 0.0000], 
			[Math.sin(a), -Math.cos(a), 0.000], 
			[0.000, 0.000, 1.000]]);
}

function prod31(mat1, mat2)
{
	var i = 0;
	var mat3 = new Array(3);
	var j;
	while (i < 3)
	 {
		var num = 0;
		var j = 0;
		while (j < 3)
		{
			num += mat1[i][j] * mat2[j];
			j++;
		}
		mat3[i] = num;
		i++;
	 }
	return (mat3);
}

function prod33(m1, m2) {
    var result = [];
    for(var i = 0; i < m2.length; i++) {
        result[i] = [];
		for (var j = 0; j < m1[i].length; j++)
			result[i][j] = m1[i][0] * m2[0][j] + m1[i][1] * m2[1][j] + m1[i][2] * m2[2][j];
    }
    return result;
}


function prod(mat1, mat2)
{
	if (typeof(mat2[0][0]) != 'undefined')
		return (prod33(mat1, mat2));
	else
		return (prod31(mat1, mat2));
}

function use_mat(newMat) {
	if (typeof (mat) === 'undefined')
		mat = newMat;
	else
		mat = prod(newMat, mat);
}

function display_tab(element, tab)
{
	var el = getId(element);
	var table = create('tab');
	setAttr(table, 'style', 'width:auto;height:auto;border-spacing: 40px 10px;');
	var i = 0;
	var j;
	while (i < tab.length)
	{
		var tr = create('tr');
		j = 0;
		while (j < tab[i].length)
		{
			var td = create('td');
			td.innerHTML = (tab[i][j] < 0) ? tab[i][j].toFixed(3): '&nbsp;'+ new String(tab[i][j].toFixed(3));
			append(tr, td);
			j++;
		}
		append(table, tr);
		i++;
	}
	append(el, table);
}

function get_C(x, y) {
	this.x = x;
	this.y = y;
	this.z = 1.000;
	this.mat = function () { 
		return ([this.x, this.y, this.z])
		};
	this.mat2 = function() {
		return ([this.x, this.y])
		};
	this.trans = function(mat) {
		this.x = round(mat[0], 100); 
		this.y = round(mat[1], 100); 
		this.z = round(mat[2], 100);
		};
}

function Coord(x, y) {
	intToFloat(x, 3);
	intToFloat(y, 3);
	this.origin = new get_C(x, y);
	this.result = new get_C(x, y);
	this.trans = function (mat) {
		this.result.trans(prod(mat, this.result.mat()));
	};
	
	this.display = function (el) {
		el.innerHTML = '(' + this.origin.mat2() + ') => (' + this.result.mat2() + ')';
	}
}

function display_mat(el)
{
	display_tab(el, mat);
}

function check_trans(id)
{
	var error = $(".error");
	var element = $("#"+id);
	var no_error = true;
	var param1;
	var param2;
	
	if (element.hasClass("T"))
	{
		param1 = $("#translation-i-"+id).val();
		param2 = $("#translation-j-"+id).val();
		if (param1 == "" || param2 == "")
		{
			error.css("display", "block");
			error.append("L'un des paramètres d'une transformation n'est pas renseigné.<br />");
			no_error = false;
		}
		if (isNaN(param1) || isNaN(param2))
		{
			error.css("display", "block");
			error.append("L'un des paramètres d'une transformation est incorrect.<br />");
			no_error = false;
		}
	}
	else if (element.hasClass("H"))
	{
		param1 = $("#homothetie-m-"+id).val();
		param2 = $("#homothetie-n-"+id).val();
		if (param1 == "" || param2 == "")
		{
			error.css("display", "block");
			error.append("L'un des paramètres d'une transformation n'est pas renseigné.<br />");
			no_error = false;
		}
		if (isNaN(param1) || isNaN(param2))
		{
			error.css("display", "block");
			error.append("L'un des paramètres d'une transformation est incorrect.<br />");
			no_error = false;
		}
	}
	else if (element.hasClass("S"))
	{
		param1 = $("#symetrie-a-"+id).val();
		if (param1 == "")
		{
			error.css("display", "block");
			error.append("L'un des paramètres d'une transformation n'est pas renseigné.<br />");
			no_error = false;
		}
		if (isNaN(param1))
		{
			error.css("display", "block");
			error.append("L'un des paramètres d'une transformation est incorrect.<br />");
			no_error = false;
		}
	}
	else if (element.hasClass("R"))
	{
		param1 = $("#rotation-a-"+id).val();
		if (param1 == "")
		{
			error.css("display", "block");
			error.append("L'un des paramètres d'une transformation n'est pas renseigné.<br />");
			no_error = false;
		}
		if (isNaN(param1))
		{
			error.css("display", "block");
			error.append("L'un des paramètres d'une transformation est incorrect.<br />");
			no_error = false;
		}
	}
	return (no_error);
}

function check_param()
{
	var error = $(".error");
	var point_x = $("#coord-x").val();
	var point_y = $("#coord-y").val();
	var no_error = true;
	var i = 1;
	var id;
	var param_trans;
	
	error.html("");
	error.css("display", "none");
	if (point_x == "" || point_y == "")
	{
		error.append("La coordonnée du point n'est pas complet.<br />");
		error.css("display", "block");
		no_error = false;
	}
	if (isNaN(point_x) || isNaN(point_y))
	{
		error.append("La coordonnées du point doit être composé de nombres entier.<br />");
		error.css("display", "block");
		no_error = false;
	}
	if (nb_trans > 0)
	{
		while (i <= nb_trans)
		{
			if ($("#"+i).size != 0)
			{
				if (check_trans(i) == false)
					return (false);
			}
			i++;
		}
	}
	return (no_error);
}

function calcul()
{
	var i = 1;
	var element;
	var param1;
	var param2;
	var point_x = $("#coord-x").val();
	var point_y = $("#coord-y").val();
	var coord = new Coord(point_x, point_y);
	
	if (nb_trans > 0)
	{
		while (i <= nb_trans)
		{
			element = $("#"+i);
			if (element.size != 0)
			{
				if (element.hasClass("T"))
				{
					param1 = $("#translation-i-"+i).val();
					param2 = $("#translation-j-"+i).val();
					use_mat(get_T(param1, param2));
				}
				else if (element.hasClass("H"))
				{
				}
				else if (element.hasClass("S"))
				{
				}
				else if (element.hasClass("R"))
				{
				}
			}
			i++;
		}
	}
	display_mat('el');
	coord.trans(mat);
	var result = create("span");
	setAttr(result, 'style', 'margin: 0 0 0 41%;');
	coord.display(result)
	append(getId('result'), create('br'));
	append(getId('result'), result);
}

function init()
{
	$(".button_valider").on("click", function () { if (check_param() == true) calcul(); });
	//use_mat(get_T(2, 3));
	//use_mat(get_H(1, -2));
	//use_mat(get_R(45));
	//use_mat(get_S(30));
	//display_mat('el');
	//coord.trans(mat);
	//var result = create("span");
	//setAttr(result, 'style', 'margin: 0 0 0 41%;');
	//coord.display(result)
	//append(getId('result'), create('br'));
	//append(getId('result'), result);
}

window.onload = function(){init();};