declare module 'dom-to-image' {
  interface Options {
    quality?: number;
    width?: number;
    height?: number;
    style?: Record<string, string | number>;
    bgcolor?: string;
    imagePlaceholder?: string;
    cacheBust?: boolean;
    filter?: (node: Node) => boolean;
  }

  interface DomToImage {
    toPng(node: HTMLElement, options?: Options): Promise<string>;
    toJpeg(node: HTMLElement, options?: Options): Promise<string>;
    toBlob(node: HTMLElement, options?: Options): Promise<Blob>;
    toPixelData(node: HTMLElement, options?: Options): Promise<Uint8ClampedArray>;
    toSvg(node: HTMLElement, options?: Options): Promise<string>;
  }

  const domtoimage: DomToImage;
  export default domtoimage;
}

