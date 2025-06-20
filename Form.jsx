import React, { useState } from "react";
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { usePDF } from 'react-to-pdf';
//import './App.css'
function Form() {

    const [data, setData] = useState({
        topicname: "",
        totalmarks: "",
        marksforeachquestion: "",
        Questiontype: ""
    });
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });


    const [quepaper, setQues] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [e.target.name]: e.target.value })
    };



    return (
        <div>
            <div class="row g-0 text-center">
                <div className="col-sm-6 col-md-6.5">
                    <nav class="navbar bg-body-tertiary">
                        <div class="container-fluid">
                            <a class="navbar-brand " >Question Paper Genearation By GEMINI AI</a>
                        </div>
                    </nav>
                    <div class="form-floating mb-3">
                        <input type="text" aria-label="First name" class="form-control" id="floatingInput" name="topicname" placeholder="name@example.com" onChange={(e) => {
                            handleChange(e)
                        }} />
                        <label for="floatingInput">Topic Name</label>

                    </div>

                    <div class="form-floating mb-3">

                        <input type="text" aria-label="First name" class="form-control" id="floatingInput" name="totalmarks" placeholder="name@example.com" onChange={(e) => {
                            handleChange(e)
                        }} />
                        <label for="floatingInput">Total Marks</label>

                    </div>

                    <div class="form-floating mb-3">
                        <input type="text" aria-label="First name" class="form-control" id="floatingInput" name="marksforeachquestion" placeholder="name@example.com" onChange={(e) => { handleChange(e) }} />
                        <label for="floatingInput">Marks For Each Question</label>

                    </div>

                    <div class="form-floating mb-3">

                        <input type="text" aria-label="First name" class="form-control" id="floatingInput" name="Questiontype" placeholder="name@example.com" onChange={(e) => {
                            handleChange(e)
                        }} />
                        <label for="floatingInput">Type of The Questions</label>

                    </div>



                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" type="button" onClick={() => {
                            axios.post(`http://localhost:8000/generate`, data).then((response) => {
                                setQues(response.data.response)
                            }).catch((err) => {
                                console.log(err)
                            });
                        }}>Generate</button>


                    </div>


                    <div class="row g-0 text-center">

                        <label for="exampleFormControlTextarea1" class="form-label">Make Changes Accordingly</label>
                        <textarea value={quepaper} onChange={(e) => {
                            setQues(e.target.value)
                        }} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div class="d-grid gap-2">
                        {quepaper.length > 0 ? <button class="btn btn-primary" type="button" onClick={() => toPDF()}>Download</button> : null}
                    </div>


                </div>

                <div class="col-sm-6 col-md-6 p-2" ref={targetRef} >
                    <ReactMarkdown>
                        {quepaper}
                    </ReactMarkdown>
                </div>


            </div>

        </div>


    )

}


export default Form