function get_T(x, y)
{
	return ([[1, 0, x], [0, 0, y], [0, 0, 1]]);
}

function get_H(x, y)
{
	return ([[x, 0, 0], [0, y, 0], [0, 0, 1]]);
}

function get_R(a)
{
	return ([[Math.cos(a), -Math.sin(a), 0], [Math.sin(a), Math.cos(a), 0], [0, 0, 1]]);
}

function get_S(a)
{

}

function trans (mat1, mat2)
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

function init()
{
	document.getElementById("r").innerHTML = get_R(90);
	document.getElementById("t").innerHTML = get_T(2, 3);
	document.getElementById("h").innerHTML = get_H(2, 2);
	document.getElementById("th").innerHTML = trans(get_H(2, 2), get_T(2,3));
}

window.onload = function(){init();};