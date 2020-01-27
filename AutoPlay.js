
$.get("ArastarGold.svg", function (svg) {
    $("#intro").append(svg.documentElement);
});

window.CreateSvgElementInContainer = function (url, ContainerId) {
    var svgElem = null;
    $.get(url, function (svg) {
        svgElem = svg.documentElement;
        //$(svgElem).addClass("sticky");
        $(svgElem).find("path").each(function () {
            var path = this;
            $(path).css("stroke-width", 1);
            if (path.style.filter != "")
                return;
            $(path).removeAttr("class");
            $(path).attr("fill", "none");
            var length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            $(path).css("stroke", "#D4A440");
            //     $(path).css("animation", "glow 5s infinite 2s ease");
        });
        $(svgElem).children("title").remove();
        $("#" + ContainerId).append(svgElem);
    });
};
$(document).ready(function () {
    // CreateSvgElementInContainer("assets/images/selfie.svg", "selfie");
    // CreateSvgElementInContainer("assets/images/jenner.svg", "jenner");
    // CreateSvgElementInContainer("assets/images/lima.svg", "lima");
    CreateSvgElementInContainer("assets/images/Mk2.svg", "Mk2");
    CreateSvgElementInContainer("assets/images/brusher.svg", "brusher");
    CreateSvgElementInContainer("assets/images/dancing2.svg", "dancing");
    CreateSvgElementInContainer("assets/images/ashley.svg", "ashley");
    CreateSvgElementInContainer("assets/images/lisa.svg", "lisa");
    CreateSvgElementInContainer("assets/images/ArastarOutline.svg", "ArastarOutline");

    $('#carousel').on('slid.bs.carousel', function () {
        $('#carousel').find('.active').find('svg').find('path').each(function () {
            $(this).animate({ "stroke-dashoffset": 0 }, {
                queue: true,
                duration: 5000,
            });
        });
    });
    $('#carousel').on('slide.bs.carousel', function () {
        var lastSvg = $('#carousel').find('.active').find('svg')[0];
        $(lastSvg).find('path').each(function () {
            if (this.style.filter != "")
                return;
            $(this).clearQueue().finish();
            this.style.strokeDashoffset = this.getTotalLength();

        });
    });
});