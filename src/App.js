// import logo from './logo.svg';
import "./App.css";
import * as THREE from "three";
import React from "react";
// import * as dat from "dat.gui";
// import ReactDOM from "react-dom";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import CANNON from "cannon";
//import vertexShader from './components/shader/vertex.glsl'
//import fragmentShader from './components/shader/fragment.glsl'
// import WeatherApi from './components/api.js' dr ka pyan htae ya ml

function App() {
  // Gui
  // const gui = new dat.GUI();

  // scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdcd0ff);
  scene.fog = new THREE.Fog(0xdcd0ff, 1, 10);

  // physics
  const world = new CANNON.World();
  world.broadphase = new CANNON.SAPBroadphase(world);
  world.allowSleep = true;
  world.gravity.set(0, -9.8, 0);

  const defaultMaterial = new CANNON.Material("default");
  const defaultContactMaterail = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
      friction: 0.1,
      restitution: 0.4,
    }
  );
  world.addContactMaterial(defaultContactMaterail);
  world.defaultContactMaterial = defaultContactMaterail;

  //physicsGround

  const planeShape = new CANNON.Plane();
  const planeBody = new CANNON.Body({
    mass: 0,
    shape: planeShape,
  });
  planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI / 2);	

  world.addBody(planeBody);

  // loaders
  const loader = new GLTFLoader();

  // texture
  const textureLoader = new THREE.TextureLoader();
  // const snowTextre = textureLoader.load("disc.png");
  const colorTexture = textureLoader.load("Rock030_1K_Color.png");
  colorTexture.encoding = THREE.sRGBEncoding;

  const grassTexture = textureLoader.load("grass4.jpg");
  grassTexture.wrapS = THREE.RepeatWrapping;
  grassTexture.wrapT = grassTexture.wrapS;
  grassTexture.repeat.set(10000, 10000);
  grassTexture.anisotropy = 16;
  grassTexture.encoding = THREE.sRGBEncoding;

  // rain

//   const rainCount = 30;

//   const positionArray = new Float32Array(rainCount * 3);
//   const scaleArray = new Float32Array(rainCount * 1);
// let rainDrop=null
//   for (let i = 0; i < rainCount; i++) {
// //   [positionArray[i * 3], positionArray[i * 3 + 1], positionArray[i * 3 + 2]] = [
//     positionArray[i*3 ]    = Math.random()*window.innerWidth
//     positionArray[i*3+1]    = Math.random()*2
//     positionArray[i*3+2]    =Math.sin(100);
    
//     scaleArray[i] = Math.random();
//   }


  // const rainGeo = new THREE.BufferGeometry();
  // rainGeo.setAttribute("position", new THREE.BufferAttribute(positionArray, 3));
  // rainGeo.setAttribute("aScale", new THREE.BufferAttribute(scaleArray, 1));
  // console.log(rainGeo.attributes.position)
//   rainGeo.vertices.push(new THREE.Vector3(0, 0, 0));

  // const rainMaterial = new THREE.PointsMaterial({
  //   size: 1,
  //   sizeAttenuation: true,
  //   map: snowTextre,
  //   alphaTest: 0.5,
  //   transparent: true,
  // })
  // rainMaterial.color.set(0xffffff);
 
  // const rains = new THREE.Points(rainGeo, rainMaterial);

  // scene.add(rains);

  // model
  //     const textmaterial = new THREE.MeshBasicMaterial({
  //         color: 0xffffff ,
  //     })

  //     // I don't know these only affect wireframe on 3d object
  //     const tineMaterial = new THREE.MeshStandardMaterial({
  //         color:0x123456,
  //         metalness:1,
  //         roughness:0.3,
  //         wireframe:true,
  //         side:THREE.DoubleSide,
  //     })
  //     const steelMaterial = new THREE.MeshStandardMaterial({
  //         color: 0x00ff00,
  //         roughness: 0.5,
  //         // wireframe: true,
  //    side: THREE.DoubleSide,
  //         metalness: 1,

  //     })
  // above is problem

  const stoneMaterial = new THREE.MeshBasicMaterial({
    map: colorTexture,
  });

  loader.load("stone-final(1).glb", (glTF) => {
    // // stone
   const stone = glTF.scene.children.find((child) => child.name === "Cube");
    stone.material = stoneMaterial;

    // // tine
    // const tine = glTF.scene.children.find(child => child.name === 'Cube001')
    // tine.material = tineMaterial

    // const steel = glTF.scene.children.find(child => child.name === 'Cube004')
    // steel.material = steelMaterial
    // // steel.rotation.=-Math.PI/2

    // // Texts
    // const text = glTF.scene.children.find(child => child.name === 'Text')
    // text.material = textmaterial

    // const text1 = glTF.scene.children.find(child => child.name === 'Text001')
    // text1.material = textmaterial

    // const text2 = glTF.scene.children.find(child => child.name === 'Text002')
    // text2.material = textmaterial

    // const text3 = glTF.scene.children.find(child => child.name === 'Text003')
    // text3.material = textmaterial

    // const text4 = glTF.scene.children.find(child => child.name === 'Text004')
    // text4.material = textmaterial

    // const text5 = glTF.scene.children.find(child => child.name === 'Text005')
    // text5.material = textmaterial

    // const text6 = glTF.scene.children.find(child => child.name === 'Text006')
    // text6.material = textmaterial

    // console.log(glTF.scene)
    glTF.scene.scale.set(0.25, 0.25, 0.25);
    glTF.scene.position.set(1.2, 0, 0);

    // glTF.scene.rotation.z=2
    scene.add(glTF.scene);
  });

  //     const plate1=new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2),new THREE.MeshStandardMaterial({
  //         color:0x123456,
  //         metalness:1,
  //         roughness:0.3,
  //         side:THREE.DoubleSide,
  //     }))
  //     // plate1.position.set(0,0.1,-1)
  //     // plate1.rotation.x=-Math.PI/2
  // scene.add(plate1)

  // light
 // const debugObject = {
   // color: 0xff0000,
  //};

  const ambient = new THREE.AmbientLight(0xffffff, 1);  
  scene.add(ambient);
  //0xfafd0f
  const pointLight = new THREE.PointLight(0xfafd0f, 1, 10);
  pointLight.position.set(1, 1, -0.7);
  scene.add(pointLight);

  //    const pointLight = new THREE.PointLight( 0xffffff, 1,10);
  //    pointLight.position.set( 0, 2, 0 );
  //     scene.add( pointLight );

  //     gui.addColor(debugObject, 'color').onChange(color => {
  //         pointLight.color.set(color)
  //     })
  //     gui.add(pointLight, 'intensity', 0, 1).name('intensity')
  //     gui.add(pointLight.position, 'x').min(-10).max(10).name('x')
  //     gui.add(pointLight.position, 'y').min(-10).max(10).name('y')
  //     gui.add(pointLight.position, 'z').min(-10).max(10).name('z')
  //     gui.add(pointLight.rotation, 'x').min(-10).max(10).name('x')
  //     gui.add(pointLight.rotation, 'y').min(-10).max(10).name('y')
  //     gui.add(pointLight.rotation, 'z').min(-10).max(10).name('z')

  // camera

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 2.3);
  scene.add(camera);

  // helper
  // const directionLightHelper = new THREE.PointLightHelper(pointLight, 1)
  // scene.add(directionLightHelper)
  // const axesHelper = new THREE.AxesHelper(5);
  // scene.add(axesHelper);

  // plate
  const plate = new THREE.Mesh(
    new THREE.PlaneGeometry(20000, 20000),
    new THREE.MeshStandardMaterial({
      map: grassTexture,
    })
  );
  plate.position.set(0, 0, 0);
  plate.rotation.x = -Math.PI / 2;
  scene.add(plate);

  // render
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xdcd0ff);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.body.appendChild(renderer.domElement);

  // controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.maxPolarAngle = Math.PI / 3;
  controls.minDistance = 1;
  controls.maxDistance = 50000;

  //
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // animation
  const clock = new THREE.Clock();
  let previciousTime = 0;
  const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    const delta = elapsedTime - previciousTime;
    previciousTime = elapsedTime;

// rainDrop
// rainGeo.position.forEach(k=>{
//     k.velocity-=0.1+Math.random()*0.1
//     k.y-=0.1+Math.random()*0.1
//     if(k.y<-10){
//         k.y=-10
//         k.velocity=0
//     }
// })
// rainGeo.verticesNeedUpdate=true
    // console.log(Body.position)
    world.step(1 / 60, delta, 3);
    // rains.position.copy(Body.position);

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(animate);
  };
  animate();

  return <div></div>;
}

export default App;
