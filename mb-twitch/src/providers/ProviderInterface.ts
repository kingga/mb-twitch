import { IContainer } from '@kingga/kc-container';

export default interface ProviderInterface {
  /**
   * Register your bindings.
   * @param container The applications container.
   */
  register(container: IContainer): void;

  /**
   * Start your service and access other bindings to the container
   * created in the register method.
   * @param container The applicationss container.
   */
  boot(container: IContainer): void;
}
