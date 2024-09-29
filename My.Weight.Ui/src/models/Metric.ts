export interface Metric {
    id: number;
    weight: number;
    fat?: number;
    vesicularFat?: number;
    date: string;
    diff: number;
}