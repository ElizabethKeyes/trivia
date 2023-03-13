import { appState } from "../AppState.js";
import { Question } from "../Models/Question.js";
import { Pop } from "../Utils/Pop.js";


class QuestionsService {

  async fetchQuestions() {
    // @ts-ignore
    let response = await axios.get(`https://opentdb.com/api.php?amount=50&category=${appState.category}`)
    appState.questions = response.data.results.map(q => new Question(q))
  }

  chooseQuestion() {
    console.log('choosing question');
    let randomIndex = Math.floor(Math.random() * appState.questions.length)
    appState.randomQuestion = appState.questions[randomIndex]
  }

  shuffleAnswers() {
    let answers = []
    answers.push(appState.randomQuestion.correctAnswer)
    for (let i = 0; i < appState.randomQuestion.incorrectAnswers.length; i++) {
      answers.push(appState.randomQuestion.incorrectAnswers[i])
    }
    answers.sort()
    appState.randomQuestion.allAnswers = answers
  }

  checkAnswer(answer) {
    console.log('checking answer in the services', answer);
    if (answer == appState.randomQuestion.correctAnswer) {
      Pop.toast('Correct!', 'success', 'top', 1500)
      appState.score += 1
      this.chooseQuestion()
    } else {
      Pop.toast('Try again!', 'error', 'top', 1500)
    }
  }

  resetScore() {
    appState.score = 0
  }

  chooseCategory(category) {
    console.log(category);
    appState.category = category;
  }

}

export const questionsService = new QuestionsService()