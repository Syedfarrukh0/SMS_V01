/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // {hostname: 'localhost'}
            {hostname: 'images.pexels.com'},
        ],
        domains: ['i.pinimg.com','encrypted-tbn0.gstatic.com','res.cloudinary.com'],
    }
};

export default nextConfig;
