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
        $(svgElem).attr(
            "id",
            $(svgElem)
                .children("title")
                .text()
        );
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
    CreateSvgElementInContainer("assets/images/kiss.svg", "love");
    CreateSvgElementInContainer("assets/images/brusher.svg", "brusher");
    CreateSvgElementInContainer("assets/images/dancing.svg", "dancing");
    CreateSvgElementInContainer("assets/images/ashley.svg", "beauty");
    CreateSvgElementInContainer("assets/images/lisa.svg", "hands");
    CreateSvgElementInContainer("assets/images/ArastarOutline.svg", "logo");
    CreateSvgElementInContainer(
        "assets/images/persianstyle-1.svg",
        "persian-style"
    );
    CreateSvgElementInContainer(
        "assets/images/persianstyle-smile.svg",
        "persian-smile"
    );
    CreateSvgElementInContainer(
        "assets/images/persianstyle-sky.svg",
        "persian-sky"
    );

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

        if ($(svgElem).find("g.glow").length > 0) {
            var filterId = "glow-" + svgElem.id;
            if ($(svgElem).find("#" + filterId).length == 0) {
                var svg = d3.select(svgElem);
                var viewBox = svgElem.getAttribute("viewBox").split(" ");
                viewBox[0] = parseInt(viewBox[0]) - 20;
                viewBox[1] = parseInt(viewBox[1]) - 20;
                viewBox[2] = 20 + parseInt(viewBox[2]);
                viewBox[3] = 20 + parseInt(viewBox[3]);
                svgElem.setAttribute("viewBox", viewBox.join(" "));
                var filter = svg
                    .append("filter")
                    .attr("id", filterId)
                    .attr("x", "-.3")
                    .attr("y", "-.3")
                    .attr("height", "1.5")
                    .attr("width", "1.5");
                filter
                    .append("feMorphology")
                    .attr("in", "SourceGraphic")
                    .attr("operator", "dilate")
                    .attr("radius", "9");
                filter
                    .append("feGaussianBlur")
                    .attr("stdDeviation", "10")
                    .attr("result", "coloredBlur");
                var feTransfer = filter.append("feComponentTransfer");

                var alpha = feTransfer
                    .append("feFuncA")
                    .attr("type", "linear")
                    .attr("slope", 0);
                var feMerge = filter.append("feMerge");
                feMerge.append("feMergeNode");
                feMerge.append("feMergeNode").attr("in", "SourceGraphic");
                alpha
                    .attr("slope", 0)
                    .transition()
                    .duration(3000)
                    .ease(d3.easeLinear)
                    .attr("slope", .5);
            }

            $(svgElem).queue("paths", function() {
                $(svgElem).find("g.glow").attr("filter", "url(#" + filterId + ")");
                // var alpha = d3.select($(svgElem).find("feFuncA")[0]);
            });
        }
    });
    $("#carousel").on("slide.bs.carousel", function() {
        var lastSvg = $("#carousel")
            .find(".active")
            .find("svg")[0];
        $(lastSvg)
            .clearQueue("paths")
            .finish();
        if ($(lastSvg).find("g.glow").length > 0) {
            $(lastSvg)
                .find("g.glow")
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
