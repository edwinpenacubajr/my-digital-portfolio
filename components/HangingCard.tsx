'use client';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {Physics, RigidBody, BallCollider, useSphericalJoint} from '@react-three/rapier';
import {useTexture, Environment, RoundedBox} from '@react-three/drei';
import {useRef,useState,useEffect} from 'react';
import * as THREE from 'three';

function Segment({a,b,length=0.53}:any){useSphericalJoint(a,b,[[0,-length/2,0],[0,length/2,0]]);return null}
function Badge(){
 const fixed=useRef<any>(null),s1=useRef<any>(null),s2=useRef<any>(null),card=useRef<any>(null);
 const [drag,setDrag]=useState(false);
 const photo=useTexture('/edwin.jpg');photo.colorSpace=THREE.SRGBColorSpace;
 const {camera,pointer}=useThree();
 const cord=useRef<THREE.Mesh>(null);const geometry=useRef(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0,2,0),new THREE.Vector3(0,0,0)]),30,.036,8,false));
 const target=new THREE.Vector3();const ray=new THREE.Ray();const plane=new THREE.Plane(new THREE.Vector3(0,0,1),0);
 useFrame((state,delta)=>{
   if(!card.current||!s1.current||!s2.current)return;
   if(drag){ray.origin.copy(camera.position);ray.direction.set(pointer.x,pointer.y,.5).unproject(camera).sub(camera.position).normalize();if(ray.intersectPlane(plane,target)){card.current.setNextKinematicTranslation({x:THREE.MathUtils.clamp(target.x,-2,2),y:THREE.MathUtils.clamp(target.y,-1.6,1.3),z:0});}}
   const p1=s1.current.translation(),p2=s2.current.translation(),p3=card.current.translation();
   const pts=[new THREE.Vector3(0,2.0,0),new THREE.Vector3(p1.x,p1.y,p1.z),new THREE.Vector3(p2.x,p2.y,p2.z),new THREE.Vector3(p3.x,p3.y+.72,p3.z)];
   const curve=new THREE.CatmullRomCurve3(pts);
   const next=new THREE.TubeGeometry(curve,40,.035,8,false);
   geometry.current.dispose();geometry.current=next;
   if(cord.current)cord.current.geometry=next;
 });
 useEffect(()=>{const up=()=>setDrag(false);window.addEventListener('pointerup',up);return()=>window.removeEventListener('pointerup',up)},[]);
 return <>
 <RigidBody ref={fixed} type="fixed" position={[0,2,0]} colliders={false}><BallCollider args={[.06]}/></RigidBody>
 <RigidBody ref={s1} position={[0,1.46,0]} colliders={false} angularDamping={4} linearDamping={1}><BallCollider args={[.075]}/></RigidBody>
 <RigidBody ref={s2} position={[0,.92,0]} colliders={false} angularDamping={4} linearDamping={1}><BallCollider args={[.075]}/></RigidBody>
 <RigidBody ref={card} position={[0,-.06,0]} type={drag?'kinematicPosition':'dynamic'} colliders={false} angularDamping={3} linearDamping={.8} mass={1}>
 <BallCollider args={[.11]} position={[0,.73,0]}/>
 <group onPointerDown={(e)=>{e.stopPropagation();(e.target as any).setPointerCapture?.(e.pointerId);setDrag(true)}} onPointerUp={()=>setDrag(false)}>
 <RoundedBox args={[1.27,1.83,.075]} radius={.085} smoothness={5}><meshPhysicalMaterial color="#111820" metalness={.35} roughness={.28} clearcoat={.9}/></RoundedBox>
 <mesh position={[0,.58,.046]}><planeGeometry args={[1.08,.31]}/><meshBasicMaterial color="#131f2d"/></mesh>
 <mesh position={[0,.58,.049]}><planeGeometry args={[1.05,.27]}/><meshBasicMaterial color="#d9f6ff" transparent opacity={.07}/></mesh>
 <mesh position={[0,-.14,.047]}><planeGeometry args={[1.14,1.13]}/><meshBasicMaterial map={photo} toneMapped={false}/></mesh>
 <mesh position={[0,-.77,.052]}><planeGeometry args={[1.15,.27]}/><meshBasicMaterial color="#0a1220" transparent opacity={.9}/></mesh>
 <mesh position={[0,.84,.052]}><planeGeometry args={[.28,.048]}/><meshStandardMaterial color="#05080e" metalness={.6}/></mesh>
 </group>
 </RigidBody>
 <Segment a={fixed} b={s1}/><Segment a={s1} b={s2}/><Segment a={s2} b={card} length={.69}/>
 <mesh ref={cord} geometry={geometry.current}><meshStandardMaterial color="#121417" roughness={.88} metalness={.05}/></mesh>
 <mesh position={[0,.76,.04]}><torusGeometry args={[.105,.026,10,24]}/><meshStandardMaterial color="#c0cad2" metalness={.9} roughness={.22}/></mesh>
 </>;
}
export default function HangingCard(){return <div className="three-scene"><Canvas camera={{position:[0,0,5],fov:37}} dpr={[1,1.7]} gl={{alpha:true,antialias:true}}><ambientLight intensity={1.8}/><directionalLight position={[3,4,5]} intensity={3}/><Physics gravity={[0,-9.81,0]} timeStep="vary"><Badge/></Physics></Canvas><div className="drag-hint">DRAG THE ID · LET IT SWING</div></div>}
