import React, {PureComponent} from 'react';
import ToolTip from '@/components/ToolTip';

export default class ToolTipDemo extends PureComponent {
	render() {
		return (
			<div style={{paddingTop: 20}}>
				<p style={{textAlign: 'left', padding: '20px 0'}}><span data-tip="React-tooltip" data-for="canvas-op"> ◕‿‿◕</span>
				</p>
				<p style={{textAlign: 'right', padding: '20px 0'}}><span data-tip="React-tooltip" data-for="canvas-op"> ◕‿‿◕</span>
				</p>
				<p style={{textAlign: 'center', padding: '20px 0'}}><span data-tip="React-tooltip" data-for="canvas-op"> ◕‿‿◕</span>
				</p>
				<p style={{textAlign: 'center', padding: '20px 0'}}><span data-tip="React-tooltip" data-for="canvas-op"> ◕‿‿◕</span>
				</p>
				{/*<ReactTooltip place="top" type="dark" effect="float"/>*/}
				<ToolTip id="canvas-op"/>
				{
					[1,2,3,4,5].map((key)=>{
						return <BB key={key}>{key}</BB>
					})
				}
				<button onClick={(e)=>{
					console.log(222222);
					e.preventDefault();
					e.stopPropagation();
					this.forceUpdate();
				}}>点击刷新</button>
			</div>
		)
	}
}



class BB extends PureComponent {
	render(){
		console.log(this.props.children);
		return (
			<div>当前下标： {this.props.children}</div>
		)
	}
}