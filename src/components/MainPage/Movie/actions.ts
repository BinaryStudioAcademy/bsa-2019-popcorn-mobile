export const setFilters = (filters: any): object => {
	console.log('from actions');
	console.log(filters);
	return {
		type: 'SET_FILTERS',
		payload: {
			filters
		}
	};
};
