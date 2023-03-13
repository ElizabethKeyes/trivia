import { appState } from "../AppState.js"


export class Question {
  constructor(data) {
    this.category = data.category
    this.type = data.type
    this.difficulty = data.difficulty
    this.question = data.question
    this.correctAnswer = data.correct_answer
    this.incorrectAnswers = data.incorrect_answers
    this.allAnswers = null
  }

  get QuizTemplate() {
    return `
    <div class="my-card elevation-3">
    <h3>${this.question}</h3>
    <ul>
      <li class="selectable" onclick="app.questionsController.checkAnswer('${this.allAnswers[0]}')">${this.allAnswers[0]}</li>
      <li class="selectable" onclick="app.questionsController.checkAnswer('${this.allAnswers[1]}')">${this.allAnswers[1]}</li>
      <li class="selectable" onclick="app.questionsController.checkAnswer('${this.allAnswers[2]}')">${this.allAnswers[2]}</li>
      <li class="selectable" onclick="app.questionsController.checkAnswer('${this.allAnswers[3]}')">${this.allAnswers[3]}</li>
    </ul>
  </div>`
  }

  get BoolTemplate() {
    return `
    <div class="my-card elevation-3">
    <h3>${this.question}</h3>
    <ul>
      <li class="selectable" onclick="app.questionsController.checkAnswer('True')">True</li>
      <li class="selectable" onclick="app.questionsController.checkAnswer('False')">False</li>
    </ul>
  </div>`
  }
}
