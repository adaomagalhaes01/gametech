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
            name: 'Suporte & Conteúdo',
            members: [
                { name: 'Dionísio Casule', role: 'Technical Support', img: '/Dionisio_Casule.JPG' },
                { name: 'Tonilson Felipe', role: 'Content Editor', img: '/Tonilson_Felipe.JPG' },
            ]
        },
        {
            name: 'Desenvolvimento & Design',
            members: [
                { name: 'Adão Magalhães', role: 'Lead Developer', img: '/Adao_Magalhaes.jpg' },
                { name: 'Shelsio Ferreira', role: 'Fullstack Expert', img: '/Shelsio_Ferreira.JPG' },
                { name: 'Adalmercio Almeida', role: 'Backend Developer', img: '/Adalmercio_Almeida.JPG' },
                { name: 'Diva Ventura', role: 'Frontend Developer', img: '/Diva_Ventura.jpeg' },
            ]
        }
    ];

    return (
        <section id="equipa" className="py-24 relative overflow-hidden bg-game-dark">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="text-game-primary font-tech text-xs uppercase tracking-[0.4em] mb-4 font-bold">THE SQUAD</h2>
                    <h3 className="section-title text-white">
                        NOSSA <span className="text-game-primary">EQUIPA</span>
                    </h3>
                </div>

                {departments.map((dept, dIdx) => (
                    <div key={dept.name} className="mb-20 last:mb-0 text-left">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-[2px] w-12 bg-game-primary"></div>
                            <h4 className="text-xl font-tech font-black text-white uppercase tracking-tighter italic">{dept.name}</h4>
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
                                    <div className="relative aspect-square overflow-hidden border border-white/10 group-hover:border-game-primary/50 transition-all duration-700 shadow-2xl group-hover:shadow-game-primary/20 rounded-2xl">
                                        <img
                                            src={member.img}
                                            alt={member.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            style={{ objectPosition: (member.name.includes('Dionísio') || member.name.includes('Tonilson')) ? 'top' : 'center' }}
                                        />

                                        {/* Social Overlay */}
                                        <div className="absolute bottom-4 right-4 flex gap-2 translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                                            <a href="#" className="w-8 h-8 rounded-lg bg-game-primary flex items-center justify-center text-white hover:bg-white hover:text-game-primary transition-all shadow-[0_0_10px_rgba(0,163,255,0.5)]"><Mail size={14} /></a>
                                            <a href="#" className="w-8 h-8 rounded-lg bg-game-dark border border-white/10 flex items-center justify-center text-white hover:bg-game-primary transition-all"><ExternalLink size={14} /></a>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <h5 className="text-lg font-tech font-black text-white uppercase italic tracking-tighter group-hover:text-game-primary transition-colors">{member.name}</h5>
                                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">{member.role}</p>
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
