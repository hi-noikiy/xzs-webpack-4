import {CLOSE_ALL_MODAL, CLOSE_MODAL, OPEN_MODAL} from '@/redux/const';

function getInitState() {
	return {}
}

export default function modal(state = getInitState(), action) {
	switch (action.type) {
		case OPEN_MODAL:
			return {...action};
		case CLOSE_MODAL:
			return {...action};
		case CLOSE_ALL_MODAL:
			return {...action};
		default:
			return state;
	}
}

