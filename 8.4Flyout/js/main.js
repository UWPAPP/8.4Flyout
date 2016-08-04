// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509

(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;
	var isFirstActivation = true;

	app.onactivated = function (args) {
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

		if (!args.detail.prelaunchActivated) {
			// TODO: If prelaunchActivated were true, it would mean the app was prelaunched in the background as an optimization.
			// In that case it would be suspended shortly thereafter.
			// Any long-running operations (like expensive network or disk I/O) or changes to user state which occur at launch
			// should be done here (to avoid doing them in the prelaunch case).
			// Alternatively, this work can be done in a resume or visibilitychanged handler.
		}

		if (isFirstActivation) {
			// TODO: The app was activated and had not been running. Do general startup initialization here.
			document.addEventListener("visibilitychange", onVisibilityChanged);
			args.setPromise(WinJS.UI.processAll());
		}

		isFirstActivation = false;
	};

	function onVisibilityChanged(args) {
		if (!document.hidden) {
			// TODO: The app just became visible. This may be a good time to refresh the view.
		}
	}

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};

	app.start();

    //是否购买
	var bought;

    //点击了购买按钮的事件
	function showConfirmFlyout() {
	    bought = false;
	    log("");

	    var buyButton = document.getElementById("buyButton");
        //让flyout自己显示出来
	    document.getElementById("confirmFlyout").winControl.show(buyButton);
	}

    // 确认购买按钮
	function confirmOrder() {
	    bought = true;
	    log("You have completed your purchase.");
        //隐藏flyout控件
	    document.getElementById("confirmFlyout").winControl.hide();
	}

    // On dismiss of the flyout, determine if it closed because the user pressed the buy button. If not, then the
    // flyout was light dismissed.
	function onDismiss() {
	    if (!bought) {
	        log("The purchase was not completed.");
	    }
	}

	function log(message) {
	    document.getElementById("status").textContent = message;
	}

	WinJS.UI.processAll().then(function () {
        //购买按钮绑定事件
	    document.getElementById("buyButton").addEventListener("click", showConfirmFlyout, false);
        //购买确认按钮绑定事件
	    document.getElementById("confirmButton").addEventListener("click", confirmOrder, false);
        //flyout绑定事件
	    document.getElementById("confirmFlyout").addEventListener("afterhide", onDismiss, false);
	});




})();
