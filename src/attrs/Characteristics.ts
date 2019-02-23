import { r } from '../utils/roll';

export interface Characteristics {
    str: number;
    con: number;
    siz: number;
    dex: number;
    app: number;
    int: number;
    pow: number;
    edu: number;
}

export enum InsanityLevel {
    Normal = 0,
    Temporary,
    Indefinite,
    Permanent,
}

export interface Stats extends Characteristics {
    name: string;
    player: string;
    occupation: string;
    sex: string;
    residence: string;
    birthplace: string;
    era: string;
    age: number;
    luck: number;
    hp: number;
    mp: number;
    san: number;
    armor: number;
    dead: boolean;
    dying: boolean;
    majorWound: boolean;
    insanityLevel: InsanityLevel;
}

export type Numeric =
    | keyof Characteristics
    | 'age'
    | 'luck'
    | 'hp'
    | 'mp'
    | 'san'
    | 'armor';

export type Attributes = Pick<Stats, Numeric>

export const characteristics: Array<keyof Characteristics> = [
    'str', 'con', 'siz', 'dex', 'app', 'int', 'pow', 'edu'
];

export const characteristicsSum = (x: Partial<Characteristics>): number => {
    let sum = 0;
    for (let key of characteristics) {
        if (x[key]) {
            const value = x[key];
            if (value) { sum += value };
        }
    }
    return sum;
};

export const autoAttributes = (): Characteristics =>
    ({
        str: 5 * r(3, 6),
        con: 5 * r(3, 6),
        siz: 5 * (r(2, 6) + 6),
        dex: 5 * r(3, 6),
        app: 5 * r(3, 6),
        int: 5 * (r(2, 6) + 6),
        pow: 5 * r(3, 6),
        edu: 5 * (r(2, 6) + 6),
    });

export const rollLuck = (young = false): [number, number] => {
    const a = 5 * r(3, 6);
    const b = 5 * r(3, 6);
    return young && b > a ? [b, a] : [a, b];
};

export const enhance = (attr: number): { check: number, delta: number, attr: number } => {
    const check = r(1, 100);
    let delta = 0;
    if (check > attr) {
        delta = r(1, 10);
        attr = Math.min(99, attr + delta);
    }
    return { check, delta, attr };
};

export const computeDbBuild = ({ str, siz }: Pick<Stats, 'str' | 'siz'>): { db: string, build: number } | null => {
    const sum = str + siz;
    if (sum <= 64 && sum > 1) return { db: '-2', build: -2, };
    else if (sum <= 84) return { db: '-1', build: -1, };
    else if (sum <= 124) return { db: '0', build: 0 };
    else if (sum <= 164) return { db: '+1d4', build: 1 };
    else if (sum <= 204) return { db: '+1d6', build: 2 };
    else if (sum <= 284) return { db: '+2d6', build: 3 };
    else if (sum <= 364) return { db: '+3d6', build: 4 };
    else if (sum <= 444) return { db: '+4d6', build: 5 };
    else if (sum <= 524) return { db: '+5d6', build: 6 };
    else return null;
};

export function computeMov({ dex, age, str, siz }:
    Pick<Attributes, 'age' | 'dex' | 'str' | 'siz'>): number {
    let mov = 0;
    if (dex < siz && str < siz) mov = 7;
    if (dex >= siz || str >= siz) mov = 8;
    if (dex > siz && str > siz) mov = 9;
    if (age >= 80) mov -= 5;
    else if (age >= 70) mov -= 4;
    else if (age >= 60) mov -= 3;
    else if (age >= 50) mov -= 2;
    else if (age >= 40) mov -= 1;
    return mov;
}

export const computeHp = ({ con, siz }: Pick<Characteristics, 'con' | 'siz'>)
    : number => (Math.floor((con + siz) / 10));

export const computeMp = (pow: number): number => (Math.floor(pow / 5));
