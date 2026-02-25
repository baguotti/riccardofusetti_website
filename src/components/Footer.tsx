import { Instagram, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full px-6 pb-12 mt-4">
            <div className="max-w-[440px] mx-auto flex flex-col items-center gap-8">
                <div className="flex items-center gap-8">
                    <a
                        href="https://instagram.com/riccardo.fusetti"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#555] hover:text-[#D6D3C9] transition-colors duration-300 transform hover:scale-110"
                        aria-label="Instagram"
                    >
                        <Instagram size={18} strokeWidth={1.2} />
                    </a>
                    <a
                        href="mailto:fusetti.riccardo@gmail.com"
                        className="text-[#555] hover:text-[#D6D3C9] transition-colors duration-300 transform hover:scale-110"
                        aria-label="Email"
                    >
                        <Mail size={18} strokeWidth={1.2} />
                    </a>
                </div>

            </div>
        </footer>
    );
}
