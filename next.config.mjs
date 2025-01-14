/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com'


            },

            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'th.bing.com'
            },
            {
                protocol: 'https',
                hostname: 'zbipyxiyop4r0bcy.public.blob.vercel-storage.com'
            }
        ],
    },
};

export default nextConfig;
