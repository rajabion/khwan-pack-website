import React, { useState, useMemo, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Stage, OrbitControls, Decal } from '@react-three/drei';
import * as THREE from 'three';
import { Upload, RotateCcw, Box } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

// --- GEOMETRY & MATERIAL CONSTANTS (RESTORED FROM ORIGINAL) ---
const PAPER_PARAMS = {
  topRadius: 0.8,
  bottomRadius: 0.6,
  height: 2,
  segments: 64,
};
const RIM_PARAMS = {
  radius: 0.8,
  tube: 0.05,
  radialSegments: 16,
  tubularSegments: 100,
};
const PLASTIC_PARAMS = {
  topRadius: 0.8,
  bottomRadius: 0.6,
  height: 2,
  segments: 64,
};

function OriginalCupMesh({ type, logoUrl }) {
  // Materials (Restored from Original Project)
  const paperMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ffffff',
        roughness: 0.8,
        metalness: 0.0,
      }),
    [],
  );

  const plasticMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        transmission: 0.95,
        roughness: 0.1,
        thickness: 0.1,
        ior: 1.5,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [],
  );

  // Decal Texture (Safe Loader)
  const fallbackLogo =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  const logoTexture = useLoader(THREE.TextureLoader, logoUrl || fallbackLogo);

  // Calculate Decal Scale (Restored Logic)
  const decalScale = useMemo(() => {
    if (!logoUrl || !logoTexture.image) return [0, 0, 1];
    const { width, height } = logoTexture.image;
    const aspectRatio = width / height;
    const MAX_DECAL_WIDTH = 0.8;
    const MAX_DECAL_HEIGHT = 1.2;
    let scaleX = MAX_DECAL_WIDTH;
    let scaleY = scaleX / aspectRatio;
    if (scaleY > MAX_DECAL_HEIGHT) {
      scaleY = MAX_DECAL_HEIGHT;
      scaleX = scaleY * aspectRatio;
    }
    return [scaleX, scaleY, 1];
  }, [logoUrl, logoTexture]);

  // High-Fidelity Plastic Geometry (Restored)
  const plasticCupGeometry = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(0.01, 0), new THREE.Vector2(0.6, 0));
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const x = 0.6 + (0.8 - 0.6) * t;
      const y = 2.0 * t;
      points.push(new THREE.Vector2(x, y));
    }
    const rimCenter = new THREE.Vector2(0.82, 2.0);
    for (let i = 0; i <= 8; i++) {
      const theta = (i / 8) * Math.PI * 2;
      points.push(
        new THREE.Vector2(
          rimCenter.x + Math.cos(theta) * 0.03,
          rimCenter.y + Math.sin(theta) * 0.03,
        ),
      );
    }
    const geom = new THREE.LatheGeometry(points, 64);
    geom.computeVertexNormals();
    return geom;
  }, []);

  const lidGeometry = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(0.83, 2.0), new THREE.Vector2(0.83, 2.05));
    const h = 0.5;
    const a = 0.83;
    const R = (a * a + h * h) / (2 * h);
    const Cy = 2.05 + h - R;
    const startAngle = Math.asin((2.05 - Cy) / R);
    const endAngle = Math.acos(0.08 / R);
    for (let i = 0; i <= 32; i++) {
      const t = i / 32;
      const theta = startAngle + t * (endAngle - startAngle);
      points.push(
        new THREE.Vector2(R * Math.cos(theta), Cy + R * Math.sin(theta)),
      );
    }
    points.push(new THREE.Vector2(0.08, 2.52));
    const geom = new THREE.LatheGeometry(points, 64);
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <group dispose={null}>
      {type === 'paper' && (
        <group>
          <mesh
            position={[0, 1, 0]}
            castShadow
            receiveShadow
            material={paperMaterial}
          >
            <cylinderGeometry
              args={[
                PAPER_PARAMS.topRadius,
                PAPER_PARAMS.bottomRadius,
                PAPER_PARAMS.height,
                PAPER_PARAMS.segments,
              ]}
            />
            {logoUrl && (
              <Decal
                position={[0, 0, 0.75]}
                rotation={[0, 0, 0]}
                scale={decalScale}
              >
                <meshBasicMaterial
                  map={logoTexture}
                  polygonOffset
                  polygonOffsetFactor={-1}
                  transparent
                  depthTest={true}
                  depthWrite={false}
                />
              </Decal>
            )}
          </mesh>
          <mesh
            position={[0, 2, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            material={paperMaterial}
          >
            <torusGeometry
              args={[
                RIM_PARAMS.radius,
                RIM_PARAMS.tube,
                RIM_PARAMS.radialSegments,
                RIM_PARAMS.tubularSegments,
              ]}
            />
          </mesh>
        </group>
      )}

      {type === 'plastic' && (
        <group>
          <mesh geometry={plasticCupGeometry} material={plasticMaterial} />
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.79, 0.59, 2, 64]} />
            <meshBasicMaterial
              color="white"
              transparent
              opacity={0.0}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
            {logoUrl && (
              <Decal
                position={[0, 0, 0.75]}
                rotation={[0, 0, 0]}
                scale={decalScale}
              >
                <meshBasicMaterial
                  map={logoTexture}
                  polygonOffset
                  polygonOffsetFactor={-4}
                  transparent
                  depthTest={true}
                  depthWrite={false}
                />
              </Decal>
            )}
          </mesh>
          <mesh geometry={lidGeometry} material={plasticMaterial} />
          <mesh position={[0, 2, 0]} rotation={[0, 0, 0.1]}>
            <cylinderGeometry args={[0.03, 0.03, 3.2, 16]} />
            <meshStandardMaterial color="#333" roughness={0.4} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default function ConfiguratorSection() {
  const [cupType, setCupType] = useState('plastic');
  const [logoUrl, setLogoUrl] = useState(null);
  const { t } = useLang();

  const handleFileUpload = e => {
    const file = e.target.files[0];
    if (file) setLogoUrl(URL.createObjectURL(file));
  };

  return (
    <section className="py-24 relative z-10 container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* UI Controls */}
        <div className="order-2 lg:order-1 flex flex-col gap-8">
          <div className="glass-card p-12 rounded-[48px] border border-white/40 shadow-2xl text-start">
            <h2 className="text-4xl font-extrabold mb-6 text-slate-900 leading-tight">
              {t('configurator.title')}
            </h2>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed">
              {t('configurator.desc')}
            </p>

            <div className="space-y-10">
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">
                  {t('configurator.cup_type')}
                </label>
                <div className="flex bg-slate-100 p-2 rounded-2xl gap-2">
                  <button
                    onClick={() => setCupType('paper')}
                    className={`flex-1 py-4 rounded-xl font-bold transition-all ${cupType === 'paper' ? 'bg-white text-blue-700 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    {t('configurator.paper')}
                  </button>
                  <button
                    onClick={() => setCupType('plastic')}
                    className={`flex-1 py-4 rounded-xl font-bold transition-all ${cupType === 'plastic' ? 'bg-white text-blue-700 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    {t('configurator.plastic')}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">
                  {t('configurator.upload_label')}
                </label>
                <label
                  htmlFor="upload"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-[32px] cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
                >
                  <Upload className="w-10 h-10 text-slate-400 group-hover:text-blue-600 mb-4" />
                  <span className="text-slate-700 font-bold text-lg">
                    {t('configurator.upload_btn')}
                  </span>
                  <input
                    type="file"
                    id="upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                <RotateCcw size={18} className="animate-spin-slow" />
                <span>{t('configurator.hint')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="order-1 lg:order-2 h-[600px] lg:h-[800px] w-full bg-white/40 backdrop-blur-2xl rounded-[60px] overflow-hidden relative border border-white/60 shadow-inner">
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 5], fov: 40 }}
          >
            <Suspense fallback={null}>
              <Stage environment="studio" intensity={0.5} adjustCamera={false}>
                <OriginalCupMesh type={cupType} logoUrl={logoUrl} />
              </Stage>
              <OrbitControls
                makeDefault
                enableZoom={true}
                minDistance={3}
                maxDistance={12}
              />
            </Suspense>
          </Canvas>

          <div className="absolute top-8 start-8 p-5 glass rounded-3xl flex items-center gap-4 border border-white/50">
            <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
              <Box size={24} />
            </div>
            <div className="text-start">
              <p className="text-sm font-bold text-slate-900 leading-none mb-1">
                {t('configurator.preview_label')}
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                High-End Rendering
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
