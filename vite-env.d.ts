/// <reference types="vite/client" />
// vite-env.d.ts
interface ImportMetaEnv {
    readonly VITE_PINATA_IPFS_JWT: string, // Add your environment variable name here
    // Add other environment variables here if needed
    readonly VITE_PINATA_IPFS_API_SECERET:string,
    readonly VITE_PINATA_IPFS_API_KEY:string,
    readonly VITE_PINATA_CLOUD_SECERET:string
    readonly VITE_ALCHEMY_KEY:string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  