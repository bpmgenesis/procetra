import { Control, Teact, DomHandler, Fragment , Modes, React} from '@tuval/forms';
import getDisplayName from "./getDisplayName";

let uid = 1;
const nextUID = () => `uid${uid++}`;

const ReactComponent: any = React.Component;

export default function RandomUID(WrappedComponent: any) {
  class RandomUID extends ReactComponent {
    constructor(props) {
      super(props)
      this.state = {uid: nextUID()}
    }

    render() {
      return <WrappedComponent _uid={this.state.uid} {...this.props}/>
    }
  }

  RandomUID.displayName = `RandomUID(${getDisplayName(WrappedComponent)})`;

  return RandomUID;
}
