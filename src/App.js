// import logo from './logo.svg';
import './App.css';
import * as THREE from 'three'
import React, { Component } from 'react'
import * as dat from 'dat.gui'
import ReactDOM from "react-dom"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import  color from '../public/Rock030_1'
// import {TextureLoader}  from 'three/src/loaders/TextureLoader'



class App extends Component {

    componentDidMount() {
        // Gui
        const gui = new dat.GUI()

        // scene
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0xdcd0ff)
        scene.fog = new THREE.Fog(0xdcd0ff, 1, 16)


        // loaders
        const loader = new GLTFLoader();

        // texture
        const textureLoader = new THREE.TextureLoader()
        const colorTexture = textureLoader.load('Color.jpg')
        colorTexture.encoding = THREE.sRGBEncoding

        const grassTexture = textureLoader.load('grass4.jpg')
        grassTexture.wrapS = THREE.RepeatWrapping
        grassTexture.wrapT = grassTexture.wrapS
        grassTexture.repeat.set(10000, 10000)
        grassTexture.anisotropy = 16
        grassTexture.encoding = THREE.sRGBEncoding



        // model
        const textmaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff ,  
        })

        // I don't know these only affect wireframe on 3d object 
        const tineMaterial = new THREE.MeshStandardMaterial({
            color:0x123456,
            metalness:1,
            roughness:0.3,
            wireframe:true,
            side:THREE.DoubleSide,
        })
        const steelMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            roughness: 0.5,
            // wireframe: true,
       side: THREE.DoubleSide,
            metalness: 1,
       
        })
// above is problem

        const stoneMaterial = new THREE.MeshBasicMaterial({
            map: colorTexture,
        })



        loader.load('stone-final(1).glb', (glTF) => {

            // // stone
            // const stone = glTF.scene.children.find(child => child.name === 'Cube')
            // stone.material = stoneMaterial

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

            console.log(glTF.scene)
            glTF.scene.scale.set(.25, .25, .25)
            glTF.scene.position.set(1.2, 0, 0)
              
            // glTF.scene.rotation.z=2
            scene.add(glTF.scene)
        })

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
        const debugObject = {
            color: 0xff0000,
        }

        const ambient = new THREE.AmbientLight( 0xff0000,2 );
        scene.add( ambient );

        const pointLight = new THREE.PointLight( 0xfafd0f, 1,10 );
        pointLight.position.set( 1, 1, -0.7 );
        scene.add( pointLight );

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
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.set(0, 2, 2.3)
        scene.add(camera)


        // helper
        // const directionLightHelper = new THREE.PointLightHelper(pointLight, 1)
        // scene.add(directionLightHelper)
        const axesHelper = new THREE.AxesHelper(5)
        scene.add(axesHelper)
        
        
        // plate
        const plate = new THREE.Mesh(new THREE.PlaneGeometry(20000, 20000), new THREE.MeshStandardMaterial({
            map: grassTexture,
        }))
        plate.position.set(0, 0, 0)
        plate.rotation.x = -Math.PI / 2
        scene.add(plate)

        // render
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor(0xdcd0ff)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.outputEncoding = THREE.sRGBEncoding
        this.mount.appendChild(renderer.domElement);


        // controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.maxPolarAngle = Math.PI / 3
        controls.minDistance = 1
        controls.maxDistance = 50000

        // 
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()

            renderer.setSize(window.innerWidth, window.innerHeight)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

        console.log(scene)

        // animation
        const clock = new THREE.Clock()
        const animate = () => {

            const elapsedTime = clock.getElapsedTime()

            controls.update()

            renderer.render(scene, camera)

            window.requestAnimationFrame(animate)
        }
        animate()
    }

    render() {
       return(
                    <div ref = { ref => (this.mount = ref) } > </div>
                )
    }

}
const rootElement = document.getElementById("root")
ReactDOM.render( < App / > , rootElement);
export default App;