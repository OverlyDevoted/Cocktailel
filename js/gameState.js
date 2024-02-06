export class GameState {
    constructor(idx, answers, onWin, ...args) {
        if (GameState.instance)
            return GameState.instance;
        else
            GameState.instance = this;
        this.data = localStorage.getItem("save");
        //if data exists 
        //get the last day
        //check if the last day is today
        //setup variables accodingly, so that inputs can then later retrieve data
        //otherwise make them empty
        if (this.data) {
            // console.log("not empty", JSON.parse(this.data))
            this.data = JSON.parse(this.data);
            this.isLastToday = false;
            this.today = { idx: idx, answers: new Array(answers).fill("") }
            if (this.data.idx == idx) {
                this.today = this.data;
            }
        }
        else {
            // console.log("empty");
            this.today = { idx: idx, answers: new Array(answers).fill("") }
            this.data = this.today;
        }
        this.addOnWin(onWin, ...args)
        this.checkWin();
    }
    saveAnswer(idx, answer) {
        // console.log(idx, answer)
        this.today.answers[idx] = answer;
        this.data = this.today;
        localStorage.setItem("save", JSON.stringify(this.data));
        this.checkWin();
        // console.log(JSON.parse(localStorage.getItem("save")))
    }
    checkWin() {
        if (!this.today.answers.some(val => val === "")) {
            this.onWin();
            console.log("ON WIN", this.onWin);
        }
    }
    addOnWin(callback, ...args) {
        this.onWin = callback(...args);
    }
}