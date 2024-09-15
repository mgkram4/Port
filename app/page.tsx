"use client"

import { motion, useAnimation, useScroll } from 'framer-motion';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

const staticGitHubData = {
  name: "Mark",
  bio: "(⌐■-■) | Fullstack | ML",
  publicRepos: 34,
  contributionsLastYear: 199,
  pinnedRepos: [
    {
      name: "Hunter-Gather_GDSC-Solution-Challenge-2024",
      description: "Google Developer Student Clubs Solution Challenge 2024 project",
      stars: 4,
      url: "https://github.com/mgkram4/Hunter-Gather_GDSC-Solution-Challenge-2024",
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      name: "socal-gd-website",
      description: "Website for SoCal Game Developers",
      stars: 8,
      url: "https://github.com/GdscCpp/socal-gd-website",
      tags: ["Next.js", "Tailwind CSS", "Vercel"]
    },
    {
      name: "Vista-Pacific-Capital",
      description: "Website for Vista Pacific Capital",
      stars: 1,
      url: "https://github.com/mgkram4/Vista-Pacific-Capital",
      tags: ["React", "SASS", "Netlify"]
    },
    {
      name: "GDSC-Perfect-Pose",
      description: "Perfect Pose project for Google Developer Student Clubs",
      stars: 2,
      url: "https://github.com/mgkram4/GDSC-Perfect-Pose",
      tags: ["Python", "OpenCV", "TensorFlow"]
    },
    {
      name: "MeidaPipes-Ball-Sort",
      description: "Ball sorting game using MediaPipe",
      stars: 1,
      url: "https://github.com/mgkram4/MeidaPipes-Ball-Sort",
      tags: ["Python", "MediaPipe", "OpenCV"]
    },
    {
      name: "Quote-Scrapping-Sentiment-Analysis",
      description: "Web scraping and sentiment analysis for quotes",
      stars: 1,
      url: "https://github.com/mgkram4/Quote-Scrapping-Sentiment-Analysis",
      tags: ["Python", "BeautifulSoup", "NLTK"]
    }
  ]
};

export default function HomePage() {
  const asciiRef = useRef<HTMLPreElement>(null);
  const [darkMode, setDarkMode] = useState(true);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const ascii = asciiRef.current;
    if (ascii) {
      const glitchEffect = async () => {
        const glitchCount = 20;
        
        for (let i = 0; i < glitchCount; i++) {
          await controls.start({
            x: Math.random() * 10 - 5,
            y: Math.random() * 10 - 5,
            skew: `${Math.random() * 20 - 10}deg`,
            filter: `blur(${Math.random() * 3}px) brightness(${100 + Math.random() * 100}%)`,
            transition: { duration: 0.05 }
          });

          const lines = ascii.innerText.split('\n');
          const distortedLines = lines.map(line => 
            Math.random() > 0.6 ? line.split('').map(char => Math.random() > 0.5 ? char : String.fromCharCode(char.charCodeAt(0) + Math.floor(Math.random() * 5))).join('') : line
          );
          ascii.innerText = distortedLines.join('\n');
        }

        await controls.start({
          x: 0,
          y: 0,
          skew: '0deg',
          filter: 'none',
          transition: { duration: 0.2 }
        });
        ascii.innerText = originalAscii;
      };
      
      const originalAscii = ascii.innerText;
      const interval = setInterval(glitchEffect, 5000);
      return () => clearInterval(interval);
    }
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`min-h-screen ${darkMode ? 'bg-black text-green-400' : 'bg-white text-green-800'} font-mono flex flex-col items-center`}
    >
      <Head>
        <title>Mark | Full Stack Developer & ML Enthusiast</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.div 
        className="fixed top-0 left-0 w-full h-2 bg-green-400"
        style={{ scaleX: scrollYProgress }}
      />

      <main className="container mx-auto px-4 py-8 text-center">
        <motion.button
          whileHover={{ scale: 1.05, textShadow: "0 0 8px rgb(34, 197, 94)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDarkMode(!darkMode)}
          className={`fixed top-4 right-4 p-2 border-2 ${darkMode ? 'border-green-400 text-green-400 hover:bg-green-400 hover:text-black' : 'border-green-800 text-green-800 hover:bg-green-800 hover:text-white'} bg-transparent font-bold rounded transition-all duration-300`}
        >
          {darkMode ? '> SWITCH_MODE' : '> REVERT_MODE'}
        </motion.button>

        <header className="mb-12">
          <motion.pre 
            ref={asciiRef}
            animate={controls}
            className={`text-xs md:text-sm leading-none whitespace-pre overflow-x-auto transition-all duration-50 inline-block text-left ${darkMode ? 'text-green-400' : 'text-green-800'}`}
          >
{`
     __   __      
    |  \\ |  \\    
    | ▓▓ | ▓▓ |
    | ▓▓ | ▓▓ |
 __| ▓▓_| ▓▓_ | _
|  \\ ▓▓   ▓▓ \\|  
| ▓▓ ▓▓\\▓▓▓▓▓▓| 
 \\▓▓\\▓▓  \\▓▓▓▓ 
    \\▓▓  ▓▓      
     \\▓▓▓▓
 
`}
          </motion.pre>
          <motion.h1 
            variants={itemVariants}
            className="text-4xl font-bold mt-6 mb-2 glitch-text"
          >
            {staticGitHubData.name}: FULL STACK DEVELOPER
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl mb-4"
          >
            [WEB | MOBILE | ML]
          </motion.p>
        </header>

        <nav className="mb-8">
          <ul className="flex flex-wrap justify-center space-x-4 text-lg">
            {['PROFILE', 'SKILLS', 'PROJECTS', 'CONTACT'].map((item) => (
              <motion.li
                key={item}
                variants={itemVariants}
              >
                <a href={`#${item.toLowerCase()}`} className={`hover:${darkMode ? 'text-green-300' : 'text-green-700'} transition-colors`}>{'>'} {item}</a>
              </motion.li>
            ))}
          </ul>
        </nav>

        <motion.div variants={itemVariants} className={`border-t ${darkMode ? 'border-green-400' : 'border-green-800'} my-8`} />

        <motion.section
          id="profile"
          variants={itemVariants}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">{'>'} DEVELOPER_PROFILE</h2>
          <p className="mb-2">{staticGitHubData.bio}</p>
          <p className="mb-2">Public Repositories: {staticGitHubData.publicRepos}</p>
          <p>Contributions Last Year: {staticGitHubData.contributionsLastYear}</p>
        </motion.section>

        <motion.div variants={itemVariants} className={`border-t ${darkMode ? 'border-green-400' : 'border-green-800'} my-8`} />

        <motion.section
          id="skills"
          variants={itemVariants}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">{'>'} TECH_ARSENAL</h2>
          <ul className="list-none">
            <li className="mb-2">Web: Next.js, React, JavaScript, HTML/CSS</li>
            <li className="mb-2">Mobile: Flutter</li>
            <li className="mb-2">Backend: Python Flask, PostgreSQL</li>
            <li className="mb-2">ML/AI: TensorFlow, NLP, Classification</li>
            <li className="mb-2">Data: Pandas, Data Analysis</li>
            <li>Tools: Git, Firebase, CMS integration</li>
          </ul>
        </motion.section>

        <motion.div variants={itemVariants} className={`border-t ${darkMode ? 'border-green-400' : 'border-green-800'} my-8`} />

        <motion.section
          id="projects"
          variants={itemVariants}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">{'>'} PINNED_REPOS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {staticGitHubData.pinnedRepos.map((repo) => (
              <motion.div
                key={repo.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className={`border ${darkMode ? 'border-green-400' : 'border-green-800'} p-4 hover:${darkMode ? 'bg-green-900' : 'bg-green-100'} transition-all duration-300 rounded-lg shadow-lg`}
              >
                <h3 className="font-bold mb-2">
                  <a href={repo.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {repo.name}
                  </a>
                </h3>
                <p className="mb-2">{repo.description}</p>
                <p className="mb-2">Stars: {repo.stars}</p>
                <div className="flex flex-wrap gap-2">
                  {repo.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className={`text-xs ${darkMode ? 'bg-green-700' : 'bg-green-200'} px-2 py-1 rounded-full`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.div variants={itemVariants} className={`border-t ${darkMode ? 'border-green-400' : 'border-green-800'} my-8`} />

        <motion.section
          id="contact"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-4">{'>'} SECURE_CHANNEL</h2>
          <p className="mb-2">Connect for collaboration:</p>
          <p className="glitch-text text-xl font-bold">mgkram4@[REDACTED].com</p>
        </motion.section>
      </main>

      <motion.footer 
        variants={itemVariants}
        className={`text-center py-4 mt-8 border-t ${darkMode ? 'border-green-400' : 'border-green-800'}`}
      >
        <p>INNOVATION IN PROGRESS | FIREWALL ACTIVE</p>
      </motion.footer>

      <motion.div 
        className="fixed bottom-0 left-0 w-full h-2 bg-green-400"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.div>
  );
}