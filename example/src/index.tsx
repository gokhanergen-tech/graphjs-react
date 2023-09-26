import App from './App'
import { createRoot } from 'react-dom/client'
import React from 'react'

import 'graphjs-react/index.css'

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
        <App />
);
