function get_T(x, y)
{
	return ([[1, 0, x], [0, 0, y], [0, 0, 1]]);
}

function get_H(x, y , z)
{
	return ([[x, 0, 0], [0, y, 0], [0, 0, z]]);
}

function get_R(a)
{
	return ([[cos(a), -sin(a), 0], [sin(a), cos(a), 0], [0, 0, 1]]);
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
	msgbox("hello");
}

window.onload = function(){init();};