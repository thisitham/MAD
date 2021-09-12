import React, {Component, component} from 'react'
import axios from 'axios'

export default class Home extends Component{
 constructor(props){
  super(props);

  this.state={
     posts:[]
  };
 }

 componentDidMount(){
    this.retrivePosts();
 }






 retrivePosts(){
  axios.get("http://localhost:8000/posts").then(res =>{
   if(res.data.success){
     this.setState({
       posts:res.data.existingPosts
     });

     console.log(this.state.posts);
   }

  })
 }

 onDelete = (id) =>{

  axios.delete(`http://localhost:8000/post/delete/${id}`).then((res) =>{
    alert("Delete Successfully");
    this.retrivePosts();
  })

 }

  
  //search start

  filterData(posts,searchKey){

   const result = posts.filter((post) =>
    post.topic.toLowerCase().includes(searchKey) ||
    post.description.toLowerCase().includes(searchKey)||
    post.postCategory.toLowerCase().includes(searchKey)
   )

   this.setState({posts:result})

  }





   handleSearchArea = (e) =>{

    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/posts").then(res =>{
     if(res.data.success){
     
       this.filterData(res.data.existingPosts,searchKey)
   }

   });

   }

   //search end



 
  render(){
    return (


      <div className="container">

         {/* search bar start */}
         
            
            <div className="raw">
              <div className="col-lg-9 mt-2 mb-2">
              <h4>ALL posts</h4>
              </div>
              <div className="col-lg-9 mt-2 mb-2">
                <input 
                className="form-control"
                type="search"
                placeholder="search"
                name="searchQuery"
                onChange={this.handleSearchArea}>
                
                </input>

              </div>

            </div>

         {/* search bar end */}
         

        <p>ALL POSTS</p>
          <table className="table">
             <thead>
               <tr>
                 <th scope="col">#</th>
                 <th scope="col">Topic</th>
                 <th scope="col">Descripyion</th>
                 <th scope="col">Post Category</th>
                 <th scope="col">Action</th>
                 
               </tr>
             </thead>
             <tbody>
               {this.state.posts.map((posts,index) =>(
                  <tr key={index}>
                    <th scope="raw">{index+1}</th>
                    <td>
                        <a href={`/post/${posts._id}`} style={{textDecoration:'none'}}>
                        {posts.topic}
                        </a>
                        </td>
                    <td>{posts.description}</td>
                    <td>{posts.postCategory}</td>
                    <td>
                      <a className="btn btn-warning" href={`/edit/${posts._id}`}>
                        <i className="fas fa-edit"></i>&nbsp;Edit
                      </a>
                      &nbsp;
                      <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(posts._id)}>
                        <i className="far fa-trash-alt"></i>&nbsp;Delete
                      </a>
                       
                    </td>
                  </tr>
               ))}
             </tbody>

          </table>

         <button className="btn btn-success">
             <a href="/add" style={{textDecoration:'none',color:'white'}}>Create New Post</a>
         </button>


        </div>





       //retrive without effects
      /*<div>
        {this.state.posts.map(posts =>(
           <div>
            <p>{posts.topic}</p>
            <p>{posts.description}</p> 
            <p>{posts.postCategory}</p>  
           </div>
        ))}
      </div>*/
    )
  }
}