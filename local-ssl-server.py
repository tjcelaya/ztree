#!/usr/bin/env python
# based on http://www.piware.de/2011/01/creating-an-https-server-in-python/
import BaseHTTPServer, SimpleHTTPServer
import ssl

try:
    httpd = BaseHTTPServer.HTTPServer(('localhost', 4443), SimpleHTTPServer.SimpleHTTPRequestHandler)
    httpd.socket = ssl.wrap_socket(httpd.socket, server_side=True, certfile='temp.pem')
    httpd.serve_forever()
except Exception, e:
    pass
finally:
    print('quitting')
    from sys import exit
    exit(0)
