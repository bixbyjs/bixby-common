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
IoC.loader(require('bixby-common'));
```

#### Settings

```javascript
exports['@require'] = [ 'settings' ];
```

The settings component provides a mechanism to configure an application via
configuration files, powered by the [`decisions`](https://github.com/NodePrime/node-decisions)
module.  Configuration is preferably loaded from [TOML](https://github.com/toml-lang/toml)
files, though [YAML](http://www.yaml.org/) and [JSON](http://json.org/) is
supported as well.

#### Logger

```javascript
exports['@require'] = [ 'logger' ];
```

The logger component provides a logger, powered by [`winston`](https://github.com/flatiron/winston).
The log transport and related options are configurable within the application's
configuration file.


## Tests

    $ make test

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014 NodePrime, Inc. <[http://www.nodeprime.com/](http://jaredhanson.net/)>
Copyright (c) 2014 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
