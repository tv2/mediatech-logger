import { Environment, environment, isLocal, isProduction } from "../../src/environment";


describe('Test environment', () => {
  const ENV = process.env;

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...ENV }
  });

  afterAll(() => {
    process.env = ENV
  });

  test('Test env prod', () => {
    process.env.NODE_ENV = 'production'
    expect(isProduction()).toBeTruthy()
  });

  test('Test env stage', () => {
    process.env.NODE_ENV = 'stage'
    expect(environment()).toEqual(Environment.Staging)
  });

  test('Test env develop', () => {
    process.env.NODE_ENV = 'develop'
    expect(environment()).toEqual(Environment.Development)
  });

  test('Test env undefined', () => {
    process.env.NODE_ENV = undefined
    expect(environment()).toEqual(Environment.Local)
  });

  test('Test env staging', () => {
    process.env.NODE_ENV = 'staging'
    expect(environment()).toEqual(Environment.Staging)
  });

  test('Test env development', () => {
    process.env.NODE_ENV = 'development'
    expect(environment()).toEqual(Environment.Development)
  });

  test('Test env local', () => {
    process.env.NODE_ENV = 'local'
    expect(isLocal()).toBeTruthy()
  });
})