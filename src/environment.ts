export enum Environment {
  Production,
  Stage ,
  Development,
  Local,
}

export const environment = (() =>{ 
  const NODE_ENV = process.env.NODE_ENV || 'local'
  switch (NODE_ENV.toLowerCase()) {
    case 'production': return Environment.Production
    case 'stage': return Environment.Stage
    case 'development': return Environment.Development
    default: return Environment.Local
  }
})()

export const isProduction  = environment === Environment.Production
export const isStage       = environment === Environment.Stage
export const isDevelopment = environment === Environment.Development
export const isLocal       = environment === Environment.Local