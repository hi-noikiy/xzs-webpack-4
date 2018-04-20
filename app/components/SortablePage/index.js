import React, {PureComponent} from 'react';
import Sortable from 'sortablejs';
import styles from './sortablePage.less';
import withCss from '@/withCss';
@withCss(styles)
export default class SortablePage extends PureComponent {
	sortableContainersDecorator = (componentBackingInstance) => {
		// check if backing instance not null
		if (componentBackingInstance) {
			let options = {
				handle: '.group-title' // Restricts sort start click/touch to the specified element
			};
			Sortable.create(componentBackingInstance, options);
		}
	};
	sortableGroupDecorator = (componentBackingInstance) => {
		// check if backing instance not null
		if (componentBackingInstance) {
			let options = {
				draggable: 'div', // Specifies which items inside the element should be sortable
				group: 'shared'
			};
			Sortable.create(componentBackingInstance, options);
		}
	};
	
	render() {
		return (
			<div styleName="sortable-page" className="container" ref={this.sortableContainersDecorator}>
				<div styleName="sortable-group" className="group g1">
					<h2 className="group-title">Group 1</h2>
					<div styleName="group-list"className="group-list" ref={this.sortableGroupDecorator}>
						<div>Swap them around 1</div>
						<div>Swap us around 2</div>
						<div>Swap things around 3</div>
						<div>Swap everything around 4</div>
					</div>
				</div>
				<div className="group">
					<h2 className="group-title">Group 2</h2>
					<div className="group-list" ref={this.sortableGroupDecorator}>
						<div>Swap them around 5</div>
						<div>Swap us around 6</div>
						<div>Swap things around 8</div>
						<div>Swap everything around 9</div>
					</div>
				</div>
			</div>
		);
	}
}
