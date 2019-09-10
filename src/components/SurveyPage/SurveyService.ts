export const transformAnswers = (answers, userId) => {
	return answers.map(answer => {
		return answer.options.length > 0
			? answer.options.map(option => ({
					questionId: answer.questionId,
					optionId: option.id,
					value: answer.value,
					userId
			  }))
			: {
					questionId: answer.questionId,
					optionId: '',
					value: answer.value,
					userId
			  };
	});
};
