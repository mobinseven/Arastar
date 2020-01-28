$.get("ArastarGold.svg", function(svg) {
    $("#intro").append(svg.documentElement);
});

window.CreateSvgElementInContainer = function(url, ContainerId) {
    var svgElem = null;
    $.get(url, function(svg) {
        svgElem = svg.documentElement;
        // $(svgElem).find("g").attr("filter","url(#inset)");
        $(svgElem)
            .find("path")
            .each(function() {
                var path = this;
                $(path).css("stroke-width", 2);
                //if (path.style.filter != "")
                //    return;
                $(path).removeAttr("class");
                $(path).attr("fill", "none");
                var length = path.getTotalLength();
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = length;
                $(path).css("stroke", "#D4A440");
                //     $(path).css("animation", "glow 5s infinite 2s ease");
            });
        $(svgElem)
            .children("title")
            .remove();
        $("#" + ContainerId).append(svgElem);
    });
};
$(document).ready(function() {
    // CreateSvgElementInContainer("assets/images/selfie.svg", "selfie");
    // CreateSvgElementInContainer("assets/images/jenner.svg", "jenner");
    // CreateSvgElementInContainer("assets/images/lima.svg", "lima");
    CreateSvgElementInContainer("assets/images/couple.svg", "Mk2");
    CreateSvgElementInContainer("assets/images/brusher.svg", "brusher");
    CreateSvgElementInContainer("assets/images/dancing2.svg", "dancing");
    CreateSvgElementInContainer("assets/images/ashley.svg", "ashley");
    CreateSvgElementInContainer("assets/images/lisa.svg", "lisa");
    CreateSvgElementInContainer("assets/images/ArastarOutline.svg", "logo");

    $("#carousel").on("slid.bs.carousel", function() {
        var svgElem = $("#carousel")
            .find(".active")
            .find("svg")[0];
        var pathsCount = $(svgElem).find("path").length;
        $(svgElem)
            .find("path")
            .each(function() {
                var path = this;
                $(svgElem).queue("paths", function() {
                    $(path).animate(
                        { "stroke-dashoffset": 0 },
                        {
                            duration: 3000 / pathsCount,
                            complete: function() {
                                $(svgElem).dequeue("paths");
                            }
                        }
                    );
                });
                // $(this).css("animation", "dash 5s linear forwards");
                // this.style.WebkitAnimation = "dash 5s linear forwards";
                // this.style.animation = "dash 5s linear forwards";
            });
        $(svgElem).dequeue("paths");
        // var first = $("#carousel")
        //     .find(".active")
        //     .find("svg")
        //     .find("path")[0];

        $(svgElem).queue("paths", function() {
            if ($(svgElem).find("defs>filter").length > 0) {
                $(svgElem).find(
                    "defs>filter#inset>:nth-child(6)"
                )[0].style.WebkitAnimation = "glow 10s infinite 2s ease";
                $(svgElem).find(
                    "defs>filter#inset>:nth-child(6)"
                )[0].style.animation = "glow 10s infinite 2s ease";
                $(svgElem)
                    .find("g")
                    .attr("filter", "url(#inset)");
            }
        });
    });
    $("#carousel").on("slide.bs.carousel", function() {
        var lastSvg = $("#carousel")
            .find(".active")
            .find("svg")[0];
        $(lastSvg)
            .clearQueue("paths")
            .finish();
        if ($(lastSvg).find("defs>filter").length > 0) {
            $(lastSvg).find(
                "defs>filter#inset>:nth-child(6)"
            )[0].style.WebkitAnimation = "";
            $(lastSvg).find(
                "defs>filter#inset>:nth-child(6)"
            )[0].style.animation = "";
            $(lastSvg)
                .find("g")
                .attr("filter", "");
        }
        $(lastSvg)
            .find("path")
            .each(function() {
                // if (this.style.filter != "")
                //     return;
                $(this)
                    .clearQueue()
                    .finish();
                this.style.strokeDashoffset = this.getTotalLength();
                // $(this).css("animation", "");
            });
    });
});
