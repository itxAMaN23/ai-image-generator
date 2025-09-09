import { BsLightningChargeFill, BsImageFill, BsShieldLockFill } from 'react-icons/bs';

const features = [
    {
        name: 'Blazing Fast Generation',
        description: 'Our optimized models deliver high-quality images in just a few seconds, so you can iterate on your ideas faster than ever.',
        icon: BsLightningChargeFill,
    },
    {
        name: 'State-of-the-Art Models',
        description: 'Access a variety of fine-tuned AI models, each with a unique style, from photorealism to anime and fantasy art.',
        icon: BsImageFill,
    },
    {
        name: 'Secure & Private',
        description: 'Your generations are your own. Manage your creations in a private gallery, safe and secure in your personal account.',
        icon: BsShieldLockFill,
    },
];

const Features = () => {
    return (
        <div className="bg-[#202142] py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-[#8A4FFF] font-['Inter']">Why Choose ImagiVerse?</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-['Poppins']">
                        Everything You Need to Create
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-white font-['Poppins']">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#8A4FFF]">
                                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-400 font-['Inter']">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Features;