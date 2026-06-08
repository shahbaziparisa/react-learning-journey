import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import * as THREE from "three";

// --------------------
// Types
// --------------------
type Product = {
  id: number;
  name: string;
  price: number;
};

export default function Canvas3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // =====================================================
  // 1️⃣ useRef → Three.js core objects (NO re-render)
  // =====================================================
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubesRef = useRef<THREE.Mesh[]>([]);
  const selectedMeshRef = useRef<THREE.Mesh | null>(null);

  // =====================================================
  // 2️⃣ useState → UI reactive data
  // =====================================================
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#ff9900");
  const [moveX, setMoveX] = useState<number>(0);

  // =====================================================
  // 3️⃣ useMemo([]) → heavy calculation (run ONCE)
  // =====================================================
  const baseGeometry = useMemo(() => {
    return new THREE.BoxGeometry(1, 1, 1);
  }, []);

  // =====================================================
  // 4️⃣ useMemo([moveX]) → recalculated when dependency changes
  // =====================================================
  const dynamicOffset = useMemo(() => {
    // imagine expensive layout calculation
    return moveX * 0.5;
  }, [moveX]);

  // =====================================================
  // 5️⃣ useCallback([]) → stable function (NO dependencies)
  // Resize handler MUST NOT change every render
  // =====================================================
  const handleResize = useCallback((): void => {
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    if (!camera || !renderer || !mountRef.current) return;

    camera.aspect =
      mountRef.current.clientWidth / mountRef.current.clientHeight;

    camera.updateProjectionMatrix();
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight,
    );
  }, []);

  // =====================================================
  // 6️⃣ useCallback([selectedColor]) → depends on state
  // Click logic depends on latest color
  // =====================================================
  const handleCubeClick = useCallback(
    (mesh: THREE.Mesh): void => {
      selectedMeshRef.current = mesh;

      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.color.set(selectedColor);

      const data = mesh.userData as Product;

      setSelectedProduct({
        id: data.id,
        name: data.name,
        price: data.price,
      });
    },
    [selectedColor],
  );

  // =====================================================
  // 7️⃣ useEffect([]) → THREE.JS INIT (ONLY ONCE)
  // =====================================================
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight,
    );
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Material (shared)
    const material = new THREE.MeshStandardMaterial({
      color: selectedColor,
    });

    // Cubes
    const cubes: THREE.Mesh[] = [];

    for (let i = 0; i < 5; i++) {
      const cube = new THREE.Mesh(baseGeometry, material);

      cube.position.x = i * 2 - 4;

      cube.userData = {
        id: i,
        name: `Cube ${i}`,
        price: 100 + i * 50,
      } as Product;

      scene.add(cube);
      cubes.push(cube);
    }

    cubesRef.current = cubes;

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent): void => {
      const rect = renderer.domElement.getBoundingClientRect();

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const hits = raycaster.intersectObjects(cubesRef.current);

      if (hits.length > 0) {
        handleCubeClick(hits[0].object as THREE.Mesh);
      }
    };

    window.addEventListener("click", onMouseClick);
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = (): void => {
      requestAnimationFrame(animate);

      cubesRef.current.forEach((cube) => {
        cube.rotation.y += 0.01;
        cube.position.x += dynamicOffset * 0.001;
      });

      renderer.render(scene, camera);
    };

    animate();

    // cleanup
    return () => {
      window.removeEventListener("click", onMouseClick);
      window.removeEventListener("resize", handleResize);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [
    baseGeometry,
    handleCubeClick,
    handleResize,
    dynamicOffset,
    selectedColor,
  ]);

  // =====================================================
  // 8️⃣ useEffect([selectedColor]) → sync material state
  // =====================================================
  useEffect(() => {
    if (selectedMeshRef.current) {
      const mat = selectedMeshRef.current
        .material as THREE.MeshStandardMaterial;

      mat.color.set(selectedColor);
    }
  }, [selectedColor]);

  // =====================================================
  // 9️⃣ useEffect([moveX]) → update scene positions
  // =====================================================
  useEffect(() => {
    cubesRef.current.forEach((cube, i) => {
      cube.position.x = i * 2 - 4 + moveX;
    });
  }, [moveX]);

  // =====================================================
  // UI
  // =====================================================
  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-50">
      {/* Three.js Canvas */}
      <div
        ref={mountRef}
        className="w-full max-w-4xl h-96 border border-gray-300 rounded-lg shadow-lg bg-white"
      />

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={() =>
            setSelectedColor((prev) =>
              prev === "#ff9900" ? "#00aaff" : "#ff9900",
            )
          }
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Change Color
        </button>

        <button
          onClick={() => setMoveX((prev) => prev + 1)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Move Scene
        </button>
      </div>

      {/* Selected Product Info */}
      {selectedProduct && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md w-full max-w-md text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Selected Product
          </h3>
          <p className="text-gray-700">{selectedProduct.name}</p>
          <p className="text-gray-700 font-medium">${selectedProduct.price}</p>
        </div>
      )}
    </div>
  );
}
