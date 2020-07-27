export module diceRollManager {
    export type RollInput = {
        skill: number,
        proficiency: number,
        enlargement: number,
        difficulty: number,
        challenge: number,
        setback: number
    }

    export interface PositiveDiceResult {
        success: number,
        advantage: number,
        triumph: number
    }

    export interface NegativeDiceResult {
        failure: number,
        threat: number,
        despair: number
    }

    export type ForceDiceResult = {
        value: number,
        light: boolean
    }

    export interface PositiveRollResult extends PositiveDiceResult {
        amount: number
    }

    export interface NegativeRollResult extends NegativeDiceResult {
        amount: number
    }

    export interface DiceResult extends PositiveDiceResult, NegativeDiceResult {
    }

    export interface RollResult extends DiceResult {
        skill?: PositiveRollResult,
        proficiency?: PositiveRollResult,
        enlargement?: PositiveRollResult,
        difficulty?: NegativeRollResult,
        challenge?: NegativeRollResult,
        setback?: NegativeRollResult
    }

    export function roll(input: RollInput): RollResult {
        let result: RollResult = {
            success: 0,
            advantage: 0,
            triumph: 0,
            failure: 0,
            threat: 0,
            despair: 0
        };

        if (input.skill > 0) {
            result.skill = createPositiveRoll(result, input.skill, throwSkillDice);
        }

        if (input.proficiency > 0) {
            result.proficiency = createPositiveRoll(result, input.proficiency, throwProficiencyDice);
        }

        if (input.enlargement > 0) {
            result.enlargement = createPositiveRoll(result, input.enlargement, throwEnlargementDice);
        }

        if (input.difficulty > 0) {
            result.difficulty = createNegativeRoll(result, input.difficulty, throwDifficultyDice);
        }

        if (input.challenge > 0) {
            result.challenge = createNegativeRoll(result, input.challenge, throwChallengeDice);
        }
        
        if (input.setback > 0) {
            result.setback = createNegativeRoll(result, input.setback, throwSetbackDice);
        }        

        return result;
    }

    function createPositiveRoll(total: DiceResult, amount: number, throwDice: (result: PositiveDiceResult) => void): PositiveRollResult {
        let result: PositiveRollResult = {
            amount: amount,
            success: 0,
            advantage: 0,
            triumph: 0
        }

        for (let index = 0; index < amount; index++) {
            throwDice(result);         
        }

        total.success += result.success;
        total.advantage += result.advantage;
        total.triumph += result.triumph;

        return result;
    }

    function createNegativeRoll(total: DiceResult, amount: number, throwDice: (result: NegativeRollResult) => void): NegativeRollResult {
        let result: NegativeRollResult = {
            amount: amount,
            failure: 0,
            threat: 0,
            despair: 0
        }

        for (let index = 0; index < amount; index++) {
            throwDice(result);         
        }

        total.failure += result.failure;
        total.threat += result.threat;
        total.despair += result.despair;
        total.success -= result.failure;

        return result;
    }

    function throwDice(sides: number): number {
        return Math.floor((Math.random() * sides) + 1);
    }

    export function throwPercentageDice(): number {
        return throwDice(100);
    }

    export function throwForceDice(): ForceDiceResult {
        let result: ForceDiceResult = {
            value: 1,
            light: false
        };

        switch (throwDice(12)) {
            case 7:                                
                result.value = 2;
                break;
            case 8:
            case 9:
                result.light = true;
                break;
            case 10:
            case 11:
            case 12:
                result.value = 2;    
                result.light = true;
                break;                                                                                                                    
        }

        return result;
    } 

    function throwEnlargementDice(result: PositiveDiceResult): void {
        switch (throwDice(6)) {
            case 3:
                result.success += 1;
                break;
            case 4:
                result.success += 1;
                result.advantage += 1;
                break; 
            case 5:
                result.advantage += 2;
                break;
            case 6:
                result.advantage += 1;
                break;                                         
        }
    }

    function throwSetbackDice(result: NegativeDiceResult): void {
        switch (throwDice(6)) {
            case 3:
            case 4:
                result.failure += 1;
                break; 
            case 5:
            case 6:
                result.threat += 1;
                break;                                         
        }
    }

    function throwSkillDice(result: PositiveDiceResult): void {
        switch (throwDice(8)) {
            case 2:
            case 3:
                result.success += 1;
                break;
            case 4:
                result.success += 2;
                break;      
            case 5:
            case 6:    
                result.advantage += 1;
                break;
            case 7:
                result.success += 1;
                result.advantage += 1;
                break; 
            case 8:
                result.advantage += 2;
                break;                                                        
        }
    }

    function throwDifficultyDice(result: NegativeDiceResult): void {
        switch (throwDice(8)) {
            case 2:
                result.failure += 1;
                break;
            case 3:
                result.failure += 2;
                break;                
            case 4:     
            case 5:
            case 6:        
                result.threat += 1;
                break;
            case 7:
                result.threat += 2;
                break; 
            case 8:
                result.failure += 1;
                result.threat += 1;
                break;                                                        
        }
    }
    
    function throwProficiencyDice(result: PositiveDiceResult): void {
        switch (throwDice(12)) {
            case 2:
            case 3:
                result.success += 1;
                break;
            case 4:
            case 5:    
                result.success += 2;
                break;
            case 6:    
                result.advantage += 1;
                break;
            case 7:
            case 8:
            case 9:        
                result.success += 1;
                result.advantage += 1;
                break; 
            case 10:
            case 11:    
                result.advantage += 2;
                break;
            case 12: 
                result.success += 1;   
                result.triumph += 1;
                break;                                                                       
        }
    }

    function throwChallengeDice(result: NegativeDiceResult): void {
        switch (throwDice(12)) {
            case 2:
            case 3:
                result.failure += 1;
                break;
            case 4:
            case 5:    
                result.failure += 2;
                break;
            case 6:
            case 7:        
                result.threat += 1;
                break;
            case 8:
            case 9:        
                result.failure += 1;
                result.threat += 1;
                break; 
            case 10:
            case 11:    
                result.threat += 2;
                break;
            case 12: 
                result.failure += 1;   
                result.despair += 1;
                break;                                                                       
        }
    } 
}