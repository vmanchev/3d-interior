import * as THREE from "three-full";

window.onload = () => {
  init();
  animate();
};

let renderer,
  scene,
  camera,
  mtlLoader,
  objLoader,
  mouseX = 0,
  mouseY = 0, 
  mesh,
  windowHalfX = window.innerWidth / 2,
  windowHalfY = window.innerHeight / 2;

function init() {
  setupScene();
  setupCamera();
  setupRenderer();
  addLight();
  mtlLoad();
}

function setupScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
}

function setupCamera() {
  camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(4.5, 9, 5);
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  document.addEventListener("mousemove", onDocumentMouseMove, false);
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / 2;
  mouseY = (event.clientY - windowHalfY) / 2;
}

function mtlLoad() {
  mtlLoader = new THREE.MTLLoader();
  mtlLoader
    .setPath("http://localhost:9000/assets/")
    .load("bathroom.mtl", mtlLoadedCb, null, errorCb);
}

function mtlLoadedCb(materials) {
  materials.preload();

  objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath("http://localhost:9000/assets/");
  objLoader.load("bathroom.obj", objLoadedCb, null, errorCb);
}

function objLoadedCb(obj) {
  mesh = obj;

  mesh.rotation.set(1.3, 3.6, 4.8);

  scene.add(mesh);
}

function errorCb(error) {
  console.log("error", errorCb);
}

function addLight() {
  var light = new THREE.AmbientLight(0x404040, 1); // soft white light
  scene.add(light);

  var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
  camera.add( pointLight );

  scene.add(camera);
}


function animate() {
  requestAnimationFrame( animate );
  render();
}
function render() {

  // camera.position.x += ( mouseX - camera.position.x ) * .05;
  // camera.position.y += ( - mouseY - camera.position.y ) * .05;

  camera.lookAt( scene.position );
  renderer.render( scene, camera );
}
