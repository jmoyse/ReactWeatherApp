import * as React from 'react';
import Grid from 'material-ui/Grid/Grid';
import Paper from 'material-ui/Paper/Paper';
import Typography from 'material-ui/Typography/Typography';
import TextField from 'material-ui/TextField/TextField';
import WeatherDay from './components/WeatherDay';

export interface WeatherAppProps { }

export interface WeatherAppState {
  zipcode: number;
  json: Object;
}

class App extends React.Component<WeatherAppProps, WeatherAppState> {
  constructor (props: WeatherAppProps) {
    super(props);
    this.state = { zipcode: 0, json: new Object() };
  }

  componentDidMount () {
    this.setState({ zipcode: 20852 });
  }

  componentDidUpdate (nextProps: WeatherAppProps, nextState: WeatherAppState) {
    let validZip: boolean = this.state.zipcode.toString().length === 5;
    let zipChanged: boolean = this.state.zipcode !== nextState.zipcode;

    if (validZip && zipChanged) {
      this.onNewZipcode();
    }
  }

  onTextFieldChange = name => event => {
    this.setState({
      zipcode: Number.parseInt(event.target.value),
    });
  }

  onNewZipcode () {
    // tslint:disable-next-line:max-line-length
    let url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + this.state.zipcode + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

    fetch(url).then(response => { // TOOD: Add some error checking if this doesn't come back successful
      if (response.ok) {
        response.json().then(function (jsonResult: any, ) {
          this.setState({ json: jsonResult.query });
        }.bind(this));
        return;
      }
    });
  }

  render () {
    return (
      <Grid
        container={true}
        alignContent="center"
        alignItems="center"
        justify="center"
        style={{ paddingTop: '100px' }}
      >
        <Paper style={{ padding: '30px', maxWidth: '75%' }} >
          <Grid
            container={true}
            alignContent="center"
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Typography variant="subheading"> Enter a Zipcode</Typography>

            <TextField
              label="Name"
              value={this.state.zipcode || ''}
              onChange={this.onTextFieldChange('zipcode')}
              margin="normal"
            />

            <Typography variant="display2" style={{ padingTop: '20px', paddingBottom: '20px' }}>
              {
                (this.state.json as any).results ?
                  (
                    (this.state.json as any).results.channel.location.city + '' + (this.state.json as any).results.channel.location.region
                  ) : ''
              }
            </Typography>

            <Grid direction="row" wrap="wrap" container={true} justify="center" alignContent="center" alignItems="center" >
              {
                (this.state.json as any).results ?
                  (
                    ((this.state.json as any).results.channel.item.forecast).map(dayNode =>
                      <WeatherDay key={((dayNode as any).date as string)} dayJSON={dayNode} />
                    )
                  ) : ''
              }
            </Grid>
          </Grid>
        </Paper>
      </Grid >
    );
  }
}

export default App;
