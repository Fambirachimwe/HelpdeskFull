import React from 'react';
import { connect } from 'react-redux';

// material ui imports 
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { STATUS } from '../util/util';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


const TicketDetail = ({ tickets, adminReducer : {admin}, userReducer: {user} }) => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    // console.log(user);


    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {tickets ? tickets._id : null}
                </Typography>
                <Typography variant="h5" component="h2">
                    {tickets ? tickets.title : null}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {tickets ? tickets.description : null}
                </Typography>
                <Typography variant="body2" component="p">
                    {}
                <br />
                {/* {tickets.status === STATUS.PENDING ? (<span className="badge badge-warning">{tickets.status}</span>) : (<span className="badge badge-primary">{tickets.status}</span>) } */}

                {tickets ? (
                    tickets.status === STATUS.PENDING ?  ((<span className="badge badge-warning">{tickets.status}</span>)) : (<span className="badge badge-primary">{tickets.status}</span>)
                ) : (null)}
                
                </Typography>
            </CardContent>
            
        </Card>
    )
}

const mapStateToProps = (state, ownProps) => {
    const ticketId = ownProps.match.params.id;
    return {
        ...state,
        tickets: state.userReducer.tickets.find(ticket => ticket._id === ticketId)

    }
}

export default connect(mapStateToProps)(TicketDetail);
