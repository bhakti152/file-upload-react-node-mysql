import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Display extends Component {

    state = {

        // Initially, no file is selected 
        id: null,
        file: null, picture: null
    };

    // On file select (from the pop up) 
    onInputChange = (event) => {
        console.log('onfilechange:', event);

        // Update the state log
        this.setState({ id: event.target.value });
    };
    // onImageChange = event => {
    //     // Update the state 
    //     this.setState({ selectedImage: event.target.files[0] });
    // };

    // On file upload (click the upload button) 
    getData = () => {
        axios.get("http://localhost:3000/multiple-upload/" + this.state.id)
            .then(res => {
                console.log('api res:', res);
                const picture = btoa(String.fromCharCode(...new Uint8Array(res.data.picture.data)));
                const file = res.data.file;

                // var binaryData = []; binaryData.push(res.data.file.data);
                // let file = window.URL.createObjectURL(binaryData)
                // let file = URL.createObjectURL(res.data.file);
                // var binaryData = []; binaryData.push(res.data.file.data);
                // let file = window.URL.createObjectURL(new Blob(binaryData, { type: "application/pdf" }))

                // let picture = URL.createObjectURL(res.data.picture);
                this.setState({ id: null, file: file, picture: picture })

            })
    };

    // File content to be displayed after 
    // file upload is complete 

    download = () => {
        // window.open(this.state.file)
        // window.location.href = 'data:application/pdf;base64,' + this.state.file;
        // this.createAndDownloadBlobFile(this.state.file, text)
        var dlnk = document.getElementById('dwnldLnk');
        var binaryData = []; binaryData.push(this.state.file);
        let file = window.URL.createObjectURL(new Blob(binaryData, { type: "application/pdf" }))
        console.log('filr:', file);

        dlnk.href = file;

        dlnk.click();
    }

    render() {
        return (
            <div>
                <h3>
                    Display Data by ID
            </h3>
                <div>
                    <div>
                        <span>ID:</span>
                        <input type="number" value={this.state.id} onChange={this.onInputChange} />

                    </div>

                    <button className="mt-3" onClick={this.getData}>
                        Get Data!
                </button>
                </div>
                {this.state.picture !== null && <div className="mt-3"><img src={`data:image/png;base64,${this.state.picture}`} /></div>}
                {this.state.file !== null &&
                    <div className="mt-3">
                        <a id='dwnldLnk' download='file.pdf' style={{ display: "none" }} />

                        <a href="#" onClick={this.download} title='file.pdf'>Download File</a>
                    </div>
                    // <a download={'text'} href={this.state.file} title='Download pdf document' >{this.state.file}</a>
                }

                {/* {this.fileData()} */}
            </div>
        );
    }
}

export default Display;