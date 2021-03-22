{
    console.log("heykkekek");
    $('#changebutton').submit( (e)=>{
        e.preventDefault();
        console.log("i am here")
        $.ajax({
            type:'get',
            url:'/users/add-friend/',
        }).done((data)=>{
            console.log(data,"nits ");
            $('#changebutton').prop('value',removefriend);
        }).fail(function(errData) {
            console.log('error in completing the request',errData);
        });
    } )
}