"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Field() {
  const material = useRef<THREE.ShaderMaterial>(null);
  useFrame((state) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = state.clock.elapsedTime;
    material.current.uniforms.uMouse.value.lerp(
      new THREE.Vector2(state.pointer.x, state.pointer.y),
      0.035,
    );
  });

  return (
    <mesh scale={[2.15, 1.2, 1]}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial
        ref={material}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2() },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uMouse;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f*f*(3.0-2.0*f);
            return mix(
              mix(hash(i), hash(i+vec2(1.0,0.0)), f.x),
              mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), f.x),
              f.y
            );
          }

          float fbm(vec2 p) {
            float v = 0.0;
            float a = 0.5;
            for(int i=0;i<5;i++) {
              v += a * noise(p);
              p = p * 2.0 + 17.0;
              a *= 0.5;
            }
            return v;
          }

          void main() {
            vec2 uv = vUv;
            vec2 p = (uv - 0.5) * vec2(1.5, 1.0);
            p += uMouse * 0.08;

            float t = uTime * 0.055;
            float n = fbm(p * 2.4 + vec2(t, -t * 0.7));
            float n2 = fbm(p * 4.0 - vec2(t * 0.65, t));
            float bands = smoothstep(0.22, 0.82, n * 0.72 + n2 * 0.28);

            vec3 ink = vec3(0.05, 0.07, 0.09);
            vec3 warm = vec3(0.80, 0.29, 0.08);
            vec3 cream = vec3(0.92, 0.88, 0.76);

            float glow = smoothstep(0.1, 0.9, 1.0 - length(p - uMouse * 0.25));
            vec3 color = mix(ink, warm, bands * 0.55);
            color = mix(color, cream, glow * 0.18);

            float vignette = smoothstep(1.15, 0.18, length((uv - 0.5) * vec2(1.2, 0.95)));
            color *= 0.62 + vignette * 0.38;

            gl_FragColor = vec4(color, 0.96);
          }
        `}
      />
    </mesh>
  );
}

export function LiquidField() {
  return (
    <div className="absolute inset-0">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 1] }} gl={{ antialias: false, alpha: false }}>
        <Field />
      </Canvas>
    </div>
  );
}
