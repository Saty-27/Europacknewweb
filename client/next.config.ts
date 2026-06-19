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
        destination: '/products/wooden-pallets/euro-pallets',
        permanent: true,
      },
      {
        source: '/products/pallet-systems/wooden-pallets',
        destination: '/products/wooden-pallets/euro-pallets',
        permanent: true,
      },
      {
        source: '/products/pallet-systems/cp1-pallets',
        destination: '/products/wooden-pallets/cp1',
        permanent: true,
      },
      {
        source: '/products/pallet-systems/cp2-pallets',
        destination: '/products/wooden-pallets/cp2',
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
        destination: '/products/vacuum-packaging/multilayer-laminated-vci',
        permanent: true,
      },
      {
        source: '/products/vacuum-wrapping/shrink-wrapping',
        destination: '/products/special-services/shrink-wrapping-service',
        permanent: true,
      },
      {
        source: '/products/vacuum-wrapping/stretch-wrapping',
        destination: '/products/stretch-wrapping/pallet-wrapping',
        permanent: true,
      },
      {
        source: '/products/corrugated-cargo-securing/corrugated-boxes',
        destination: '/products/corrugated-cartons/printed-corrugated',
        permanent: true,
      },
      {
        source: '/products/corrugated-cargo-securing/dunnage-bags',
        destination: '/products/dunnage-bag/air-dunnage-bags',
        permanent: true,
      },
      {
        source: '/products/corrugated-cargo-securing/ratchet-belts',
        destination: '/products/lashing-materials/ratchet-belt',
        permanent: true,
      },
      {
        source: '/products/corrugated-cargo-securing/container-lashing',
        destination: '/products/services/onsite-lashing',
        permanent: true,
      },
    ]
  },
};


export default nextConfig;

