import { appState } from "../AppState.js";
import { questionsService } from "../Services/QuestionsService.js"
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML, setText } from "../Utils/Writer.js";

function _drawQuestion() {
  if (appState.randomQuestion.type == "multiple") {
    questionsService.shuffleAnswers()
    console.log(appState.randomQuestion, 'random multiple choice question');
    setHTML('question', appState.randomQuestion.QuizTemplate)
  } else if (appState.randomQuestion.type == "boolean") {
    console.log(appState.randomQuestion, 'random bool question');
    setHTML('question', appState.randomQuestion.BoolTemplate)
  }
}

function _drawScore() {
  setText('score', appState.score)
}

export class QuestionsController {
  constructor() {
    // this.fetchQuestions()
    appState.on('randomQuestion', _drawQuestion)
    appState.on('score', _drawScore)
    appState.on('category', this.fetchQuestions)
    appState.on('questions', this.chooseQuestion)
  }

  async fetchQuestions() {
    try {
      await questionsService.fetchQuestions()
    } catch (error) {
      console.log(error);
      Pop.error(error);
    }
  }

  chooseQuestion() {
    questionsService.chooseQuestion()
  }

  checkAnswer(answer) {
    questionsService.checkAnswer(answer)
  }

  resetScore() {
    questionsService.resetScore()
  }

  chooseCategory() {
    window.event.preventDefault()
    let form = window.event.target
    // @ts-ignore
    let category = form.category.value
    questionsService.chooseCategory(category)
    Pop.toast('Category changed!', 'success', 'center', 1500)
  }

}