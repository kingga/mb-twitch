import EnvProvider from './EnvProvider';
import HttpProvider from './HttpProvider';
import ProviderInterface from './ProviderInterface';
import WebSocketProvider from './WebSocketProvider';

const providers: ProviderInterface[] = [
  new EnvProvider(),
  new HttpProvider(),
  new WebSocketProvider(),
];

export { providers };
