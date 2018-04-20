import CSSModules from 'react-css-modules'

/**
 * PureComponent Component 修饰器
 * @param style
 */
export default function withCss(style) {
	return CSSModules(style, {allowMultiple: true})
}
