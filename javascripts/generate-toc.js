function generateTOC(insertBefore, heading) {
    var container = jQuery("<div id='tocBlock'></div>");
    var div = jQuery("<ul id='toc'></ul>");
    var content = jQuery(insertBefore).first();

    if (heading != undefined && heading != null) {
        container.append('<span class="tocHeading"><b>' + heading + '</b></span>');
    }

    div.tableOfContents(content, {startLevel: 2});
    container.append(div);
    container.insertBefore(insertBefore);
}
