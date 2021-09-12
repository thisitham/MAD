import React, { Component } from 'react'
import axios from 'axios'
//import {BrowserRouter,Route} from 'react-router-dom'

export default class EditPost extends Component {


  constructor(props){
    super(props);
    this.state={
      topic:"",
      description:"",
      postCategory:""
    }
  }

  handleInputchange = (e) =>{
    const {name,value} = e.target;

    this.setState({
      ...this.state,
      [name]:value
    })
  }

  onSubmit = (e) =>{

    e.preventDefault();
    const id = this.props.match.params.id;

    const {topic,description,postCategory} = this.state;

    const data ={
      topic:topic,
      description:description,
      postCategory:postCategory
    }

    console.log(data)

    axios.put(`http://localhost:8000/post/update/${id}`,data).then((res) =>{
      if(res.data.success){
        alert("post updated Successfully")
        this.setState(
          {
            topic:"",
            description:"",
            postCategory:""
          }
          
        )

      }
    })

  } 

  
  componentDidMount(){
    
    const id = this.props.match.params.id;

    axios.get(`http://localhost:8000/post/${id}`).then((res) =>{
        if(res.data.success){
            this.setState({
                topic:res.data.post.topic,
                description:res.data.post.description,
                postCategory:res.data.post.postCategory
            });

            console.log(this.state.post);
        }
    });

 }

  render() {
    return(
      
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 front-weight-normal">Edit post</h1>
         <form className="need-validation" noValidate>
           <div className="form-group" style={{marginBottom:'15px'}}>
             <label style={{marginBottom:'5px'}}>Topic</label>
             <input type="text"
             className="form-control"
             name="topic"
             placeholder="Enter Topic"
             value={this.state.topic}
             onChange={this.handleInputchange}/>
           </div>

           <div className="form-group" style={{marginBottom:'15px'}}>
             <label style={{marginBottom:'5px'}}>Description</label>
             <input type="text"
             className="form-control"
             name="description"
             placeholder="Enter Description"
             value={this.state.description}
             onChange={this.handleInputchange}/>
           </div>

           <div className="form-group" style={{marginBottom:'15px'}}>
             <label style={{marginBottom:'5px'}}>Post Category</label>
             <input type="text"
             className="form-control"
             name="postCategory"
             placeholder="Enter Post Category"
             value={this.state.postCategory}
             onChange={this.handleInputchange}/>
           </div>

           <button className="btn btn-success" type="submit" style={{marginTop:'15x'}} onClick={this.onSubmit}>
               <i className="far fa-check-square"></i>
               &nbsp; update
           </button>

         </form>
        

      </div>
     
    )
  }
}