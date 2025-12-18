'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

function FeaturesSection() {
    const features = [
        {
            title: 'Precision Semiconductor Design',
            description: 'Leveraging cutting-edge tools for unparalleled accuracy in chip design.',
        },
        {
            title: 'Low-Power Solutions',
            description: 'Specializing in energy-efficient designs for next-gen devices.',
        },
        {
            title: 'Scalable Silicon Platforms',
            description: 'Building flexible and future-proof architectures for a variety of applications.',
        },
        {
            title: 'Innovation-Driven Engineering',
            description: 'Our culture of innovation ensures we are always at the forefront of technology.',
        },
        {
            title: 'Professional Chip Architecture',
            description: 'Expert-level design of chip architecture to meet your specific needs.',
        },
        {
            title: 'Future-Ready Technology',
            description: 'Designing semiconductors that are ready for tomorrow\'s challenges.',
        }
    ];

    return (
        <section id="features" className="py-16 md:py-24 pt-32 md:pt-40">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
                        Our Features
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Explore the innovative features that set Zyron Semi Conductors apart.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="flex flex-col p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                             <div className="mb-4 bg-primary/10 p-3 rounded-full w-min">
                                <Check className="h-6 w-6 text-primary" />
                            </div>
                            <CardHeader className='p-0'>
                                <CardTitle className="font-headline text-xl">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='p-0 mt-2 flex-grow'>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}


export default function FeaturesPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
            <Header />
            <main className="flex-1">
                <FeaturesSection />
            </main>
            <Footer />
        </div>
    );
}
