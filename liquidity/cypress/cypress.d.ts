import { mount } from 'cypress/react';
import { ethers } from 'ethers';

interface MockProvider {
  setMockResponse(method: string, params: any[], response: any);
}

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      connectWallet: (namespace?: string) => Promise<ethers.Wallet>;
      mockBlockchain: () => Promise<MockProvider>;
    }
  }
}
