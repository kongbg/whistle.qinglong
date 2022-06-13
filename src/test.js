// Importing the async module
const async = require('async');


function getId () {
    return parseInt((Math.random() * 10000).toString())
}
  
// Creating a tasks array
const tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
// Defining the queue
const queue = async.queue((params, completed) => {
    console.log("当前正在处理 " + params.task);

    console.log('异步处理其他事情')
      
    // Simulating a Complex task
    setTimeout(()=>{
        // The number of tasks to be processed
        const remaining = queue.length();
        console.log('处理完成了，执行回调')
        completed(null, {task: params.task, remaining});
    }, 1000);
  
}, 1); // The concurrency value is 1


  
// The queue is idle as there are no elements
// for the queue to process
console.log(`队列开始了吗? ${queue.started}`)
  
// Adding the each task to the queue
tasks.forEach(()=>{
    let task = getId()
  
    // Adding the 5th task to the head of the 
    // queue as it is deemed important by us
 
      queue.push({task, name: '123'}, (error, {task, remaining})=>{
       if(error){
        console.log(`出错了哦 ${task}`);
       }else {
        console.log(`任务完成 ${task}. 还有${remaining}个 `);
      }
      })
    
});

console.log(`队列开始了吗? ${queue.started}`)
  
  
// Executes the callback when the queue is done processing all the tasks
queue.drain(() => {
    console.log('全部执行完成');
})
  
// The queue is not idle it is processing the tasks asynchronously
console.log(`队列开始了吗? ${queue.started}`)