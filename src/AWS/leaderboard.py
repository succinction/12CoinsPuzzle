import json
import boto3
from time import gmtime, strftime
from decimal import Decimal
from datetime import datetime
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')
games_table = dynamodb.Table('coinGames')
users_table = dynamodb.Table('coinUsers')
leader_table = dynamodb.Table('LeaderBoard')
now = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())

def lambda_handler(event, context):
    # try:
    if True:
        user_value = "__NOTHING__" if 'queryStringParameters' not in event else event['queryStringParameters'].get('user', None)
        response = users_table.get_item(Key={'user': user_value}) 
        
        main_json_record = {}
        bestPlayers = []
        
        if 'Item' in response:
            # print(f"response['Item'] {response['Item']}")
            for key, value in response['Item'].items():
                main_json_record[key] = value
        
        # if "pin" in main_json_record:
        #     if int(main_json_record['pin']) > 1:
        #         if "pin" in event:
        #             if int(event['pin']) != int(main_json_record['pin']):
        #                         return {
        #                             'statusCode': 401,
        #                             'body': 'PIN does not match. Retry or Choose a new user name.'
        #                         }
                        

###########################################################################

        games_response = games_table.scan(
            FilterExpression=Attr('user').eq(user_value)
            # KeyConditionExpression=Key('user').eq(user_value),
            # FilterExpression=Attr('gameNumber').exists()
        )
        game_records = games_response.get('Items', [])
        print(f"game_records {game_records}")
        
        def parse_date(date_str):
            return datetime.strptime(date_str, '%a, %d %b %Y %H:%M:%S %z')
        
        # Sort the list based on the parsed datetime objects
        sorted_game_records = sorted(game_records, key=lambda x: parse_date(x['date']), reverse=True)


###########################################################################
        leaderboard_response = leader_table.scan() 
        leader_records = leaderboard_response.get('Items', [])
        
        # main_json_record = {}
        # bestPlayers = []
        
        # print("----------------v")
        # for r in leader_records:
            # print(r)
        if len(leader_records) > 0:
            for lead_record in leader_records:
                json_record = {}
                for key, value in lead_record.items():
                    json_record[key] = value
                bestPlayers.insert(0, json_record)
            # print("bestPlayers" + str(bestPlayers))
        main_json_record['bestPlayers'] = bestPlayers
        main_json_record['yourLastGames'] = sorted_game_records
        # print("----------------^")
        
###########################################################################
###########################################################################

        if 'Item' in response:
        #     # print(f"response['Item'] {response['Item']}")
        #     for key, value in response['Item'].items():
        #         main_json_record[key] = value
            
            # for key, value in response_top10['Item'].items():
            #     json_record['bestPlayers'][key] = value
                
            
                
            response_body = json.dumps(main_json_record, default=str)
            lambda_response = {
                'statusCode': 200,
                'body': response_body,
                'headers': {
                    'Content-Type': 'application/json'
                }
            }
        else:
            # Handle the case where the record does not exist
            lambda_response = {
                'statusCode': 404,
                'body': 'Record not found'
            }
        return lambda_response
    # except Exception as e:
        # print(e)
        # return {
            # 'statusCode': 418,
            # 'body': 'something went wrong in the lambda_handler'
        # }