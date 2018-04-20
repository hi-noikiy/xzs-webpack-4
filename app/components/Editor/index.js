import withCss from '@/withCss';
import React, {PureComponent} from 'react';
import ToolBar from './Toolbar';
import styles from './canvas.less';
import MJEditor from './lib';

@withCss(styles)
class Editor extends PureComponent {
	state = {
		hasError: false,
		history: []                 //设置历史
	}
	
	constructor(props) {
		super(props)
		this.MJ_CANVAS_DOCUMENT = void 0
	}
	
	componentDidMount() {
		let scope = new MJEditor.MJScope(this.MJ_CANVAS_DOCUMENT),
			canvas = new MJEditor.MJCanvas({
				width: 600,
				height: 800,
				scope           //必须要传入
			}, {
				objects: [
					{
						type: 'image'
					}
				]
			});
		scope.add(canvas);
		canvas.renderAll();
	}
	
	render() {
		return (
			<div styleName="editor">
				<header styleName="editor-header">
				
				</header>
				<section styleName="editor-body">
					<aside styleName="editor-left-side">
						<div styleName="drag-box">
							drop Box
						</div>
					</aside>
					<div styleName="editor-container">
						<ToolBar/>
						<div id="MJ_CANVAS_DOCUMENT"
						     ref={(el) => this.MJ_CANVAS_DOCUMENT = el}/>
					</div>
				</section>
			</div>
		)
	}
}

class Error extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {hasError: false};
	}
	
	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({hasError: true});
		// You can also log the error to an error reporting service
		// logErrorToMyService(error, info);
	}
	
	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>;
		}
		return this.props.children;
	}
}

class EditorWraper extends PureComponent {
	render() {
		return (
			<Error>
				<Editor/>
			</Error>
		)
	}
}

export default EditorWraper;