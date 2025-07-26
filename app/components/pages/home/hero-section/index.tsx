'use client'

import { Button } from "@/app/components/button"
import { CMSIcon } from "@/app/components/cms-icon"
import { RichText } from "@/app/components/rich-text"
import { TechBadge } from "@/app/components/tech-badge"
import { HomePageInfo } from "@/app/types/page-info"
import Image from "next/image"
import { HiArrowNarrowRight } from 'react-icons/hi'
import { motion } from 'framer-motion'
import { techBadgeAnimation } from "@/app/lib/animations"
import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";

type HeroSectionProps = {
    homeInfo:HomePageInfo
}

const Notification = ({
  message,
  show,
}: {
  message: string;
  show: boolean;
}) => {
  return (
    <motion.div
       className="fixed top-5 left-1/2 transform bg-cyan-500 text-white px-6 py-3 rounded-lg shadow-md text-sm font-medium"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : -20 }}
      transition={{ duration: 0.3 }}
    >
      {message}
    </motion.div>
  );
};

export default function DownloadButton() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setShowNotification(true);

    setTimeout(() => {
      const pdfPath = "/Curriculo Pedro 2025.pdf";
      const link = document.createElement("a");
      link.href = pdfPath;
      link.download = "Curriculo-PedroHenrique.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsDownloading(false);
      setShowNotification(false);
    }, 2000);
  };

  return (
    <>
      <Button
        className="w-max shadow-button mb-3 sm:mb-0 flex items-center gap-2 h-12"
        onClick={handleDownload}
        disabled={isDownloading}
      >
        CV
        <motion.div
          animate={isDownloading ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.4, repeat: isDownloading ? Infinity : 0 }}
        >
          <FaDownload size={20} />
        </motion.div>
      </Button>

      <Notification message="Download iniciado..." show={showNotification} />
    </>
  );
}

// Efeito de digitação
const TypingEffect = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const typingSpeed = 100;
  const resetDelay = 1000;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping && index < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, typingSpeed);
    } else if (index === text.length && isTyping) {
      timeout = setTimeout(() => {
        setIsTyping(false);
      }, resetDelay);
    } else if (!isTyping) {
      timeout = setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
        setIsTyping(true);
      }, resetDelay);
    }

    return () => clearTimeout(timeout);
  }, [text, index, isTyping]);

  const placeholder = " ".repeat(text.length);

  return (
    <div
      className={`
              text-shadow-subtleNeonGreen       
              animate-pulseNeon       
              text-green            
              inline-block
            `}
      style={{
        display: "inline-block",
        textAlign: "center",
        width: `${text.length}ch`,
        whiteSpace: "pre-wrap",
      }}
    >
      {displayedText || placeholder}
    </div>
  );
};


export const HeroSection = ({ homeInfo }: HeroSectionProps) => {
    const handleContact = () => {
        const contactSection = document.querySelector('#contact');
        if(contactSection) {
            contactSection.scrollIntoView({behavior: 'smooth' });
        }
    }
    return(
        <section className="w-full lg:h-[755px] bg-hero-image bg-cover bg-center bg-no-repeat flex flex-col justify-end pb-10 sm:pb-32 py-32 lg:pb-[110px] ">
            <div className= "container flex items-star justify-between flex-col-reverse lg:flex-row">
                <motion.div 
                className="w-full lg:max-w-[530px]"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                >
                    <p className="font-mono text-cyan-300">Oi, prazer! Meu nome é</p>
                    <h2 className="text-4xl font-medium mt-2">Pedro Henrique</h2>

                    <div className="text-gray-400 my-6 text-sm sm:text-base">
                        <RichText content={homeInfo.introduction.raw} />
                    </div>
                    
                    <div className="flex flex-wrap gap-x-2 gap-y-3 lg:max-w-[340px]">
                       {homeInfo.technologies.map((tech, i) => (
                            <TechBadge 
                                name={tech.name}
                                key={`intro-tech-${tech.name}`}
                                {...techBadgeAnimation}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                            
                            />
                        ))}
                    </div>

                    <div className="mt-6 lg:mt-10 flex flex-wrap items-center gap-3 sm:gap-5">
                      <div className="flex flex-wrap gap-3 sm:gap-5">
                        <DownloadButton />
                        <Button
                          className="w-max shadow-button h-12"
                          onClick={handleContact}
                        >
                          Entre em contato
                          <HiArrowNarrowRight size={18} />
                        </Button>
                      </div>

                         <div className="text-2xl text-gray-500 flex items-center h-20 gap-3">
                            {homeInfo.socials.map((contact, index) => (
                                <a 
                                    href={contact.url}
                                    key={`contact-${index}`}
                                    target="_blank"
                                    className="hover:text-gray-100 transition-colors"
                                >
                                    <CMSIcon icon={contact.iconSvg} />
                                    
                                </a>
                           ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 200, scale: 0.5 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 200, scale: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="origin-center">
                   
                   <div className="relative w-[400px] h-[480px] flex justify-center items-center lg:w-[400px] lg:h-[480px] md:w-[340px] md:h-[404px] sm:w-[280px] sm:h-[340px]">
                        <Image
                            src="/images/profile-pic-v8.png" // Substitua pelo caminho da sua nova foto
                            alt="Foto de perfil de Pedro Henrique"
                            width={400}
                            height={480}
                            priority
                            quality={100}
                            unoptimized
                            className="object-contain max-w-full h-auto"
                            style={{
                            objectPosition: 'center',
                            WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 80%)',
                            maskImage: 'radial-gradient(circle at center, black 60%, transparent 80%)',
                            
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>

    )
    
}