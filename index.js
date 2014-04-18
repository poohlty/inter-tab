/**
 * Constructor for the inter-tab manager
 *
 * @param {Object} options
 * @api public
 */

function Manager(opts) {
	this.id = Math.random();

	var currentTabIds = localStorage.tabIds;
	var tabIds;

	if (currentTabIds) {
		tabIds = JSON.parse(currentTabIds);
		tabIds.push(this.id);
	} else {
		tabIds = [this.id];
	}

	try {
        localStorage.setItem('tabIds', JSON.stringify(tabIds));
    } catch (error) {}

	// Listen to event when tab is closed or storage changes
	window.addEventListener('storage', this, false);
	window.addEventListener('unload', this, false);
}

Manager.prototype.destroy = function () {
	var currentTabIds = localStorage.tabIds;
	var tabIds = JSON.parse(currentTabIds);

	// Remove the current tabIds from storage array
	var index = tabIds.indexOf(this.id);
    tabIds.splice(index, 1);

	try {
        localStorage.setItem('tabIds', JSON.stringify(tabIds));
    } catch (error) {}

    window.removeEventListener( 'storage', this, false );
    window.removeEventListener( 'unload', this, false );
};

Manager.prototype.getIds = function () {
	var currentTabIds = localStorage.tabIds;
	var tabIds;

	if (currentTabIds) {
		tabIds = JSON.parse(currentTabIds);
	} else {
		tabIds = [];
	}

	return tabIds;
};

/**
 * Broadcast message to all managed tabs
 *
 */

Manager.prototype.broadcast = function (key, value) {
	var data = {
		key: key,
		value: value
	};

    try {
        localStorage.setItem( 'broadcast', JSON.stringify(data));
    } catch (error) {}
};

Manager.prototype.handleEvent = function (event) {
    if (event.type === 'unload') {
        this.destroy();
    } else if (event.key === 'broadcast') {
        try {
            debugger;
        } catch ( error ) {}
    }
};

/**
 * Send message to a specific tab
 *
 */

Manager.prototype.send = function (id, key, value) {

};


/**
 * Associate data with a specific tab
 *
 */

Manager.prototype.set = function (id, key, value) {

};


/**
 * Retrieve data for a specific tab
 *
 */

Manager.prototype.get = function (id, key) {

};


// Expose the inter-tab manager

// if (typeof module === 'object' && module.exports) {
//     module.exports = Manager;
// } else {
//     this.it = Manager;
// }