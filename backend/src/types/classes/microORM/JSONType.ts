import { Type, Utils } from '@mikro-orm/core'

export class JsonType extends Type<unknown, string | null> {
  convertToDatabaseValue (value: unknown): string | null {
    if (value === null) {
      return value
    }

    return JSON.stringify(value)
  }

  convertToJSValue (value: string | unknown): unknown {
    if (Utils.isString(value)) {
      return JSON.parse(value)
    }

    return value
  }
}
