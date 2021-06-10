import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxillary from '../Auxillary/Auxillary';

const withErrorHandler = (WrappedComponent, axios) =>{
    return class extends Component{
        state = {
          error : null
        }
        componentDidMount() {

            axios.interceptors.request.use(req =>{
                this.setState({error:null});
                return req;
             });

            axios.interceptors.response.use(res=>res,error =>{
               this.setState({error:error});
               console.log("This is how error Object looks alike" , error);
            });
        }

        errorConfirmedHandler =() =>{
            this.setState({error:null});
        }
        
        render(){
            return (
                <Auxillary>
                    <Modal
                       show = {this.state.error}
                       modalClosed = {this.errorConfirmedHandler}
                       >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxillary>
            );
        }
    }
}

export default withErrorHandler;