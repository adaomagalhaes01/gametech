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
            name: 'Finanças',
            members: [
                { name: 'Leonilda Noque', role: 'CFO', img: '/Leonilda_Noque.JPG' },
            ]
        },
        {
            name: 'Desenvolvimento de Soluções',
            members: [
                { name: 'Adão Magalhães', role: 'Lead Developer', img: '/Adao_Magalhaes.jpg' },
                { name: 'Shelsio Ferreira', role: 'Fullstack Expert', img: '/Shelsio_Ferreira.JPG' },
                { name: 'Adalmercio Almedia', role: 'Backend Developer', img: '/Adalmercio_Almedia.JPG' },
                { name: 'Diva Ventura', role: 'Frontend Developer', img: '/Diva_Ventura.jpeg' },
            ]
        },
        {
            name: 'Logística & Operações',
            members: [
                { name: 'Joel Coloco', role: 'Operations Manager', img: '/Joel_Coloco.JPG' },
            ]
        }
    ];

    return (
        <section id="equipa" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-game-blue font-tech text-sm uppercase tracking-[0.4em] mb-4">THE SQUAD</h2>
                    <h3 className="text-5xl font-tech font-black text-white italic uppercase tracking-tighter">
                        NOSSA <span className="text-game-purple">EQUIPA</span>
                    </h3>
                </div>

                {departments.map((dept, dIdx) => (
                    <div key={dept.name} className="mb-20 last:mb-0">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-[2px] w-12 bg-game-purple"></div>
                            <h4 className="text-2xl font-tech font-bold text-white uppercase tracking-widest">{dept.name}</h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {dept.members.map((member, mIdx) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: mIdx * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5 }}
                                    className="glass-card group p-0 overflow-hidden border border-white/5 hover:border-game-purple/50 transition-all duration-500"
                                >
                                    <div className="relative aspect-square overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                        <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-game-dark via-transparent to-transparent opacity-60"></div>

                                        {/* Social Overlay */}
                                        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500 delay-100">
                                            <a href="#" className="w-8 h-8 bg-game-purple/80 rounded-full flex items-center justify-center text-white hover:bg-game-purple transition-colors"><Mail size={14} /></a>
                                            <a href="#" className="w-8 h-8 bg-game-blue/80 rounded-full flex items-center justify-center text-white hover:bg-game-blue transition-colors"><ExternalLink size={14} /></a>
                                            <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"><User size={14} /></a>
                                        </div>
                                    </div>

                                    <div className="p-6 text-center">
                                        <h5 className="text-lg font-tech font-bold text-white uppercase group-hover:text-game-purple transition-colors">{member.name}</h5>
                                        <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{member.role}</p>
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
