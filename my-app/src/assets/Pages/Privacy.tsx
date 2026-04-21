export default function Privacy() {
    return (
        <div className="bg-[#fefbf7] min-h-screen pt-24 px-6 pb-24">
            <div className="max-w-4xl mx-auto py-12 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
                <h1 className="text-4xl md:text-5xl font-serif text-center text-slate-900 mb-10">
                    Privacy Policy
                </h1>

                <div className="text-slate-500 text-sm mb-12 text-center border-b border-slate-100 pb-8">
                    <p>Version 1.0</p>
                    <p>Effective Date: February 27, 2026</p>
                </div>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        2. Information We Collect
                    </h2>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                        To execute our high-ticket infrastructure services and comply with local Indian laws, we mandate the collection of specific data points:
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-3 ml-4 leading-relaxed">
                        <li><span className="font-bold text-slate-900">Identity and Contact Data:</span> Full legal name, professional title, corporate affiliation, email address, and primary phone number.</li>
                        <li><span className="font-bold text-slate-900">Travel and Legal Documentation:</span> Passport copies, Indian e-Tourist Visa details, and emergency contact information. This is strictly required for processing mandatory Protected Area Permits (PAP) for the Ladakh region.</li>
                        <li><span className="font-bold text-slate-900">Financial Data:</span> Billing address and transaction history. Note: SyncRetreat does not process or store full credit card numbers. All financial transactions are securely tokenized and processed by our PCI-DSS compliant third-party gateways (Stripe and RazorpayX).</li>
                        <li><span className="font-bold text-slate-900">Technical Data:</span> IP addresses, browser types, and usage data collected via our frontend architecture for security monitoring and localized performance tracking.</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        3. Purpose of Data Processing
                    </h2>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                        We do not monetize your data. Your PII is processed strictly for the following operational imperatives:
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-3 ml-4 leading-relaxed">
                        <li><span className="font-bold text-slate-900">Service Execution:</span> To reserve real estate, configure on-site infrastructure, and manage your 28-day allocation.</li>
                        <li><span className="font-bold text-slate-900">Legal Compliance:</span> To submit required documentation to the District Magistrate in Leh and relevant Indian border authorities to secure your PAP.</li>
                        <li><span className="font-bold text-slate-900">Financial Processing:</span> To manage invoicing, track deposits, and execute the final $1,300 USD balance collection via Stripe/RazorpayX.</li>
                        <li><span className="font-bold text-slate-900">Operational Communication:</span> To dispatch critical pre-arrival briefings, high-altitude health protocols, and logistical updates.</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        4. Data Sharing and Third-Party Disclosures
                    </h2>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                        We operate a lean, zero-capital model and share your data only when operationally or legally necessary:
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-3 ml-4 leading-relaxed">
                        <li><span className="font-bold text-slate-900">Government Authorities:</span> Your passport and visa data will be shared with local Indian authorities exclusively to procure regional permits.</li>
                        <li><span className="font-bold text-slate-900">Local Operational Partners:</span> Your name and dietary requirements will be shared with our Ladakhi boutique hotel partners and private chefs to fulfill our infrastructure obligations.</li>
                        <li><span className="font-bold text-slate-900">Service Providers:</span> Data is routed through our enterprise infrastructure partners (e.g., payment gateways, secure cloud hosting).</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        5. International Data Transfers
                    </h2>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                        SyncRetreat operates in India. By utilizing our services, Western clients (from the US, UK, and EU) acknowledge and consent to the transfer, storage, and processing of their PII within Indian jurisdiction. We implement commercially reasonable, enterprise-grade security protocols to protect this data during transit and at rest.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        6. Data Retention Protocols
                    </h2>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                        We retain your PII only for as long as necessary to fulfill the operational requirements of the Camp and to satisfy any prevailing legal, accounting, or tax reporting mandates under Indian law. Upon expiration of these legal requirements, your personal data will be securely permanently deleted from our servers.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        7. Client Rights (GDPR and CCPA Compliance)
                    </h2>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                        Depending on your jurisdiction, you possess specific rights regarding your personal data:
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-3 ml-4 leading-relaxed">
                        <li>The right to request access to the PII we hold about you.</li>
                        <li>The right to request corrections to inaccurate or incomplete data.</li>
                        <li>The right to request the deletion of your data, subject to our overriding legal obligations (e.g., Indian tax retention laws).</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        8. Contact and Legal Controller
                    </h2>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                        For any inquiries regarding this Privacy Policy or to exercise your data rights, you must contact our compliance team directly.
                    </p>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mt-6 shadow-sm">
                        <p className="text-slate-600 mb-2"><span className="font-bold text-slate-900">Data Controller:</span> SyncRetreat</p>
                        <p className="text-slate-600 mb-2"><span className="font-bold text-slate-900">Jurisdiction:</span> India</p>
                        <p className="text-slate-600"><span className="font-bold text-slate-900">Contact Email:</span> <a href="mailto:contact@syncretreat.com" className="text-emerald-600 hover:text-emerald-700 font-medium">contact@syncretreat.com</a></p>
                    </div>
                </section>
            </div>
        </div>
    )
}