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
function get_T(x, y)
{
	return ([[1.000, 0.000, x], [0.000, 1.000, y], [0.000, 0.000, 1.000]]);
}

function get_H(x, y)
{
	return ([[x, 0.000, 0.000], [0.000, y, 0.000], [0.000, 0.000, 1.000]]);
}

function get_R(a)
{
	return ([[round(Math.cos(a), 1000), round(-Math.sin(a), 1000), 0.000], [round(Math.sin(a), 1000), round(Math.cos(a), 1000), 0.000], [0.000, 0.000, 1.000]]);
}

function get_S(a)
{

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

function prod33 (mat1, mat2)
{
	var i = 0;
	var j;
	while (i < 3)
	 {
		j = 0;
		while (j < 3)
		{
			var num = 0;
			var z = 0;
			while (z < 3)
				{
					num += mat1[i][z] * mat2[z][j]; 
					z++;
				}
			mat1[i][j] = num;
			j++;
		}
		i++;
	 }
	 return (mat1);
}

function prod(mat1, mat2)
{
	if (typeof(mat2[0][0]) != 'undefined')
		return (prod33(mat1, mat2));
	else
		return (prod31(mat1, mat2));
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
		this.x = mat[0]; 
		this.y = mat[1]; 
		this.z = mat[2];
		};
}
function init()
{
	var coord = new get_C(0.000, 0.000);
	var c = new get_C(0.000, 0.000);
	var mat = prod(get_H(2, 1), get_T(-4.000, -3.000));
	display_tab('el',mat);
	c.trans(prod(mat, c.mat()));
	var result = create("span");
	setAttr(result, 'style', 'margin: 0 0 0 41%;');
	result.innerHTML = '(' + coord.mat2() + ') => (' + c. mat2() + ')';
	append(getId('result'), create('br'));
	append(getId('result'), result);
}

window.onload = function(){init();};