const APP_STATE = 'APP_STATE';
let initState = {
	userName: 'Xuzhuoshuai'
}
export default function appSetting(state = initState, action) {
	switch (action.type) {
		case APP_STATE:
			return {...state, id: 'aaaaa'};
		default:
			return state;
	}
}




