// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#ff4333'}, function() {
    console.log('The color is red.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

let list = []
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  if (/studentcourse\?/.test(sender.url)) {
    list = request.list
    console.log('收到来自list的消息');
    sendResponse('已经收到list');
  }
  if (/studentstudy\?/.test(sender.url)) {
    console.log('收到来自play的消息');
    sendResponse(list);
  }
});