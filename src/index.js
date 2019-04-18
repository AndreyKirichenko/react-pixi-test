import './index.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Shapes from './Shapes';

import { Stage, Container, Graphics } from '@inlet/react-pixi'


const App = () => (
  <Stage options={{
    antialias: true,
    backgroundColor: 0x000fff,
    height: window.innerHeight,
    width: window.innerWidth
  }}>
    <Container>
      <Path d={
              Shapes.plantLine({
                minHeight: 30,
                maxHeight:60,
                pointsBetween: 40,
                scale: 240,
                flX: 1,
                flY: 0.5,
                flCX: 0.25,
              })}
            fill={0xfff000}
      />
    </Container>
  </Stage>
);

class Path extends Component {
  m = (g, data) => {
    const { x, y } = data;
    g.moveTo(x, y);
  };

  c = (g, data) => {
    const { c1x, c1y, c2x, c2y, x, y } = data;
    g.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
  };

  l = (g, data) => {
    const { x, y } = data;
    g.lineTo(x, y);
  };

  draw = (g) => {
    const { d, fill } = this.props;
    g.beginFill(fill);

    d.forEach((data) => {
      this[data.type.toLowerCase()](g, data);
    });

    g.endFill();
  };

  render() {
    return (
      <Graphics draw={this.draw} />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
