import React from "react"
import { Header, Button } from 'semantic-ui-react'
import colorApi from '../api/color-api-client';
import ColorGame from './ColorGame';

const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


class Color extends React.Component {
  state = {
    colors: [],
    chosenColor: null
  };

  getSomeColors = async () => {
    const hexColor = getRandomColor();
    console.log(hexColor)
    const data = await colorApi.getColors(hexColor);
    console.log(data)
    const chosenColor = {
      hex: data.seed.hex.value,
      rgb: [data.seed.rgb.r, data.seed.rgb.g, data.seed.rgb.b],
      name: data.name.value
    }
    this.setState({ colors: data.colors, chosenColor  });
  }

  buttonOrColorGame = () => {
    const { chosenColor, colors } = this.state;
    if (chosenColor) {
      return <ColorGame colors={colors} chosenColor={chosenColor} />;
    }
    return (
      <Button onClick={() => this.getSomeColors()}>
        Play the Color Game
      </Button>
    );
  }

  render() {
    return (
      <div>
        <Header as='h1'>Chat Bot</Header>
        {this.buttonOrColorGame()}
        <p>{getRandomColor()}</p>
      </div>
    );
  }
}

export default Color
