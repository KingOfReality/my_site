import requests


def check_url_with_virustotal(api_key, url):
    url = "https://www.virustotal.com/vtapi/v2/url/scan"
    params = {"apikey": api_key, "url": url}

    response = requests.post(url, params=params)

    if response.status_code == 200:
        response_json = response.json()
        if "permalink" in response_json:
            permalink = response_json["permalink"]
            print(
                "Scan submitted successfully. View the results at: {}".format(permalink)
            )
        else:
            print("Error occurred while submitting the URL to VirusTotal.")
    else:
        print("Error occurred while submitting the URL to VirusTotal.")


api_key = "629e79d290d230bf81cf0170fc38c499a19fcd7d5bb035c04f79b7737a714441"


# Prompt the user for input until the user enters "#stop#"
def start_input():
    while True:
        url = input('Enter the URL to be checked (enter "#stop#" to quit): ')
        if url == "#stop#":
            break
        check_url_with_virustotal(api_key, url)
