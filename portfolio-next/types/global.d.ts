declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css';

/* Ambient declarations to satisfy TS in this scaffolded workspace */
declare module 'next/link' {
  const Link: any;
  export default Link;
}

declare module 'next/navigation' {
  export function notFound(): never;
}

/* Minimal JSX namespace to avoid missing IntrinsicElements when React types are not installed */
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}