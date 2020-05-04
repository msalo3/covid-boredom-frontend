import React from "react"

import './bball.css';

class BBall extends React.Component {
  render() {
    return (
      <QuadBounce
        duration={1150}
        start={0}
        end={160}
      >
        { value => <Ball y={value} /> }
      </QuadBounce>
    );
  }
}

export default BBall

const getPosition = (elapsedTime, h, k) => {
  const a = (4 * k) / Math.pow(h * 2, 2); // coefficient: -.000483932
  const ypos = a * Math.pow((((elapsedTime + h) % (h * 2)) - h), 2);

  return ypos;
};

// default ball style, CSS in JS
const style = {
  display: 'block',
  position: 'absolute',
  width: 50,
  height: 50,
  borderRadius: '50%',
  backgroundColor: '#FA8320',
};

// renders a Ball at a certain height
const Ball = ({ y }) => (
  <div
    style={{
      ...style,
      top: y,
    }}
  />
);

class QuadBounce extends React.Component {
  state = {
    beginning: Date.now(),
  }

  componentWillMount() {
    this.setState({ interval: setInterval(this.updateValue, 20) });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  updateValue = () => {
    const {
      props: {
        duration,
        start,
        end,
      },
      state: {
        beginning,
      },
    } = this;

    const time = Date.now() - beginning;
    const value = start + getPosition(time, duration / 2, end - start);
    this.setState({ value });
  };

  render() {
    const renderedChildren = this.props.children(this.state.value);
    return renderedChildren && React.Children.only(renderedChildren);
  }
}
