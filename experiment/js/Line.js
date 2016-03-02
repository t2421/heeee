var hee = hee || {};

(function(namespace) {

    /* =========================================================
    
     Line
     
    ========================================================= */
    var Line = (function(){
        function Line(v0,v1) {
            this.vertices = [v0,v1];
            
            this.material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
            this.geometry = new THREE.Geometry();
            this.geometry.vertices = this.vertices;
            this.mesh = new THREE.Line(this.geometry, this.material); 
        }

        Line.prototype.updateVertices = function(v0,v1){
            this.geometry.vertices = [v0,v1];
            this.geometry.verticesNeedUpdate = true;
        };

      
        return Line;
    }());

    namespace.Line = Line;

}(hee));
