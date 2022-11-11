import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';

const mountingNode = document.querySelector('#app') as Element;
const root = createRoot(mountingNode);
const app = createElement(App);

root.render(app);
