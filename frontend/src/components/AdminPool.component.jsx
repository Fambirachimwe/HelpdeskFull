import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { STATUS, getToken } from "../util/util"
// socket io client 
// import socketIOClient from "socket.io-client";
import axios from 'axios';
import FlipMove from 'react-flip-move';
import { useMutation, useQuery, useQueryClient } from 'react-query';


// const endpoint = "http://127.0.0.1:4000";
// const socket = socketIOClient(endpoint);



const AdminPool = ({ adminReducer: { tickets }, getTickets, history, updateState }) => {

    const token = getToken();
    const config = {
        headers: {
            "X-Auth-Token": token
        }
    }
    const queryClient = useQueryClient();

    

    const getAllTickets = () => {
        const response =  axios.get("http://127.0.0.1:4000/app/tickets", config);
        return response
    }

    const { data } = useQuery('allTickets', getAllTickets);

    
    const updateStatus = (id) => {
        return axios.put("http://127.0.0.1:4000/app/tickets", { id: id });
    }

    const mutation = useMutation((id) =>updateStatus(id))


    const visibilityClick = (ticketId) => {
        const ticket = data.data.tickets.find(ticket => ticket._id === ticketId);
        if (ticket.status === STATUS.PENDING) {
            mutation.mutate(ticketId, {
                onSuccess: () => {
                    queryClient.invalidateQueries('allTickets')
                    
                }
            });
        }

        history.push(`/admin/${ticketId}`);

    }

    return (
        <div style={{ marginTop: "20px" }}>
            <div className="mdc-card p-0">
                <h6 className="card-title card-padding pb-0">All Tickets</h6>
                <div className="table-responsive">

                    <FlipMove>
                        <table className="table table-hoverable">
                            <thead>
                                <tr>
                                    <th className="text-left">Ticket ID</th>
                                    <th className="text-left">Title</th>
                                    <th >Prority (g)</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data ? (
                                        data.data.tickets.map(ticket => (

                                            <tr key={ticket._id}>
                                                <td className="text-left"> <Link to={`/admin/${ticket._id}`}>{ticket._id}</Link></td>
                                                <td className="text-left">{ticket.title}</td>
                                                <td>{ticket.priority}</td>
                                                <td>{ticket.status === STATUS.PENDING ? (<span className="badge badge-warning">{ticket.status}</span>) : (<span className="badge badge-primary">{ticket.status}</span>)}</td>
                                                <td onClick={() => visibilityClick(ticket._id)}><i className="material-icons mdc-text-field__icon" >visibility</i></td>
                                            </tr>
                                        ))
                                    ) : (null)

                                }

                            </tbody>
                        </table>
                    </FlipMove>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTickets: (data) => { dispatch({ type: "ADMIN_GET_ALL_TICKETS", tickets: data }) },
        updateState: (data) => { dispatch({ type: "ADMIN_UPDATE_STATE", ticket: data }) }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminPool));