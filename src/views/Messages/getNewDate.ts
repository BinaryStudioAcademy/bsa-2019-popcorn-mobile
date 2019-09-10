import moment from 'moment';

export const getNewDate = (date: any) => {
	const beforeYesterday = moment()
		.add(-2, 'day')
		.endOf('day');
	const yesterday = moment()
		.add(-1, 'day')
		.endOf('day');

	let newDate = '';
	if (moment(date) > yesterday) {
		newDate = 'Today';
	} else if (moment(date) < yesterday && moment(date) > beforeYesterday) {
		newDate = 'Yesterday';
	} else {
		newDate = moment(date)
			.utc()
			.format('D MMMM');
	}
	return newDate;
};
