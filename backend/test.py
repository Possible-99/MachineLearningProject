import requests
BASE = "http://127.0.0.1:5000/"


files = {'file': open('../store_data.csv', 'rb')}


r = requests.post(BASE + "api/priori", files=files)

print(r.text)