"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
  PerspectiveCamera,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import "./Lanyard.css";

export interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  cardGLB?: string;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: "cover" | "contain";
  lanyardImage?: string | null;
  lanyardWidth?: number;
  className?: string;
}

interface CardGLTF {
  nodes: {
    card?: THREE.Mesh;
    clip?: THREE.Mesh;
    clamp?: THREE.Mesh;
  };
  materials: {
    base?: THREE.MeshPhysicalMaterial;
    metal?: THREE.MeshStandardMaterial;
  };
}

const DEFAULT_CARD_GLB = "/assets/lanyard/card.glb";
const DEFAULT_LANYARD_PNG = "/assets/lanyard/Lanyard.png";
const STATIC_CARD_PNG = "/assets/lanyard/card.png";

const BLANK_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

const ZERO_VECTOR = new THREE.Vector3();

export function Lanyard({
  position = [0, -0.35, 10.5],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  cardGLB = DEFAULT_CARD_GLB,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = DEFAULT_LANYARD_PNG,
  lanyardWidth = 1.2,
  className = "",
}: LanyardProps) {
  const [screenCategory, setScreenCategory] = useState<
    "mobile" | "tablet" | "desktop-compact" | "desktop-large"
  >(() => {
    if (typeof window === "undefined") return "desktop-large";
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width < 640) return "mobile";
    if (width < 1024) return "tablet";
    if (height <= 850 || width < 1440) return "desktop-compact";
    return "desktop-large";
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (width < 640) setScreenCategory("mobile");
      else if (width < 1024) setScreenCategory("tablet");
      else if (height <= 850 || width < 1440) setScreenCategory("desktop-compact");
      else setScreenCategory("desktop-large");
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cameraPosition = useMemo<[number, number, number]>(() => {
    const base = position && position.length === 3 ? position : [0, -0.35, 10.5];
    if (screenCategory === "mobile") {
      return [base[0], -0.25, 12];
    }
    if (screenCategory === "tablet") {
      return [base[0], -0.3, 14.5];
    }
    if (screenCategory === "desktop-compact") {
      return [base[0], -0.3, 12];
    }
    return [base[0], base[1], base[2]];
  }, [screenCategory, position]);

  const isMobile = screenCategory === "mobile";

  return (
    <div className={`lanyard-wrapper ${className}`.trim()}>
      <Canvas
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{
          alpha: transparent,
          antialias: !isMobile,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <PerspectiveCamera makeDefault position={cameraPosition} fov={fov} />
        <Suspense fallback={null}>
          <ambientLight intensity={isMobile ? Math.PI * 1.2 : Math.PI} />

          {isMobile ? (
            <>
              <directionalLight position={[2, 4, 3]} intensity={2.5} />
              <directionalLight position={[-2, -2, 2]} intensity={1.5} />
            </>
          ) : (
            <Environment blur={0.75}>
              <Lightformer
                intensity={2}
                color="white"
                position={[0, -1, 5]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={3}
                color="white"
                position={[-1, -1, 1]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={3}
                color="white"
                position={[1, 1, 1]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={10}
                color="white"
                position={[-10, 0, 14]}
                rotation={[0, Math.PI / 2, Math.PI / 3]}
                scale={[100, 10, 1]}
              />
            </Environment>
          )}

          <Physics
            gravity={gravity || [0, -40, 0]}
            timeStep={isMobile ? 1 / 24 : 1 / 60}
          >
            <Band
              isMobile={isMobile}
              cardGLB={cardGLB}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardImage={lanyardImage}
              lanyardWidth={lanyardWidth}
            />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  cardGLB?: string;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: "cover" | "contain";
  lanyardImage?: string | null;
  lanyardWidth?: number;
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  cardGLB = DEFAULT_CARD_GLB,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = DEFAULT_LANYARD_PNG,
  lanyardWidth = 1,
}: BandProps) {
  const band = useRef<THREE.Mesh>(null);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const lerped1 = useRef<THREE.Vector3 | null>(null);
  const lerped2 = useRef<THREE.Vector3 | null>(null);
  const frameCountRef = useRef(0);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const dragOffset = useMemo(() => new THREE.Vector3(), []);

  const segmentProps = useMemo(
    () =>
      ({
        type: "dynamic" as const,
        canSleep: true,
        colliders: false as const,
        angularDamping: 4,
        linearDamping: 4,
      } as const),
    []
  );

  const gltf = useGLTF(cardGLB);
  const nodes = (gltf?.nodes || {}) as unknown as CardGLTF["nodes"];
  const materials = (gltf?.materials || {}) as unknown as CardGLTF["materials"];

  const texture = useTexture(lanyardImage || DEFAULT_LANYARD_PNG, (tex) => {
    const t = tex as THREE.Texture;
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
  });

  const staticCardTexture = useTexture(STATIC_CARD_PNG, (tex) => {
    const t = tex as THREE.Texture;
    t.colorSpace = THREE.SRGBColorSpace;
    t.flipY = false;
    t.anisotropy = isMobile ? 2 : 16;
  });
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);


  useEffect(() => {
    const baseMap = materials?.base?.map;
    if (baseMap) {
      baseMap.colorSpace = THREE.SRGBColorSpace;
      baseMap.flipY = false;
      baseMap.anisotropy = isMobile ? 2 : 16;
      baseMap.needsUpdate = true;
    }
  }, [materials?.base?.map, isMobile]);

  const defaultMetalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x475569,
        metalness: 0.9,
        roughness: 0.25,
      }),
    []
  );

  const cardMap = useMemo(() => {
    if (!frontImage && !backImage) {
      return materials?.base?.map || staticCardTexture;
    }

    const baseMap = materials?.base?.map || staticCardTexture;
    const baseImg = baseMap?.image as HTMLImageElement | undefined;
    if (!baseImg) return baseMap;

    const W = baseImg.width || 1024;
    const H = baseImg.height || 1024;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return baseMap;

    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (
      img: HTMLImageElement,
      rect: { x: number; y: number; w: number; h: number }
    ) => {
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const imgWidth = img.naturalWidth || img.width || 512;
      const imgHeight = img.naturalHeight || img.height || 512;
      const pick = imageFit === "contain" ? Math.min : Math.max;
      const scale = pick(rw / imgWidth, rh / imgHeight);
      const dw = imgWidth * scale;
      const dh = imgHeight * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex?.image) {
      drawFitted(frontTex.image as HTMLImageElement, FRONT_UV_RECT);
    }
    if (backImage && backTex?.image) {
      drawFitted(backTex.image as HTMLImageElement, BACK_UV_RECT);
    }

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    if (baseMap) {
      composite.flipY = baseMap.flipY;
    }
    composite.anisotropy = isMobile ? 2 : 16;
    composite.needsUpdate = true;
    return composite;
  }, [
    frontImage,
    backImage,
    imageFit,
    frontTex,
    backTex,
    materials?.base?.map,
    staticCardTexture,
    isMobile,
  ]);

  const curve = useMemo(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    c.curveType = "chordal";
    return c;
  }, []);

  const lineGeometry = useMemo(() => new MeshLineGeometry(), []);
  const lineMaterial = useMemo(() => {
    const mat = new MeshLineMaterial({
      color: new THREE.Color("white"),
      resolution: isMobile
        ? new THREE.Vector2(500, 1000)
        : new THREE.Vector2(1000, 1000),
      useMap: 1,
      map: texture,
      repeat: new THREE.Vector2(-4, 1),
      lineWidth: lanyardWidth,
    });
    mat.depthTest = false;
    return mat;
  }, [isMobile, texture, lanyardWidth]);

  useEffect(() => {
    return () => {
      lineGeometry.dispose();
      lineMaterial.dispose();
      defaultMetalMaterial.dispose();
    };
  }, [lineGeometry, lineMaterial, defaultMetalMaterial]);

  const [isDragged, setIsDragged] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = isDragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, isDragged]);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  useFrame((state, delta) => {
    if (isDragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - dragOffset.x,
        y: vec.y - dragOffset.y,
        z: vec.z - dragOffset.z,
      });
    }

    if (fixed.current && card.current) {
      const joints = [
        { ref: j1, lerpedRef: lerped1 },
        { ref: j2, lerpedRef: lerped2 },
      ];

      joints.forEach(({ ref, lerpedRef }) => {
        if (!ref.current) return;
        const currentPos = ref.current.translation();
        if (!currentPos) return;
        if (!lerpedRef.current) {
          lerpedRef.current = new THREE.Vector3().copy(currentPos);
        }
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, lerpedRef.current.distanceTo(currentPos))
        );
        lerpedRef.current.lerp(
          currentPos,
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      if (j3.current && fixed.current) {
        const j3Pos = j3.current.translation();
        const fixedPos = fixed.current.translation();
        if (j3Pos && fixedPos) {
          frameCountRef.current++;
          const shouldUpdateLine =
            !isMobile || isDragged || frameCountRef.current % 2 === 0;
          if (shouldUpdateLine) {
            curve.points[0].copy(j3Pos);
            curve.points[1].copy(
              lerped2.current || j2.current?.translation() || ZERO_VECTOR
            );
            curve.points[2].copy(
              lerped1.current || j1.current?.translation() || ZERO_VECTOR
            );
            curve.points[3].copy(fixedPos);
            lineGeometry.setPoints(curve.getPoints(isMobile ? 12 : 32));
          }
        }
      }

      const cardAngVel = card.current.angvel();
      const cardRot = card.current.rotation();
      if (cardAngVel && cardRot) {
        ang.copy(cardAngVel);
        rot.copy(cardRot);
        card.current.setAngvel(
          { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
          true
        );
      }
    }
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={isDragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              const target = e.target as unknown as HTMLElement;
              target?.releasePointerCapture?.(e.pointerId);
              setIsDragged(false);
            }}
            onPointerCancel={(e) => {
              const target = e.target as unknown as HTMLElement;
              target?.releasePointerCapture?.(e.pointerId);
              setIsDragged(false);
            }}
            onPointerDown={(e) => {
              const target = e.target as unknown as HTMLElement;
              target?.setPointerCapture?.(e.pointerId);
              if (card.current) {
                const cardPos = card.current.translation();
                if (cardPos) {
                  dragOffset.copy(e.point).sub(vec.copy(cardPos));
                  setIsDragged(true);
                }
              }
            }}
          >
            {nodes?.card?.geometry && (
              <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial
                  map={cardMap || undefined}
                  clearcoat={isMobile ? 0 : 1}
                  clearcoatRoughness={0.15}
                  roughness={0.9}
                  metalness={0.8}
                />
              </mesh>
            )}
            {nodes?.clip?.geometry && (
              <mesh
                geometry={nodes.clip.geometry}
                material={materials?.metal || defaultMetalMaterial}
              />
            )}
            {nodes?.clamp?.geometry && (
              <mesh
                geometry={nodes.clamp.geometry}
                material={materials?.metal || defaultMetalMaterial}
              />
            )}
          </group>
        </RigidBody>
      </group>
      <mesh ref={band} geometry={lineGeometry} material={lineMaterial} />
    </>
  );
}

useGLTF.preload(DEFAULT_CARD_GLB);
useTexture.preload(DEFAULT_LANYARD_PNG);
useTexture.preload(STATIC_CARD_PNG);

export default Lanyard;
