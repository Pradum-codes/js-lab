/** @type {import('next').NextConfig} */
import nextMdx from '@next/mdx'

const withMdx = nextMdx({
  // By default only the `.mdx` extension is supported.
  extension: /\.mdx?$/,
  options: {/* otherOptions… */}
})

const nextConfig = {
  /* config options here */
    pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
};

export default withMdx(nextConfig)