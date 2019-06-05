import {
  AmbientLight,
  BoxGeometry,
  OBJLoader,
  Scene,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  WebGLRenderer,
  Color
} from 'three-full';

window.onload = init;

let cube, renderer, scene, camera, loader, geometry, material;

function init() {
  loader = new OBJLoader();

  scene = new Scene();
  scene.background = new Color(0xffffff);
  camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // addCube();
  addModel();
  // addLight();
  camera.position.z = 5;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

function addCube() {
  geometry = new BoxGeometry(1, 1, 1);
  material = new MeshBasicMaterial({ color: 0x00ff00 });
  cube = new Mesh(geometry, material);
  scene.add(cube);
}

function addModel() {
  loader.load(
    // resource URL
    'assets/untitled.obj',
    // called when resource is loaded
    function(object) {
      scene.add(object);
      addLight()
    },
    // called when loading is in progresses
    function(xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    // called when loading has errors
    function(error) {
      console.log('An error happened');
    }
  );
}

function addLight() {
  var light = new AmbientLight(0x404040); // soft white light
  scene.add(light);
}
