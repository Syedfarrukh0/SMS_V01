/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // {hostname: 'localhost'}
            {hostname: 'images.pexels.com'}
        ]
    }
};

export default nextConfig;
