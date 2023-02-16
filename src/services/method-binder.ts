type Bindable = Record<PropertyKey, CallableFunction>

interface PropertyBinding {
  prototype: object,
  key: PropertyKey,
}

export class MethodBinder {

  bind(bindable: object): void {
    const properties = this.getAllProperties(bindable.constructor.prototype)
    properties.forEach(propertyBinding => this.bindProperty(bindable as unknown as Bindable, propertyBinding))
  }

  private bindProperty(bindable: Bindable, propertyBinding: PropertyBinding): void {
    if (!this.isBindableMethodProperty(propertyBinding)) {
      return
    }

    bindable[propertyBinding.key] = bindable[propertyBinding.key].bind(bindable)
  }

  private isBindableMethodProperty(propertyBinding: PropertyBinding): boolean {
    return !this.isConstructorProperty(propertyBinding) && this.isCallableProperty(propertyBinding)
  }

  private isConstructorProperty({ key }: PropertyBinding): boolean {
    return key === 'constructor'
  }

  private isCallableProperty({ prototype, key }: PropertyBinding): boolean {
    const descriptor = Reflect.getOwnPropertyDescriptor(prototype, key)
    return descriptor !== undefined && typeof descriptor.value === 'function'
  }

  private getAllProperties(prototype: object | null): Set<PropertyBinding> {
    return this.getAllPropertiesRecursively(prototype, new Set())
  }

  private getAllPropertiesRecursively(prototype: object | null, properties: Set<PropertyBinding>): Set<PropertyBinding> {
    if (!prototype || prototype === Object.prototype) {
      return properties
    }

    this.getPrototypePropertyBindings(prototype).forEach(property => properties.add(property))

    const parentPrototype = Reflect.getPrototypeOf(prototype)
    return this.getAllPropertiesRecursively(parentPrototype, properties)
  }

  private getPrototypePropertyBindings(prototype: object): PropertyBinding[] {
    return Reflect.ownKeys(prototype).map(key => ({ prototype, key }))
  }

}
