import React, {PureComponent} from 'react';

/**
 * case link  import A from  'bundle-loader?lazy!Components/home/Home';
 */


export default class Bundle extends PureComponent {
	state = {
		mod: null
	}
	
	componentWillMount() {
		this.load(this.props)
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.load !== this.props.load) {
			this.load(nextProps)
		}
	}
	
	load(props) {
		this.setState({
			mod: null
		})
		props.load((mod) => {
			this.setState({
				// handle both es imports and cjs
				mod: mod.default ? mod.default : mod
			})
		})
	}
	
	render() {
		return this.state.mod ? this.props.children(this.state.mod) : null
	}
}
