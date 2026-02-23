
export default function Footer() {
    return (
        <footer className="bg-[#0A0A0A] rounded-t-[4rem] px-6 md:px-12 lg:px-20 py-24 mt-32 border-t border-[#1A1A1A]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="md:col-span-2 space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#FAF8F5] uppercase">Riccardo Fusetti</h2>
                    <p className="text-[#C9A84C] font-['Inter'] font-light tracking-tight text-2xl">Director + Editor</p>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xs uppercase tracking-widest text-[#1A1A1A] font-['JetBrains_Mono'] font-bold">Social</h3>
                    <ul className="space-y-4">
                        <li><a href="#" className="text-sm font-['JetBrains_Mono'] text-[#FAF8F5] hover:text-[#C9A84C] transition-colors">Vimeo</a></li>
                        <li><a href="#" className="text-sm font-['JetBrains_Mono'] text-[#FAF8F5] hover:text-[#C9A84C] transition-colors">Instagram</a></li>
                        <li><a href="#" className="text-sm font-['JetBrains_Mono'] text-[#FAF8F5] hover:text-[#C9A84C] transition-colors">LinkedIn</a></li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xs uppercase tracking-widest text-[#1A1A1A] font-['JetBrains_Mono'] font-bold">Inquiries</h3>
                    <a
                        href="mailto:contact@riccardofusetti.com"
                        className="block text-sm font-['JetBrains_Mono'] text-[#FAF8F5] hover:text-[#C9A84C] transition-colors"
                    >
                        contact@riccardofusetti.com
                    </a>

                    <div className="mt-12 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
                        <span className="text-xs font-['JetBrains_Mono'] text-[#FAF8F5]/60 uppercase tracking-wider">System Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
