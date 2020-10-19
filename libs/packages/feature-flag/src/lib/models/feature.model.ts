export class Feature {
  name: string;
  type: string;
  value: string;

  constructor(
    name: string,
    type: string,
    value: string
  ) {
    this.name = name;
    this.type = type;
    this.value = value;
  }

  static fromJson(json: string) {
    const data = JSON.parse(json);

    if (data.name === undefined
      || data.type === undefined
      || data.value === undefined) {
      return;
    }

    return new Feature(
      data.name,
      data.type,
      data.value
    );
  }
}
