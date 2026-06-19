import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5001',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.europackindia.com' }],
        destination: 'https://europackindia.com/:path*',
        permanent: true,
      },
      {
        source: '/sitemap',
        destination: '/site-navigation',
        permanent: true,
      },
      {
        source: '/locations/:path*',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/industries/:path*',
        destination: '/industries',
        permanent: true,
      },
      {
        source: '/products/wooden-pallets',
        destination: '/wooden-pallets',
        permanent: true,
      },
      {
        source: '/products/special-services/seaworthy-packing',
        destination: '/seaworthy-packing',
        permanent: true,
      },
      {
        source: '/seaworthy-packaging',
        destination: '/seaworthy-packing',
        permanent: true,
      },
      {
        source: '/seaworthy-export-packing',
        destination: '/seaworthy-packing',
        permanent: true,
      },
      {
        source: '/seaworthy-packaging-solutions',
        destination: '/seaworthy-packing',
        permanent: true,
      },
      {
        source: '/seaworthy-packaging-mumbai',
        destination: '/seaworthy-packing',
        permanent: true,
      },
      {
        source: '/seaworthy-packaging-vadodara',
        destination: '/seaworthy-packing',
        permanent: true,
      },
      {
        source: '/products/wooden-pallets/four-way-pallet',
        destination: '/four-way-pallet',
        permanent: true,
      },
      {
        source: '/fourway-pallet',
        destination: '/four-way-pallet',
        permanent: true,
      },
      {
        source: '/products/pallet-systems/wooden-pallets',
        destination: '/wooden-pallets',
        permanent: true,
      },
      {
        source: '/products/pallet-systems/cp1-pallets',
        destination: '/cp1-pallets',
        permanent: true,
      },
      {
        source: '/products/pallet-systems/cp2-pallets',
        destination: '/cp2-pallets',
        permanent: true,
      },
      {
        source: '/products/pallet-systems/metal-pallets',
        destination: '/products/metal-pallets/galvanized-pallet',
        permanent: true,
      },
      {
        source: '/products/pallet-systems/plastic-pallets',
        destination: '/products/plastic-pallets/export-plastic-pallet',
        permanent: true,
      },
      {
        source: '/products/pallet-systems/paper-pallets',
        destination: '/products/paper-pallets/honeycomb-paper-pallet',
        permanent: true,
      },
      {
        source: '/products/wooden-boxes-crates/wooden-crates',
        destination: '/products/wooden-boxes/wooden-crates',
        permanent: true,
      },
      {
        source: '/products/wooden-boxes-crates/heavy-equipment-boxes',
        destination: '/products/wooden-boxes/heavy-equipment-boxes',
        permanent: true,
      },
      {
        source: '/products/wooden-boxes-crates/plywood-boxes',
        destination: '/products/plywood-boxes/standard-export-boxes',
        permanent: true,
      },
      {
        source: '/products/wooden-boxes-crates/ispm-15-certified-boxes',
        destination: '/products/plywood-boxes/ispm15-certified',
        permanent: true,
      },
      {
        source: '/products/protective-materials/vci-paper',
        destination: '/products/packaging-materials/vci-paper',
        permanent: true,
      },
      {
        source: '/products/protective-materials/vci-film',
        destination: '/products/packaging-laminates/vci-film',
        permanent: true,
      },
      {
        source: '/products/protective-materials/silica-gel',
        destination: '/products/packaging-materials/silica-gel',
        permanent: true,
      },
      {
        source: '/products/protective-materials/aluminum-foil',
        destination: '/products/packaging-laminates/aluminum-foil',
        permanent: true,
      },
      {
        source: '/products/protective-materials/rust-preventive-spray',
        destination: '/products/packaging-materials/rust-preventive-spray',
        permanent: true,
      },
      {
        source: '/products/vacuum-wrapping/vacuum-packaging',
        destination: '/vacuum-packing',
        permanent: true,
      },
      {
        source: '/products/vacuum-wrapping/shrink-wrapping',
        destination: '/shrink-wrapping',
        permanent: true,
      },
      {
        source: '/products/vacuum-wrapping/stretch-wrapping',
        destination: '/stretch-wrapping',
        permanent: true,
      },
      {
        source: '/products/corrugated-cargo-securing/corrugated-boxes',
        destination: '/corrugated-boxes',
        permanent: true,
      },
      {
        source: '/products/corrugated-cargo-securing/dunnage-bags',
        destination: '/dunnage-bags',
        permanent: true,
      },
      {
        source: '/products/corrugated-cargo-securing/ratchet-belts',
        destination: '/products/lashing-materials/ratchet-belt',
        permanent: true,
      },
      {
        source: '/products/corrugated-cargo-securing/container-lashing',
        destination: '/container-lashing',
        permanent: true,
      },
    ]
  },
};


export default nextConfig;
