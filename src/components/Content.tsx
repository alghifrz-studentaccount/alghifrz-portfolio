import React from 'react';
import Profile from './Profile';
import Experience from './Experience';
import Activities from './Activities';
import FeaturedProjects from './FeaturedProjects';
import content from '@/data/content.json';
const Content = () => {
    const { projects } = content;
    return (
        <>
            <section className="relative md:py-20 py-2 px-6 bg-black backdrop-blur-3xl text-white overflow-hidden">
                <div className="z-0 absolute top-10 left-10 w-60 h-60 bg-blue-400 opacity-40 rounded-full blur-3xl animate-float-wild"></div>
                <div className="z-0 absolute bottom-12 right-24 w-72 h-72 bg-blue-400 opacity-40 rounded-full blur-3xl animate-float-wild2"></div>
                <div className="z-0 absolute top-20 left-32 w-52 h-52 bg-blue-300 opacity-35 rounded-full blur-3xl animate-float-wild3"></div>
                <div className="z-0 absolute bottom-20 right-10 w-64 h-64 bg-blue-500 opacity-40 rounded-full blur-3xl animate-float-wild4"></div>
                <div className="z-0 absolute top-1/4 right-1/3 w-72 h-72 bg-indigo-500 opacity-30 rounded-full blur-3xl animate-float-wild5"></div>
                <div className="z-0 absolute bottom-1/4 left-1/5 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl animate-float-wild6"></div>
                <div className="z-0 absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-400 opacity-25 rounded-full blur-3xl animate-float-wild7"></div>
                <div className="z-0 absolute top-2/3 left-1/4 w-52 h-52 bg-blue-300 opacity-30 rounded-full blur-3xl animate-float-wild8"></div>
                <div className="z-0 absolute top-[35%] right-[15%] w-60 h-60 bg-indigo-500 opacity-30 rounded-full blur-3xl animate-float-wild9"></div>
                <div className="z-0 absolute bottom-[18%] left-[38%] w-96 h-96 bg-pink-400 opacity-25 rounded-full blur-3xl animate-float-wild10"></div>
                <div className="z-0 absolute top-[5%] right-[10%] w-40 h-40 bg-yellow-300 opacity-30 rounded-full blur-3xl animate-float-wild2"></div>
                <div className="z-0 absolute bottom-[10%] left-[8%] w-48 h-48 bg-green-300 opacity-20 rounded-full blur-3xl animate-float-wild5"></div>
                <div className="z-0 absolute top-[45%] left-[50%] w-56 h-56 bg-red-300 opacity-25 rounded-full blur-3xl animate-float-wild1"></div>
                <div className="z-0 absolute bottom-[40%] right-[40%] w-44 h-44 bg-rose-400 opacity-30 rounded-full blur-3xl animate-float-wild9"></div>
                <Profile />
                <Experience />
                <Activities />
                
                <FeaturedProjects projects={projects.featured}/>    
            </section>
        </>
    )

}

export default Content