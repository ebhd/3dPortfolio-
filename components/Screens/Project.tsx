"use client";

import type { ScreenName } from "@/utils/screens";


import { useState } from "react";
import ProjectCard from "./ProjectCard";

type Props = {
  setScreen: (screen: ScreenName) => void;
};

const projects = [
  {
    url: "https://github.com/NotCure/SVGrafix",
    title: "SVGRAFIX",
    description: "SVG parser & renderer in C++",
    tech: ["Cpp"],
  },
  {
    url: "https://github.com/ebrahimhdida/Portfolio3D",
    title: "3D Portfolio",
    description: "It is the one you are currently looking at.",
    tech: ["Nextjs", "Typescript", "Threejs"],
  },
  {
    url: "https://github.com/NotCure/backendeField",
    title: "EField Backend",
    description: "Soccer League backend with MongoDB non-sql database",
    tech: ["Nextjs", "Typescript", "Mongodb"],
  },
  {
    url: "https://github.com/NotCure/efa",
    title: "EField",
    description: "Soccer League webapp with steam/discord verifcation",
    tech: ["Nextjs", "Typescript", "Javascript"],
  },
];

export default function Project({ setScreen }: Props) {
  const [page, setPage] = useState(0);
  const projectsPerPage = 2;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const paginatedProjects = projects.slice(
    page * projectsPerPage,
    (page + 1) * projectsPerPage
  );

  return (
    <div className="flex flex-col justify-center text-center text-[0.5rem] space-y-[0.2rem] text-white">
      <button type="button" className="screen-back text-white" onClick={() => setScreen("home")}>
        Back
      </button>
      <h1 className="text-[#f5f52c]">Projects</h1>

      <div className="grid grid-cols-2 gap-1">
        {paginatedProjects.map((project) => (
          <ProjectCard key={project.url} {...project} />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-0.5">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="border border-white rounded-sm px-2 py-[0.5px] text-white text-[0.4rem] disabled:opacity-30"
        >
          Prev
        </button>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page === totalPages - 1}
          className="border border-white rounded-sm px-2 py-[1px] text-white text-[0.4rem] disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  );
}
