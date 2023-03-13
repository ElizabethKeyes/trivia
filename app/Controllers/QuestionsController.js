import { appState } from "../AppState.js";
import { questionsService } from "../Services/QuestionsService.js"
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawQuestion() {
  console.log(appState.randomQuestion.type, 'type of question');
  if (appState.randomQuestion.type == "multiple") {
    questionsService.shuffleAnswers()
    console.log(appState.randomQuestion, 'random multiple choice question');
    setHTML('question', appState.randomQuestion.QuizTemplate)
  } else if (appState.randomQuestion.type == "boolean") {
    console.log(appState.randomQuestion, 'random bool question');
    setHTML('question', appState.randomQuestion.BoolTemplate)
  }
}

export class QuestionsController {
  constructor() {
    this.fetchQuestions()
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