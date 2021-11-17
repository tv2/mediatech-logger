export enum Environment {
  Production = 'production',
  Stage      = 'stage',
  Develop    = 'develop',
  Local      = 'local',
}

export const environment = (() =>{ 
  const NODE_ENV = process.env.NODE_ENV || 'local'
  switch (NODE_ENV.toLowerCase()) {
    case 'production': return Environment.Production
    case 'stage': return Environment.Stage
    case 'develop': return Environment.Develop
    default: return Environment.Local
  }
})()

export const isProduction = environment === Environment.Production
export const isStage      = environment === Environment.Stage
export const isDevelop    = environment === Environment.Develop
export const isLocal      = environment === Environment.Local