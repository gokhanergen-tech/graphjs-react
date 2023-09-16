export interface ColorInterface {
    red: Readonly<number>;
    green: Readonly<number>;
    blue: Readonly<number>;
    alpha: number;

    defineHeximalColor(colorString: string): void;
    defineRGBColor(colorString: string): void;
    lighter(level: number): void;
    get(): string;
}