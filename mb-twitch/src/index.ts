import Container from '@kingga/kc-container';

import { providers } from './providers';

const container = new Container();

for (const provider of providers) {
  provider.register(container);
}

for (const provider of providers) {
  provider.boot(container);
}
