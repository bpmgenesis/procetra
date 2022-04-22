import { Control, Teact, DomHandler, Fragment, Modes, React } from '@tuval/forms';
const ReactComponent: any = React.Component;
import { SvgLoader } from '../svgmt'

/**
 * Loading the svg file using react-svgmt
 * @param props
 * @returns {*}
 * @constructor
 */
const ReactSvgPanZoomLoader = (props) => {
    return (
        <div name='SvgPanZoomLoader' style='width:100%;height:100%'>
            {props.render(
                <SvgLoader path={props.src} svgXML={props.svgXML}>
                    {props.proxy}
                </SvgLoader>
            )}
        </div>
    )
}

ReactSvgPanZoomLoader.defaultProps = {
    proxy: ""
}

/* ReactSvgPanZoomLoader.propTypes = {
    src: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    proxy: PropTypes.node
} */

export { ReactSvgPanZoomLoader }