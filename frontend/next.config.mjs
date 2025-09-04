/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  eslint: {
    // Vercelでのビルド時にESLintのエラーを無視する
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
