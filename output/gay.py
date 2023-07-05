import json
import socket

# Define the server address and port
SERVER_ADDRESS = 'localhost'
SERVER_PORT = 9999

# Define the codes for the messages
LOGIN_CODE = 1
SIGNUP_CODE = 2

# Connect to the server
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((SERVER_ADDRESS, SERVER_PORT))


def send_message(code, data):

    json_data = json.dumps(data).encode()
    bin_str = format(code, '08b')
    sock.sendall(bin_str.encode() +
                 '{:032b}'.format(len(json_data)).encode() + json_data)

    # Receive the response from the server
    response = sock.recv(1024).decode()

    # Print the response
    print(response)


# Send a login message
login_data = {'username': 'pedro', 'password': '1234'}
send_message(LOGIN_CODE, login_data)

# Send create room message three times
for _ in range(3):
    # Take user input for the room name
    room_name = input("Enter the room name: ")

    create_room_data = {
        'name': room_name,
        'maxUsers': 5,
        'timeOut': 2,
        'questionCount': 10
    }
    send_message(14, create_room_data)
login_data = {}
send_message(11, login_data)
# Close the socket
sock.close()
