import React, { useState } from 'react';
import { getToken } from '../util/util';
import axios from 'axios';
import { connect } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import Swal from "sweetalert2"



const AddTicket = (props) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [attachment, setAttachment] = useState(null);

    const queryClient = useQueryClient();



    const handleTitle = (evt) => {
        setTitle(evt.target.value);
    }
    const handleDescription = (evt) => {
        setDescription(evt.target.value)
    }

    const handleAttachment = (evt) => {
        setAttachment(evt.target.files[0]);


    }

    const mutation = useMutation(formData => {
        // return axios.post('/todos', newTodo)
        return axios({
            url: "http://127.0.0.1:4000/app/tickets",
            method: "POST",
            data: formData,
            headers: {
                "content-type": "multipart/form-data",
                "X-Auth-Token": localStorage.getItem("token")
            }
        })
    },
        
    
    )

    const handleSubmit = (evt) => {

        evt.preventDefault();

        // const token = getToken() ;
        const formData = new FormData();
        formData.append('title', title);
        formData.append("description", description);
        formData.append("attachment", attachment)






        mutation.mutate(formData, {
            onSuccess: () => {

                queryClient.invalidateQueries('tickets');
                queryClient.invalidateQueries('allTickets')
                Swal.fire({
                    icon: 'success',
                    title: 'Ticket Added',
                    text: `The admin will resolve your issue`,

                });
            },
            onError: () => {
                // queryClient.invalidateQueries('vehicles')
                Swal.fire({
                    icon: 'warning',
                    title: 'Error adding ticket',
                    text: `Please check your details `,

                });
            }

        }).then(() => {
            setTitle("");
            setDescription("")
        });
        
    }

    return (
        <div>
            <h5 className="text-left">Add New Ticket</h5>
            <div>

                <form onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Title</label>
                        <input type="text" value={title} onChange={handleTitle} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Description</label>
                        <textarea className="form-control" value={description} onChange={handleDescription} id="exampleFormControlTextarea1" rows="3"></textarea>


                        <label htmlFor="attachment">Attachement</label>
                        <input type="file" name="attachment" onChange={handleAttachment} className="form-control-file" id="exampleFormControlFile1"></input>
                        <small id="emailHelp" className="form-text text-muted">Add Screen Shot of the error Mesage</small>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </div>

    )


};
const mapStateToProps = (state) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateState: (data) => { dispatch({ type: "UPDATE_STATE", ticket: data }) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddTicket);
