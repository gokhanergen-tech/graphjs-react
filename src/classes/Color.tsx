import { ColorInterface } from '../interfaces/ColorInterface'

export class Color implements ColorInterface {
  // Properties
  red: number = 0
  green: number = 0
  blue: number = 0
  alpha: number = 1

  public defineHeximalColor(colorString: string): void {
    const isColor = RegExp(/^#(?:[0-9a-fA-F]{3}){1,2}$/).test(colorString)
    if (!isColor)
      throw new Error('Your color string format must be like this: #FFFFFF')

    Math.floor(1)

    colorString = colorString.replace('#', '')
    if (colorString.length === 3) {
      const stringArray = colorString.split('')
      this.red = parseInt(stringArray[0].padStart(2, stringArray[0]), 16)
      this.green = parseInt(stringArray[1].padStart(2, stringArray[1]), 16)
      this.blue = parseInt(stringArray[2].padStart(2, stringArray[2]), 16)
    } else {
      this.red = parseInt(colorString.slice(0, 2), 16)
      this.green = parseInt(colorString.slice(2, 4), 16)
      this.blue = parseInt(colorString.slice(4, 6), 16)
    }
  }

  public defineRGBColor(colorString: string): void {
    /* eslint-disable no-useless-escape */
    const isColor = RegExp(
      /rgba?\((?<r>[.\d]+)[, ]+(?<g>[.\d]+)[, ]+(?<b>[.\d]+)(?:\s?[,\/]\s?(?<a>[.\d]+%?))?\)/
    ).test(colorString)
    if (!isColor)
      throw new Error(
        'Your color string format must be like this: rgba(0,0,0,1) or rgb(0,0,0)'
      )

    colorString = colorString.trim()
    colorString = colorString.replace('rgb(', '')
    colorString = colorString.replace(')', '')
    const stringArray = colorString.split(',')
    this.red = parseInt(stringArray[0])
    this.green = parseInt(stringArray[1])
    this.blue = parseInt(stringArray[2])
    if (stringArray[3]) {
      this.alpha = parseInt(stringArray[3])
    }
  }

  public lighter(level: number): void {
    this.red += level
    this.green += level
    this.blue += level
  }

  get(): string {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
  }
}
