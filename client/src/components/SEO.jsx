import React from 'react';

const SEO = ({ title, description, image, url }) => {
    const siteTitle = title ? `${title} | Shinewell NGO` : 'Shinewell NGO | Building Trust, Empowering Lives';
    const siteDescription = description || 'Shinewell NGO is dedicated to creating lasting impact through education, healthcare, and community support in India.';
    const siteImage = image || 'https://shinewellngo.org/og-image.jpg';
    const siteUrl = url ? `https://shinewellngo.org${url}` : 'https://shinewellngo.org';

    return (
        <React.Fragment>
            {/* Title */}
            <title>{siteTitle}</title>
            <meta name="title" content={siteTitle} />
            <meta name="description" content={siteDescription} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:image" content={siteImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={siteUrl} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={siteDescription} />
            <meta property="twitter:image" content={siteImage} />

            {/* Organization Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "NGO",
                    "name": "Shinewell NGO",
                    "url": "https://shinewellngo.org",
                    "logo": "https://shinewellngo.org/logo.png",
                    "description": "Dedicated to community empowerment in India.",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "123 Empowerment Way",
                        "addressLocality": "New Delhi",
                        "postalCode": "110001",
                        "addressCountry": "IN"
                    }
                })}
            </script>
        </React.Fragment>
    );
};

export default SEO;
