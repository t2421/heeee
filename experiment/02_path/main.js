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
			endPoint = [points[0],points[1]];
			start = [points[0],points[1]];
		}

		if(type == "CUBICTO"){
			path.push(getCubicCurve(endPoint[0],endPoint[1],points[0],points[1],points[2],points[3],points[4],points[5]));
			endPoint = [points[4],points[5]];
		}

		if(type == "QUADTO"){
			path.push(getQuadCurve(endPoint[0],endPoint[1],points[0],points[1],points[2],points[3]));
			endPoint = [points[2],points[3]];
		}

		if(type == "LINETO"){
			path.push(getLine(endPoint[0],endPoint[1],points[0],points[1]));
			endPoint = [points[0],points[1]];
		}

		if(type == "CLOSETO"){
			path.push(getLine(endPoint[0],endPoint[1],start[0],start[1]));
		}
	};


	
	for (i = 0; i < path.length; i++) {
		
		var vertices = path[i].geometry.vertices;
		for (j = 0; j < vertices.length; j++) {
			vertices[j].x += Math.random()*2-1.5;
			vertices[j].y += Math.random()*2-1.5;
		};
		
		scene.add(path[i]);
		
	};


	
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
		SUBDIVISIONS = 10;
		var geometry = new THREE.Geometry();
		var curve = new THREE.QuadraticBezierCurve3();
		curve.v0 = new THREE.Vector3(x0, y0, 0);
		curve.v1 = new THREE.Vector3(x1, y1, 0);
		curve.v2 = new THREE.Vector3(x2, y2, 0);
		geometry.vertices = curve.getPoints( SUBDIVISIONS );
		material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
		var line = new THREE.Line(geometry, material);
		return line;
	}

	function getCubicCurve(x0,y0,x1,y1,x2,y2,x3,y3){
		SUBDIVISIONS = 10;
		var geometry = new THREE.Geometry();
		var curve = new THREE.CubicBezierCurve3();
		curve.v0 = new THREE.Vector3(x0, y0, 0);
		curve.v1 = new THREE.Vector3(x1, y1, 0);
		curve.v2 = new THREE.Vector3(x2, y2, 0);
		curve.v3 = new THREE.Vector3(x3, y3, 0);

		geometry.vertices = curve.getPoints( SUBDIVISIONS );
		

		material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
		var line = new THREE.Line(geometry, material);

		return line;

	}

	function mergeMeshes (meshes) {
	  var combined = new THREE.Geometry();

	  for (var i = 0; i < meshes.length; i++) {
	    meshes[i].updateMatrix();
	    combined.merge(meshes[i].geometry, meshes[i].matrix);
	  }

	  return combined;
	}
});
