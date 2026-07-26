import { Instagram, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full px-6 pb-12 mt-4">
            <div className="max-w-[440px] mx-auto flex flex-col items-center gap-8">
                <div className="flex items-center gap-6">
                    <a
                        href="https://instagram.com/riccardo.fusetti"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-[#A1A1AA] hover:text-white transition-colors duration-300 transform hover:scale-110 rounded-full focus-visible:ring-2 focus-visible:ring-[#D6D3C9] outline-none"
                        aria-label="Instagram profile"
                    >
                        <Instagram size={20} strokeWidth={1.4} />
                    </a>
                    <a
                        href="mailto:fusetti.riccardo@gmail.com"
                        className="p-3 text-[#A1A1AA] hover:text-white transition-colors duration-300 transform hover:scale-110 rounded-full focus-visible:ring-2 focus-visible:ring-[#D6D3C9] outline-none"
                        aria-label="Send email"
                    >
                        <Mail size={20} strokeWidth={1.4} />
                    </a>
                </div>

            </div>
        </footer>
    );
}
