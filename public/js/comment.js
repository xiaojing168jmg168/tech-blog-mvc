
const post_id = document.querySelector('input[name="post-id"]').value;

console.log("testing");
console.log(post_id);

const commentFormHandler = async function(event){

      event.preventDefault();
      const comment_text = document.querySelector('input[name="comment-body"]').value.trim();
      if(comment_text){
        const response = await fetch('api/comment',{
                method:'post',
                body:JSON.stringify({
                   post_id,
                   comment_text
                    }),
                headers:{
                 'Content-Type': 'application/json'
                 }
                  });
            if(response.ok){
                document.location.reload();
             }else{
           alert(response.statusText);
          }
       }
} 

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);