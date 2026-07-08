import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  RoundedBox,
  Environment,
  MeshDistortMaterial,
  Torus,
  Sphere,
  Cylinder,
} from "@react-three/drei";
import * as THREE from "three";
import type { Scene3DVariant } from "./scene-3d";

interface Props {
  variant: Scene3DVariant;
  interactive: boolean;
  onReady?: () => void;
}

const COLORS = {
  blue: "#0C447C",
  blueLight: "#3D74B0",
  green: "#1D9E75",
  coral: "#C85B43",
  cream: "#F6EFE3",
  white: "#ffffff",
};

export default function Scene3DInner({ variant, interactive, onReady }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => { onReady?.(); }}
    >

      <color attach="background" args={["#F6EFE3"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} />
      <directionalLight position={[-4, -2, 3]} intensity={0.4} color={COLORS.coral} />
      <Environment preset="city" />

      <ScrollRig>
        {variant === "heart" && <HeartScene />}
        {variant === "pills" && <PillsScene />}
        {variant === "route" && <RouteScene />}
        {variant === "coins" && <CoinsScene />}
        {variant === "shield" && <ShieldScene />}
        {variant === "globe" && <GlobeScene />}
      </ScrollRig>

      {interactive && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(2 * Math.PI) / 3}
        />
      )}
    </Canvas>
  );
}

/* ─────────  SCROLL RIG - rotates + subtly scales the whole scene as the user scrolls  ───────── */
function ScrollRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY || 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useFrame(() => {
    if (!group.current) return;
    const target = scroll * 0.0018;
    group.current.rotation.y += (target - group.current.rotation.y) * 0.08;
    const tiltTarget = Math.sin(scroll * 0.002) * 0.18;
    group.current.rotation.x += (tiltTarget - group.current.rotation.x) * 0.08;
    const sTarget = 1 + Math.min(0.12, scroll * 0.00012);
    const cur = group.current.scale.x;
    const next = cur + (sTarget - cur) * 0.08;
    group.current.scale.setScalar(next);
  });
  return <group ref={group}>{children}</group>;
}

/* ─────────  HEART (home)  ───────── */
function HeartScene() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const x = 0,
      y = 0;
    s.moveTo(x, y);
    s.bezierCurveTo(x, y + 0.3, x - 0.5, y + 1, x - 1, y + 1);
    s.bezierCurveTo(x - 2.1, y + 1, x - 2.1, y - 0.35, x - 2.1, y - 0.35);
    s.bezierCurveTo(x - 2.1, y - 1.05, x - 1.4, y - 1.85, x, y - 2.55);
    s.bezierCurveTo(x + 1.4, y - 1.85, x + 2.1, y - 1.05, x + 2.1, y - 0.35);
    s.bezierCurveTo(x + 2.1, y - 0.35, x + 2.1, y + 1, x + 1, y + 1);
    s.bezierCurveTo(x + 0.5, y + 1, x, y + 0.3, x, y);
    return s;
  }, []);
  const geo = useMemo(
    () =>
      new THREE.ExtrudeGeometry(shape, {
        depth: 0.7,
        bevelEnabled: true,
        bevelSize: 0.15,
        bevelThickness: 0.15,
        bevelSegments: 6,
      }),
    [shape],
  );
  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh geometry={geo} scale={0.55} position={[0, 0.7, 0]} rotation={[Math.PI, 0, 0]}>
          <MeshDistortMaterial
            color={COLORS.coral}
            speed={2}
            distort={0.15}
            roughness={0.25}
            metalness={0.15}
          />
        </mesh>
      </Float>
      <PulseRings color={COLORS.blue} />
    </>
  );
}

function PulseRings({ color }: { color: string }) {
  const g1 = useRef<THREE.Mesh>(null);
  const g2 = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (g1.current) {
      const s = 1 + ((t * 0.6) % 2);
      g1.current.scale.setScalar(s);
      (g1.current.material as THREE.MeshBasicMaterial).opacity = 1 - ((t * 0.6) % 2) / 2;
    }
    if (g2.current) {
      const s = 1 + ((t * 0.6 + 1) % 2);
      g2.current.scale.setScalar(s);
      (g2.current.material as THREE.MeshBasicMaterial).opacity = 1 - ((t * 0.6 + 1) % 2) / 2;
    }
  });
  return (
    <>
      <mesh ref={g1} position={[0, -0.5, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.4, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
      <mesh ref={g2} position={[0, -0.5, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.4, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </>
  );
}

/* ─────────  PILLS (features)  ───────── */
function PillsScene() {
  const pills = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        pos: [
          Math.cos((i / 7) * Math.PI * 2) * 2,
          Math.sin((i / 7) * Math.PI * 2) * 1.2,
          Math.sin(i) * 0.5,
        ] as [number, number, number],
        rot: [i * 0.4, i * 0.7, i * 0.3] as [number, number, number],
        color: i % 2 ? COLORS.coral : COLORS.blue,
        cap: i % 2 ? COLORS.cream : COLORS.green,
      })),
    [],
  );
  return (
    <group>
      {pills.map((p, i) => (
        <Float key={i} speed={1.5 + i * 0.15} rotationIntensity={0.6} floatIntensity={0.7}>
          <group position={p.pos} rotation={p.rot}>
            <Cylinder args={[0.22, 0.22, 0.5, 32]} position={[0, 0.25, 0]}>
              <meshStandardMaterial color={p.color} roughness={0.35} />
            </Cylinder>
            <Cylinder args={[0.22, 0.22, 0.5, 32]} position={[0, -0.25, 0]}>
              <meshStandardMaterial color={p.cap} roughness={0.35} />
            </Cylinder>
            <Sphere args={[0.22, 32, 32]} position={[0, 0.5, 0]}>
              <meshStandardMaterial color={p.color} roughness={0.35} />
            </Sphere>
            <Sphere args={[0.22, 32, 32]} position={[0, -0.5, 0]}>
              <meshStandardMaterial color={p.cap} roughness={0.35} />
            </Sphere>
          </group>
        </Float>
      ))}
    </group>
  );
}

/* ─────────  ROUTE (how-it-works) - moving marker on a torus path  ───────── */
function RouteScene() {
  const marker = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.6;
    if (marker.current) {
      marker.current.position.set(Math.cos(t) * 2.2, Math.sin(t * 0.8) * 0.4, Math.sin(t) * 2.2);
    }
  });
  return (
    <>
      <Torus args={[2.2, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={COLORS.blue} />
      </Torus>
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 2.2, 0, Math.sin(a) * 2.2]}>
            <sphereGeometry args={[0.15, 24, 24]} />
            <meshStandardMaterial
              color={i === 0 ? COLORS.coral : COLORS.green}
              emissive={i === 0 ? COLORS.coral : COLORS.green}
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
      <mesh ref={marker}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color={COLORS.coral} emissive={COLORS.coral} emissiveIntensity={0.6} />
      </mesh>
      <Float speed={1.4} floatIntensity={0.6}>
        <RoundedBox args={[1.2, 0.7, 0.15]} radius={0.1} position={[0, 1.6, 0]}>
          <meshStandardMaterial color={COLORS.white} />
        </RoundedBox>
      </Float>
    </>
  );
}

/* ─────────  COINS (pricing) - stacked tiers  ───────── */
function CoinsScene() {
  const tiers = [
    { h: -1.2, c: COLORS.cream, s: 1.4 },
    { h: -0.4, c: COLORS.green, s: 1.2 },
    { h: 0.4, c: COLORS.blueLight, s: 1.0 },
    { h: 1.2, c: COLORS.coral, s: 0.8 },
  ];
  return (
    <group rotation={[0.2, 0, 0]}>
      {tiers.map((t, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.3} floatIntensity={0.4}>
          <Cylinder args={[t.s, t.s, 0.3, 48]} position={[0, t.h, 0]}>
            <meshStandardMaterial color={t.c} roughness={0.3} metalness={0.4} />
          </Cylinder>
        </Float>
      ))}
    </group>
  );
}

/* ─────────  SHIELD (trust)  ───────── */
function ShieldScene() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 1.5);
    s.quadraticCurveTo(1.5, 1.3, 1.5, 0.5);
    s.quadraticCurveTo(1.5, -1, 0, -1.7);
    s.quadraticCurveTo(-1.5, -1, -1.5, 0.5);
    s.quadraticCurveTo(-1.5, 1.3, 0, 1.5);
    return s;
  }, []);
  const geo = useMemo(
    () =>
      new THREE.ExtrudeGeometry(shape, {
        depth: 0.35,
        bevelEnabled: true,
        bevelSize: 0.08,
        bevelThickness: 0.08,
        bevelSegments: 4,
      }),
    [shape],
  );
  return (
    <>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh geometry={geo}>
          <meshStandardMaterial color={COLORS.blue} roughness={0.35} metalness={0.35} />
        </mesh>
        {/* Checkmark built from two rounded boxes */}
        <group position={[0, 0, 0.45]} rotation={[0, 0, -Math.PI / 4]}>
          <RoundedBox args={[0.35, 1.1, 0.18]} radius={0.08} position={[-0.35, -0.15, 0]}>
            <meshStandardMaterial color={COLORS.cream} />
          </RoundedBox>
          <RoundedBox args={[0.35, 1.7, 0.18]} radius={0.08} position={[0.15, 0.15, 0]}>
            <meshStandardMaterial color={COLORS.cream} />
          </RoundedBox>
        </group>
      </Float>
    </>
  );
}

/* ─────────  GLOBE (contact) - distorted sphere with dots  ───────── */
function GlobeScene() {
  const dots = useMemo(() => {
    const pts: [number, number, number][] = [];
    const N = 120;
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(-1 + (2 * i) / N);
      const theta = Math.sqrt(N * Math.PI) * phi;
      pts.push([
        1.85 * Math.cos(theta) * Math.sin(phi),
        1.85 * Math.sin(theta) * Math.sin(phi),
        1.85 * Math.cos(phi),
      ]);
    }
    return pts;
  }, []);
  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.4}>
      <group>
        <Sphere args={[1.8, 48, 48]}>
          <MeshDistortMaterial
            color={COLORS.blue}
            distort={0.15}
            speed={1.5}
            roughness={0.4}
            metalness={0.2}
          />
        </Sphere>
        {dots.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshStandardMaterial
              color={i % 8 === 0 ? COLORS.coral : COLORS.cream}
              emissive={i % 8 === 0 ? COLORS.coral : COLORS.green}
              emissiveIntensity={0.25}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}
