/* 
  Tasks to be completed:
  1. Google docs list out projects and tasks
  2. Google sheets with details of employees + tasks
  3. Google calendar add tasks into indi employee schedule
*/

function createQuiz() {
    var quiz = askGemini("Create a quiz about the user's profile")
    Logger.log(quiz)
    return quiz
}