import { Control, Teact, DomHandler, Fragment , Modes, React} from '@tuval/forms';
import {
  POSITION_TOP, POSITION_BOTTOM
} from '../constants';

export default class ToolbarButton extends React.Component {
  constructor(props) {
    super(props);
    (this as any).state = {hover: false};
  }

  change(event) {
    event.preventDefault();
    event.stopPropagation();

    switch (event.type) {
      case 'mouseenter':
      case 'touchstart':
        (this as any).setState({hover: true});
        break;
      case 'mouseleave':
      case 'touchend':
      case 'touchcancel':
        (this as any).setState({hover: false});
        break;
      default:
        //noop
    }
  }

  render() {
    let style = {
      display: "block",
      width: "24px",
      height: "24px",
      margin: [POSITION_TOP, POSITION_BOTTOM].indexOf((this as any).props.toolbarPosition) >= 0 ? "2px 1px" : "1px 2px",
      color: (this as any).props.active || (this as any).state.hover ? (this as any).props.activeColor : '#FFF',
      transition: "color 200ms ease",
      background: "none",
      padding: "0px",
      border: "0px",
      outline: "0px",
      cursor: "pointer"
    };

    return (
      <button
        onMouseEnter={e => this.change(e)}
        onMouseLeave={e => this.change(e)}

        onTouchStart={e => {
          this.change(e);
          (this as any).props.onClick(e);
        }}
        onTouchEnd={e => this.change(e)}
        onTouchCancel={e => this.change(e)}

        onClick={(this as any).props.onClick}

        style={style}
        title={(this as any).props.title}
        name={(this as any).props.name}
        type="button"
      >{(this as any).props.children}</button>
    )
  }

}

/* ToolbarButton.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  toolbarPosition: PropTypes.string.isRequired,
  activeColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
};
 */