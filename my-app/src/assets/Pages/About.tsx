export default function About() {
    return (
        <>
        <div className="bg-black min-h-screen pt-24 px-4">
            <div className="max-w-4xl mx-auto px12">
                <h1 className="text-4xl md:text-5xl font-serif text-center text-white mb-10">
                    The Engineering of Focus.
                </h1>

                <div className="text-gray-300 space-y-6 leading-relaxed">
                    <p>
                        Most remote work retreats are built by travel agencies. They optimize for sightseeing, bonding circles, and crowded itineraries. They think "good Wi-Fi" means a single consumer router in a hotel lobby.
                    </p>
                    <p>
                        SyncRetreat was not built by the tourism industry. It was built by software engineers.
                    </p>
                    <p>
                        We understand the technical reality of shipping a product. We know what it takes to deploy a full-stack application, manage a DevOps pipeline, and coordinate remote servers. More importantly, we know that a single dropped SSH connection, a thermal-throttling laptop in a hot European apartment, or a noisy cafe can destroy a 10-hour sprint.
                    </p>
                    <p>
                        We built the infrastructure we couldn't find anywhere else.
                    </p>
                </div>

                 <div className="border-t border-zinc-800 my-16"></div>

                <section className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-8">
                        Strictly Vetted. Strictly Operators.
                    </h2>
                    <div className="text-gray-300 space-y-6 leading-relaxed">
                        <p>
                            We do not sell vacations. We do not accept backpackers, casual tourists, or anyone looking to "find themselves."
                        </p>
                        <p>
                            SyncRetreat is a highly vetted, 28-day deep work hub designed exclusively for <span className="text-white font-medium"> funded founders, remote professionals, and high-level operators...</span> who have strict deadlines and require an uncompromising environment to execute them.
                        </p>
                    </div>

                    <div className="mt-12 border-l-4 border-blue-500 pl-6">
                        <p className="text-xl md:text-2xl text-white font-light italic">
                            You bring the mandate. We provide the infrastructure.
                        </p>
                    </div>
                </section>
            </div>
        </div>
        </>
    )
}