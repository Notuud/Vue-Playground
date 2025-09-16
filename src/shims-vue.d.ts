// Type declarations for Vue Single-File Components
// This allows `import Foo from './Foo.vue'` to be typed correctly.
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}
