function createQuiz() {
    var quiz = askGemini("Create a quiz about the user's profile")
    Logger.log(quiz)
    return quiz
}