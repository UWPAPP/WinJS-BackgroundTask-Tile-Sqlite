//// THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
//// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//// PARTICULAR PURPOSE.
////
//// Copyright (c) Microsoft Corporation. All rights reserved

var BackgroundTaskSample = {
    "javaScriptBackgroundTaskEntryPoint": "\js\\backgroundtask.js",
    "javaScriptBackgroundTaskName": "SampleJavaScriptBackgroundTask",

    "registerBackgroundTask": function (taskEntryPoint, taskName, trigger, condition) {
        //Requests that the app be permitted to run background tasks
        Windows.ApplicationModel.Background.BackgroundExecutionManager.requestAccessAsync();

        var builder = new Windows.ApplicationModel.Background.BackgroundTaskBuilder();

        builder.name = taskName;
        builder.taskEntryPoint = taskEntryPoint;
        builder.setTrigger(trigger);

        if (condition !== null) {
            builder.addCondition(condition);
            builder.cancelOnConditionLoss = true;
        }

        var task = builder.register();

        //register the call-back method of backgroundtask
        BackgroundTaskSample.attachProgressAndCompletedHandlers(task);
    },

   
    // Unregister all background tasks with given name.
    "unregisterBackgroundTasks": function (taskName) {
        var iter = Windows.ApplicationModel.Background.BackgroundTaskRegistration.allTasks.first();
        var hascur = iter.hasCurrent;
        while (hascur) {
            var cur = iter.current.value;
            //if (cur.name === taskName) {
            //    cur.unregister(true);
            //    BackgroundTaskSample.updateBackgroundTaskStatus(taskName, false);
            //}
            cur.unregister(true);
            hascur = iter.moveNext();
        }
    },

    //
    // Associate progress and completed event handlers with the  background task.
    //
    "attachProgressAndCompletedHandlers": function (task) {
        //task.addEventListener("progress", new BackgroundTaskSample.progressHandler(task).onProgress);
        //task.addEventListener("completed", new BackgroundTaskSample.completeHandler(task).onCompleted);
    },


    //
    // Handle background task progress.
    //
    "progressHandler": function (task) {
        this.onProgress = function (args) {
            try {
                var settings = Windows.Storage.ApplicationData.current.localSettings;
                var progress = "Progress: " + args.progress + "%";

                switch (task.name) {
                    
                }
            } catch (ex) {
            }
        };
    },


    //
    // Handle background task completion.
    //
    "completeHandler": function (task) {
        this.onCompleted = function (args) {
            try {
                switch (task.name) {
                    
                }
            } catch (ex) {
            }
        };
    }
};
