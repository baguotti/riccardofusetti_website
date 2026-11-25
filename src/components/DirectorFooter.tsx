export default function DirectorFooter() {
    return (
        <footer className="w-full border-t border-rule mt-auto">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2.5 text-[11.5px] text-ink-muted">
                <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-ink">riccardo fusetti</span>
                    <span aria-hidden="true">—</span>
                    <span>london</span>
                </p>

                <div className="flex items-baseline gap-5">
                    <a
                        href="https://instagram.com/riccardo.fusetti"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink hover:underline underline-offset-4 decoration-[1px] decoration-ink/50 transition-colors focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                        instagram
                    </a>
                    <a
                        href="mailto:fusetti.riccardo@gmail.com"
                        className="text-ink hover:underline underline-offset-4 decoration-[1px] decoration-ink/50 transition-colors focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
                    >
                        email
                    </a>
                </div>
            </div>
        </footer>
    );
}
