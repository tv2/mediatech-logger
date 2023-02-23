import { Vault, VaultOptions } from '../../../vault'
import { Level } from '../../../level'
import { Format } from '../../../format'
import { Log } from '../../../log'

export interface WebSocketVaultOptions extends VaultOptions {
  level: Level,
  format: Format,
  url: string,
  protocol: 'ws'
}

const RECONNECT_INTERVAL = 3000

export class WebSocketVault extends Vault {

  private readonly url: string
  private webSocket: WebSocket

  constructor(options: WebSocketVaultOptions) {
    super(options)
    this.url = options.url
    this.webSocket = this.setupWebSocket(this.url)
  }

  private setupWebSocket(url: string): WebSocket {
    const webSocket = new WebSocket(url)
    webSocket.onclose = (): void => {
      setTimeout(this.reconnect.bind(this), Number(RECONNECT_INTERVAL))
    }
    return webSocket
  }

  private reconnect(): void {
    this.webSocket.close()
    this.webSocket = this.setupWebSocket(this.url)
  }

  store(log: Log): void {
    if (!this.shouldStore(log)) {
      return
    }
    const formattedLog = this.format.apply(log)
    this.webSocket.send(formattedLog)
  }

  protected shouldStore(log: Log): boolean {
    if (this.webSocket.readyState !== this.webSocket.OPEN) {
      return false
    }
    return super.shouldStore(log)
  }

}
