//***********************TEST IF JS IS LINKED****************************/
// alert("Hi there!");
$(document).ready(function () {
    $(".quiz, .monsters, .about").click(function (e) {

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


    $(".quizbutton").on("click", function () {
        $(".quizbutton").removeClass("active");
        $(this).addClass("active");
    })

    $('#submit').click(function () {
        if (!$("input[name='answer']:checked").val()) {
            alert('Nothing is checked!');
            return false;
        }
    })
})
