mockery
=======

Simulate SendGrid inbound webhook requests for testing.

It's not really pretty right now, but it does the job.


**Send 5 requests**

```
node mockery.js --url="http://example.com/inbound" --count=5
```

**Send 1 request with a custom boundary**

```
node mockery.js --url="http://example.com/inbound" --boundary="WS"
```