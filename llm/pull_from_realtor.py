import requests
import pandas as pd
import os

# to use, import the get_listings function, adjust parameters if needed. Currently set to around the university area.
# there are barely any Rentals on the site in Edmonton, so don't use that
# not scalable easily, but it works for now.
def get_listings(LatitudeMax=53.53198, LongitudeMax=-113.47878, LatitudeMin=53.50391,
    LongitudeMin=-113.55955, RentOrBuy="Buy", PriceMin=100000, PriceMax=350000, 
                   BedRange="1+", BathRange="1+"):
    
    # translating human readable requests into internal request codes
    TransactionTypeID = {
        "Rent": 3,
        "Buy": 2
    }

    ranges = {
        "1": "1-1",
        "1+": "1-0",
        "2": "2-2",
        "2+": "2-0",
        "3": "3-3",
        "3+": "3-0",
        "4": "4-4",
        "4+": "4-0",
        "5": "5-5",
        "5+": "5-0",
    }
    
    payload = create_payload(
        ZoomLevel=14, LatitudeMax=LatitudeMax, LongitudeMax=LongitudeMax, LatitudeMin=LatitudeMin,
        LongitudeMin=LongitudeMin, Sort="6-D", PropertyTypeGroupID=1, TransactionTypeId=TransactionTypeID[RentOrBuy],
        PriceMin=PriceMin, PriceMax=PriceMax, BedRange=ranges[BedRange],
        BathRange=ranges[BathRange], Currency="CAD", RecordsPerPage=100,
        ApplicationId=1, CultureId=1, Version=7.0, CurrentPage=1
    )
    url = "https://api2.realtor.ca/Listing.svc/PropertySearch_Post"
    headers = {
      'authority': 'api2.realtor.ca',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'cookie': 'visid_incap_2269415=Be5Pd9o3RBWZfxH2bu4FL6wZvGQAAAAAQUIPAAAAAABM9apfFHptLQaE9i4e+D02; nlbi_2269415=SIbLUvfRAAKFfhVEZ/XrMgAAAAAZZZgi0EHdZhp3yPDyFXKZ; _gcl_au=1.1.896118164.1690048944; _gid=GA1.2.601647300.1690048944; gig_bootstrap_3_mrQiIl6ov44s2X3j6NGWVZ9SDDtplqV7WgdcyEpGYnYxl7ygDWPQHqQqtpSiUfko=gigya-pr_ver4; ASP.NET_SessionId=jkla2zxkxueewzqwzvy1b2rl; visid_incap_2271082=s2TxuVJUQleFHStLwd9+qukevGQAAAAAQUIPAAAAAAAF+P9SSH5WKtm+taBW8HOZ; nlbi_2271082=qVKiDZI3FGQ0L0kwVPrQ3QAAAAAWGYL6AUWoGs6ydxG9yfBG; _ga_Y07J3B53QP=GS1.1.1690048944.1.1.1690051130.18.0.0; _ga=GA1.1.497362051.1690048944; _4c_=%7B%22_4c_s_%22%3A%22fVRRb9s4DP4rhQ%2FLU51KlizLBfLQS4ciQHcYbhkG7KVQJdoR6liGrMTtivz3o9wk3rq7C4JE%2FPjxk0RSfE2GDbTJNRUlITmlnJaEXyZP8NIn16%2BJtyb%2B7ZPrRJcFr7SSaS5llnIoZPooJUsF5FIoXULBWHKZPI9ahcx4yYWg9HCZ6O6o8ZpoZwC1aDnHL0mrHiPCD0RSJgiuO%2B%2FMToeH8NJF3gCPF715QoeBvdXwMFgTNlEgZ2JCN2DrTUBYCh7RzkfKPMvRGGxr3HAOLKWcwHNcwUpEH70beoixy413W7igNCo4zETybYyIx%2FVQgfcjbRNC119fXQ3DMK%2BdqxuYa7e9QlJvQzy%2FB9UE5%2BdaHTHM6wSnI3yv2nqn6jEt0XR1DeZihTVJKtX0gNhn7%2Fa21ZFy0zyCDzFu6XZt8FFuqVplIvQ39NZAG6xqnF%2B67Ra81aoZdzx7YpZjPWP%2BGofuKIstcIk%2FEe%2B8wfXdzcPX1S2avCyYyLA15mOLcFnymOOdb94lYLrr1VZ1f3x3bnsPe2gWlM%2BWuDX4Rc7mPCeiEB%2ByZUopm%2BcFNgqZ3atgw87AJ%2FU8cgQv2OzetfUZfWOzgvOJbNuRzITIfiIjOpIFjcpfnA8Lkd7OPt%2BBW5l%2BUVPyoNkz6UT7PEPsL7WFxRr8YJsGauU%2FZGTthhbwhLj8aLauDa59s27%2BnGElOsz%2Fyxr78867Xbe6XdDZ2qu2VzpY10bHyiyyM%2FMLKK83R5jMljvsnVa%2FLJY3t7EnYIyaegKxtbfYAv4ThI3D14e2MjayxtqZSDZQqV0TohnbVzeq76020D8F1yWH0ysklBU5KzNZ4CsLWDB8HyR%2BDm89MD5K8Stbkoz8zj5Kp6fOhfZ%2F4vPf4%2Fd2GiNSaMJoqgvOUq5ykqpKQMoqQgojjaQlnMcIjqSs5IQJdpSkcjpRdZLkWam0LkVaqCrD4oNOS2JESjKeKU0zDJgm0%2FGUXP7bLduT5JTg8zwraIySSLNdOPJOU5PJoiDvuIhE7klRvdd68%2Fthkhod8bb8F%2BqIxIr5d7v%2BF%2FVw%2BAc%3D%22%7D; incap_ses_674_2271082=fqk0DT6EMjjQauH0bYhaCaYrvGQAAAAAJbljoi72CavVH4w3n0NidQ==; nlbi_2271082_2147483392=ytWrZvv6mFZHjJkIVPrQ3QAAAAAEVyN1HD6n7a8UvbmPKmMe; reese84=3:cqb8Lvm38SxqGn8sPxcZtA==:NdiWzHnEqW51NbStxHUl7qGNrHH6lNsAVaTZt1NQkeOSpQT2X2bWnXktjBvdZkc1dQXGAHT0V8KLlVRGQyZpI5QCJFly9Mgte7DrGpbR33ofEu5ijKJ2WUrYPJg8+MbfhS+0zt+3FlOu5esMFeanPMT9CUnL4seUDzulhr2Dps6GsvkIS8Fn3zUymBl8ddMBHdHgsXg8mV/HjQkWqe5ylFNJ84gEnOVF4uIc/ibDMMAxAfnMs4jKY053gZNkUVB7yaG3WIocirtFu08JCmBPvbjWOj+xcRVH6lxodI/wEzy8XnON2lsdZCf2PrLJSzCs7V336pBqVwEGOkP+THqfMYDzwlOh7RFcw/+T3bVzjfPxwnQeOqKZqR115SjnNFitz3iQFhu7NxSEtvLBzxD3p91+T8KNWxTjzAKhMk3vnSePeEP3CxGyebxi6RUFb6oKUpTuICBhK59mANaEq3p+5ftkJZJahMI4G6OXxMIGIFo=:mzGhsow6KhqRG4a/omLbzRUlCPQ16jWvWGZY0T8wK+E=; nlbi_2269415_2147483392=ydDxa+eOQhnYVVy8Z/XrMgAAAAC7CF05C70O+3ScL0GDkUNQ; incap_ses_674_2269415=ObOKO/RiUQqf0+H0bYhaCYssvGQAAAAAZ79Xew0w6qUoWMCNwfezfQ==; reese84=3:OTjyLurOet1Jd0A58arISg==:bA4kF+Bz3Xn7lbe7QlnyNV7ygI0UWUa7RRyDBCGVBdCxNgDgqSKJqUB1SbNMmPtU56IoGrH4F0NeMqnQes9mftse7SBftTRXxCFuNWz5c1jpBNeRlVxEjdp4XDkifpWnjnIycWCwj840Mpf0p1UkgV20JWfdWtaXkPe9gPopniHZm6GlAQkYRU9nzTSoa/SLnHHsMTMcvTndFcC1ZfrU3iyESYSFM4UGh6oBPtRV5oB4JcWSoF9K+uyYPHkk+5pyd4mSShL5nloKTaNTsczWlgOGLfm1n5smPInD8fwHHsDLu8pIcZw9MOJKzwnBTymtdK4NIeOuVTaKyAvj0gkqOzN2thfalogZSUR9a/XUOIp3fUAKtK1UYSLRN3sp3U6QFpj+ZpYnMelyZ5hKUnCd5mznAi4OcONvMmOwhmGFZob2lwOSIhkS91Xy03UJP/PSxgqC9NuK87Lr8VENrKsNzA==:UMkMxYBHosIeyfOxspamP5reF5+bCAKSYad9luO/1yU=',
      'origin': 'https://www.realtor.ca',
      'referer': 'https://www.realtor.ca/',
      'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    }
    
    result = get_data_from_website(url, headers, payload)

    # If the data was retrieved successfully, you can process it here
    if result:
        df = pd.DataFrame.from_dict(result["Results"])
        return df


def create_payload(ZoomLevel, LatitudeMax, LongitudeMax, LatitudeMin, LongitudeMin,
                   Sort, PropertyTypeGroupID, TransactionTypeId, 
                   PriceMin, PriceMax, BedRange, BathRange, Currency, RecordsPerPage,
                   ApplicationId, CultureId, Version, CurrentPage):
    payload = (
        f"ZoomLevel={ZoomLevel}&LatitudeMax={LatitudeMax}&LongitudeMax={LongitudeMax}"
        f"&LatitudeMin={LatitudeMin}&LongitudeMin={LongitudeMin}&Sort={Sort}"
        f"&PropertyTypeGroupID={PropertyTypeGroupID}&TransactionTypeId={TransactionTypeId}"
        f"&PriceMin={PriceMin}&PriceMax={PriceMax}"
        f"&BedRange={BedRange}&BathRange={BathRange}&Currency={Currency}&RecordsPerPage={RecordsPerPage}"
        f"&ApplicationId={ApplicationId}&CultureId={CultureId}&Version={Version}"
        f"&CurrentPage={CurrentPage}"
    )
    return payload


# https call to website to retrieve listings using headers and parameters given in payload wrapper function
def get_data_from_website(url, headers, payload):
    try:
        response = requests.request("POST", url, headers=headers, data=payload)

        # Check if the request was successful (status code 200 indicates success)
        if response.status_code == 200:
            # The response content is usually in JSON format, so we can use the .json() method to parse it
            data = response.json()

            # Now you can work with the 'data' variable which contains the retrieved data
            return data

        else:
            print(f"Failed to retrieve data. Status code: {response.status_code}")
            return None

    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

    except ValueError as e:
        print(f"Error parsing JSON data: {e}")
        return None

def write_data_to_json(data_path): 
    
    listings_df = get_listings()
    
    for index, row in listings_df.iterrows():

        json_string = row.to_json(indent=4)
        filename = f"{data_path}/listing-{listings_df.loc[index, 'Id']}.json"

        if not os.path.exists(filename):
            with open(filename, 'w') as file:
                file.write(json_string)
        else:
            print("file already exists")