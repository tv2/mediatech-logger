export enum Environment {
  Production,
  Staging ,
  Development,
  Local,
}

export const environment = (() =>{ 
  const NODE_ENV = process.env.NODE_ENV || 'local'
  switch (NODE_ENV.toLowerCase()) {
    case 'production': return Environment.Production
    case 'stage':
    case 'staging': return Environment.Staging
    case 'develop':
    case 'development': return Environment.Development
    default: return Environment.Local
  }
})

export function isProduction(): boolean {
  return environment() === Environment.Production
}
export function isStaging(): boolean {
  return environment() === Environment.Staging
}
export function isDevelopment(): boolean {
  return environment() === Environment.Development 
}
export function isLocal(): boolean {
  return environment() === Environment.Local
}