// Import the bootstrap function from the 'bootstrap.js' file
import { bootstrap } from './bootstrap.js';

// Define a custom element 'pds-calculator' using the Custom Elements API
customElements.define('pds-calculator', class extends HTMLElement {

  async connectedCallback() {

    // Create a shadow DOM for encapsulation
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Fetch <pds-calculator> attributes
    // to pass as properties for App.vue

    const attributes = {
      'apiUrl': this.getAttribute('apiUrl'),
    }

    // Bootstrap the Vue.js application within the shadow DOM
    bootstrap(shadowRoot, attributes);
  }
});
