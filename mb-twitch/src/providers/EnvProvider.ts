import { IContainer } from '@kingga/kc-container';
import { config } from 'dotenv';
import { resolve } from 'path';

import ProviderInterface from './ProviderInterface';

export default class EnvProvider implements ProviderInterface {
  public register(container: IContainer): void {
    config({
      path: resolve(__dirname, "../.env"),
    });
  }

  public boot(container: IContainer): void {
    //
  }
}
