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

window.CreateSvgElementInContainer = function (url, ContainerId) {
    var svgElem = null;
    $.get(url, function (svg) {
        svgElem = svg.documentElement;
        $(svgElem).addClass("sticky");
        $(svgElem).find("path").each(function () {
            var path = this;
            var length = path.getTotalLength();
            // The start position of the drawing
            path.style.strokeDasharray = length;
            // Hide the triangle by offsetting dash. Remove this line to show the triangle before scroll draw
            path.style.strokeDashoffset = length;
            $(path).css("stroke", "#D4A440");

        });
        $(svgElem).children("title").remove();
        $("#" + ContainerId).append(svgElem);
        io.observe($(svgElem)[0]);
    });
};
var OldPercent = 0;
$(document).ready(function () {

    CreateSvgElementInContainer("assets/images/ashley.svg", "ashley");
    CreateSvgElementInContainer("assets/images/selfie.svg", "selfie");
    CreateSvgElementInContainer("assets/images/jenner.svg", "jenner");
    CreateSvgElementInContainer("assets/images/lima.svg", "lima");
    CreateSvgElementInContainer("assets/images/Mk2.svg", "Mk2");
    CreateSvgElementInContainer("assets/images/brusher.svg", "brusher");

    $(window).on("scroll", function () {
        $(".isSticked").each(function () {
            var container = $(this).parents('.sticky-container');
            var NewPercent = Math.trunc(130 * ($(window).scrollTop() - $(container).offset().top) / ($(container).height() - $(window).height()));

            if (OldPercent > NewPercent && NewPercent < 10) NewPercent = 0;
            if (OldPercent < NewPercent && NewPercent > 70) NewPercent = 100;
            NewPercent = NewPercent / 100;//Math.trunc(NewPercent / 10) / 10;
            if (NewPercent > 1 || NewPercent < 0) return;
            if (OldPercent == NewPercent) return;
            //console.log("N " + NewPercent + " O " + OldPercent);
            $(this).find("path").each(function () {
                var path = this;
                $(path).animate({ "stroke-dashoffset": path.getTotalLength() * (1 - NewPercent) }, {
                    queue: false,
                    duration: 500,
                });
            });
            OldPercent = NewPercent;
        });
    });
});