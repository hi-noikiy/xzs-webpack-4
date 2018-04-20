import PropTypes from 'prop-types';
import withCss from '@/withCss';
import React, {PureComponent} from 'react';
import style from './toolTipBase.less';

@withCss(style)
export default class ToolTipBase extends PureComponent {
	static propTypes = {
		children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
		pos: PropTypes.object,
		direction: PropTypes.oneOf(['top', 'left', 'right', 'bottom'])
	}
	static defaultProp = {
		direction: 'top'
	}
	
	render() {
		return (
			<div styleName="tool-tip" style={{
				...this.props.pos,
				visibility: this.props.pos ? 'visible' : 'hidden'
			}}>{this.props.children}</div>
		)
	}
}