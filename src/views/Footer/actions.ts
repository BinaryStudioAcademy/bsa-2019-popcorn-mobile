import { HIDE_FOOTER, SHOW_FOOTER } from './actionTypes';

export const hideFooter = () => {
	return {
		type: HIDE_FOOTER 
	};
};

export const showFooter = () => {
    return {
        type: SHOW_FOOTER
    }
};