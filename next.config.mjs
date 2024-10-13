/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        config.module.rules.push({
          test: /\.svg$/,
          use: [{ loader: '@svgr/webpack', options: { titleProp: true } }],
        })
    
        if (!isServer) {
          config.resolve.fallback = {
            fs: false,
          }
        }
    
        return config
      },
};

export default nextConfig;
