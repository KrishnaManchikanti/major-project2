{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
    let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button"  href="/posts/destroy/${ post._id }">X</a>
                        </small>
                       
                        ${ post.content }
                        <br>
                        <small>
                        ${ post.user.email }
                        </small>
                    </p>
                    <div class="post-comments">
                        
                            <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${ post._id }" >
                                <input type="submit" value="Add Comment">
                            </form>
               
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                        </div>
                    </div>
                    
                </li>`)
    }


    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
    
    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }

    createPost();
    convertPostsToAjax();
}




// {
//     let createPost = ()=>{       
//         let newPostForm = $('#new-post-form');
//         newPostForm.submit( (e)=>{
//             e.preventDefault();
//             //using ajax for manual submission
//             $.ajax({
//                 type:'post',
//                 url:'/posts/create',
//                 data: newPostForm.serialize(),//converting into ajax form key as content, value as text
//                 success:(data)=>{
//                     console.log(data.data.post);
//                     let newPost= newPostDom(data.data.post);
//                     $('#posts-list-container').prepend(newPost);
//                     deletePost($(' .delete-post-button', newPost));//space 

//                     new PostComments(data.data.post._id);
//                     new Noty({
//                         theme: 'relax',
//                         text: "Post published!",
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500
                        
//                     }).show();

//                 },
//                 error:(error)=>{
//                     console.log(error.responceText);
//                 }
//             });
//         } );
//     };
    


//     // method to create a post in DOM
//     let newPostDom = (post)=>{
//         return $(`
//         <li id="post-${post._id}">
        
//             <small>
//                 <a class='delete-post-button' href="/posts/destroy/${post._id}">X</a>
//             </small>
        
//         ${post.content}
        
//         <small>
//             <!-- the id in the user(post) is replaced by actual user -->
//             ${post.user.email}
//         </small>
//         <div class="post-comments">
//                 <form action="/comments/create" id="new-comment-form" method="POST">
//                     <input type="text" name="content" placeholder="add comment.." required>
//                     <input type="hidden" name="post" value="${post._id}">
//                     <input type="submit" value="add comment">
//                 </form>

//             <div class="post-comments-list">
                
//                 <ul id="post-comments-${post._id}">
                    
//                 </ul>
//             </div>
//     </div>
//     </li>
//         `);
//     } 


//     //method to delete a post from DOm

//     let deletePost = (deleteLink)=>{
        
//         $(deleteLink).click((e)=>{
//             e.preventDefault();
//             $.ajax({
//                 type:'get',
//                 url:$(deleteLink).prop('href'),//to get value of a link
//                 success:(data)=>{
//                     console.log(data);
//                     $(`#post-${data.data.post_id}`).remove();
//                     new Noty({
//                         theme: 'relax',
//                         text: "Post removed!",
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500
                        
//                     }).show();
//                 },
//                 error:(err)=>{
//                     console.log(error.responceText);
//                 }
//             });
//         })
//     }

// // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
//     let convertPostsToAjax = function(){
//         $('#posts-list-container>ul>li').each(function(){
//             let self = $(this);
//             let deleteButton = $(' .delete-post-button', self);
//             deletePost(deleteButton);

//             // get the post's id by splitting the id attribute
//             let postId = self.prop('id').split("-")[1]
//             new PostComments(postId);
//         });
//     }
//     createPost();
//     convertPostsToAjax();

   
// }