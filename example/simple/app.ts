import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2,
    date: new Date()
  }
})

axios({
  method: 'post',
  url: '/simple/post',
  data: {
    a: 1,
    b: 2
  }
}).then(res =>{
  console.log(res);
  
})


let obj1 = {
  a:1,
  b:2
}

console.log(JSON.stringify(obj1));
