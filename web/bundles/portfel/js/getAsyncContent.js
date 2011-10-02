getAsyncContent = function(urlToGet, destinationDiv, itemsClassToHide, actionToRunAfter) {
    //alert(urlToGet);
    var xmlHttp;
    try { xmlHttp = new XMLHttpRequest(); }
    catch (e) {
        try { xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {
            try { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); }
            catch (e) { return false; }
        }
    }

    if (typeof itemsClassToHide != 'undefined') $('.' + itemsClassToHide).hide();
    $('#' + destinationDiv).show();
    xmlHttp.open("GET", urlToGet, true);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
            var destinationDivRef;

            if (document.getElementById) {
                destinationDivRef = document.getElementById(destinationDiv);
            } else {
                destinationDivRef = document.all[destinationDiv];
            }

            var responseText = xmlHttp.responseText

            if (destinationDivRef != null)
                destinationDivRef.innerHTML = responseText;

            if (typeof actionToRunAfter != 'undefined') {
                actionToRunAfter(responseText);
            }
        }
    }
    xmlHttp.send(null);
    return false;
}
