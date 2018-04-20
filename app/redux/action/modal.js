import {CLOSE_ALL_MODAL, CLOSE_MODAL, OPEN_MODAL} from '@/redux/const';

export function openModal({modalType, builtProps}) {
	return {
		type: OPEN_MODAL,
		modalType,
		builtProps
	}
}

export function closeModal(force = false) {
	return {
		type: CLOSE_MODAL,
		force
	}
}

export function closeAllModal() {
	return {
		type: CLOSE_ALL_MODAL
	}
}