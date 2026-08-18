export default function Community() {
    return (
        <div className="bg-[#fefbf7] min-h-screen pt-24 px-6 pb-24">
            <div className="max-w-4xl mx-auto py-12 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
                <h1 className="text-4xl md:text-5xl font-serif text-center text-slate-900 mb-10">
                    SyncRetreat Community Rules 
                </h1>

                <div className="text-slate-500 text-sm mb-12 text-center border-b border-slate-100 pb-8">
                    <p>Version 1.0</p>
                    <p>Effective Date: February 27, 2026</p>
                </div>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        1. The Core Mandate: Deep Work Protection
                    </h2>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                        SyncRetreat is an infrastructure investment for shipping code, building products, and executing deep work. It is not a vacation or a social retreat.
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-3 ml-4 leading-relaxed">
                        <li><span className="font-bold text-slate-900">Absolute Silence in Focus Zones:</span> Designated co-working areas are strictly for silent execution.</li>
                        <li><span className="font-bold text-slate-900">Call Protocols:</span> All meetings, Zoom calls, and phone conversations must be taken in designated acoustic pods or private areas.</li>
                        <li><span className="font-bold text-slate-900">Respect the Flow State:</span> Interrupting another Client who is visibly engaged in deep work (e.g., wearing headphones, actively coding) is a direct violation of our community standards.</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        2. Infrastructure Integrity
                    </h2>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                        In the Himalayas, bandwidth is a premium asset. Our Dual-WAN and multi-ISP failover systems are designed for professional engineering and operational requirements.
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-3 ml-4 leading-relaxed">
                        <li><span className="font-bold text-slate-900">Bandwidth Prioritization:</span> Infrastructure is strictly for work. High-bandwidth recreational consumption (e.g., torrenting, 4K streaming, massive non-work-related downloads) during core operational hours is strictly prohibited.</li>
                        <li><span className="font-bold text-slate-900">Equipment Care:</span> Clients are liable for any physical damage caused to the ergonomic setups, routers, or on-site hardware provided by SyncRetreat or our local real estate partners.</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        3. Professional Conduct (B2B Standard)
                    </h2>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                        We curate a room of high-level founders and engineers. Professionalism is non-negotiable.
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-3 ml-4 leading-relaxed">
                        <li><span className="font-bold text-slate-900">No Unsolicited Pitching:</span> While networking naturally occurs, aggressive solicitation, unsolicited pitching of services, or treating the Camp as a captive lead-generation pool is prohibited.</li>
                        <li><span className="font-bold text-slate-900">Zero Tolerance for Harassment:</span> Any form of harassment, discrimination, or hostile behavior toward other Clients, SyncRetreat staff, or our local Ladakhi partners will result in immediate expulsion.</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        4. Environmental and Cultural Mandates
                    </h2>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                        Operating in Leh, Ladakh requires strict adherence to local ecological and cultural norms. Our zero-capital revenue-share model relies heavily on the goodwill of our local partners.
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-3 ml-4 leading-relaxed">
                        <li><span className="font-bold text-slate-900">Local Respect:</span> Clients must treat all local hotel staff, private chefs, and vendors with absolute professional respect. Entitled or demanding behavior will not be tolerated.</li>
                        <li><span className="font-bold text-slate-900">Ecological Preservation:</span> Ladakh is a fragile high-altitude ecosystem. Littering, wasting local water resources, or violating local environmental guidelines is strictly forbidden.</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        5. Health, Safety, and High-Altitude Protocol
                    </h2>
                    <ul className="list-disc list-inside text-slate-600 space-y-3 ml-4 leading-relaxed">
                        <li><span className="font-bold text-slate-900">Acclimatization Compliance:</span> Clients must strictly adhere to the mandatory 48-hour acclimatization rest period upon arrival in Leh. Ignoring altitude sickness protocols endangers the Client and disrupts camp operations.</li>
                        <li><span className="font-bold text-slate-900">Substance Policy:</span> The possession, use, or distribution of illegal substances is strictly prohibited and will result in immediate turnover to local authorities.</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        6. Enforcement and Expulsion
                    </h2>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                        SyncRetreat reserves the absolute right to enforce these rules without warning or appeal.
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-3 ml-4 leading-relaxed">
                        <li><span className="font-bold text-slate-900">Immediate Removal:</span> Violation of these Community Rules gives SyncRetreat the unilateral right to terminate the Client's contract, revoke their infrastructure access, and expel them from the Camp immediately.</li>
                        <li><span className="font-bold text-slate-900">No Refunds on Expulsion:</span> If a Client is expelled for violating the Community Rules, they forfeit their entire plan payment. No refunds, partial or otherwise, will be issued.</li>
                    </ul>
                </section>
            </div>
        </div>
    )
}