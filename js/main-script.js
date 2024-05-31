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
const MOBIUS_POS = new THREE.Vector3(0, 50, 0);
const SKYDOME_POS = new THREE.Vector3(0, -40, 0);
const BASE_POS = new THREE.Vector3(0, -37.5, 0);
const GROUND_POS = new THREE.Vector3(0, -40.1, 0);

//SIZE
const CYLINDER_RADIUS = 15;
const CYLINDER_HEIGHT = 70;

const BASE_RADIUS = 50;
const BASE_HEIGHT = 5;

const INNER_RING_INRADIUS = 15;
const INNER_RING_OUTRADIUS = 25;

const MIDDLE_RING_INRADIUS = 25;
const MIDDLE_RING_OUTRADIUS = 35;

const OUTER_RING_INRADIUS = 35;
const OUTER_RING_OUTRADIUS = 45;

const MOBIUS_RADIUS = 20.05;

const SKYDOME_RADIUS = 250;

//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var geometry, renderer, scene, mesh, camera;

var vertices = new Float32Array([15,0,0,25,0,0,14.735392952053594,2.9310518963625074,-0.490085701647803,25,0,0,14.735392952053594,2.9310518963625074,-0.490085701647803,24.496018264075623,4.8725609842826225,0.490085701647803,14.735392952053594,2.9310518963625074,-0.490085701647803,24.496018264075623,4.8725609842826225,0.490085701647803,13.946953418461296,5.777017259712469,-0.9754516100806412,24.496018264075623,4.8725609842826225,0.490085701647803,13.946953418461296,5.777017259712469,-0.9754516100806412,23.008227881990177,9.530320034891123,0.9754516100806412,13.946953418461296,5.777017259712469,-0.9754516100806412,23.008227881990177,9.530320034891123,0.9754516100806412,12.651058196311268,8.453166833849046,-1.4514233862723116,23.008227881990177,9.530320034891123,0.9754516100806412,12.651058196311268,8.453166833849046,-1.4514233862723116,20.607726295790542,13.769642486935041,1.4514233862723116,12.651058196311268,8.453166833849046,-1.4514233862723116,20.607726295790542,13.769642486935041,1.4514233862723116,10.87572821154001,10.875728211540007,-1.913417161825449,20.607726295790542,13.769642486935041,1.4514233862723116,10.87572821154001,10.875728211540007,-1.913417161825449,17.408543035921895,17.40854303592189,1.913417161825449,10.87572821154001,10.875728211540007,-1.913417161825449,17.408543035921895,17.40854303592189,1.913417161825449,8.661558648697255,12.962938587305418,-2.3569836841299883,17.408543035921895,17.40854303592189,1.913417161825449,8.661558648697255,12.962938587305418,-2.3569836841299883,13.561250672086835,20.29584590479639,2.3569836841299883,8.661558648697255,12.962938587305418,-2.3569836841299883,13.561250672086835,20.29584590479639,2.3569836841299883,6.062720421585754,14.636701866668654,-2.777851165098011,13.561250672086835,20.29584590479639,2.3569836841299883,6.062720421585754,14.636701866668654,-2.777851165098011,9.24461687301784,22.31847943378282,2.777851165098011,6.062720421585754,14.636701866668654,-2.777851165098011,9.24461687301784,22.31847943378282,2.777851165098011,3.147772148980718,15.824919236784607,-3.1719664208182277,9.24461687301784,22.31847943378282,2.777851165098011,3.147772148980718,15.824919236784607,-3.1719664208182277,4.655840731664415,23.406491979344608,3.1719664208182277,3.147772148980718,15.824919236784607,-3.1719664208182277,4.655840731664415,23.406491979344608,3.1719664208182277,1.0081577850884798e-15,16.464466094067262,-3.5355339059327373,4.655840731664415,23.406491979344608,3.1719664208182277,1.0081577850884798e-15,16.464466094067262,-3.5355339059327373,1.4411358132062265e-15,23.535533905932738,3.5355339059327373,1.0081577850884798e-15,16.464466094067262,-3.5355339059327373,1.4411358132062265e-15,23.535533905932738,3.5355339059327373,-3.28298648986079,16.50468763259277,-3.8650522668136844,1.4411358132062265e-15,23.535533905932738,3.5355339059327373,-3.28298648986079,16.50468763259277,-3.8650522668136844,-4.520626390784338,22.726723583536447,3.8650522668136844,-3.28298648986079,16.50468763259277,-3.8650522668136844,-4.520626390784338,22.726723583536447,3.8650522668136844,-6.590631028842725,15.911190814429052,-4.157348061512726,-4.520626390784338,22.726723583536447,3.8650522668136844,-6.590631028842725,15.911190814429052,-4.157348061512726,-8.716706265760864,21.043990486022416,4.157348061512726,-6.590631028842725,15.911190814429052,-4.157348061512726,-8.716706265760864,21.043990486022416,4.157348061512726,-9.80193468577654,14.669631936003919,-4.409606321741775,-8.716706265760864,21.043990486022416,4.157348061512726,-9.80193468577654,14.669631936003919,-4.409606321741775,-12.420874635007538,18.589152556097893,4.409606321741775,-9.80193468577654,14.669631936003919,-4.409606321741775,-12.420874635007538,18.589152556097893,4.409606321741775,-12.789145373365455,12.789145373365459,-4.619397662556434,-12.420874635007538,18.589152556097893,4.409606321741775,-12.789145373365455,12.789145373365459,-4.619397662556434,-15.495125874096443,15.495125874096445,4.619397662556434,-12.789145373365455,12.789145373365459,-4.619397662556434,-15.495125874096443,15.495125874096445,4.619397662556434,-15.422577805780222,10.305037031470636,-4.784701678661045,-15.495125874096443,15.495125874096445,4.619397662556434,-15.422577805780222,10.305037031470636,-4.784701678661045,-17.836206686321592,11.91777228931345,4.784701678661045,-15.422577805780222,10.305037031470636,-4.784701678661045,-17.836206686321592,11.91777228931345,4.784701678661045,-17.576390872717052,7.280379477050086,-4.903926402016152,-17.836206686321592,11.91777228931345,4.784701678661045,-17.576390872717052,7.280379477050086,-4.903926402016152,-19.37879042773442,8.02695781755351,4.903926402016152,-17.576390872717052,7.280379477050086,-4.903926402016152,-19.37879042773442,8.02695781755351,4.903926402016152,-19.135036765752353,3.806195462972602,-4.975923633360984,-19.37879042773442,8.02695781755351,4.903926402016152,-19.135036765752353,3.806195462972602,-4.975923633360984,-20.096374450376864,3.9974174176725423,4.975923633360984,-19.135036765752353,3.806195462972602,-4.975923633360984,-20.096374450376864,3.9974174176725423,4.975923633360984,-20,2.4492935982947065e-15,-5,-20.096374450376864,3.9974174176725423,4.975923633360984,-20,2.4492935982947065e-15,-5,-20,2.4492935982947065e-15,5,-20,2.4492935982947065e-15,-5,-20,2.4492935982947065e-15,5,-20.096374450376864,-3.9974174176725374,-4.975923633360985,-20,2.4492935982947065e-15,5,-20.096374450376864,-3.9974174176725374,-4.975923633360985,-19.135036765752353,-3.806195462972597,4.975923633360985,-20.096374450376864,-3.9974174176725374,-4.975923633360985,-19.135036765752353,-3.806195462972597,4.975923633360985,-19.37879042773442,-8.026957817553505,-4.903926402016152,-19.135036765752353,-3.806195462972597,4.975923633360985,-19.37879042773442,-8.026957817553505,-4.903926402016152,-17.576390872717052,-7.280379477050081,4.903926402016152,-19.37879042773442,-8.026957817553505,-4.903926402016152,-17.576390872717052,-7.280379477050081,4.903926402016152,-17.836206686321596,-11.917772289313445,-4.784701678661045,-17.576390872717052,-7.280379477050081,4.903926402016152,-17.836206686321596,-11.917772289313445,-4.784701678661045,-15.422577805780223,-10.305037031470633,4.784701678661045,-17.836206686321596,-11.917772289313445,-4.784701678661045,-15.422577805780223,-10.305037031470633,4.784701678661045,-15.495125874096447,-15.495125874096443,-4.619397662556434,-15.422577805780223,-10.305037031470633,4.784701678661045,-15.495125874096447,-15.495125874096443,-4.619397662556434,-12.78914537336546,-12.789145373365455,4.619397662556434,-15.495125874096447,-15.495125874096443,-4.619397662556434,-12.78914537336546,-12.789145373365455,4.619397662556434,-12.420874635007543,-18.589152556097893,-4.409606321741776,-12.78914537336546,-12.789145373365455,4.619397662556434,-12.420874635007543,-18.589152556097893,-4.409606321741776,-9.801934685776544,-14.669631936003917,4.409606321741776,-12.420874635007543,-18.589152556097893,-4.409606321741776,-9.801934685776544,-14.669631936003917,4.409606321741776,-8.716706265760878,-21.043990486022413,-4.157348061512726,-9.801934685776544,-14.669631936003917,4.409606321741776,-8.716706265760878,-21.043990486022413,-4.157348061512726,-6.590631028842735,-15.911190814429048,4.157348061512726,-8.716706265760878,-21.043990486022413,-4.157348061512726,-6.590631028842735,-15.911190814429048,4.157348061512726,-4.520626390784348,-22.72672358353644,-3.8650522668136853,-6.590631028842735,-15.911190814429048,4.157348061512726,-4.520626390784348,-22.72672358353644,-3.8650522668136853,-3.2829864898607983,-16.504687632592773,3.8650522668136853,-4.520626390784348,-22.72672358353644,-3.8650522668136853,-3.2829864898607983,-16.504687632592773,3.8650522668136853,-4.323407439618679e-15,-23.535533905932738,-3.5355339059327378,-3.2829864898607983,-16.504687632592773,3.8650522668136853,-4.323407439618679e-15,-23.535533905932738,-3.5355339059327378,-3.0244733552654393e-15,-16.464466094067262,3.5355339059327378,-4.323407439618679e-15,-23.535533905932738,-3.5355339059327378,-3.0244733552654393e-15,-16.464466094067262,3.5355339059327378,4.655840731664415,-23.406491979344608,-3.1719664208182277,-3.0244733552654393e-15,-16.464466094067262,3.5355339059327378,4.655840731664415,-23.406491979344608,-3.1719664208182277,3.1477721489807178,-15.824919236784607,3.1719664208182277,4.655840731664415,-23.406491979344608,-3.1719664208182277,3.1477721489807178,-15.824919236784607,3.1719664208182277,9.244616873017844,-22.318479433782816,-2.777851165098011,3.1477721489807178,-15.824919236784607,3.1719664208182277,9.244616873017844,-22.318479433782816,-2.777851165098011,6.062720421585757,-14.636701866668652,2.777851165098011,9.244616873017844,-22.318479433782816,-2.777851165098011,6.062720421585757,-14.636701866668652,2.777851165098011,13.561250672086825,-20.295845904796398,-2.356983684129989,6.062720421585757,-14.636701866668652,2.777851165098011,13.561250672086825,-20.295845904796398,-2.356983684129989,8.66155864869725,-12.962938587305421,2.356983684129989,13.561250672086825,-20.295845904796398,-2.356983684129989,8.66155864869725,-12.962938587305421,2.356983684129989,17.408543035921888,-17.408543035921895,-1.9134171618254494,8.66155864869725,-12.962938587305421,2.356983684129989,17.408543035921888,-17.408543035921895,-1.9134171618254494,10.875728211540006,-10.875728211540011,1.9134171618254494,17.408543035921888,-17.408543035921895,-1.9134171618254494,10.875728211540006,-10.875728211540011,1.9134171618254494,20.607726295790542,-13.769642486935041,-1.451423386272312,10.875728211540006,-10.875728211540011,1.9134171618254494,20.607726295790542,-13.769642486935041,-1.451423386272312,12.651058196311268,-8.453166833849046,1.451423386272312,20.607726295790542,-13.769642486935041,-1.451423386272312,12.651058196311268,-8.453166833849046,1.451423386272312,23.00822788199017,-9.530320034891139,-0.9754516100806431,12.651058196311268,-8.453166833849046,1.451423386272312,23.00822788199017,-9.530320034891139,-0.9754516100806431,13.946953418461293,-5.777017259712479,0.9754516100806431,23.00822788199017,-9.530320034891139,-0.9754516100806431,13.946953418461293,-5.777017259712479,0.9754516100806431,24.49601826407562,-4.872560984282634,-0.49008570164780413,13.946953418461293,-5.777017259712479,0.9754516100806431,24.49601826407562,-4.872560984282634,-0.49008570164780413,14.735392952053592,-2.9310518963625145,0.49008570164780413,24.49601826407562,-4.872560984282634,-0.49008570164780413,14.735392952053592,-2.9310518963625145,0.49008570164780413,25,-6.123233995736766e-15,-6.123233995736766e-16,14.735392952053592,-2.9310518963625145,0.49008570164780413,25,-6.123233995736766e-15,-6.123233995736766e-16,15,-3.67394039744206e-15,6.123233995736766e-16,25,-6.123233995736766e-15,-6.123233995736766e-16,15,-3.67394039744206e-15,6.123233995736766e-16,24.496018264075623,4.8725609842826225,0.49008570164780296,15,-3.67394039744206e-15,6.123233995736766e-16,24.496018264075623,4.8725609842826225,0.49008570164780296,14.735392952053594,2.9310518963625074,-0.49008570164780296]);

var inner_cur = 0;
var inner_move = false;
var middle_cur = 0;
var middle_move = false;
var outer_cur = 0;
var outer_move = false;

var globalLight;
var spotlight;
let spotlights = [];
var spotlightMode = true;

var pointLights = [];
var pointLightMode = true;

var curMaterial = 'lambert';
var lambert = false;
var phong = false;
var toon = false;
var normal = false;

var basic = false;
var restoreMapping = false;

var parametricScale = 1;

var clock = new THREE.Clock();

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

var skydome = new THREE.Object3D();
var carousel = new THREE.Object3D();
var outerRing = new THREE.Object3D();
var middleRing = new THREE.Object3D();
var innerRing = new THREE.Object3D();
var mobius = new THREE.Mesh();
var cylinder = new THREE.Mesh();
var base = new THREE.Mesh();
var ground = new THREE.Mesh();
var parametricObjects = [];

let materials_List = [];

function createMaterial(colorChosen, sideChosen) {
    return  {lambert: new THREE.MeshLambertMaterial({color: colorChosen, side: sideChosen}),
            phong: new THREE.MeshPhongMaterial({color: colorChosen, side: sideChosen}),
            toon: new THREE.MeshToonMaterial({color: colorChosen, side: sideChosen}),
            normal: new THREE.MeshNormalMaterial({side: sideChosen}),
            basic: new THREE.MeshBasicMaterial({color: colorChosen, side: sideChosen})};
}

function createSkyDome() {
    'use strict'

    const x = SKYDOME_POS.x;
    const y = SKYDOME_POS.y;
    const z = SKYDOME_POS.z;

    const texture = new THREE.TextureLoader().load('./js/image.png');
    let skydome_materials = {   lambert: new THREE.MeshLambertMaterial({color: 0xf0f0f0, map: texture, side: THREE.BackSide}),
                                phong: new THREE.MeshPhongMaterial({color: 0xf0f0f0, map: texture, side: THREE.BackSide}),
                                toon: new THREE.MeshToonMaterial({color: 0xf0f0f0, map: texture, side: THREE.BackSide}),
                                normal: new THREE.MeshNormalMaterial({map: texture, side: THREE.BackSide}),
                                basic: new THREE.MeshBasicMaterial({color: 0xf0f0f0, map: texture, side: THREE.BackSide})}

    geometry = new THREE.SphereGeometry(SKYDOME_RADIUS, 20, 100, 0, Math.PI); 
    skydome = new THREE.Mesh(geometry, skydome_materials['lambert']);
    skydome.rotateX(-Math.PI/2);
    skydome.position.set(x, y, z); 

    materials_List.push([skydome, skydome_materials]);

    geometry = new THREE.CylinderGeometry(SKYDOME_RADIUS, SKYDOME_RADIUS, 0.1, 32);
    ground = new THREE.Mesh(geometry, skydome_materials['lambert']);
    ground.position.set(x, y, z);

    materials_List.push([ground, skydome_materials]);

    scene.add(ground);
    scene.add(skydome);
}

var parametricCounter = 0;
function createParametricShapes(obj, angle, radius) {
    'use strict'

    const x = radius * Math.cos(angle);
    const y = 10;
    const z = radius * Math.sin(angle);

    const axis = new THREE.Vector3(Math.floor(Math.random()*6)-3, Math.floor(Math.random()*6)-3, Math.floor(Math.random()*6)-3);

    switch(parametricCounter++ % 8){
        case 0:
            geometry = new ParametricGeometry(cone, 32, 32);
            break;
        case 1:
            geometry = new ParametricGeometry(sphere, 32, 32);
            break;
        case 2:
            geometry = new ParametricGeometry(vase, 32, 32);
            break;
        case 3:
            geometry = new ParametricGeometry(torus, 32, 32);
            break;
        case 4:
            geometry = new ParametricGeometry(curledPaper, 32, 32);
            break;
        case 5:
            geometry = new ParametricGeometry(egg, 32, 32);
            break;
        case 6:
            geometry = new ParametricGeometry(dome, 32, 32);
            break;
        case 7:
            geometry = new ParametricGeometry(kleinBottle, 32, 32);
            break;
    }
     
    let newMaterial = createMaterial(Math.floor(Math.random()*Math.pow(2,24)), THREE.DoubleSide);
    mesh = new THREE.Mesh(geometry, newMaterial['lambert']);
    materials_List.push([mesh, newMaterial]);

    spotlight = new THREE.SpotLight('white', 500, 20, Math.PI/4, 0.5, 2);
    spotlight.position.set(x, y-4.75, z);
    obj.add(spotlight);
    spotlights.push(spotlight);

    mesh.position.set(x, y, z);
    spotlight.lookAt(mesh.position);
    spotlight.target = mesh;
    mesh.rotateY(Math.PI*2*Math.random());

    parametricObjects.push([mesh, axis.normalize()]);

    obj.add(mesh);
}

function createOuterRing(obj, pos) {
    'use strict'

    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    let outer_materials = createMaterial(0xdb5856, THREE.DoubleSide);

    //Top side
    geometry = new THREE.RingGeometry(OUTER_RING_INRADIUS, OUTER_RING_OUTRADIUS);
    mesh = new THREE.Mesh(geometry, outer_materials['lambert']);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y+5, z);
    outerRing.add(mesh);
    materials_List.push([mesh, outer_materials]);

    //Bottom side
    geometry = new THREE.RingGeometry(OUTER_RING_OUTRADIUS, OUTER_RING_INRADIUS);
    mesh = new THREE.Mesh(geometry, outer_materials['lambert']);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y-5, z);
    outerRing.add(mesh);
    materials_List.push([mesh, outer_materials]);

    const path = new THREE.LineCurve3(new THREE.Vector3(0,0,5), new THREE.Vector3(0,0,-5));

    //Outer side
    geometry = new THREE.TubeGeometry(path, 64, OUTER_RING_OUTRADIUS, 32);
    mesh = new THREE.Mesh(geometry, outer_materials['lambert']);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y, z);
    outerRing.add(mesh);
    materials_List.push([mesh, outer_materials]);

    //Inner side
    geometry = new THREE.TubeGeometry(path, 64, OUTER_RING_INRADIUS, 32);
    mesh = new THREE.Mesh(geometry, outer_materials['lambert']);~
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y, z);
    outerRing.add(mesh);
    materials_List.push([mesh, outer_materials]);


    //Parametric shapes
    parametricScale = 1;
    for(let i = 0; i < 2*Math.PI; i+=Math.PI/4) createParametricShapes(outerRing, i, (OUTER_RING_INRADIUS+OUTER_RING_OUTRADIUS)/2, outer_materials);
    parametricCounter = Math.floor(Math.random()*8);

    obj.add(outerRing);

}

function createMiddleRing(obj, pos) {
    'use strict'

    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    let middle_materials = createMaterial(0x4287f5, THREE.DoubleSide);

    //Top side
    geometry = new THREE.RingGeometry(MIDDLE_RING_INRADIUS, MIDDLE_RING_OUTRADIUS);
    mesh = new THREE.Mesh(geometry, middle_materials['lambert']);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y+5, z);
    middleRing.add(mesh);
    materials_List.push([mesh, middle_materials]);

    //Bottom side
    geometry = new THREE.RingGeometry(MIDDLE_RING_OUTRADIUS, MIDDLE_RING_INRADIUS);
    mesh = new THREE.Mesh(geometry, middle_materials['lambert']);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y-5, z);
    middleRing.add(mesh);
    materials_List.push([mesh, middle_materials]);

    const path = new THREE.LineCurve3(new THREE.Vector3(0,0,5), new THREE.Vector3(0,0,-5));

    //Outer side
    geometry = new THREE.TubeGeometry(path, 64, MIDDLE_RING_OUTRADIUS, 32);
    mesh = new THREE.Mesh(geometry, middle_materials['lambert']);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y, z);
    middleRing.add(mesh);
    materials_List.push([mesh, middle_materials]);

    //Inner side
    geometry = new THREE.TubeGeometry(path, 64, MIDDLE_RING_INRADIUS, 32);
    mesh = new THREE.Mesh(geometry, middle_materials['lambert']);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y, z);
    middleRing.add(mesh);
    materials_List.push([mesh, middle_materials]);

    //Parametric shapes
    parametricScale = 0.75;
    for(let i = 0; i < 2*Math.PI; i+=Math.PI/4) createParametricShapes(middleRing, i, (MIDDLE_RING_INRADIUS+MIDDLE_RING_OUTRADIUS)/2, middle_materials);
    parametricCounter = Math.floor(Math.random()*8);

    obj.add(middleRing);

}

function createInnerRing(obj, pos) {
    'use strict'

    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    let inner_materials = createMaterial(0x42f56f, THREE.DoubleSide);

    //Top side
    geometry = new THREE.RingGeometry(INNER_RING_INRADIUS, INNER_RING_OUTRADIUS);
    mesh = new THREE.Mesh(geometry, inner_materials['lambert']);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y+5, z);
    innerRing.add(mesh);
    materials_List.push([mesh, inner_materials]);

    //Bottom side
    geometry = new THREE.RingGeometry(INNER_RING_OUTRADIUS, INNER_RING_INRADIUS);
    mesh = new THREE.Mesh(geometry, inner_materials['lambert']);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y-5, z);
    innerRing.add(mesh);
    materials_List.push([mesh, inner_materials]);

    const path = new THREE.LineCurve3(new THREE.Vector3(0,0,5), new THREE.Vector3(0,0,-5));

    //Outer side
    geometry = new THREE.TubeGeometry(path, 64, INNER_RING_OUTRADIUS, 32);
    mesh = new THREE.Mesh(geometry, inner_materials['lambert']);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y, z);
    innerRing.add(mesh);
    materials_List.push([mesh, inner_materials]);

    //Inner side
    geometry = new THREE.TubeGeometry(path, 64, INNER_RING_INRADIUS, 32);
    mesh = new THREE.Mesh(geometry, inner_materials['lambert']);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(x, y, z);
    innerRing.add(mesh);
    materials_List.push([mesh, inner_materials]);

    //Parametric shapes
    parametricScale = 0.5;
    for(let i = 0; i < 2*Math.PI; i+=Math.PI/4) createParametricShapes(innerRing, i, (INNER_RING_INRADIUS+INNER_RING_OUTRADIUS)/2, inner_materials);
    parametricCounter = Math.floor(Math.random()*8);

    obj.add(innerRing);

}

function createCilinder(obj, pos) {
    'use strict'

    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    let materials = createMaterial(0xf0f0f0, THREE.FrontSide);

    geometry = new THREE.CylinderGeometry(CYLINDER_RADIUS, CYLINDER_RADIUS, CYLINDER_HEIGHT, 32);
    cylinder = new THREE.Mesh(geometry, materials['lambert']);
    cylinder.position.set(x, y, z);

    materials_List.push([cylinder, materials]);

    obj.add(cylinder);

}

function createPointLight(obj, pos) {
    'use strict'

    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    const light = new THREE.PointLight('white', 100, 100);
    light.position.set(x, y, z);
    pointLights.push(light);

    obj.add(light);
}

function createMobius(obj, pos) {
    'use strict'

    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    let mobius_materials = createMaterial(0xf0f0f0, THREE.DoubleSide);

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.computeVertexNormals();
    mobius = new THREE.Mesh(geometry, mobius_materials['lambert']);
    mobius.rotateX(Math.PI/2);        
    mobius.position.set(x, y, z);

    materials_List.push([mobius, mobius_materials]);

    // Create point lights
    for(let i = 0; i < 2 * Math.PI; i += Math.PI/4) {
        const pos = new THREE.Vector3(MOBIUS_RADIUS*Math.cos(i), MOBIUS_POS.y, MOBIUS_RADIUS*Math.sin(i));
        createPointLight(obj, pos);
    }

    obj.add(mobius);

}

function createBase(obj, pos) {
    'use strict'

    const x = pos.x;
    const y = pos.y;
    const z = pos.z;

    let materials = createMaterial(0xf0f0f0, THREE.FrontSide);

    geometry = new THREE.CylinderGeometry(BASE_RADIUS, BASE_RADIUS, BASE_HEIGHT, 32);
    base = new THREE.Mesh(geometry, materials['lambert']);
    base.position.set(x, y, z);

    materials_List.push([base, materials]);

    obj.add(base);
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
    createBase(carousel, BASE_POS);
    createSkyDome();

    scene.add(carousel);

    carousel.position.set(x, y, z);

}

///////////////////////////
/* PARAMETRIC GEOMETRIES */
///////////////////////////

function cone(u, v, target) {
    let height = 5 * parametricScale;
    let radius = 3 * parametricScale;
    let x = radius * (1 - v) * Math.cos(2 * Math.PI * u);
    let y = height * (v);
    let z = radius * (1 - v) * Math.sin(2 * Math.PI * u);
    target.set(x, y, z);
}

function sphere(u, v, target) {
    let radius = 5 * parametricScale;
    let x = radius * Math.sin(u * Math.PI) * Math.cos(v * 2 * Math.PI);
    let y = radius * Math.sin(u * Math.PI) * Math.sin(v * 2 * Math.PI);
    let z = radius * Math.cos(u * Math.PI);
    target.set(x, y, z);
}

function vase(u, v, target) {
    let height = 5 * parametricScale;
    let radius = 3 * parametricScale;
    let x = radius * (1 - 2*Math.abs(v - 0.5)) * Math.cos(2 * Math.PI * u);
    let y = height * v;
    let z = radius * (1 - 2*Math.abs(v - 0.5)) * Math.sin(2 * Math.PI * u);
    target.set(x, y, z);
}

function torus(u, v, target) {
    let bigRadius = 3 * parametricScale;
    let smallRadius = 1 * parametricScale;
    let x = (bigRadius + smallRadius * Math.cos(2 * Math.PI * v)) * Math.cos(2 * Math.PI * u);
    let y = (bigRadius + smallRadius * Math.cos(2 * Math.PI * v)) * Math.sin(2 * Math.PI * u);
    let z = smallRadius * Math.sin(2 * Math.PI * v);
    target.set(x, y, z);
}

function curledPaper(u, v, target) {
    let height = 3.5 * parametricScale;
    let radius = 2 * parametricScale;
    let deformation = Math.sin(5 * u);
    let x = (radius + deformation) * Math.cos(2 * Math.PI * u);
    let y = height * v;
    let z = (radius + deformation) * Math.sin(2 * Math.PI * u);
    target.set(x, y, z);
}

function egg(u, v, target) {
    let theta = u * Math.PI * 2;
    let phi = v * Math.PI;

    let a = 3 * parametricScale;
    let b = 2.25 * parametricScale;
    let c = 2.25 * parametricScale;

    let x = a * Math.cos(theta) * Math.sin(phi);
    let y = b * Math.sin(theta) * Math.sin(phi);
    let z = c * Math.cos(phi);

    target.set(x, y, z);
}

function dome(u, v, target) {
    let radius = 5 * parametricScale;
    let x = radius * Math.sin(Math.PI * v * 0.5) * Math.cos(2 * Math.PI * u);
    let y = radius * Math.sin(Math.PI * v * 0.5) * Math.sin(2 * Math.PI * u);
    let z = radius * Math.cos(Math.PI * v * 0.5);
    target.set(x, y, z);
}

function kleinBottle(u, v, target) {
    let radius = 1 * parametricScale;
    let height = 3.5 * parametricScale;
    let width = 2 * parametricScale;

    u *= 2 * Math.PI;
    v *= 2 * Math.PI;

    let x, y, z;
    if (u < Math.PI) {
        x = width * Math.cos(u) * (1 + Math.sin(u)) + radius * Math.cos(u) * Math.cos(v);
        y = height * Math.sin(u) + radius * Math.sin(u) * Math.cos(v);
        z = radius * Math.sin(v);
    } else {
        x = width * Math.cos(u) * (1 + Math.sin(u)) + radius * Math.cos(v + Math.PI);
        y = height * Math.sin(u);
        z = radius * Math.sin(v);
    }

    target.set(x, y, z);
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
    camera.position.set(0, 50, 0);
    camera.lookAt(scene.position);

}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////
function createLights(){
    'use strict';

    globalLight = new THREE.DirectionalLight(0xffffff, 1);
    globalLight.position.set(50, 50, 50); 
    scene.add(globalLight);

    var ambientLight = new THREE.AmbientLight(0xffa500, 0.2);
    scene.add(ambientLight);

}

////////////
/* UPDATE */
////////////

function changeMaterial(material) {
    if(material != 'basic') curMaterial = material;

    for(let i = 0; i < materials_List.length; i++){
        materials_List[i][0].material = materials_List[i][1][material];
    }
}

function update(delta){
    'use strict';

    const velocity = 1*delta;

    carousel.rotation.y += 0.5*delta;

    for(let i = 0; i < parametricObjects.length; i++) {
        parametricObjects[i][0].rotateOnAxis(parametricObjects[i][1], 1*delta);
    }

    //! Movement with keys
    if(inner_move){
        inner_cur += velocity;
        innerRing.position.y = 30*Math.sin(inner_cur);
    }
    if(middle_move){
        middle_cur += velocity;
        middleRing.position.y = 30*Math.sin(middle_cur);
    }
    if(outer_move){
        outer_cur += velocity;
        outerRing.position.y = 30*Math.sin(outer_cur);
    }

    if(lambert) changeMaterial('lambert');

    if(phong) changeMaterial('phong');
    
    if(toon) changeMaterial('toon');

    if(normal) changeMaterial('normal');

    if(basic) changeMaterial('basic');

    if(restoreMapping) {
        changeMaterial(curMaterial);
        restoreMapping = false;
    }

    if (spotlightMode) {
        spotlights.forEach(spotlight => {
            spotlight.visible = true;
        });
    } else if (!spotlightMode) {
        spotlights.forEach(spotlight => {
            spotlight.visible = false;
        });
    }

    if (pointLightMode) {
        pointLights.forEach(pointLight => {
            pointLight.visible = true;
        });
    } else if (!pointLightMode) {
        pointLights.forEach(pointLight => {
            pointLight.visible = false;
        });
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

    document.body.appendChild( VRButton.createButton(renderer));
    renderer.xr.enabled = true;
    
    createScene();
    createLights();
    scene.position.set(0, 0, -70);
    createCamera();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);

}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    
    update(clock.getDelta());
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
        case 83: //s
            spotlightMode = !spotlightMode;
            break;
        case 80: //p
            pointLightMode = !pointLightMode;
            break;
        case 81: //q
            lambert = true;
            phong = false;
            toon = false;
            normal = false;
            break;
        case 87: //w
            lambert = false;
            phong = true;
            toon = false;
            normal = false;
            break;
        case 69: //e
            lambert = false;
            phong = false;
            toon = true;
            normal = false;
            break;
        case 82: //r
            lambert = false;
            phong = false;
            toon = false;
            normal = true;
            break;
        case 84: //t
            basic = !basic;
            if(!basic) restoreMapping = true;
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
        case 81: //q
            lambert = false;
            break;
        case 87: //w
            phong = false;
            break;
        case 69: //e
            toon = false;
            break;
        case 82: //r
            normal = false;
            break;
    }
}

init();
renderer.setAnimationLoop(animate);