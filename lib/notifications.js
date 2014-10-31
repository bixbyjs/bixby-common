/**
 * Module dependencies.
 */
var NotificationCenter = require('notifications').NotificationCenter;


/**
 * Create a notification center.
 *
 * A notification center provides a mechanism for broadcasting notifications
 * within the application.  Observers listen for these notifications, handling
 * them as necessary in a manner that is completely decoupled from the subsystem
 * that posts the notification.
 *
 * To utilize this component within an application, configure the IoC loader
 * to use common components.
 *
 *     IoC.use(require('bixby-common'));
 */
exports = module.exports = function() {
  return new NotificationCenter();
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [];
