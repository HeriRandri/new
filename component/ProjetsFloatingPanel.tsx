"use client";

import { useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import axios from "axios";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string;
};

export default function ProjectsFloatingPanel() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get("/api/projects");
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  return (
    <>
      {projects.map((project, index) => (
        <group position={[-4 + index * 3, 1.5, 0]} key={project.id}>
          <mesh>
            <boxGeometry args={[2.5, 1.5, 0.1]} />
            <meshStandardMaterial color="#292929" />
          </mesh>
          <Html position={[0, 0, 0.1]} center>
            <div className="text-white text-sm text-center w-40">
              <strong>{project.title}</strong>
              <p className="text-xs">{project.description.slice(0, 50)}...</p>
            </div>
          </Html>
        </group>
      ))}
    </>
  );
}
