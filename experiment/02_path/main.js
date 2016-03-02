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


	function render(){
		window.requestAnimationFrame(render);
		renderer.render(scene, camera);

		for (i = 0; i < path.length; i++) {
			path[i].geometry.verticesNeedUpdate=true;
			var vertices = path[i].geometry.vertices;
			for (j = 0; j < vertices.length; j++) {
				vertices[j].x += Math.random()*2-1.0;
				vertices[j].y += Math.random()*2-1.0;
			};
		};
	}
	

	
	var typo0 = typo[0]["fontPoints"];
	console.log(typo0);

	var path = [];
	var endPoint = [];
	var start = [];
	var vertices = [];
	for (var i = 0; i < typo0.length; i++) {
		var type = typo0[i].lineType;
		var points = typo0[i].points;

		for (var j = 0; j < points.length; j++) {
			points[j]+=100;
		};

		if(type == "MOVETO"){
			endPoint = new THREE.Vector3(points[0],points[1], 0);
			start =  new THREE.Vector3(points[0],points[1], 0);
			vertices.push(endPoint);
			vertices.push(endPoint);
		}

		if(type == "CUBICTO"){
			var tmpEndPoint = new THREE.Vector3(points[4],points[5], 0);
			path.push(getCubicCurve(endPoint,points[0],points[1],points[2],points[3],tmpEndPoint));
			endPoint = tmpEndPoint;
			vertices.push(endPoint);
		}

		if(type == "QUADTO"){
			var tmpEndPoint = new THREE.Vector3(points[2],points[3], 0);
			path.push(getQuadCurve(endPoint,points[0],points[1],tmpEndPoint));
			endPoint = tmpEndPoint;
			vertices.push(endPoint);
		}

		if(type == "LINETO"){
			var tmpEndPoint = new THREE.Vector3(points[0],points[1], 0);
			path.push(getLine(endPoint,tmpEndPoint));
			endPoint = tmpEndPoint;
			vertices.push(endPoint);
		}

		if(type == "CLOSETO"){
			path.push(getLine(endPoint,start));
		}
	};


	
	for (i = 0; i < path.length; i++) {
		
		var vertices = path[i].geometry.vertices;
		console.log(path[i]);
		scene.add(path[i]);
		
	};


	
	render();
	function getLine(v0,v1){
		var geometry = new THREE.Geometry();
		geometry.vertices.push(v0);
		geometry.vertices.push(v1);
		var material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
		var line = new THREE.Line(geometry, material);
		return line;
	}

	function getQuadCurve(v0,x1,y1,v2){
		SUBDIVISIONS = 10;
		var geometry = new THREE.Geometry();
		var curve = new THREE.QuadraticBezierCurve3();
		curve.v0 = v0;
		curve.v1 = new THREE.Vector3(x1, y1, 0);
		curve.v2 = v2;
		geometry.vertices = curve.getPoints( SUBDIVISIONS );
		material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
		var line = new THREE.Line(geometry, material);
		return line;
	}

	function getCubicCurve(v0,x1,y1,x2,y2,v3){
		SUBDIVISIONS = 10;
		var geometry = new THREE.Geometry();
		var curve = new THREE.CubicBezierCurve3();
		curve.v0 = v0;
		curve.v1 = new THREE.Vector3(x1, y1, 0);
		curve.v2 = new THREE.Vector3(x2, y2, 0);
		curve.v3 = v3;

		geometry.vertices = curve.getPoints( SUBDIVISIONS );
		

		material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
		var line = new THREE.Line(geometry, material);

		return line;

	}

	
});
