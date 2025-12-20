// src/lib/seoData.ts

// Subjects
export const validSubjects = [
    "math",
    "science",
    "physics",
    "chemistry",
    "biology",
    "english",
    "hindi",
    "computer-science",
] as const;
export type Subject = (typeof validSubjects)[number];
export const validSubjectsSet = new Set(validSubjects);

// Boards
export const validBoards = ["cbse", "icse", "state"] as const;
export type Board = (typeof validBoards)[number];
export const validBoardsSet = new Set(validBoards);

// Cities
export const validCities = [
    "bangalore",
    "whitefield",
    "indiranagar",
    "koramangala",
    "hsr-layout",
    "bellandur",
] as const;
export type City = (typeof validCities)[number];
export const validCitiesSet = new Set(validCities);

// Mode
export const validModes = ["online", "offline"] as const;
export type Mode = (typeof validModes)[number];
export const validModesSet = new Set(validModes);

// Type guards
export const isValidSubject = (s: string): s is Subject =>
    validSubjectsSet.has(s as Subject);
export const isValidBoard = (b: string): b is Board =>
    validBoardsSet.has(b as Board);
export const isValidCity = (c: string): c is City =>
    validCitiesSet.has(c as City);
export const isValidMode = (m: string): m is Mode =>
    validModesSet.has(m as Mode);
export const isValidGrade = (
    g: string
): g is `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12}` => {
    const num = Number(g);
    return !isNaN(num) && num >= 1 && num <= 12;
};
