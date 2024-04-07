import { useLayoutStore } from "./pinia/layout";
import { createPinia } from "pinia";

const pinia = createPinia();
export default pinia;

export { useLayoutStore };
