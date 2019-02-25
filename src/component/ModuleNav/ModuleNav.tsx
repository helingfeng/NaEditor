import * as React from 'react';
import { Icon } from 'antd';

import ModuleNavList from './ModuleNavList';

interface ModuleNavProps {}

interface ModuleNavState {
  isActive: boolean;
}

class ModuleNav extends React.Component<ModuleNavProps, ModuleNavState> {
  constructor(props: ModuleNavProps) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  onClose = () => {
    this.setState({
      isActive: false,
    });
  };

  open = () => {
    this.setState({
      isActive: true,
    });
  };

  toggle = () => {
    if (this.state.isActive === true) {
      this.onClose();
    } else {
      this.open();
    }
  };

  render() {
    const { isActive } = this.state;

    return (
      <div className={`d-module-nav ${isActive ? 'active' : ''}`}>
        <div className="d-btn" onClick={this.toggle}>
          <Icon className="d-icon" type="bars" />
        </div>
        <ModuleNavList onClose={this.onClose} />
      </div>
    );
  }
}

export default ModuleNav;
