/**
 *  @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  /* experimental: {
     appDir: true,
     serverExternalPackages: ["mongoose"],
   }, */
   images: {
     domains: ['rrfluqecctrhzkcxpsbt.supabase.co',
     'ik.imagekit.io'],

   },
   productionBrowserSourceMaps: false,
 }
 
export default nextConfig;
