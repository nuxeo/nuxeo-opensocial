/**
 * jQuery plugin to easily integrate OpenSocial gadgets in your page.
 *
 * Example:
 *
 *   $(document).ready(function() {
 *     $('.gadgets').openSocialGadget({
 *       baseURL: '${baseURL}',
 *       gadgetSpecs: ['http://www.labpixies.com/campaigns/todo/todo.xml',
 *         'http://localhost:8080/nuxeo/site/gadgets/lastdocuments/lastdocuments.xml']
 *     });
 *   })
 *
 * This will take all elements matching the class 'gadgets', and will load the
 * 'http://www.labpixies.com/campaigns/todo/todo.xml' gadget in the first one
 * and 'http://localhost:8080/nuxeo/site/gadgets/lastdocuments/lastdocuments.xml'
 * in the second one.
 *
 */

(function($){

  var currentGlobalGadgetIdIndex = 0;

  $.fn.openSocialGadget = function(options) {

    var settings = {
      'baseURL'     : 'http://localhost:8080/nuxeo/',
      'language'    : 'ALL',
      'gadgetSpecs' : [],
      'titles'      : [],
      'shindigServerSuffix' : 'opensocial/gadgets/',
      'secureTokenSuffix' : 'site/gadgets/securetoken'
    };

    if (options) {
      $.extend(settings, options);
    }

    var elements = this;
    var currentGadgetIdIndex = currentGlobalGadgetIdIndex;
    currentGlobalGadgetIdIndex  += settings.gadgetSpecs.length;
    // get the secure tokens for each gadget
    $.post(settings.baseURL + settings.secureTokenSuffix, { 'gadgetSpecUrls[]': settings.gadgetSpecs },
      function(data) {
        function generateId() {
          return 'opensocial-gadget-' + currentGadgetIdIndex++;
        }

        var secureTokens = data.split(",");
        var chromeIds = [];
        var createdGadgets = [];

        var index = 0;
        elements.each(function() {
          if (index >= settings.gadgetSpecs.length) {
            // no more gadget spec URL
            return this;
          }

          gadgets.container.setLanguage(settings.language);
          var gadget = gadgets.container.createGadget({specUrl: settings.gadgetSpecs[index]});
          gadget.serverBase_ = settings.baseURL + settings.shindigServerSuffix;
          gadget.secureToken = secureTokens[index];
          if (index < settings.titles.length) {
            gadget.title = settings.titles[index];
          }
          gadgets.container.addGadget(gadget);
          createdGadgets.push(gadget);
          var id = $(this).attr('id');
          if (id.length == 0) {
            id = generateId();
            $(this).attr('id', id);
          }
          chromeIds.push(id);
          index++;
        });

        gadgets.container.layoutManager.pushGadgetChromeIds(chromeIds);

        var length = createdGadgets.length;
        for (var i = 0; i < length; ++i) {
          gadgets.container.renderGadget(createdGadgets[i]);
        }
    });

    return this;
  };
})(jQuery);