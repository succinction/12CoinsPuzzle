import json
import boto3
from time import gmtime, strftime
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
games_table = dynamodb.Table('coinGames')
users_table = dynamodb.Table('coinUsers')
now = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())

def lambda_handler(eventData, context):
    event = eventData['data']    
    raw_userRecord = dict( users_table.get_item(Key={'user': event['user']}) )
    userRecord = raw_userRecord['Item'] if 'Item' in raw_userRecord else {'new_record': "new_record"}    
    gamewon = event['won']
    scoring = 0 if gamewon == 0 else round(int(event['gameType']) / (1 + (int(event['duration']) / 60)))
    # scoring = 0 if gamewon == 0 else round(int(event['gameType']) / (1 + (int(event['duration']) / 60)), 2)
    game_response = games_table.put_item(Item={
            'user': event['user'],
            'eventTime':now,
            'gameNumber':event['gameNumber'],
            'numberOfMeasurements':event['numberOfMeasurements'],
            'measurements':event['measurements'],
            'gameType':event['gameType'],
            'duration':event['duration'],
            'falseCoin':event['falseCoin'],
            'finalTime':event['finalTime'],
            'won':event['won'],
            'score': scoring,
            'cheat': event['cheat']
            })
    
    if "score" in userRecord: 
        if gamewon == 1:
            userRecord['score'] = userRecord['score'] + scoring
            userRecord['best_score'] = scoring if scoring > userRecord['best_score'] else userRecord['best_score']
        userRecord['attempts'] += 1
        won = 1 if int(gamewon) == 1 else 0
        userRecord['wins'] += won
        userRecord['current_streak'] = userRecord['current_streak'] + won if won == 1 else 0
        userRecord['best_streak'] = userRecord['current_streak'] if userRecord['current_streak'] > userRecord['best_streak'] else userRecord['best_streak']
        userRecord['overall_score'] = round((
                    (userRecord['best_streak'] + userRecord['current_streak']) / 2) + userRecord['best_score'] + (userRecord['score'] / userRecord['attempts']))
                    # (userRecord.best_streak + userRecord.current_streak) / 2) + userRecord.best_score + (userRecord.score / userRecord.attempts), 2)

        print(f"***userRecord {userRecord}")
                    
        user_response = users_table.put_item(Item={
                'user': event['user'],
                'score': userRecord['score'],
                'best_score': userRecord['best_score'],
                'attempts':userRecord['attempts'],
                'wins': userRecord['wins'],
                'current_streak': userRecord['current_streak'],
                'best_streak': userRecord['best_streak'],
                'overall_score': userRecord['overall_score']
        })
    else:
        new_user_response = users_table.put_item(Item={
                'user': event['user'],
                'score': scoring,
                'best_score': scoring,
                'attempts': 1,
                'wins': gamewon,
                'current_streak': gamewon,
                'best_streak': gamewon,
                'overall_score': gamewon
        })
            
    return {
        'statusCode': 200,
        'body': json.dumps( ' --TEST Lambda, userRecord => ' + str(userRecord) )
    }