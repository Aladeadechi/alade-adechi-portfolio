"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Scene() {
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const material = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;

      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
      float noise(vec2 p){
        vec2 i=floor(p), f=fract(p);
        f=f*f*(3.0-2.0*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
      }
      float fbm(vec2 p){
        float v=0.0, a=.5;
        for(int i=0;i<5;i++){ v+=a*noise(p); p=p*2.02+13.7; a*=.5; }
        return v;
      }

      void main(){
        vec2 uv=vUv;
        vec2 p=uv*2.0-1.0;
        p.x*=uResolution.x/uResolution.y;
        float t=uTime*.11;
        vec2 m=(uMouse-.5)*.28;

        float n=fbm(p*1.15 + vec2(t*.22,-t*.15));
        float flow=sin(p.y*5.0 + n*5.0 - t*2.0);
        float ribbon=exp(-abs(p.x + sin(p.y*2.3+t)*.42 + flow*.09 - m.x)*7.0);
        float ribbon2=exp(-abs(p.x*.75 - cos(p.y*3.1-t*.7)*.35 - flow*.06 - m.x*.5)*13.0);
        float glow=pow(max(0.0,1.0-length(p*vec2(.62,.9))),2.0);

        vec3 bg=mix(vec3(.018,.019,.022),vec3(.065,.052,.042),n*.45);
        vec3 amber=vec3(.82,.55,.30);
        vec3 ivory=vec3(.92,.86,.72);
        vec3 col=bg;
        col += amber*ribbon*.48;
        col += ivory*ribbon2*.34;
        col += vec3(.32,.18,.08)*glow*.35;

        float grain=hash(uv*vec2(900.,500.)+uTime)*.035;
        col += grain;
        float vignette=smoothstep(1.25,.25,length(p));
        col*=mix(.48,1.0,vignette);
        gl_FragColor=vec4(col,1.0);
      }
    `,
  }), []);

  useFrame((state) => {
    if (!mesh.current) return;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uResolution.value.set(viewport.width, viewport.height);
    material.uniforms.uMouse.value.lerp(
      new THREE.Vector2(state.pointer.x * .5 + .5, state.pointer.y * .5 + .5),
      .035
    );
  });

  return <mesh ref={mesh}><planeGeometry args={[2, 2]} /><primitive object={material} attach="material" /></mesh>;
}

export function CinematicField() {
  return (
    <div className="absolute inset-0">
      <Canvas
        orthographic
        camera={{ position: [0,0,1], zoom: 1 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
