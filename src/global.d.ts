// global.d.ts
interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request?: (...args: any[]) => Promise<any>;
      on?: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
  declare module "ethereum-blockies" {
    interface BlockiesOptions {
      seed: string; // A seed for generating the avatar, typically a wallet address
      size?: number; // Number of pixels for the width/height of the avatar
      scale?: number; // Scale factor for rendering
      color?: string; // Optional custom color
      bgcolor?: string; // Background color
      spotcolor?: string; // Color of the spots
    }
  
    interface Blockies {
      create: (options: BlockiesOptions) => HTMLCanvasElement;
    }
  
    const blockies: Blockies;
    export default blockies;
  }
  