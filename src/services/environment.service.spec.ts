import { EnvironmentService } from './environment.service'
import { Environment } from '../environment'
import { Level } from '../level'

describe('EnvironmentService', () => {

    describe('sanitizeEnvironment', () => {

        testSanitizeEnvironment('production', Environment.PRODUCTION)
        testSanitizeEnvironment('prod', Environment.PRODUCTION)
        testSanitizeEnvironment('staging', Environment.STAGING)
        testSanitizeEnvironment('stage', Environment.STAGING)
        testSanitizeEnvironment('development', Environment.DEVELOPMENT)
        testSanitizeEnvironment('dev', Environment.DEVELOPMENT)
        testSanitizeEnvironment('local', Environment.LOCAL)
        testSanitizeEnvironment('some unknown', Environment.LOCAL)

    })

    describe('sanitizeLevel', () => {

        testSanitizeLevel('error', Level.ERROR, Level.TRACE)
        testSanitizeLevel('warn', Level.WARN, Level.TRACE)
        testSanitizeLevel('info', Level.INFO, Level.TRACE)
        testSanitizeLevel('debug', Level.DEBUG, Level.TRACE)
        testSanitizeLevel('trace', Level.TRACE, Level.ERROR)

        testSanitizeLevel('some unknown', Level.ERROR, Level.ERROR)
        testSanitizeLevel('some unknown', Level.WARN, Level.WARN)
        testSanitizeLevel('some unknown', Level.INFO, Level.INFO)
        testSanitizeLevel('some unknown', Level.DEBUG, Level.DEBUG)
        testSanitizeLevel('some unknown', Level.TRACE, Level.TRACE)

    })

    describe('getEnvironmentLevel', () => {

        testGetEnvironmentLevel(Environment.PRODUCTION, Level.WARN)
        testGetEnvironmentLevel(Environment.STAGING, Level.INFO)
        testGetEnvironmentLevel(Environment.DEVELOPMENT, Level.DEBUG)
        testGetEnvironmentLevel(Environment.LOCAL, Level.TRACE)

    })

})

function createEnvironmentService(): EnvironmentService {
    return new EnvironmentService()
}

function testSanitizeEnvironment(rawEnvironment: string, expectedEnvironment: Environment): void {
    const rawEnvironmentUppercase = rawEnvironment.toUpperCase()

    it(`returns ${ expectedEnvironment } environment for "${ rawEnvironment }"`, () => {
        const service = createEnvironmentService()

        const environment = service.sanitizeEnvironment(rawEnvironment)
        expect(environment).toBe(expectedEnvironment)

    })

    it(`returns ${ rawEnvironmentUppercase } environment for "${ rawEnvironment }"`, () => {
        const service = createEnvironmentService()

        const environment = service.sanitizeEnvironment(rawEnvironmentUppercase)
        expect(environment).toBe(expectedEnvironment)

    })

}

function testSanitizeLevel(rawLevel: string, expectedLevel: Level, fallbackLevel: Level): void {
    const rawLevelUppercase = rawLevel.toUpperCase()

    it(`returns ${ expectedLevel } level for "${ rawLevel }"`, () => {
        const service = createEnvironmentService()

        const environment = service.sanitizeLevel(rawLevel, fallbackLevel)
        expect(environment).toBe(expectedLevel)

    })

    it(`returns ${ rawLevelUppercase } for "${ rawLevel }"`, () => {
        const service = createEnvironmentService()

        const environment = service.sanitizeLevel(rawLevelUppercase, fallbackLevel)
        expect(environment).toBe(expectedLevel)

    })

}

function testGetEnvironmentLevel(environment: Environment, expectedLevel: Level): void {

    it(`returns ${ expectedLevel } level when in ${ environment } environment`, () => {

        const service = createEnvironmentService()

        const level = service.getEnvironmentLevel(environment)
        expect(level).toBe(expectedLevel)

    })

}
