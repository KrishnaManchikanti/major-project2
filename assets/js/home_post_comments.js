class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);
        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }

    createComment(postId){
        
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
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


    newCommentDom(comment){
        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`<li id="comment-${ comment._id }">
                        <p>
                            
                            <small>
                                <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                            </small>
                            
                            ${comment.content}
                            <br>
                            <small>
                                ${comment.user.email}
                            </small>

                            <small>
                        <a class="toogle-like-button" data-likes="0" href="/likes/toggle/?id=${cooment._id}&type=Comment" >
                            0 Likes
                        </a>
                            </small>
                        </p>    

                </li>`);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
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
}
    // let createComment = ()=>{       
    //     let newCommentForm = $('#new-comment-form');
        
    //     newCommentForm.submit( (e)=>{
    //         e.preventDefault();
    //         //using ajax for manual submission
    //         $.ajax({
    //             type:'post',
    //             url:'/comments/create',
    //             data: newCommentForm.serialize(),
    //             success:(data)=>{
    //                 console.log(data.data);
    //                 let newComment= newCommentDom(data.data);
                    
    //                 $('#post-comments-list').prepend(newComment);
    //             },
    //             error:(error)=>{
    //                 console.log('error');
    //             }
    //         });
            
    //     } );
    // };

    // let newCommentDom = (comments)=>{
    //     return $(`
    //         <p>
    //             <li>${ comments.content}</li>
    //             <small><a href="/comments/destroy/${comments.id}">X</a></small>
    //         </p>
    //     `);
    // }