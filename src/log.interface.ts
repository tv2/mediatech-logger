import { LogLevel } from "./log-level";

export type Log = {
    level: LogLevel
    message: any
    timestamp?: number
    [key: string]: any
}