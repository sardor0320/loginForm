import axios from "axios";

export function portProduct(data,setRes) {
     axios.put ('http://localhost:3000/products',data)
     .then (response => {
          console.log(response)
          setRes(true)
     } 
)
     .catch(error => console.log(error));
}

export const putProduct =(data,id) => {
     axios.put (`http://localhost:3000/products/${id}`,data)
     .then (response => {
          console.log (response)
          alert('raxmat')
     } )
     .catch (error => {
          alert('zur')
          console.log(error)
     })
}