jQuery(document).ready(function($) {
	var scene = new THREE.Scene();
	var width  = 600;
	var height = 400;
	var fov    = 60;
	var aspect = width / height;
	var near   = 1;
	var far    = 1000;
	var camera = new THREE.OrthographicCamera(0, width, 0, height, 0.001, 10000);
	camera.position.set( 0, 0, 0.01 );
	camera.aspect = width / height;

	var renderer = new THREE.WebGLRenderer({ 'canvas' : $('#world')[0] });
	renderer.setSize( width, height );
	renderer.setClearColor(0x000000);
	document.body.appendChild( renderer.domElement );


	var line = getLine(0,0,100,100);
	scene.add(line);

	var quadCurve = getQuadCurve(0,0,100,100,200,0);
	scene.add(quadCurve);

	var cubicCurve = getCubicCurve(0,0,100,100,200,100,300,0);
	scene.add(cubicCurve);

	function render(){
		window.requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
	render();


	function getLine(x0,y0,x1,y1){
		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(x0,y0, 0));
		geometry.vertices.push(new THREE.Vector3(x1,y1, 0));
		var material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
		var line = new THREE.Line(geometry, material);
		return line;
	}

	function getQuadCurve(x0,y0,x1,y1,x2,y2){
		SUBDIVISIONS = 100;
		var geometry = new THREE.Geometry();
		var curve = new THREE.QuadraticBezierCurve3();
		curve.v0 = new THREE.Vector3(x0, y0, 0);
		curve.v1 = new THREE.Vector3(x1, y1, 0);
		curve.v2 = new THREE.Vector3(x2, y2, 0);
		for (j = 0; j < SUBDIVISIONS; j++) {
		   geometry.vertices.push( curve.getPoint(j / SUBDIVISIONS) )
		}
		material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
		var line = new THREE.Line(geometry, material);
		return line;
	}

	function getCubicCurve(x0,y0,x1,y1,x2,y2,x3,y3){
		SUBDIVISIONS = 100;
		var geometry = new THREE.Geometry();
		var curve = new THREE.CubicBezierCurve3();
		curve.v0 = new THREE.Vector3(x0, y0, 0);
		curve.v1 = new THREE.Vector3(x1, y1, 0);
		curve.v2 = new THREE.Vector3(x2, y2, 0);
		curve.v3 = new THREE.Vector3(x3, y3, 0);
		for (j = 0; j < SUBDIVISIONS; j++) {
		   geometry.vertices.push( curve.getPoint(j / SUBDIVISIONS) )
		}

		material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
		var line = new THREE.Line(geometry, material);

		return line;

	}
});
