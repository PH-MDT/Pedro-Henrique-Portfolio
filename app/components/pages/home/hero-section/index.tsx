'use client'

import { Button } from "@/app/components/button"
import { CMSIcon } from "@/app/components/cms-icon"
import { RichText } from "@/app/components/rich-text"
import { TechBadge } from "@/app/components/tech-badge"
import { HomePageInfo } from "@/app/types/page-info"
import Image from "next/image"
import { HiArrowNarrowRight } from 'react-icons/hi'

type HeroSectionProps = {
    homeInfo:HomePageInfo
}

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
                <div className="w-full lg:max-w-[530px]">
                    <p className="font-mono text-cyan-300">Oi, prazer! Meu nome é</p>
                    <h2 className="text-4xl font-medium mt-2">Pedro Henrique</h2>

                    <div className="text-gray-400 my-6 text-sm sm:text-base">
                        <RichText content={homeInfo.introduction.raw} />
                    </div>
                    
                    <div className="flex flex-wrap gap-x-2 gap-y-3 lg:max-w-[340px]">
                       {homeInfo.technologies.map((tech) => (
                            <TechBadge name={tech.name}
                            />
                        ))}
                    </div>

                    <div className="mt-6 lg:mt-10 flex sm:items-center sm:gap-5 flex-col sm:flex-row">
                        <Button className="w-max shadow-button" onClick={handleContact}>
                            Entre em contato
                            <HiArrowNarrowRight size={18} />
                        </Button>

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
                </div>

                   <div className="relative w-[400px] h-[480px] flex justify-center items-center lg:w-[400px] lg:h-[480px] md:w-[340px] md:h-[404px] sm:w-[280px] sm:h-[340px]">
                        <Image
                            src="/images/profile-pic-v8.png" // Substitua pelo caminho da sua nova foto
                            alt="Foto de perfil de Pedro Henrique"
                            width={400}
                            height={480}
                            priority
                            quality={100}
                            className="object-contain max-w-full h-auto"
                            style={{
                            objectPosition: 'center',
                            WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 80%)',
                            maskImage: 'radial-gradient(circle at center, black 60%, transparent 80%)',
                            filter: 'grayscale(80%) brightness(80%)',
                            }}
                        />
                    </div>
            </div>
        </section>

    )
    
}