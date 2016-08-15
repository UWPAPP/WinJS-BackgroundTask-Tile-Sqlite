


(function () {
    "use strict";
    importScripts("/lib/winjs/js/base.js");
    importScripts("/js/SQLiteHelper.js");


    var cancel = false,
        progress = 0,
        backgroundTaskInstance = Windows.UI.WebUI.WebUIBackgroundTaskInstance.current,
        cancelReason = "";

    console.log("Background " + backgroundTaskInstance.task.name + " Starting...");

    var cost = Windows.ApplicationModel.Background.BackgroundWorkCost.currentBackgroundWorkCost;
    Windows.Storage.ApplicationData.current.localSettings.values["BackgroundWorkCost"] = cost.toString();

    function onCanceled(cancelEventArg) {
        cancel = true;
        cancelReason = cancelEventArg;
    }
    backgroundTaskInstance.addEventListener("canceled", onCanceled);



    var index = 1;
    function Sendrequest() {
        var newIndex = "page=" + index;
        var url = "https://api.stackexchange.com/2.2/questions?page=1&pagesize=10&order=desc&sort=activity&tagged=JavaScript%20&site=stackoverflow&filter=!b0OfNHmVEQ99nL";
        var newUrl = url.replace("page=1", newIndex);
        var msg = "tagged=windows-10%3Buwp";

        newUrl = newUrl.replace("tagged=JavaScript%20", msg);
        console.log(newUrl);

        var options = {
            url: newUrl,
            type: 'get',
        };

        var request = WinJS.xhr(options).done(
            function complete(request) {
                //发送磁贴通知
                sendTileNotification();
                createDB();
                //解析请求数据
                var response = JSON.parse(request.responseText);
                response.items.forEach(function (e) {
                    
                })
            },
            function error(request) {
                close();
            },
            function progress(request) {
                if (cancel) {
                    request.cancel();
                }  
            }
        );
    }

    function sendTileNotification() {
        var liveTileId = "11111";
        // We can only send a notification for a tile that is pinned. So let's make sure the tile is pinned before we try to send the notification.
        if (Windows.UI.StartScreen.SecondaryTile.exists(liveTileId)) {
            // Note: This sample contains an additional reference, NotificationsExtensions, which you can use in your own apps
            var tileContent = NotificationsExtensions.TileContent.TileContentFactory.createTileWide310x150Text04();
            tileContent.textBodyWrap.text = "Sent to a secondary tile from NotificationsExtensions";

            var squareTileContent = NotificationsExtensions.TileContent.TileContentFactory.createTileSquare150x150Text04();
            squareTileContent.textBodyWrap.text = "Sent to a secondary tile from NotificationsExtensions";
            tileContent.square150x150Content = squareTileContent;

            // instead of creating a tileUpdater for the application, create one for the secondary tile and pass in the secondary tileId
            Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForSecondaryTile("11111").update(tileContent.createNotification());
        } else {

        }
    }

    function createDB() {
        // Create the request to open the database, named BookDB. If it doesn't exist, create it.
        var database;

        SQLite.Database.openDatabaseInFolderAsync(Windows.Storage.ApplicationData.current.roamingFolder, "BookDB.sqlite").then(
            function (openedOrCreatedDatabase) {
                database = openedOrCreatedDatabase;
                return SQLiteHelper.executeStatementsAsTransactionAsync(database, [
                    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY UNIQUE, title TEXT, authorid INTEGER);",
                    "CREATE TABLE IF NOT EXISTS authors (id INTEGER PRIMARY KEY UNIQUE, name TEXT);",
                    "CREATE TABLE IF NOT EXISTS checkout (id INTEGER PRIMARY KEY UNIQUE, status INTEGER);"
                ]);
            }).then(function () {
                if (SQLiteHelper.database) {
                    SQLiteHelper.database.close();
                    SQLiteHelper.database = null;
                }
                SQLiteHelper.database = database;
                database = null;


                //insert data
                insert();
            },
            function (err) {
                if (database) {
                    database.close();
                    database = null;
                }
                WinJS.log && WinJS.log("Database open failure: " + err, "sample", "error");
            });
    }

    function insert() {
        var statements = [
	         {
	             statement: "INSERT OR REPLACE INTO checkout VALUES (?, ?);",
	             parameters: ["1", 333]
	         },
             {
                 statement: "INSERT OR REPLACE INTO checkout VALUES (?, ?);",
                 parameters: ["2", 334]
             },
             {
                 statement: "INSERT OR REPLACE INTO checkout VALUES (?, ?);",
                 parameters: ["3", 335]
             },
             {
                 statement: "INSERT OR REPLACE INTO checkout VALUES (?, ?);",
                 parameters: ["4", 336]
             },
             {
                 statement: "INSERT OR REPLACE INTO checkout VALUES (?, ?);",
                 parameters: ["5", 337]
             }
        ]

        return SQLiteHelper.bindAndExecuteStatementsAsTransactionAsync(SQLiteHelper.database, statements).then(function () {
            close();
        });
    }

    Sendrequest();
})();



