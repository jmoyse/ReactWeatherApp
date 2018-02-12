import * as React from 'react';
import Grid from 'material-ui/Grid/Grid';
import Paper from 'material-ui/Paper/Paper';
import Typography from 'material-ui/Typography/Typography';
import WeatherIcon from './WeatherIcon';

export interface WeatherDayProps {
    dayJSON: Object;
}

export interface WeatherDayState { }

class WeatherDay extends React.Component<WeatherDayProps, WeatherDayState> {
    constructor (props: WeatherDayProps) {
        super(props);
        this.state = { zipcode: 21044 };
    }
    render () {
        return (
            <Paper
                elevation={7}
                style={{
                    paddingLeft: '0px', paddingRight: '0px', paddingTop: '10px', paddingBottom: '10px', margin: '12px'
                }}
            >
                <Grid
                    container={true}
                    direction="column"
                    wrap="nowrap"
                    justify="center"
                    alignContent="center"
                    alignItems="center"
                    style={{ height: '100%', width: '140px', margin: '0px' }}
                >
                    <WeatherIcon weatherID={Number.parseInt((this.props.dayJSON as any).code)} />

                    <Typography variant="body2" align="center">
                        {(this.props.dayJSON as any).text}
                    </Typography>

                    <Typography variant="body1" color="error" noWrap={true}>
                        {'High: '}{(this.props.dayJSON as any).high}
                    </Typography>

                    <Typography variant="body1" color="textSecondary" noWrap={true}>
                        {'Low: '}{(this.props.dayJSON as any).low}
                    </Typography>

                    <Typography variant="body1" noWrap={true}>
                        {(this.props.dayJSON as any).day}{' '}{((this.props.dayJSON as any).date as string).split(' ')[1]}
                        {' '}
                        {((this.props.dayJSON as any).date as string).split(' ')[0]}
                    </Typography>
                </Grid>
            </Paper>
        );
    }
}

export default WeatherDay;
