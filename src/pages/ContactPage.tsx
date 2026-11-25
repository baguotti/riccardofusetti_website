import { FootnoteRef } from '../components/EditorialParts';
import { seo } from '../seo';

export const meta = () => seo({ title: 'info — riccardo fusetti', path: '/contact' });

export default function ContactPage() {
    return (
        <article className="w-full max-w-[1440px] mx-auto px-6 md:px-10 pt-8 md:pt-12 pb-20 paper-fade">
            <div className="max-w-[520px]">
                <div className="space-y-3 text-[14.5px] md:text-[15px] leading-[1.65] text-ink">
                    <p>
                        <em className="italic">independent freelance</em> director &amp; editor<FootnoteRef n={1} target="fn-1" />
                    </p>
                    <p className="text-[12.5px] text-ink-muted">
                        london — worldwide<FootnoteRef n={2} target="fn-2" />
                    </p>
                </div>

                {/* Footnotes */}
                <section aria-label="notes" className="mt-14 pt-5 border-t border-rule">
                    <ol className="list-none m-0 p-0 space-y-2.5 text-[11.5px] leading-[1.6] text-ink-muted">
                        <li id="fn-1" className="grid grid-cols-[1.5rem_1fr] items-baseline gap-2 target:text-ink">
                            <span className="tabular-nums text-[10.5px] text-ink-subtle">1.</span>
                            <span>
                                <span className="italic">editor roster</span> —{' '}
                                <a
                                    href="https://www.wildislandfilms.com/talent/riccardo-fusetti"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-ink underline underline-offset-4 decoration-rule hover:decoration-ink transition-colors"
                                >
                                    wild island films
                                </a>
                            </span>
                        </li>

                        <li id="fn-2" className="grid grid-cols-[1.5rem_1fr] items-baseline gap-2 target:text-ink">
                            <span className="tabular-nums text-[10.5px] text-ink-subtle">2.</span>
                            <span>
                                <span className="italic">get in touch</span> —{' '}
                                <a
                                    href="mailto:fusetti.riccardo@gmail.com"
                                    className="text-ink underline underline-offset-4 decoration-rule hover:decoration-ink transition-colors"
                                >
                                    fusetti.riccardo@gmail.com
                                </a>
                            </span>
                        </li>
                    </ol>
                </section>
            </div>
        </article>
    );
}
