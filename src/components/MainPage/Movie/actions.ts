export const setFilters = (filters: any): object => {
	return {
		type: 'SET_FILTERS',
		payload: {
			filters
		}
	};
};
