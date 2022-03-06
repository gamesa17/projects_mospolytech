export class GenericObject {
  static keys<KeysType extends PropertyKey, ValuesType = unknown>(obj: { [T in KeysType]?: ValuesType }): KeysType[] {
    return Object.keys(obj) as KeysType[];
  }
}
