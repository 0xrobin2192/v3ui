import { ChakraProvider } from '@chakra-ui/react';
import '@cypress/code-coverage/support';

import { theme } from '@synthetixio/v3-theme';
import { mount } from 'cypress/react18';
import { MemoryRouter } from 'react-router-dom';

import { ethers } from 'ethers';

import * as useBlockchain from '@snx-v3/useBlockchain';

function Container(props) {

  return (
    <ChakraProvider theme={theme}>
      <MemoryRouter>
        <div id="app" {...props} />
      </MemoryRouter>
    </ChakraProvider>
  );
}

Cypress.Commands.add('mount', (el) => mount(<Container>{el}</Container>));

export class MockProvider extends ethers.providers.JsonRpcProvider {
  //private mockResponses: Record<string, any> = {};

  constructor() {
    super();
    this.mockResponses = {};
  }

  setMockResponse(method, params, response) {
    const key = this.getKey(method, params);
    this.mockResponses[key] = response;
  }

  async send(method, params) {
    cy.log('ethrpc', method, params);
    const key = this.getKey(method, params);
    if (this.mockResponses.hasOwnProperty(key)) {
      return this.mockResponses[key];
    }
    throw new Error(`No mock response set for method: ${method} with params: ${JSON.stringify(params)}`);
  }

  getKey(method, params) {
    return `${method}:${JSON.stringify(params)}`;
  }
}