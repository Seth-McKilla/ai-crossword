from http.server import BaseHTTPRequestHandler
import json
class handler(BaseHTTPRequestHandler):

    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_HEAD(self):
        self._set_headers()

    def do_POST(self):
        content_type = self.headers.get('content-type')
    
        # refuse to receive non-json content
        if content_type == None or content_type != 'application/json':
            self.send_response(400)
            self.end_headers()
            error_message = {'error':'Invalid data type, only JSON format accepted.'}
            self.wfile.write(json.dumps(error_message).encode('utf-8'))
            return
            
        # read the message and convert it into a python dictionary
        length = int(self.headers.get('content-length'))

        inputs = json.loads(self.rfile.read(length))
        print(inputs)
        
        # run crossword logic here and set the results dictionary to output
        output = inputs
        
        # send the message back
        self._set_headers()
        self.wfile.write(json.dumps(output).encode('utf-8'))
        return
        