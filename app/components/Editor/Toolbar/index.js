import React, {PureComponent} from 'react';
import withCss from '@/withCss';
import {withRouter} from 'react-router';
import styles from '../canvas.less';

@withRouter
@withCss(styles)
export default class ToolBar extends PureComponent {
	render() {
		return (
			<div styleName="editor-toolbar"/>
		)
	}
}