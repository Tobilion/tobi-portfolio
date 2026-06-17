interface Window {
  lenis?: import("lenis").default;
}

declare module "*.glb" {
  const src: string;
  export default src;
}