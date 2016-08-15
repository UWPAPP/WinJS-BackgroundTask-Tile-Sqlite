(function() {
  'use strict';
  var app = WinJS.Application;
  var activation = Windows.ApplicationModel.Activation;
  app.onactivated = function (args) {

    if (args.detail.kind === activation.ActivationKind.launch) {
        if (args.detail.kind === activation.ActivationKind.voiceCommand) {
            // TODO: Handle relevant ActivationKinds. For example, if your app can be started by voice commands,
            // this is a good place to decide whether to populate an input field or choose a different initial view.
        }
        else if (args.detail.kind === activation.ActivationKind.launch) {
            // A Launch activation happens when the user launches your app via the tile
            // or invokes a toast notification by clicking or tapping on the body.
            if (args.detail.arguments) {
                // TODO: If the app supports toasts, use this value from the toast payload to determine where in the app
                // to take the user in response to them invoking a toast notification.
            }
            else if (args.detail.previousExecutionState === activation.ApplicationExecutionState.terminated) {
                // TODO: This application had been suspended and was then terminated to reclaim memory.
                // To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
                // Note: You may want to record the time when the app was last suspended and only restore state if they've returned after a short period.
            }
        }
      args.setPromise(WinJS.UI.processAll().then(function() {
          // TODO: 在此放置代码。
          var nav = WinJS.Navigation;
          return nav.navigate(Application.navigator.home);
      }));
    }

    
  };
  app.oncheckpoint = function (args) {
    // TODO: 此应用程序将被挂起。请在此保存需要挂起中需要保存的任何状态。
    //你可以使用 WinJS.Application.sessionState 对象，该对象在挂起中会自动保存和还原。
    //如果需要在应用程序被挂起之前完成异步操作，请调用 args.setPromise()。
  };
  app.start();

 
}());







