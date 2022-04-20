export const getRandomNumber = (max: number, min = 0): number => {
    return Math.round(Math.random() * (max - min)) + min;
};

export const arrayFromLength = (length: number): Array<string> => {
    return Array.from(new Array(length).keys()).map(() => "");
};

export const getRandomBoolean = (chance = 0.5): boolean =>
    chance > Math.random();

export const countSubstring = (str: string, substr: string): number => {
    return str.split(substr).length - 1;
};
