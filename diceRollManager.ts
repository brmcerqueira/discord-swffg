export module diceRollManager {
    export type RollInput = {
        skill: number,
        proficiency: number,
        enlargement: number,
        difficulty: number,
        challenge: number,
        setback: number
    }

    export type RollResult = {
        success: number,
        advantage: number,
        triumph: number,
        failure: number,
        threat: number,
        despair: number
    }

    export type ForceDiceResult ={
        value: number,
        light: boolean
    }

    export function roll(input: RollInput): RollResult {
        let result = {
            success: 0,
            advantage: 0,
            triumph: 0,
            failure: 0,
            threat: 0,
            despair: 0
        };

        return result;
    }

    function throwDice(sides: number): number {
        return Math.floor((Math.random() * sides) + 1);
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

    function throwEnlargementDice(result: RollResult): void {
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

    function throwSetbackDice(result: RollResult): void {
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

    function throwSkillDice(result: RollResult): void {
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

    function throwDifficultyDice(result: RollResult): void {
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
    
    function throwProficiencyDice(result: RollResult): void {
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
                result.triumph += 1;
                break;                                                                       
        }
    }

    function throwChallengeDice(result: RollResult): void {
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
                result.despair += 1;
                break;                                                                       
        }
    } 
}