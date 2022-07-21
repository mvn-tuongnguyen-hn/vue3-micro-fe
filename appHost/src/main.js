import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import "./index.scss";

const Content = defineAsyncComponent(() => import("appRemote/Content"));

const app = createApp(App);

app.component("content-element", Content);

app.mount("#app");
