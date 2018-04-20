import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import withCss from '@/withCss';
import styles from './modal.less';

@withCss(styles)
export default class ModalFooter extends PureComponent {
	static propTypes = {
		close: PropTypes.func.isRequired
	}
	
	render() {
		return (
			<footer styleName="footer">
				<div styleName="btn" onClick={() => {
					console.log('关闭');
					this.props.close();
				}}>取消
				</div>
				<div styleName="btn" onClick={() => {
					console.log('关闭');
					this.props.close();
				}}>确认
				</div>
			</footer>
		)
	}
}