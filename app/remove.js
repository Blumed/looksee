    //Remove image wrapper
    var $imageWrapperz = $('img.borderererzzz');

    if($imageWrapperz){
    	console.log('true');
        $imageWrapperz.unwrap('<span class="img-shadow"></span>');
    }
    $('*').removeClass('borderererzzz shaderererzzz bothemememzzz');