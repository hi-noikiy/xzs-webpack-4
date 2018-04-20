import ReactDom from 'react-dom';
import React, {PureComponent} from 'react';
import {Redirect, Route, Router, Switch} from 'react-router';
import Login from '@/components/login';
import Index from '@/components/index';
import Editor from '@/components/Editor'
import {createHashHistory, createMemoryHistory} from 'history'; //createHashHistory
import '@/styles/reset.css';
import '@/styles/index.less';
import {Provider} from 'react-redux';
import store from '@/redux/store';
import '@/http';

const history = createHashHistory();

class App extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<div>
						<Switch>
							<Redirect exact from="/" to="/editor"/>
							<Route exact path="/" component={Index}/>
							<Route path="/login" component={Login}/>
							<Route path="/editor" component={Editor}/>
							
							{/*<Route exact path="/?12=1" component={Index}/>*/}
						</Switch>
					</div>
				</Router>
			</Provider>
		)
	}
}

window.React = React;
window.ReactDom = ReactDom;
ReactDom.render((
	<App/>
), document.getElementById('app'));
