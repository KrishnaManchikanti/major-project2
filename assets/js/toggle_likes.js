class toggleLike{
    constructor(toggleElement){
        this.toggler=toggleElement;
        this.toggleLike();
    }
    toggleLike(){
        $(this.toggler).click( (e)=>{
            e.preventDefault();
            let self=this;

            $.ajax({
                type:'POST',
                url:$(self).attr('href'),
            })
            .done( (data)=>{
                
            } )

        } );
    }
}