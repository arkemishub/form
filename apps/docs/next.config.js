const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@arkejs/form"],
  output: "standalone",
};

module.exports = withContentlayer(nextConfig);
