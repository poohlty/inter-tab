
/**
 * Constructor for the inter-tab manager
 *
 * @param {Object} options
 * @api public
 */

function Manager(opts) {
    this.id = Math.random();

    var tabs = this.getTabs();
    tabs[this.id] = {};

    try {
        localStorage.setItem('tabs', JSON.stringify(tabs));
    } catch (error) {}

    // Listen to event when tab is closed or storage changes
    window.addEventListener('storage', this, false);
    window.addEventListener('unload', this, false);
}

Manager.prototype.destroy = function () {
    var tabs = this.getTabs();

    this.onDestroy(tabs[this.id]);

    delete tabs[this.id];

    try {
        localStorage.setItem('tabs', JSON.stringify(tabs));
    } catch (error) {}

    window.removeEventListener('storage', this, false);
    window.removeEventListener('unload', this, false);
};

Manager.prototype.getTabs = function () {
    var currentTabs = localStorage.tabs;

    if (currentTabs) {
        return JSON.parse(currentTabs);
    } else {
        return {};
    }
};

/**
 * Broadcast message to all managed tabs
 *
 */

Manager.prototype.broadcast = function (value) {
    var data = { value: value };

    try {
        localStorage.setItem('broadcast', JSON.stringify(data));
    } catch (error) {}

    try {
        localStorage.setItem('broadcast', JSON.stringify({}));
    } catch (error) {}
};

Manager.prototype.handleEvent = function (event) {
    if (event.type === 'unload') {
        this.destroy();
    } else if (event.key === 'broadcast') {
        // test for dummy broadcast
        if (event.newValue != "{}"){
            var bData = JSON.parse(event.newValue);
            try {
                this.onBroadcast(bData);
            } catch (error) {}
        }
    } else if (event.key === 'message') {
        var mData = JSON.parse(event.newValue);
        if (mData.id === this.id) {
            try {
                this.onMessage(mData);
            } catch (error) {}
        }
    }
};

Manager.prototype.onBroadcast = function (event) {
    console.log(event);
};

Manager.prototype.onMessage = function (event) {
    console.log(event);
};

Manager.prototype.onDestroy = function (tab) {
    console.log(tab);
};

/**
 * Send message to a specific tab
 *
 */

Manager.prototype.send = function (id, value) {
    var data = {
        id: id,
        value: value
    };

    try {
        localStorage.setItem('message', JSON.stringify(data));
    } catch (error) {}

    try {
        localStorage.setItem('message', JSON.stringify({}));
    } catch (error) {}
};

/**
 * Associate data with a specific tab
 *
 */

Manager.prototype.set = function (id, key, value) {
    var tabs = this.getTabs();

    if (tabs[id]) {
        tabs[id][key] = value;

        try {
            localStorage.setItem('tabs', JSON.stringify(tabs));
        } catch (error) {}
    }
};

/**
 * Retrieve data for a specific tab
 *
 */

Manager.prototype.get = function (id, key) {
    var tabs = this.getTabs();

    if (tabs[id]) {
        return tabs[id][key];
    } else {
        return;
    }
};

/**
 * Expose the inter-tab manager based on environment
 *
 */

if (typeof module === 'object' && module.exports) {
    module.exports = Manager;
} else {
    this.it = Manager;
}
