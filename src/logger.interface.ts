export interface ILogger<T> {
    error: (message: any, meta: object) => LoggerOutput<T>,
    warn: (message: any, meta: object) => LoggerOutput<T>,
    info: (message: any, meta: object) => LoggerOutput<T>,
    debug: (message: any, meta: object) => LoggerOutput<T>,
    trace: (message: any, meta: object) => LoggerOutput<T>,
    tag: (tag: string) => ILogger<T>,
    data: (data: any) => ILogger<T>,
}

export type LoggerOutput<T> = void | T | string
