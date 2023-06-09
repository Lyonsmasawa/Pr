/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        SERVER_URL: "http://localhost:3008"
    }
}

module.exports = nextConfig