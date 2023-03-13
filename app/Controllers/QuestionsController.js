import { appState } from "../AppState.js";
import { questionsService } from "../Services/QuestionsService.js"
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawQuestion() {
  questionsService.shuffleAnswers()
  console.log(appState.randomQuestion, 'random question');
  setHTML('question', appState.randomQuestion.QuizTemplate)
}

export class QuestionsController {
  constructor() {
    this.fetchQuestions()
    // appState.on('questions', _drawQuestions)
    appState.on('randomQuestion', _drawQuestion)
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

}