mockery
=======

Simulate SendGrid inbound webhook requests for testing.

This is great if you're building something with the inbound webhook and don't want to have to manually send an email every time you want to test something.

Options are configured via nconf, which means you can use CLI arguments, env variables, and/or a config.json file for configuration.

## Notes

Right now, it does not send valid **headers** or **spam_report** fields. It sends strings, but since I didn't feel like spending a year of my life writing fake header generation, they're just placeholder strings. If you feel like spending a year of your life writing fake header generation, a pull request would be much appreciated.

## Options

**url** (required): The URL you are testing

**count** (optional, defaults to _1_): How many fake emails you want to send

**boundary** (optional, defaults to _xYzZY_): If you don't know what this is, don't worry about it

## Examples

**Send 1 request**

```
node mockery.js --url="http://example.com/inbound"
```

**Send 5 requests**

```
node mockery.js --url="http://example.com/inbound" --count=5
```

**Send 1 request with a custom boundary**

```
node mockery.js --url="http://example.com/inbound" --boundary="WS"
```