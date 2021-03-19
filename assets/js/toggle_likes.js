// const { toggleLike } = require("../../controlers/like_controller");

class ToggleLike{
    constructor(toggleElement){
        this.toggler= toggleElement;
        this.toggleLike();
    }
    
    toggleLike(){
        $(this.toggler).click( (e)=>{
            e.preventDefault();
            let self = this;

            $.ajax({
                type:'POST',
                url:$(self).attr('href')
            }).done( (data)=>{
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if(data.data.deleted==true){
                    likesCount-=1;
                }else{
                    likesCount+=1;
                }
                $(self).attr('data-likes',likesCount);
                $(self).html(`${likesCount}Likes`);
            } ).fail( (errData)=>{
                console.log('err in comp req',errData);
            } )
        } )

    }
}

    