import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import * as Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

///////////////
/* CONSTANTS */
///////////////

//POSITIONS
const CAROUSEL_POS = new THREE.Vector3(0, 0, 0);
const OUTER_RING_POS = new THREE.Vector3(0, 0, 0);
const MIDDLE_RING_POS = new THREE.Vector3(0, -15, 0);
const INNER_RING_POS = new THREE.Vector3(0, -30, 0);
const CYLINDER_POS = new THREE.Vector3(0, 0, 0);
const MOBIUS_POS = new THREE.Vector3(0, 50, 0);

//SIZE
const CYLINDER_RADIUS = 15;
const CYLINDER_HEIGHT = 70;
const CYLINDER_RADIAL = 48;

const INNER_RING_INRADIUS = 15;
const INNER_RING_OUTRADIUS = 25;

const MIDDLE_RING_INRADIUS = 25;
const MIDDLE_RING_OUTRADIUS = 35;

const OUTER_RING_INRADIUS = 35;
const OUTER_RING_OUTRADIUS = 45;

//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var geometry, renderer, scene, mesh, camera;

var outerRing = new THREE.Object3D();
var middleRing = new THREE.Object3D();
var innerRing = new THREE.Object3D();

var clock = new THREE.Clock();

let materials = [ new THREE.MeshBasicMaterial({ color: 0xdb5856, side: THREE.DoubleSide }), 
                  new THREE.MeshBasicMaterial({ color: 0x4287f5, side: THREE.DoubleSide }), 
                  new THREE.MeshBasicMaterial({ color: 0x42f56f, side: THREE.DoubleSide }) ];

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

var carousel = new THREE.Object3D();
var mobius = new THREE.Object3D();

function createOuterRing(obj, pos) {
    'use strict'

    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    //Top side
    geometry = new THREE.RingGeometry(OUTER_RING_INRADIUS, OUTER_RING_OUTRADIUS);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.position.set(x, z, y+5);
    outerRing.add(mesh);

    //Bottom side
    geometry = new THREE.RingGeometry(OUTER_RING_OUTRADIUS, OUTER_RING_INRADIUS);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.position.set(x, z, y-5);
    outerRing.add(mesh);

    const path = new THREE.LineCurve3(new THREE.Vector3(0,0,5), new THREE.Vector3(0,0,-5));

    //Outer side
    geometry = new THREE.TubeGeometry(path, 64, OUTER_RING_OUTRADIUS, 32);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.position.set(x, z, y);
    outerRing.add(mesh);

    //Inner side
    geometry = new THREE.TubeGeometry(path, 64, OUTER_RING_INRADIUS, 32);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.position.set(x, z, y);
    outerRing.add(mesh);

    outerRing.rotateX(Math.PI/2);

    obj.add(outerRing);

}

function createMiddleRing(obj, pos) {
    'use strict'

    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    //Top side
    geometry = new THREE.RingGeometry(MIDDLE_RING_INRADIUS, MIDDLE_RING_OUTRADIUS);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.position.set(x, z, y+5);
    middleRing.add(mesh);

    //Bottom side
    geometry = new THREE.RingGeometry(MIDDLE_RING_OUTRADIUS, MIDDLE_RING_INRADIUS);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.position.set(x, z, y-5);
    middleRing.add(mesh);

    const path = new THREE.LineCurve3(new THREE.Vector3(0,0,5), new THREE.Vector3(0,0,-5));

    //Outer side
    geometry = new THREE.TubeGeometry(path, 64, MIDDLE_RING_OUTRADIUS, 32);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.position.set(x, z, y);
    middleRing.add(mesh);

    //Inner side
    geometry = new THREE.TubeGeometry(path, 64, MIDDLE_RING_INRADIUS, 32);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.position.set(x, z, y);
    middleRing.add(mesh);

    middleRing.rotateX(Math.PI/2);

    obj.add(middleRing);

}

function createInnerRing(obj, pos) {
    'use strict'

    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    //Top side
    geometry = new THREE.RingGeometry(INNER_RING_INRADIUS, INNER_RING_OUTRADIUS);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(x, z, y+5);
    innerRing.add(mesh);

    //Bottom side
    geometry = new THREE.RingGeometry(INNER_RING_OUTRADIUS, INNER_RING_INRADIUS);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(x, z, y-5);
    innerRing.add(mesh);

    const path = new THREE.LineCurve3(new THREE.Vector3(0,0,5), new THREE.Vector3(0,0,-5));

    //Outer side
    geometry = new THREE.TubeGeometry(path, 64, INNER_RING_OUTRADIUS, 32);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(x, z, y);
    innerRing.add(mesh);

    //Inner side
    geometry = new THREE.TubeGeometry(path, 64, INNER_RING_INRADIUS, 32);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.position.set(x, z, y);
    innerRing.add(mesh);

    innerRing.rotateX(Math.PI/2);

    obj.add(innerRing);

}

function createCilinder(obj, pos) {
    'use strict'

    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.CylinderGeometry(CYLINDER_RADIUS, CYLINDER_RADIUS, CYLINDER_HEIGHT, CYLINDER_RADIAL);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createMobius(obj, pos) {
    'use strict'

    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    const vertices = new Float32Array( [
        -1.0, -1.0,  1.0, 
         1.0, -1.0,  1.0, 
         1.0,  1.0,  1.0, 
    
         1.0,  1.0,  1.0, 
        -1.0,  1.0,  1.0, 
        -1.0, -1.0,  1.0  
    ] );
    geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createCarousel(pos) {
    'use strict'

    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    createOuterRing(carousel, OUTER_RING_POS);
    createMiddleRing(carousel, MIDDLE_RING_POS);
    createInnerRing(carousel, INNER_RING_POS);
    createCilinder(carousel, CYLINDER_POS);
    createMobius(carousel, MOBIUS_POS);

    scene.add(carousel);

    carousel.position.set(x, y, z);

}


/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    
    scene.background = new THREE.Color(0x7796a1);

    scene.add(new THREE.AxesHelper(10))

    createCarousel(CAROUSEL_POS);

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera(){
    'use strict';

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(50, 50, 50);
    camera.lookAt(scene.position);

}
/////////////////////
/* CREATE LIGHT(S) */
/////////////////////


////////////
/* UPDATE */
////////////
function update(delta){
    'use strict';

    //! Check coliision and handle

    //! Movement with keys

    const velocity = 0.5/delta;

    render();
}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render(scene, camera);

}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    
    update(clock.getDelta());
    
    render();

    requestAnimationFrame(animate);
}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
    }
    camera.updateProjectionMatrix();
}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
        case 49: //1
            break;
        case 50: //2
            break;
        case 51: //3
            break; 
    }

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';
}

init();
animate();