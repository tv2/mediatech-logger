import { LogLevel } from "./log-level";

export type Log = {
    level: LogLevel
    data: any
    timestamp?: number
    [key: string]: any
}