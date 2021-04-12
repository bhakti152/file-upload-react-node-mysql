import axios from 'axios';
import React, { Component } from 'react';
class Add extends Component {

    state = {

        // Initially, no file is selected 
        selectedImage: null,
        selectedFile: null,
        errorImage: '',
        errorFile: '',
        inputKey: Date.now(),
        inputKey1: Date.now()

    };

    // On file select (from the pop up) 
    onFileChange = (event, name) => {
        console.log('onfilechange:', event);
        const match = ["image/png", "image/jpeg"];

        // if (match.indexOf(file.mimetype) === -1) {
        //   var message = `<strong>${file.originalname}</strong> is invalid. Only accept png/jpeg.`;
        //   return callback(message, null);
        // } 
        if (name === 'selectedImage' && match.indexOf(event.target.files[0].type) !== -1) {
            this.setState({ [name]: event.target.files[0], errorImage: '' });

        } else if (name === 'selectedFile' && event.target.files[0].type === 'application/pdf') {
            this.setState({ [name]: event.target.files[0], errorFile: '' });

        }
        else {
            if (name === 'selectedImage') {
                this.setState({
                    errorImage: 'Upload only jpeg or png image', inputKey: Date.now()
                })
            } else {
                this.setState({ errorFile: 'Upload only pdf files', inputKey1: Date.now() })
                // event.target.value = null;

            }
            // event.target.value = null;
        }

        // Update the state log
    };
    // onImageChange = event => {
    //     // Update the state 
    //     this.setState({ selectedImage: event.target.files[0] });
    // };

    // On file upload (click the upload button) 
    onFileUpload = () => {
        console.log(this.state.selectedFile);
        console.log(this.state.selectedImage);
        if (this.state.selectedFile && this.state.selectedImage) {
            // Create an object of formData 
            const formData = new FormData();

            // Update the formData object 
            formData.append(
                `multi-files`,
                this.state.selectedImage);
            formData.append(
                `multi-files`,
                this.state.selectedFile);

            // Details of the uploaded file 

            // Request made to the backend api 
            // Send formData object 
            axios.post("http://localhost:3000/multiple-upload", formData)
                .then(res => {
                    console.log('api res:', res);
                    this.setState({
                        selectedFile: null, selectedImage: null, errorFile: '', errorImage: '',
                        inputKey: Date.now(), inputKey1: Date.now()
                    })
                    this.props.history.push('/display-data')
                })
        } else {
            this.setState({ errorFile: 'Choose File to upload', errorImage: 'Choose Image to upload' })
        }

    };


    render() {
        return (
            <div>
                <h3>
                    Image Upload
            </h3>
                <div>
                    <div className="p-3">
                        <span>Image Upload</span>
                        <input type="file" name="multi-files" key={this.state.inputKey}
                            onChange={(e) => this.onFileChange(e, 'selectedImage')} />
                        <div style={{ color: 'red' }}>{this.state.errorImage}</div>
                    </div>
                    <div className="p-3">
                        <span>File Upload</span>
                        <input type="file" name="multi-files" key={this.state.inputKey1} onChange={(e) => this.onFileChange(e, 'selectedFile')} />
                        <div style={{ color: 'red' }}>{this.state.errorFile}</div>

                    </div>

                    <button className="mt-3" onClick={this.onFileUpload}>
                        Upload!
                </button>
                </div>

            </div>
        );
    }
}

export default Add;