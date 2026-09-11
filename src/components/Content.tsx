import React from "react";
import Profile from "./Profile";
import Experience from "./Experience";
import Activities from "./Activities";
import FeaturedProjects from "./FeaturedProjects";
import content from "@/data/content.json";

const Content = () => {
  const { projects } = content;

  return (
    <section className="relative text-white">
      <Profile />
      <Experience />
      <Activities />
      <FeaturedProjects projects={projects.featured} />
    </section>
  );
};

export default Content;
