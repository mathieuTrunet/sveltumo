export type LetterState = 'found' | 'partial' | 'wrong'

export type Progress = { input: string; letterStateList: LetterState[] }
