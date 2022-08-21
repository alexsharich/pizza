import React from "react";

const Pagination = ({changeCurrentPage})=>{
  const pages = 3
  const paginationRenderPages = []
  for (let i = 1;i<=pages;i++){
    paginationRenderPages.push(i)
  }
  return ( 
      <div style={{display:'flex',flexDirection:'row'}}>
      <div style={{width:'30px' ,height:'30px', borderRadius:'50%',position:'relative',backgroundColor:'red',textAlign:'center'}}>
          <p style={{color:'white'}}>p</p>
      </div>
      {
        paginationRenderPages && paginationRenderPages.map(p=>{
          return <div key={p} onClick={()=>changeCurrentPage(p)}style={{width:'30px' ,height:'30px', borderRadius:'50%',position:'relative',backgroundColor:'red',textAlign:'center',margin:'5px'}}>
          <p style={{color:'white'}}>{p}</p>
      </div>
        })
      }
      <div style={{width:'30px' ,height:'30px', borderRadius:'50%',position:'relative',backgroundColor:'red',textAlign:'center'}}>
          <p style={{color:'white'}}>n</p>
      </div>
      </div>
  )
}

export default Pagination