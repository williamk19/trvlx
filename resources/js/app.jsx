import './bootstrap';
import '../css/app.css';

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
  progress: {
    includeCSS: false,
    color: '#3464a8'
  },
  title: (title) => ` ${appName} - ${title}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob("./Pages/**/*.jsx")
    ),
  setup({ el, App, props }) {
    return render(<App {...props} />, el);
  },
});
