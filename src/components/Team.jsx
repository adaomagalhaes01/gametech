import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, ExternalLink } from 'lucide-react';

const Team = () => {
    const departments = [
        {
            name: 'Marketing',
            members: [
                { name: 'Manuela Joaquim', role: 'Head of Marketing', img: '/Manuela_Joaquim.JPG' },
                { name: 'Rosa Mpaka', role: 'Social Media', img: '/Rosa_Mpaka.JPG' },
            ]
        },
        {
            name: 'Gestão',
            members: [
                { name: 'Leonilda Noque', role: 'CFO / Management', img: '/Leonilda_Noque.JPG' },
                { name: 'Joel Coloco', role: 'Operations Manager', img: '/Joel_Coloco.JPG' },
            ]
        },
        {
            name: 'Desenvolvimento & Design',
            members: [
                { name: 'Adão Magalhães', role: 'Lead Developer', img: '/Adao_Magalhaes.jpg' },
                { name: 'Shelsio Ferreira', role: 'Fullstack Expert', img: '/Shelsio_Ferreira.JPG' },
                { name: 'Adalmercio Almedia', role: 'Backend Developer', img: '/Adalmercio_Almedia.JPG' },
                { name: 'Diva Ventura', role: 'Frontend Developer', img: '/Diva_Ventura.jpeg' },
            ]
        }
    ];

    return (
        <section id="equipa" className="py-24 relative overflow-hidden bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="text-game-primary font-tech text-xs uppercase tracking-[0.4em] mb-4 font-bold">THE SQUAD</h2>
                    <h3 className="section-title text-game-dark">
                        NOSSA <span className="text-game-primary">EQUIPA</span>
                    </h3>
                </div>

                {departments.map((dept, dIdx) => (
                    <div key={dept.name} className="mb-20 last:mb-0">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-[2px] w-12 bg-game-primary"></div>
                            <h4 className="text-xl font-tech font-black text-game-dark uppercase tracking-tighter italic">{dept.name}</h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {dept.members.map((member, mIdx) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: mIdx * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -10 }}
                                    className="group relative"
                                >
                                    <div className="relative aspect-square overflow-hidden border-2 border-game-dark grayscale group-hover:grayscale-0 transition-all duration-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(255,70,85,1)]">
                                        <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

                                        {/* Social Overlay */}
                                        <div className="absolute bottom-4 right-4 flex gap-2 translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                                            <a href="#" className="w-8 h-8 bg-game-primary flex items-center justify-center text-white hover:bg-black transition-colors"><Mail size={14} /></a>
                                            <a href="#" className="w-8 h-8 bg-game-dark flex items-center justify-center text-white hover:bg-game-primary transition-colors"><ExternalLink size={14} /></a>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <h5 className="text-lg font-tech font-black text-game-dark uppercase italic tracking-tighter group-hover:text-game-primary transition-colors">{member.name}</h5>
                                        <p className="text-game-dark/40 text-[10px] font-bold uppercase tracking-widest mt-1">{member.role}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Team;
