export class AppUser {
    userId: string;
    name: string;
    email: string;
    sex: string;
    photoUrl: string;
    weight: [{
        date: number,
        weightToday: number
    }];
    lastWeightRecord: number;
    height: number;
    birthday: Date;
    completedTrainings: Array<string>;
    goal: string;
    physicalActivity: number;
    isAdmin: boolean;

    constructor(init?: Partial<AppUser>) {
        Object.assign(this, init)
    }

    get age() {
        let today = new Date()
        let birthday = new Date(this.birthday)
        return (today.getUTCFullYear()-birthday.getUTCFullYear())
    }
    
    get BMR() {
        let sexCoef: number;
        sexCoef = (this.sex === "мужской") ? 5 : -161;
        if (this.weight) return Math.round((10*this.lastWeight + 6.25*this.height - 5*this.age + sexCoef)*this.physicalActivity);
        return null;
    }

    get kkalTarget() {
        switch (this.goal) {
            case "gain":
                return this.BMR + 500;
            case "lose":
                return this.BMR - 500;
            case "maintain":
                return this.BMR;
        }
    }
    
    get lastWeight() {
        if (this.weight) return this.weight[this.weight.length-1].weightToday;
        return null;
    }

}