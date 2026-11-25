import type { Credit } from '../types';

export function FootnoteRef({ n, target }: { n: number; target: string }) {
    return (
        <sup>
            <a
                href={`#${target}`}
                className="ml-[2px] text-[9.5px] tabular-nums text-ink-muted hover:text-ink transition-colors no-underline focus-visible:outline-1 focus-visible:outline-ink"
                aria-label={`footnote ${n}`}
            >
                {n}
            </a>
        </sup>
    );
}

function renderInlineHandles(name: string) {
    const parts = name.split(/(@[\w._]+)/g);
    return parts.map((part, index) => {
        if (part.startsWith('@')) {
            const handle = part.substring(1);
            return (
                <a
                    key={index}
                    href={`https://instagram.com/${handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-rule hover:decoration-ink underline-offset-4 transition-colors"
                >
                    {part}
                </a>
            );
        }
        return part;
    });
}

export function CreditsColophon({ credits }: { credits: Credit[] }) {
    return (
        <dl className="m-0 grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            {credits.map((credit, i) => {
                const link = credit.url || (credit.instagram ? `https://instagram.com/${credit.instagram}` : null);
                return (
                    <div
                        key={`${credit.role}-${credit.name}-${i}`}
                        className="py-1.5 border-b border-rule/70 flex justify-between items-baseline gap-4 text-[11.5px]"
                    >
                        <dt className="italic text-ink-muted shrink-0 lowercase">
                            {credit.role}
                        </dt>
                        <dd className="m-0 text-right text-ink lowercase">
                            {link ? (
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline decoration-rule hover:decoration-ink underline-offset-4 transition-colors duration-200 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
                                >
                                    {credit.name}
                                </a>
                            ) : (
                                renderInlineHandles(credit.name)
                            )}
                        </dd>
                    </div>
                );
            })}
        </dl>
    );
}
