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
const MIDDLE_RING_POS = new THREE.Vector3(0, 0, 0);
const INNER_RING_POS = new THREE.Vector3(0, 0, 0);
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

var geometry, renderer, scene, mesh;



let materials = [ new THREE.MeshBasicMaterial({ color: 0xdb5856 }) ];

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

    geometry = new THREE.RingGeometry(OUTER_RING_INRADIUS, OUTER_RING_OUTRADIUS);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createMiddleRing(obj, pos) {
    'use strict'

    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.RingGeometry(MIDDLE_RING_INRADIUS, MIDDLE_RING_OUTRADIUS);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createInnerRing(obj, pos) {
    'use strict'

    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    geometry = new THREE.RingGeometry(INNER_RING_INRADIUS, INNER_RING_OUTRADIUS);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

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
    //createMobius(carousel, MOBIUS_POS);

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

    let camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(100, 100, 100);
    camera.lookAt(scene.position);

}
/////////////////////
/* CREATE LIGHT(S) */
/////////////////////


////////////
/* UPDATE */
////////////
function update(){
    'use strict';

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

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

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