import { Environment } from '../environment'
import { Format } from '../format'
import { JsonFormat } from '../formats/json.format'
import { LoggerBase } from '../logger-base'
import { Level } from '../level'
import { Vault } from '../vault'
import { ColoredPlainTextFormat } from '../formats/colored-plain-text.format'

export class EnvironmentLogger extends LoggerBase {

  private readonly environment: Environment
  private level: Level

  constructor(vaults: Vault[], environment: Environment, level: Level) {
    super(vaults)

    this.environment = environment
    this.level = level

    this.applyEnvironment()
  }

  private applyEnvironment(): void {
    this.setEnvironment(this.environment)
    this.setLevel(this.level)
  }

  public setLevel = (level: Level): void => {
    this.level = level
    super.setLevel(level)
  }

  private setEnvironment(environment: Environment): void {
    const format = this.getEnvironmentFormat(environment)
    this.vaults.forEach(vault => vault.setFormat(format))
  }

  protected getEnvironmentFormat(environment: Environment): Format {
    switch (environment) {
    case Environment.PRODUCTION:
    case Environment.STAGING:
      return new JsonFormat({ isPretty: false })
    case Environment.DEVELOPMENT:
    case Environment.LOCAL:
      return new ColoredPlainTextFormat()
    }
  }

}


