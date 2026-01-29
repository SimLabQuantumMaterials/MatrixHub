/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGitHubPages ? '/MatrixHub' : '';
const assetPrefix = isGitHubPages ? '/MatrixHub/' : '';

const nextConfig = {
  output: 'export',  // Enables static HTML export
  basePath,
  assetPrefix: assetPrefix || undefined,
  images: {
    unoptimized: true,  // Required for static export
  },
  trailingSlash: true, // Recommended for static exports
}

module.exports = nextConfig 