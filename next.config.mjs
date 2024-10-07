/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // {hostname: 'localhost'}
            {hostname: 'images.pexels.com'},
        ],
        domains: ['encrypted-tbn0.gstatic.com']
    }
};

export default nextConfig;
