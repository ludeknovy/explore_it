// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview This file initializes the background page by loading a
 * ProxyErrorHandler, and resetting proxy settings if required.
 *
 * @author Mike West <mkwst@google.com>
 */
var id = 100;

 document.addEventListener("DOMContentLoaded", function () {
 	var errorHandler = new ProxyErrorHandler();

  // If this extension has already set the proxy settings, then reset it
  // once as the background page initializes.  This is essential, as
  // incognito settings are wiped on restart.
  var persistedSettings = ProxyFormController.getPersistedSettings();
  if (persistedSettings !== null) {
  	chrome.proxy.settings.set(
  		{'value': persistedSettings.regular});
  }
});

 chrome.extension.onMessage.addListener(function(request, sender,sendResponse) {
  if (request.name == 'json') {
//    jsonData = null;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var jsonData = this.responseText;
      sendResponse({url: jsonData});

    }
  };
    xhr.open("GET", chrome.extension.getURL('/src/data/explore-data.json'), true);
    xhr.send();
  }
 	else if (request.name == 'screenshot') {
 		chrome.tabs.captureVisibleTab(null, null, function(dataUrl) {


 			var viewTabUrl = chrome.extension.getURL('src/screenshot.html?id=' + id++)
 			var targetId = null;

 			chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
      // We are waiting for the tab we opened to finish loading.
      // Check that the tab's id matches the tab we opened,
      // and that the tab is done loading.
      if (tabId != targetId || changedProps.status != "complete")
      	return;

      // Passing the above test means this is the event we were waiting for.
      // There is nothing we need to do for future onUpdated events, so we
      // use removeListner to stop getting called when onUpdated events fire.
      chrome.tabs.onUpdated.removeListener(listener);

      // Look through all views to find the window which will display
      // the screenshot.  The url of the tab which will display the
      // screenshot includes a query parameter with a unique id, which
      // ensures that exactly one view will have the matching URL.
      var views = chrome.extension.getViews();
      for (var i = 0; i < views.length; i++) {
      	var view = views[i];
      	if (view.location.href == viewTabUrl) {
      		view.setScreenshotUrl(dataUrl);
      		break;
      	}
      }
  });

 			chrome.tabs.create({url: viewTabUrl}, function(tab) {
 				targetId = tab.id;
 			});
 		});
 	}
 	return true;
 });

