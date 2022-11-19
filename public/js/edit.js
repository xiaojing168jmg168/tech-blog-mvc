const editFormHandler = async function(event){

    event.preventDefault();

    const titleEl = document.getElementById('post-title');
    const contentEl = document.getElementById('post-content');
    const postId = document.getElementById('post-id');
     
     fetch('/api/post/' + postId.value,{
        method: "put",
        body:JSON.stringify({
          title: titleEl.value,
          content: contentEl.value
        }),
      headers: { "Content-Type": "application/json"}
     })
      .then(function() {
            document.location.replace("/dashboard");
        })
        .catch(err => console.log(err))

}

document.querySelector("#edit-post-form").addEventListener("submit", editFormHandler);