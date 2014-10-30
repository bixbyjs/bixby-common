# bixby-common

This suite of components provides the common objects typically needed by any
Node.js application, including settings that can be tuned via configuration
files and logging facilities for informational and error messages.

## Install

    $ npm install bixby-common

## Usage

To utilize Bixby.js' common suite of components, register them with the IoC
container.

```javascript
IoC.use(require('bixby-common'));
```

### Table of Contents

##### Components

  - [Entity](#entity)
  - [Logger](#logger)
  - [Notifications](#notifications)
  - [Settings](#settings-2)

#### Entity

```javascript
exports['@require'] = [ 'entity' ];
```

The entity component provides a way to identify the application itself,
including any optional aliases.  This is typically utilized for security-related
purposes where stable identifiers are crucial.

###### Settings

This component will read settings within the `[entity]` section.

  - `{string} [id]` - application identifier
  - `{string[]} [aliases]` - additional application aliases

```toml
[entity]
id = "https://api.example.com/beepboop/v1"
aliases = [ "@api.example.com", "https://api.example.com/bebop/" ]
```

#### Logger

```javascript
exports['@require'] = [ 'logger' ];
```

The logger component provides a logger, powered by [`winston`](https://github.com/flatiron/winston).
Log transports and related options are configurable within the application's
configuration file.

###### Settings

This component will read settings within the `[logger]` section.

  - `{string} [level]` - logging level
  - `{string|string[]} [transport]` - log transports
  - `{string} [path]` - path to log file

By default, the logger will use both "console" and "file" transports, with
the following paths for log files:

  - Linux: `/var/log/<package-name>.log`
  - Mac OS X: `~/Library/Logs/<package-name>.log`

```toml
[logger]
level = "debug"
transport = "console"
```

```toml
[logger]
transport = "file"
path = "/var/log/app.log"
```

#### Notifications

```javascript
exports['@require'] = [ 'notifications' ];
```

The notifications component provides a shared notification center, powered by
[`notifications`](https://github.com/jaredhanson/node-notifications).  This is
useful for broadcasting events within a process, allowing communication between
fully decoupled subsystems.

#### Settings

```javascript
exports['@require'] = [ 'settings' ];
```

The settings component provides a mechanism to configure an application via
configuration files, powered by the [`decisions`](https://github.com/NodePrime/node-decisions)
module.  Configuration is preferably loaded from [TOML](https://github.com/toml-lang/toml)
files, though [YAML](http://www.yaml.org/) and [JSON](http://json.org/) are
supported as well.

## Tests

    $ make test

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014 NodePrime, Inc. <[http://www.nodeprime.com/](http://www.nodeprime.com/)>  
Copyright (c) 2014 Jared Hanson <[http://www.jaredhanson.net/](http://www.jaredhanson.net/)>
