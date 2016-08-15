//// THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
//// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//// PARTICULAR PURPOSE.
////
//// Copyright (c) Microsoft Corporation. All rights reserved

(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("/scenario1_JavascriptBackgroundTask.html", {
        ready: function (element, options) {
            document.getElementById("registerBackgroundTask").addEventListener("click", registerJavaScriptBackgroundTask);
            document.getElementById("unregisterBackgroundTask").addEventListener("click", unregisterJavaScriptBackgroundTask);
            document.getElementById("registerTile").addEventListener("click", pinLiveTile);
            document.getElementById("updateTile").addEventListener("click", sendTileNotification);
        }
    });


    //register timetrigger backgroundtask
    function registerJavaScriptBackgroundTask() {
        BackgroundTaskSample.registerBackgroundTask(BackgroundTaskSample.javaScriptBackgroundTaskEntryPoint,
                                                    BackgroundTaskSample.javaScriptBackgroundTaskName,
                                                    new Windows.ApplicationModel.Background.TimeTrigger(15, false),
                                                    null);
    }

    //unregister timertrigger backgroundtask
    function unregisterJavaScriptBackgroundTask() {
        BackgroundTaskSample.unregisterBackgroundTasks(BackgroundTaskSample.javaScriptBackgroundTaskName);
    }


    //下需要被保存
    var liveTileId = "11111";
    //create tile
    function pinLiveTile() {
        var square150x150Logo = new Windows.Foundation.Uri("ms-appx:///Images/square150x150Tile-sdk.png");
        var wide310x150Logo = new Windows.Foundation.Uri("ms-appx:///Images/wide310x150Tile-sdk.png");

        //this message will pass to the launch page
        var tileActivationArguments = liveTileId + " WasPinnedAt=" + new Date();

        // Create the secondary tile just like we did in pinTile scenario.
        // Provide a wideLogo since wide tiles have a few more templates available for notifications
        var tile = new Windows.UI.StartScreen.SecondaryTile(liveTileId,
                                                            "A Live Secondary Tile",
                                                            tileActivationArguments,
                                                            square150x150Logo,
                                                            Windows.UI.StartScreen.TileSize.wide310x150);
        // Adding the wide tile logo.
        tile.visualElements.wide310x150Logo = wide310x150Logo;

        // The display of the app name can be controlled for each tile size.
        // The default is false.
        tile.visualElements.showNameOnSquare150x150Logo = true;
        tile.visualElements.showNameOnWide310x150Logo = true;

        // Specify a foreground text value.
        // The tile background color is inherited from the parent unless a separate value is specified.
        tile.visualElements.foregroundText = Windows.UI.StartScreen.ForegroundText.light;


        tile.requestCreateForSelectionAsync({ x: 0, y: 0, width: 0, height:0 }, Windows.UI.Popups.Placement.below).done(function (isCreated) {
            if (isCreated) {
                console.log("Secondary tile was successfully pinned.", "sample", "status");
            } else {
                console.log("Secondary tile was not pinned.", "sample", "error");
            }
        });
    }


    function sendTileNotification() {
        // We can only send a notification for a tile that is pinned. So let's make sure the tile is pinned before we try to send the notification.
        if (Windows.UI.StartScreen.SecondaryTile.exists(liveTileId)) {
            // Note: This sample contains an additional reference, NotificationsExtensions, which you can use in your own apps
            var tileContent = NotificationsExtensions.TileContent.TileContentFactory.createTileWide310x150Text04();
            tileContent.textBodyWrap.text = "Sent to a secondary tile from NotificationsExtensions";
            console.log(tileContent);

            var squareTileContent = NotificationsExtensions.TileContent.TileContentFactory.createTileSquare150x150Text04();
            squareTileContent.textBodyWrap.text = "Sent to a secondary tile from NotificationsExtensions";
            tileContent.square150x150Content = squareTileContent;

            // instead of creating a tileUpdater for the application, create one for the secondary tile and pass in the secondary tileId
            Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForSecondaryTile("11111").update(tileContent.createNotification());
        } else {
           
        }
    }


})();

