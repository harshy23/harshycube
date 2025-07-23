// Focus buttons for each cube
document.querySelector('#focus1').addEventListener('click', () => {
  // Move camera to focus on cube 1
  camera.position.set(cube.position.x, cube.position.y, camera.position.z);
  control.target.copy(cube.position);
  control.update();
});

document.querySelector('#focus2').addEventListener('click', () => {
  if (cube2) {
    camera.position.set(cube2.position.x, cube2.position.y, camera.position.z);
    control.target.copy(cube2.position);
    control.update();
  }
});
import './style.css'
import * as Three from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;



const scene = new Three.Scene();//this is conatiner which contain all other elelment like camera light etc.

const camera = new Three.PerspectiveCamera(75 , window.innerWidth / window.innerHeight , 0.1,1000)//(field of view in degree , aspect ratio, view fructrum(howm much object is visible))

const renderer =new Three.WebGLRenderer({
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth , window.innerHeight);
document.querySelector('#box_area').appendChild(renderer.domElement)

camera.position.z = 10;

renderer.render(scene , camera)

// Cube 1
const geometry = new Three.BoxGeometry(3, 3, 3);
const material = new Three.MeshMatcapMaterial({ color: 0x00ff00 });
const cube = new Three.Mesh(geometry, material);
scene.add(cube);

// Cube 2 (created on demand)
let cube2 = null;
let rotationx2 = 0;
let rotationy2 = 0;

// Show/Remove Cube 2 and its controls with the same button
const addBoxBtn = document.querySelector('#add-box');
const controllers2 = document.querySelector('#controllers2');
addBoxBtn.addEventListener('click', () => {
  if (!cube2) {
    // Add Cube 2
    const geometry2 = new Three.BoxGeometry(3, 3, 3);
    const material2 = new Three.MeshMatcapMaterial({ color: 0xff0000 });
    cube2 = new Three.Mesh(geometry2, material2);
    cube2.position.set(4, 0, 0); // Place it beside the first cube
    scene.add(cube2);
    controllers2.style.display = '';
    addBoxBtn.textContent = 'Remove Box';
    showMessage("Second cube added!");
  } else {
    // Remove Cube 2
    scene.remove(cube2);
    cube2 = null;
    controllers2.style.display = 'none';
    addBoxBtn.textContent = 'Add Box';
    showMessage("Second cube removed!");
  }
});


// adding lights for reflection
const light = new Three.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);

const ambientLight = new Three.AmbientLight(0x404040); // soft light

const lighthelper = new Three.PointLightHelper(light)
const lighthe = new Three.DirectionalLightHelper(light);
scene.add(lighthelper,light,ambientLight,lighthe);


const control = new OrbitControls(camera,renderer.domElement);

//speed control for cube 1
let rotationx = 0;
let rotationy = 0;
const rotation1Slider = document.querySelector("#rotation1");
rotation1Slider.addEventListener("input", (e) => {
  const value = parseFloat(e.target.value);
  rotationx = value;
  rotationy = value;
});

//speed control for cube 2
const rotation2Slider = document.querySelector("#rotation2");
rotation2Slider.addEventListener("input", (e) => {
  const value = parseFloat(e.target.value);
  rotationx2 = value;
  rotationy2 = value;
});

//reset cube 1
document.querySelector("#reset1").addEventListener("click", () => {
  rotationx = 0;
  rotationy = 0;
  cube.position.set(0, 0, 0);
  cube.rotation.set(0, 0, 0);
  rotation1Slider.value = "0";
});

//reset cube 2
document.querySelector("#reset2").addEventListener("click", () => {
  if (cube2) {
    rotationx2 = 0;
    rotationy2 = 0;
    cube2.position.set(4, 0, 0);
    cube2.rotation.set(0, 0, 0);
    rotation2Slider.value = "0";
  }
});

// fixing cube movement boundaries
const Bound = 5;

function movecube(dx, dy, cubeObj) {
  const newx = cubeObj.position.x + dx;
  const newy = cubeObj.position.y + dy;
  if (Math.abs(newx) <= Bound) cubeObj.position.x = newx;
  if (Math.abs(newy) <= Bound) cubeObj.position.y = newy;
}

// Controls for cube 1
document.querySelector("#left1").addEventListener("click", () => movecube(-1, 0, cube));
document.querySelector("#right1").addEventListener("click", () => movecube(1, 0, cube));
document.querySelector("#up1").addEventListener("click", () => movecube(0, 1, cube));
document.querySelector("#down1").addEventListener("click", () => movecube(0, -1, cube));

// Controls for cube 2
document.querySelector("#left2").addEventListener("click", () => { if (cube2) movecube(-1, 0, cube2); });
document.querySelector("#right2").addEventListener("click", () => { if (cube2) movecube(1, 0, cube2); });
document.querySelector("#up2").addEventListener("click", () => { if (cube2) movecube(0, 1, cube2); });
document.querySelector("#down2").addEventListener("click", () => { if (cube2) movecube(0, -1, cube2); });


// to show mesaage on top 
function showMessage(msg, isError = false) {
  const messageEl = document.querySelector("#message");
  messageEl.textContent = msg;
  messageEl.style.color = isError ? "red" : "green";

  setTimeout(() => {
    messageEl.textContent = "";
  }, 3000); // hides message after 3 seconds
}

// to fetch current properties of backend for both cubes
window.addEventListener("DOMContentLoaded", async () => {
  try {
    // Cube 1
    const res1 = await fetch(`${BASE_URL}/api/cubes/cube_1`);
    const data1 = await res1.json();
    if (data1 && data1.position) {
      cube.position.set(data1.position.x, data1.position.y, data1.position.z);
      rotationx = data1.rotationSpeed || 0;
      rotationy = data1.rotationSpeed || 0;
      rotation1Slider.value = rotationx;
    }

    // Cube 2 (if exists in backend)
    const res2 = await fetch(`${BASE_URL}/api/cubes/cube_2`);
    const data2 = await res2.json();
    if (data2 && data2.position) {
      if (!cube2) {
        // Create cube2 if not already present
        const geometry2 = new Three.BoxGeometry(3, 3, 3);
        const material2 = new Three.MeshMatcapMaterial({ color: 0xff0000 });
        cube2 = new Three.Mesh(geometry2, material2);
        cube2.position.set(4, 0, 0);
        scene.add(cube2);
        controllers2.style.display = '';
      }
      cube2.position.set(data2.position.x, data2.position.y, data2.position.z);
      rotationx2 = data2.rotationSpeed || 0;
      rotationy2 = data2.rotationSpeed || 0;
      rotation2Slider.value = rotationx2;
    }
    showMessage("Cube states loaded!");
  } catch (err) {
    console.error("Failed to load cube state:", err);
    showMessage("Failed to load cube state", true);
  }
});
// to save properties for cube 1
document.querySelector("#save1").addEventListener("click", async () => {
  const body = {
    x: cube.position.x,
    y: cube.position.y,
    z: cube.position.z,
    rotationSpeed: rotationx
  };
  try {
    const res = await fetch(`${BASE_URL}/api/cubes/cube_1/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const result = await res.json();
    showMessage(result.message || "Cube 1 saved!");
  } catch (err) {
    showMessage("Cube 1 save failed!", true);
  }
});

// to save properties for cube 2
document.querySelector("#save2").addEventListener("click", async () => {
  if (!cube2) return showMessage("Cube 2 not present!", true);
  const body = {
    x: cube2.position.x,
    y: cube2.position.y,
    z: cube2.position.z,
    rotationSpeed: rotationx2
  };
  try {
    const res = await fetch(`${BASE_URL}/api/cubes/cube_2/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const result = await res.json();
    showMessage(result.message || "Cube 2 saved!");
  } catch (err) {
    showMessage("Cube 2 save failed!", true);
  }
});

// to reset cube 1 (backend)
document.querySelector("#reset1").addEventListener("click", async () => {
  rotationx = 0;
  rotationy = 0;
  cube.position.set(0, 0, 0);
  cube.rotation.set(0, 0, 0);
  rotation1Slider.value = "0";
  try {
    const res = await fetch(`${BASE_URL}/api/cubes/cube_1/reset`, { method: "POST" });
    const result = await res.json();
    showMessage(result.message || "Cube 1 reset!");
  } catch (err) {
    showMessage("Cube 1 reset failed!", true);
  }
});

// to reset cube 2 (backend)
document.querySelector("#reset2").addEventListener("click", async () => {
  if (!cube2) return showMessage("Cube 2 not present!", true);
  rotationx2 = 0;
  rotationy2 = 0;
  cube2.position.set(4, 0, 0);
  cube2.rotation.set(0, 0, 0);
  rotation2Slider.value = "0";
  try {
    const res = await fetch(`${BASE_URL}/api/cubes/cube_2/reset`, { method: "POST" });
    const result = await res.json();
    showMessage(result.message || "Cube 2 reset!");
  } catch (err) {
    showMessage("Cube 2 reset failed!", true);
  }
});






// creating loop to call renderer in loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += rotationx;
  cube.rotation.y += rotationy;
  if (cube2) {
    cube2.rotation.x += rotationx2;
    cube2.rotation.y += rotationy2;
  }
  control.update(); //make sure changes are updated in ui
  renderer.render(scene, camera);
}

animate()