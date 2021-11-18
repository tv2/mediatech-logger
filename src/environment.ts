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
})()

export const isProduction  = environment === Environment.Production
export const isStaging       = environment === Environment.Staging
export const isDevelopment = environment === Environment.Development
export const isLocal       = environment === Environment.Local