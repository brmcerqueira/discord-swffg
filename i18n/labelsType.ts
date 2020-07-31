export type DicePoolType = {
    name: string,
    description: string,
}

export type LabelsType = {
    welcome: string,
    player: string,
    value: string,
    skill: string,
    proficiency: string,
    enlargement: string,
    difficulty: string,
    challenge: string,
    setback: string,
    lightForceLabel: string,
    darkForceLabel: string,
    percentageLabel: string,
    rollActionParse: {
        textType: string,
        success: string,
        advantage: string,
        triumph: string,
        failure: string,
        threat: string,
        despair: string,
        noContent: string
    }
}