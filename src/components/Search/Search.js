import React, { Component , Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MDBCol, MDBFormInline, MDBBtn, MDBNavbarBrand, MDBNavbarToggler, MDBNavbar, MDBCollapse, MDBNavbarNav  , ToastContainer , toast } from "mdbreact";
import Axios from 'axios';
import Iframe from 'react-iframe';


class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.haddleSubmit = this.haddleSubmit.bind(this);
       
        this.state = {
            collapsed: false,
            asset : "",
            company : "",
            openUrl : "https://www.rootsmulticlean.com",
            data : {
                 "" : "",
                 roots : {
                        '' : "https://www.rootsmulticlean.com",
                        '7 series 767' :  "https://www.rootsmulticlean.com/high-pressure-jets/7-series-767/",
                        '6 series 650':   "https://www.rootsmulticlean.com/high-pressure-jets/6-series-650/"
                    
                    }
            }
          }
    }


    notify(type){
        return () => {
          switch (type) {
            case 'info':
              toast.info('Info message', {
                autoClose: 3000
              });
              break;
            case 'success':
              toast.success('Success message', {
                position: "top-right",
              });
              break;
            case 'warning':
              toast.warn('Warning message');
              break;
            case 'error':
              toast.error('Error message');
              break;
          }
        };
      };



handleTogglerClick = () => {
  this.setState({
    collapsed: !this.state.collapsed
  });
}

handleNavbarClick = (e) => { 
  this.setState({
    collapsed: false,
  });
}

handleChange = (e) => { 
    this.setState({
      [e.target.name] : e.target.value.toLowerCase(),
    });

    Axios.get(

    );
  }

findData = () => {
    if( typeof( this.state.data[this.state.company]) !== 'undefined'){
        if(  typeof( this.state.data[this.state.company][this.state.asset]) !== 'undefined' ){
        //window.open(this.state.data[this.state.company][this.state.asset], "_blank");
        this.setState({
            openUrl : this.state.data[this.state.company][this.state.asset]
        })
        }

        else {
            console.log("asset not found")
        }
    }
    else{
        console.log(" company not found");
        this.notify('warning');
    }
}

haddleSubmit = (e) => {
    // this.setState({
    //   searchData : e.target.value
    // });
    this.findData();
  }

render() {
  return (
    <MDBCol md="12">                   
      <MDBNavbar color="deep-purple" className="text-white darken-3" dark expand="md">
        <MDBNavbarBrand>Company Assist </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.handleTogglerClick} />
        <Router>
          <MDBCollapse isOpen={this.state.collapsed} navbar>
            <MDBNavbarNav right onClick={this.handleNavbarClick}>
              <MDBFormInline className="md-form mr-auto m-0">
              
                <input className="form-control mr-sm-2" name='company' type="text" placeholder="Company" aria-label="Company" onChange={this.handleChange} />
                <input className="form-control mr-sm-2" name= 'asset' type="text" placeholder="Asset" aria-label="Asset" onChange={this.handleChange} />
                <MDBBtn outline color="white" size="sm" className="mr-auto" onClick={this.haddleSubmit}>
                  Search 
                </MDBBtn>
              </MDBFormInline>
            </MDBNavbarNav>
          </MDBCollapse>
        </Router>
      </MDBNavbar>
      
      <Iframe url={this.state.openUrl}
            position="fixed"
            width="100%"
            height="100%"
            scrolling 
            allowFullScreen/>
    </MDBCol>
    );
  } 
}

export default SearchPage;