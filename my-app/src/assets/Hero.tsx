import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react'; 

export default function Hero() {
    return (
        <section className='relative h-screen flex items-center justify-center overflow-hidden'>
            <div className='absolute inset-0 bg-cover bg-center' style={{backgroundImage: "linear-gradient(rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.8)),  url(https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=1920)",}}/>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
            <div className='relative z-10 max-w-5xl mx-auto px-6 text-center'>
                <motion.div 
                initial={{ opacity: 0, y:20 }}
                animate= {{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                    <div className='inline-block mb-4 px-4 py-2 border border-blue-500/30 rounded-full bg-blue-500/5 backdrop-blur-sm'>
                        <span className='text-blue-400 text-sm font-medium tracking-wide'>July 2026 Founding Batch</span>
                    </div>

                    <h1 className='text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight'>
                        The Himalayan
                        <br />
                        <span className='bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>
                            Deep Work Chapter
                        </span>
                    </h1>

                    <p className='text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
                        Escape the heat. Escape the mansoon. Escape the crowd. 28 Days of focus with Elite Nomads Working from Ladakh.
                    </p>

                    <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={ {scale: 0.98 }}
                            className='px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-blue-600/20'
                            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth'})}>
                                Apply for the batch!
                                <ChevronRight className='w-5 h-5' />
                           </motion.button>

                           <motion.button 
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                           className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg flex items-center gap-2 transition-colors border border-white/10 backdrop-blur-sm">
                            <Play className=' w-5 h-5' />
                            View the Space
                           </motion.button>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className='absolute bottom-12 left-1/2 -translate-x-1/2'>
                <div className='flex flex-col items-center gap-2 text-slate-400'>
                    <span className='text-sm'>Scroll to explore</span>
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className= "w-6 h-10 border-2 border-slate-400 rounded-full flex items-start justify-center p-2">
                        <motion.div className='w-1 h-2 bg-slate-400 rounded-full' />
                    </motion.div>
                </div>
                </motion.div>
            </div>
        </section>
    )
}