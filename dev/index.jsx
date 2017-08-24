import React from "react";
import ReactDOM from "react-dom";


var destination = document.querySelector("#container");
var xhr;

var IPAddressDisplay = React.createClass({
  render:function(){
    return(
      <div>
        <h1>{this.props.ip}</h1>
        <p>( This is your IP address...probably :P )</p>
      </div>
    )
  }
});


var IPAddressContainer = React.createClass({
  getInitialState:function(){
    return {
      ip_address:""
    }
  },
  componentDidMount:function(){
    xhr = new XMLHttpRequest();
    xhr.open("GET", "https://ipinfo.io/json", true);
    xhr.send();
    xhr.addEventListener("readystatechange", this.processRequest, false);
  },
  processRequest:function(){
    if (xhr.readyState === 4 && xhr.status === 200){
      var response = JSON.parse(xhr.responseText);
      console.log(response)
      this.setState({
        ip_address: response.ip
      });

    }
  },
  render:function(){
    return(
      <IPAddressDisplay ip={this.state.ip_address}/>
    );
  }
});


ReactDOM.render(
  <div>
    <IPAddressContainer/>
  </div>,
  destination
);
