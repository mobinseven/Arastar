var io = new IntersectionObserver(
    entries => {
        entries.forEach(e => {
            if (e.intersectionRatio > .75) {
                e.target.classList.add('isSticked');
            }
            else {
                e.target.classList.remove('isSticked');
            }
        });
    },
    {
        threshold: [.75, 1]
        /* Using default options. Details below */
    }
);
$.get("ArastarGold.svg", function (svg) {
    $("#intro").append(svg.documentElement);
});
var list = ["assets/images/ashley.svg", "assets/images/jenner.svg", "assets/images/lima.svg", "assets/images/selfie.svg"];
list.forEach(image => {
    $.get(image, function (svg) {
        var container = $('<div class="sticky-container"></div>').append(svg.documentElement);
        var svgElem = $(container).children("svg");
        $(svgElem).addClass("sticky");
        io.observe($(svgElem)[0]);
        $(svgElem).find("path").each(function () {
            var path = this;
            var length = path.getTotalLength();
            // The start position of the drawing
            path.style.strokeDasharray = length;
            // Hide the triangle by offsetting dash. Remove this line to show the triangle before scroll draw
            path.style.strokeDashoffset = length;
        });
        $("#main").append(container);
    });
});
var OldPercent = 0;
$(document).ready(function () {
    $(window).on("scroll", function () {
        $(".isSticked").each(function () {
            var container = $(this).parents('.sticky-container');
            var NewPercent = Math.trunc(100 * ($(window).scrollTop() - $(container).offset().top) / ($(container).height() - $(window).height()));

            if (OldPercent > NewPercent && NewPercent < 10) NewPercent = 0;
            NewPercent = Math.trunc(NewPercent / 10) / 10;
            if (NewPercent > 1 || NewPercent < 0) return;
            if (OldPercent == NewPercent) return;
            console.log("N " + NewPercent + " O " + OldPercent);
            $(this).find("path").each(function () {
                var path = this;
                //$(path).css("stroke-dashoffset", path.getTotalLength() * (1 - NewPercent));
                $(path).animate({ "stroke-dashoffset": path.getTotalLength() * (1 - NewPercent) }, {
                    queue: false,
                    duration: 100,
                });
            });
            OldPercent = NewPercent;
        });
    });
});