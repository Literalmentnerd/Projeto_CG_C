import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import * as Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';


///////////////
/* CONSTANTS */
///////////////

//POSITIONS
const CAROUSEL_POS = new THREE.Vector3(0, 0, 0);
const OUTER_RING_POS = new THREE.Vector3(0, 0, 0);
const MIDDLE_RING_POS = new THREE.Vector3(0, 0, 0);
const INNER_RING_POS = new THREE.Vector3(0, 0, 0);
const CYLINDER_POS = new THREE.Vector3(0, 0, 0);
const MOBIUS_POS = new THREE.Vector3(0, 45, 0);
const SKYDOME_POS = new THREE.Vector3(0, 0, 0);

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

const MOBIUS_RADIUS = 20;
const MOBIUS_SEGMENTS = 100;

//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var geometry, renderer, scene, mesh, camera;

var inner_up = true;
var inner_move = false;
var middle_up = true;
var middle_move = false;
var outer_up = true;
var outer_move = false;

var globalLight;

var orbit; //! REMOVER NA ENTREGA

var outerRing = new THREE.Object3D();
var middleRing = new THREE.Object3D();
var innerRing = new THREE.Object3D();

var clock = new THREE.Clock();

let materials = [ new THREE.MeshLambertMaterial({ color: 0xdb5856, side: THREE.DoubleSide }), 
                  new THREE.MeshLambertMaterial({ color: 0x4287f5, side: THREE.DoubleSide }), 
                  new THREE.MeshLambertMaterial({ color: 0x42f56f, side: THREE.DoubleSide }),
                  new THREE.MeshLambertMaterial({ color: 0xf0f0f0, side: THREE.DoubleSide })];

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

var carousel = new THREE.Object3D();
var mobius = new THREE.Object3D();
var skydome = new THREE.Object3D();

function createSkyDome(obj, pos) {
    'use strict'

    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    const geometry = new THREE.SphereGeometry(150, 20, 1000);
    const texture = new THREE.TextureLoader().load('./js/image.png'); 
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    const skyDome = new THREE.Mesh(geometry, material);
    skyDome.position.set(x, y, z); 
    scene.add(skyDome);
}

function createOuterRing(obj, pos) {
    'use strict'

    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    //Top side
    geometry = new THREE.RingGeometry(OUTER_RING_INRADIUS, OUTER_RING_OUTRADIUS);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y+5, z);
    outerRing.add(mesh);

    //Bottom side
    geometry = new THREE.RingGeometry(OUTER_RING_OUTRADIUS, OUTER_RING_INRADIUS);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y-5, z);
    outerRing.add(mesh);

    const path = new THREE.LineCurve3(new THREE.Vector3(0,0,5), new THREE.Vector3(0,0,-5));

    //Outer side
    geometry = new THREE.TubeGeometry(path, 64, OUTER_RING_OUTRADIUS, 32);
    mesh = new THREE.Mesh(geometry, materials[0]);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y, z);
    outerRing.add(mesh);

    //Inner side
    geometry = new THREE.TubeGeometry(path, 64, OUTER_RING_INRADIUS, 32);
    mesh = new THREE.Mesh(geometry, materials[0]);~
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y, z);
    outerRing.add(mesh);


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
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y+5, z);
    middleRing.add(mesh);

    //Bottom side
    geometry = new THREE.RingGeometry(MIDDLE_RING_OUTRADIUS, MIDDLE_RING_INRADIUS);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y-5, z);
    middleRing.add(mesh);

    const path = new THREE.LineCurve3(new THREE.Vector3(0,0,5), new THREE.Vector3(0,0,-5));

    //Outer side
    geometry = new THREE.TubeGeometry(path, 64, MIDDLE_RING_OUTRADIUS, 32);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y, z);
    middleRing.add(mesh);

    //Inner side
    geometry = new THREE.TubeGeometry(path, 64, MIDDLE_RING_INRADIUS, 32);
    mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y, z);
    middleRing.add(mesh);

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
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y+5, z);
    innerRing.add(mesh);

    //Bottom side
    geometry = new THREE.RingGeometry(INNER_RING_OUTRADIUS, INNER_RING_INRADIUS);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y-5, z);
    innerRing.add(mesh);

    const path = new THREE.LineCurve3(new THREE.Vector3(0,0,5), new THREE.Vector3(0,0,-5));

    //Outer side
    geometry = new THREE.TubeGeometry(path, 64, INNER_RING_OUTRADIUS, 32);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y, z);
    innerRing.add(mesh);

    //Inner side
    geometry = new THREE.TubeGeometry(path, 64, INNER_RING_INRADIUS, 32);
    mesh = new THREE.Mesh(geometry, materials[2]);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y, z);
    innerRing.add(mesh);

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

async function parseVertices(file) { 
    try {
        const response = await fetch(file);
        const data = await response.text();
        return new Float32Array(JSON.parse('[' + data + ']'));
    } catch (err) {
        console.error(err);
    }
}

async function createMobius(obj, pos) {
    'use strict'

    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    const vertices = await parseVertices('mobius-vertices.txt');

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    mesh = new THREE.Mesh(geometry, materials[3]);
    mesh.rotateX(Math.PI/2);
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
    createSkyDome(carousel, SKYDOME_POS);

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
function createLights(){
    'use strict';

    globalLight = new THREE.DirectionalLight(0xffffff, 1);
    globalLight.position.set(0, 1, 0); 
    scene.add(globalLight);

    var ambientLight = new THREE.AmbientLight(0xffa500, 0.2);
    scene.add(ambientLight);

}

////////////
/* UPDATE */
////////////
function update(delta){
    'use strict';

    const velocity = 0.5/delta;

    carousel.rotation.y += 0.5*delta;

    //! Movement with keys
    if(inner_move){
        if(inner_up && innerRing.position.y < 30){
            innerRing.position.y += 0.1*velocity;
        } else {
            inner_up = false;
        }
        if (!inner_up && innerRing.position.y > -30){
            innerRing.position.y -= 0.1*velocity;
        } else {
            inner_up = true;
        }
    }
    if(middle_move){
        if(middle_up && middleRing.position.y < 30){
            middleRing.position.y += 0.1*velocity;
        } else {
            middle_up = false;
        }
        if (!middle_up && middleRing.position.y > -30){
            middleRing.position.y -= 0.1*velocity;
        } else {
            middle_up = true;
        }
    }
    if(outer_move){
        if(outer_up && outerRing.position.y < 30){
            outerRing.position.y += 0.1*velocity;
        } else {
            outer_up = false;
        }
        if (!outer_up && outerRing.position.y > -30){
            outerRing.position.y -= 0.1*velocity;
        } else {
            outer_up = true;
        }
    }

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
    createLights();
    createCamera();
    
    render();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
    
    orbit = new OrbitControls(camera, renderer.domElement); //! REMOVER NA ENTREGA  
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

    orbit.update(); //! REMOVER NA ENTREGA
    
    update(clock.getDelta());
    
    render();

    requestAnimationFrame(animate);
}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
        case 49: //1
            inner_move = true;
            break;
        case 50: //2
            middle_move = true;
            break;
        case 51: //3
            outer_move = true;
            break; 
        case 68: //d
            globalLight.visible = !globalLight.visible;
            break;
    }

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';
    switch (e.keyCode) {
        case 49: //1
            inner_move = false;
            break;
        case 50: //2
            middle_move = false;
            break;
        case 51: //3
            outer_move = false;
            break; 
    }
}

init();
animate();