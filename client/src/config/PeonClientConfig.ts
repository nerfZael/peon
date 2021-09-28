export class PeonClientConfig {
  clientPrivateKey: string;

  constructor() {
    this.clientPrivateKey = process.env.CLIENT_PRIVATE_KEY ?? "";
  }
}
