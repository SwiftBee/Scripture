
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../src/components/header.jsx';
reactComponents['Header'] = Component0;

import Component1 from '../src/components/modal.jsx';
reactComponents['Modal'] = Component1;

import Component2 from '../src/components/progressLoader.jsx';
reactComponents['ProgressLoader'] = Component2;