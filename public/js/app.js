// //***********************TEST IF JS IS LINKED****************************/
// alert("Hi there!");

$(".quiz, .monsters").click(function (e) {

    $(".banner").addClass("animate__fadeOutUpBig");

    $(".hone").removeClass("animate__delay-2s animate__slow");
    $(".hone").addClass("animate__fadeOut");

    $(".logo").removeClass("animate__delay-1s animate__slower");
    $(".logo").addClass("animate__fadeOut");

    $(".button").removeClass("animate__delay-3s animate__slow");
    $(".button").addClass("animate__fadeOut");

    e.preventDefault();
    setTimeout(function (url) {
        window.location = url
    }, 1000, this.href);
});

$('#submit').click(function(){
    if (!$("input[name='answer']:checked").val()) {
       alert('Nothing is checked!');
        return false;
    }
});
