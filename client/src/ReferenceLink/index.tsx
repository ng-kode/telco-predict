import React, { PureComponent } from "react";

interface Props {
  href: string;
}
interface State {}

export default class ReferenceLink extends PureComponent<Props, State> {
  render() {
    return (
      <a href={this.props.href} target="_blank" rel="noopener noreferrer">
        {this.props.children}
      </a>
    );
  }
}
