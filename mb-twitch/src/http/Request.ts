export interface Message {
  channel: string;
  data: any;
}

export default class Request<T = any> {
  private req: Message;

  public constructor(request: Message) {
    this.req = request;
  }

  public channel(): string {
    return this.req.channel;
  }

  public data(): T {
    return this.req.data;
  }
}
