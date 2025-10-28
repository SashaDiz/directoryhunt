"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ProductCard } from "./components/ProductCard";
import GuidePromoCard from "./components/GuidePromoCard";
import SponsorCard from "./components/SponsorCard";
import CountdownTimer from "./components/CountdownTimer";

// Import assets
import johnIcon from "/public/assets/johnrush.svg";
import seobotLogo from "/public/assets/seobot.svg";
import tinyadzLogo from "/public/assets/tinyadz.svg";
import { Rocket } from "iconoir-react";


function ProjectCard({ project, onVote }) {
  return <ProductCard project={project} onVote={onVote} />;
}

function RightSidePanel() {
  return (
    <div className="right-side w-full lg:max-w-96 lg:w-full lg:sticky lg:top-16 mt-6 lg:mt-0">
      <aside className="space-y-6 lg:space-y-8 py-4 lg:py-8">
        <div className="flex flex-col items-start gap-4">
        <h2 className="text-sm lg:text-lg font-medium text-gray-900 uppercase">
          Directory guide
        </h2>
          <GuidePromoCard
            imageSrc={johnIcon}
            name="John Rush"
            subtitle="Creator of MarsX (uniting AI, NoCode, and Code)"
            title="Want to build your own directory?"
            description="I'll teach you everything about Directories. Everything I learned the hard way over the years of building one of the most successful directories on the internet."
            buttonText="Get Directory Guide Now"
            buttonLink="https://johnrush.me/directory-guide/?ref=directoryhunt"
          />
        </div>
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-sm lg:text-lg font-medium text-gray-900 uppercase">
            Our partners
          </h2>
          <div className="flex flex-col gap-4 w-full">
            <SponsorCard
              sponsor={{
                logo: seobotLogo,
                name: "SEObot",
                description:
                  "SEO Bot is a tool that helps you to improve your SEO with AI agents.",
                url: "https://seobotai.com/?ref=directoryhunt.org",
              }}
            />
            <SponsorCard
              sponsor={{
                logo: tinyadzLogo,
                name: "TinyAdz",
                description:
                  "Promote your product or monetize your site. TinyAdz helps you reach niche audiences or earn from yours.",
                url: "https://tinyadz.com/?ref=directoryhunt.org",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <a
            href="https://frogdr.com/directoryhunt.org?utm_source=directoryhunt.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="Monitor your Domain Rating with FrogDR"
              src="https://frogdr.com/directoryhunt.org/badge-white.svg"
              width="200"
              height="43"
              className="w-full max-w-[200px] h-auto"
            />
          </a>
        </div>
      </aside>
    </div>
  );
}

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [competition, setCompetition] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Schema.org structured data for the homepage
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://directoryhunt.org";

  const homepageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Directory Hunt - Launchpad for Directories and Tiny Projects",
    "description": "Submit your directory or tiny project to our launchpad and get discovered. Join the community of successful builders and innovators.",
    "url": baseUrl,
    "mainEntity": {
      "@type": "Organization",
      "name": "Directory Hunt",
      "description": "Launchpad for Directories and Tiny Projects",
      "url": baseUrl,
      "logo": `${baseUrl}/assets/logo.svg`
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        }
      ]
    }
  };

  // Animation refs
  const heroRef = useRef(null);
  const mainContentRef = useRef(null);
  const sidebarRef = useRef(null);
  const projectsRef = useRef(null);
  const featuredRef = useRef(null);

  // Fetch projects and competition data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize animations on mount
  useEffect(() => {
    if (!isClient) return;

    const tl = gsap.timeline();

    // Set initial states for sections - only if refs exist
    const refs = [
      heroRef.current,
      mainContentRef.current,
      sidebarRef.current,
      featuredRef.current,
    ].filter(Boolean); // Filter out null refs

    if (refs.length > 0) {
      gsap.set(refs, {
        opacity: 0,
        y: 30,
      });
    }

    // Animate sections with staggered delays for smooth entrance
    if (heroRef.current) {
      tl.to(heroRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    if (mainContentRef.current) {
      tl.to(
        mainContentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      ); // Start 0.6s before previous animation ends
    }

    if (sidebarRef.current) {
      tl.to(
        sidebarRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      ); // Start 0.4s before previous animation ends
    }

    if (featuredRef.current) {
      tl.to(
        featuredRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      ); // Start 0.6s before previous animation ends
    }
  }, [isClient]);

  // Animate projects when they change
  useEffect(() => {
    if (isClient && projectsRef.current && !loading && projects.length > 0) {
      const cards = projectsRef.current.children;
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
        }
      );
    }
  }, [isClient, projects, loading]);

  const fetchData = async () => {
    console.log('Homepage: Starting to fetch data...');
    setLoading(true);
    try {
      // Fetch projects for current weekly competition
      console.log('Homepage: Fetching projects...');
      const projectsResponse = await fetch(
        `/api/projects?competition=weekly&limit=15&sort=upvotes`
      );
      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json();
        console.log('Homepage: Projects fetched successfully:', projectsData.data.projects?.length || 0);
        setProjects(projectsData.data.projects || []);
      } else {
        console.error('Homepage: Failed to fetch projects:', projectsResponse.status);
      }

      // Fetch current competition data
      console.log('Homepage: Fetching competitions...');
      const competitionsResponse = await fetch(
        "/api/competitions?current=true"
      );
      if (competitionsResponse.ok) {
        const competitionsData = await competitionsResponse.json();
        const weeklyComp = competitionsData.data.competitions.find(
          (c) => c.type === "weekly"
        );
        console.log('Homepage: Competition fetched successfully:', !!weeklyComp);
        setCompetition(weeklyComp || null);
      } else {
        console.error('Homepage: Failed to fetch competitions:', competitionsResponse.status);
      }
    } catch (error) {
      console.error("Homepage: Failed to fetch homepage data:", error);
      // Fallback to empty state
      setProjects([]);
      setCompetition(null);
    } finally {
      setLoading(false);
      console.log('Homepage: Data fetching completed');
    }
  };

  const handleVote = async () => {
    // The actual voting is handled in the ProjectCard component
    // This function is kept for compatibility
  };

  return (
    <div className="relative">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageSchema),
        }}
      />
      {/* Decorative asymmetric blob with dramatic morphing - only on main page */}
      <div className="decorative-blob" aria-hidden="true"></div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Hero Header */}
            <section
              ref={heroRef}
              className="text-center lg:text-left pt-4 sm:pt-8 pb-4 sm:pb-8 max-w-xl lg:mr-auto"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold text-gray-900 mb-4">
                Launch Your Directory &amp;&nbsp;Get Discovered
              </h1>
              <p className="text-base sm:text-lg font-normal text-gray-900 mb-4 sm:mb-6 max-w-xl mx-auto lg:mx-0">
                Submit your directory or tiny project and get early exposure, reach other builders and innovators, and showcase your innovation to the community.
              </p>
            </section>

            {/* Best Weekly Products Section */}
            <section ref={mainContentRef}>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-medium text-gray-900">
                    Best Weekly Products
                  </h2>
                  {/* Stats */}
                  <div className="p-2 px-4 rounded-xl bg-gray-100 text-center">
                    <p className="text-sm font-semibold text-base-content/60">
                      {projects.length} / 15 Apps
                    </p>
                  </div>
                </div>

                <CountdownTimer competitionData={competition} />
              </div>

              {/* Project Listings */}
              {loading ? (
                <div className="grid grid-cols-1 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-base-100 rounded-lg p-4 border border-base-300"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="skeleton w-12 h-12 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="skeleton h-4 w-3/4"></div>
                          <div className="skeleton h-3 w-full"></div>
                          <div className="skeleton h-3 w-1/2"></div>
                        </div>
                        <div className="skeleton w-16 h-16 rounded-lg"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : projects.length > 0 ? (
                <div ref={projectsRef} className="grid grid-cols-1 gap-4">
                  {projects.map((project) => (
                    <ProductCard
                      key={project.id}
                      project={project}
                      onVote={handleVote}
                      viewMode="auto"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center text-center py-12 gap-6">
                  <Rocket className="w-12 h-12 text-gray-600" strokeWidth={1} />
                  <p className="text-gray-700 text-md font-medium">No directories or projects found for this competition.</p>
                  <Link
                    href="/submit"
                    className="block text-center bg-white text-gray-900 border border-gray-200 rounded-lg py-3 font-semibold text-sm no-underline transition duration-300 outline outline-4 outline-transparent hover:border-[#000000] hover:bg-[#000000] hover:text-white hover:outline-[#ed0d7924] min-h-[48px] min-w-[200px]"
                    aria-label="Submit your directory or project to be the first in this competition"
                  >
                    Be the first to submit!
                  </Link>
                </div>
              )}
            </section>

            {/* Featured Section */}

            <section ref={featuredRef} className="mt-8 sm:mt-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-center lg:text-left">Featured on</h2>
              <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <li>
                  <a href="https://startupfa.me/s/directory-launchpad?utm_source=directoryhunt.org" target="_blank" rel="noopener noreferrer" className="no-underline">
                    <div className="flex justify-center items-center gap-2 p-3 pr-4 border border-gray-200 rounded-xl transition-all duration-300 ease-in-out text-sm hover:border-black hover:shadow-[0_4px_0_black] hover:-translate-y-1">
                      <img className="w-auto h-6" src="https://unicorn-images.b-cdn.net/d2c943f6-8bfc-474e-aa54-f287f7e42683?optimizer=gif" alt="Featured on Startup Fame" />
                      <p className="m-0 no-underline font-semibold text-black">Startup Fame</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="https://yo.directory/" target="_blank" rel="noopener noreferrer" className="no-underline">
                    <div className="flex justify-center items-center gap-2 p-3 pr-4 border border-gray-200 rounded-xl transition-all duration-300 ease-in-out text-sm hover:border-black hover:shadow-[0_4px_0_black] hover:-translate-y-1">
                      <img className="w-auto h-6" src="https://unicorn-images.b-cdn.net/c4b078aa-ef88-43c5-81dc-1b41fbe466c2?optimizer=gif" alt="Featured on yo.directory" />
                      <p className="m-0 no-underline font-semibold text-black">Yo.directory</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="https://twelve.tools/" target="_blank" rel="noopener noreferrer" className="no-underline">
                    <div className="flex justify-center items-center gap-2 p-3 pr-4 border border-gray-200 rounded-xl transition-all duration-300 ease-in-out text-sm hover:border-black hover:shadow-[0_4px_0_black] hover:-translate-y-1">
                      <img className="w-auto h-6" src="https://unicorn-images.b-cdn.net/184089eb-0ff0-4ba7-ac01-6621a87ef823?optimizer=gif" alt="Featured on twelve.tools" />
                      <p className="m-0 no-underline font-semibold text-black">Twelve.tools</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="https://launchboard.dev/?via=launchboardBadge" target="_blank" rel="noopener noreferrer" className="no-underline">
                    <div className="flex justify-center items-center gap-2 p-3 pr-4 border border-gray-200 rounded-xl transition-all duration-300 ease-in-out text-sm hover:border-black hover:shadow-[0_4px_0_black] hover:-translate-y-1">
                      <img className="w-auto h-6" src="https://unicorn-images.b-cdn.net/98be5d82-b1b0-4349-9dde-36227509bc11?optimizer=gif" alt="See us on LaunchBoard" />
                      <p className="m-0 no-underline font-semibold text-black">LaunchBoard.dev</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="https://fazier.com/launches/directoryhunt.org" target="_blank" rel="noopener noreferrer" className="no-underline">
                    <div className="flex justify-center items-center gap-2 p-3 pr-4 border border-gray-200 rounded-xl transition-all duration-300 ease-in-out text-sm hover:border-black hover:shadow-[0_4px_0_black] hover:-translate-y-1">
                      <img className="w-auto h-6" src="https://unicorn-images.b-cdn.net/14643c8d-f055-4dd9-b014-f828ed4836a0?badge_type=featured&theme=light" alt="Fazier badge" />
                      <p className="m-0 no-underline font-semibold text-black">Fazier.com</p>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="https://firsto.co/projects/directory-hunt" title="Directory Hunt - Featured on Firsto.co" rel="noopener noreferrer" className="no-underline">
                    <div className="flex justify-center items-center gap-2 p-3 pr-4 border border-gray-200 rounded-xl transition-all duration-300 ease-in-out text-sm hover:border-black hover:shadow-[0_4px_0_black] hover:-translate-y-1">
                      <img className="w-auto h-6" src="https://unicorn-images.b-cdn.net/3672bb1a-5906-4d41-ac0d-17afcc3bdeb9" alt="Firsto" />
                      <p className="m-0 no-underline font-semibold text-black">Firsto</p>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="https://turbo0.com/item/directory-hunt" target="_blank" rel="noopener noreferrer" className="no-underline">
                    <div className="flex justify-center items-center gap-2 p-3 pr-4 border border-gray-200 rounded-xl transition-all duration-300 ease-in-out text-sm hover:border-black hover:shadow-[0_4px_0_black] hover:-translate-y-1">
                      <img className="w-auto h-6" src="https://unicorn-images.b-cdn.net/5389b934-9d70-4553-8071-281e3cecf299" alt="Turbo0" />
                      <p className="m-0 no-underline font-semibold text-black">Turbo0</p>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="https://devhub.best/projects/directory-hunt" target="_blank" title="DevHub Top 2 Daily Winner" rel="noopener noreferrer" className="no-underline">
                    <div className="flex justify-center items-center gap-2 p-3 pr-4 border border-gray-200 rounded-xl transition-all duration-300 ease-in-out text-sm hover:border-black hover:shadow-[0_4px_0_black] hover:-translate-y-1">
                      <img className="w-auto h-6" src="https://unicorn-images.b-cdn.net/7fccfc81-efce-499f-821c-d784e0ac43c1" alt="DevHub" />
                    </div>
                  </a>
                </li>

                <li>
                  <a href="https://saashunt.best/projects/directory-hunt" target="_blank" title="SaasHunt Top 1 Daily Winner" rel="noopener noreferrer" className="no-underline">
                    <div className="flex justify-center items-center gap-2 p-3 pr-4 border border-gray-200 rounded-xl transition-all duration-300 ease-in-out text-sm hover:border-black hover:shadow-[0_4px_0_black] hover:-translate-y-1">
                      <img className="w-auto h-6" src="https://unicorn-images.b-cdn.net/f91e1cd4-f33e-464c-9626-a281a405a94a" alt="SaaSHunt" />
                    </div>
                  </a>
                </li>


                <li>
                  <a href="https://www.ailaunch.space/" target="_blank" title="AI Launch Space" rel="noopener noreferrer" className="no-underline">
                    <div className="flex justify-center items-center gap-2 p-3 pr-4 border border-gray-200 rounded-xl transition-all duration-300 ease-in-out text-sm hover:border-black hover:shadow-[0_4px_0_black] hover:-translate-y-1">
                      <img className="w-auto h-6" src="https://unicorn-images.b-cdn.net/af95f76e-ecd5-43dd-b3c7-8160cfe15a86" alt="AI Launch Space" />
                    </div>
                  </a>
                </li>
              </ul>
            </section>
          </div>

          {/* Right Sidebar */}
          <div ref={sidebarRef} className="lg:col-span-1">
            <RightSidePanel />
          </div>
        </div>
      </div>
    </div>
  );
}
