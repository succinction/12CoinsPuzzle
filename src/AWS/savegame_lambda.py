import json
import boto3
from time import gmtime, strftime
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
games_table = dynamodb.Table('coinGames')
users_table = dynamodb.Table('coinUsers')
leader_table = dynamodb.Table('LeaderBoard')
now = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())

def lambda_handler(eventData, context):
    try:
    # if True:
        event = eventData['data']
        event_user = "__NOTHING__" if 'user' not in event else event['user']
        raw_userRecord = dict( users_table.get_item(Key={'user': event_user }) )
        userRecord = raw_userRecord['Item'] if 'Item' in raw_userRecord else {'new_record': "new_record"}
        gamewon = event['won']
        scoring = 0 if gamewon == 0 else round(10 * ( int(event['gameType']) / (1 + (int(event['duration']) / 60))))
        game_response = games_table.put_item(Item={
                'user': event['user'],
                'date':now,
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
            userRecord['overall_score'] = round(10 * ((
                        (userRecord['best_streak'] + userRecord['current_streak']) / 2) + userRecord['best_score'] + (userRecord['score'] / userRecord['attempts'])))

            ################################################################################
            leaderboard_response = leader_table.scan() 
            leader_records = leaderboard_response.get('Items', [])
            leader_rank = -1
            leader_records_ranked = {}
            for item in leader_records:
                leader_records_ranked[item['rank']] = item
            omitted = 99
            for i in range(len(leader_records)):
                # print("================================================v")
                if int(leader_records_ranked[i]['overall_score']) < int(userRecord['overall_score']):
                    leader_rank = leader_rank if leader_rank < i and leader_rank != -1 else i
                    
                aa = str(leader_records_ranked[i]['user'])
                bb = str(userRecord['user'])
                if aa == bb:
                    omitted = i
                # print("================================================^")

            if leader_rank != -1:
                userRecord.update({'rank': leader_rank})
                new_leader_records = []
                for i in range(len(leader_records) + (0 if omitted < 99 else 1)):
                    if i == leader_rank:
                        new_leader_records.append(userRecord)
                    else:
                        index = i if i < leader_rank else i-1
                        index = index+1 if omitted <= index else index
                        nr = leader_records_ranked[int(index)]
                        new_leader_records.append(nr)
                    new_leader_records[i]['rank'] = i    
                
                for new_lead_record in new_leader_records[:10]:
                    leader_table.put_item(Item={
                        'rank': new_lead_record['rank'],
                        'user': new_lead_record['user'],
                        'score': new_lead_record['score'],
                        'best_score': new_lead_record['best_score'],
                        'attempts':new_lead_record['attempts'],
                        'wins': new_lead_record['wins'],
                        'current_streak': new_lead_record['current_streak'],
                        'best_streak': new_lead_record['best_streak'],
                        'overall_score': new_lead_record['overall_score']
                    })
            
            user_response = users_table.put_item(Item={
                    'user': event['user'],
                    'score': userRecord['score'],
                    'best_score': userRecord['best_score'],
                    'attempts':userRecord['attempts'],
                    'wins': userRecord['wins'],
                    'current_streak': userRecord['current_streak'],
                    'best_streak': userRecord['best_streak'],
                    'overall_score': userRecord['overall_score'],
                    'date': now
            })
        else:
            new_user_response = users_table.put_item(Item={
                    'user': event['user'],
                    'date': now,
                    'score': scoring,
                    'best_score': scoring,
                    'attempts': 1,
                    'wins': gamewon,
                    'current_streak': gamewon,
                    'best_streak': gamewon,
                    'overall_score': scoring
            })
                
        return {
            'statusCode': 200,
            'body': json.dumps( 'userRecord => ' + str(userRecord) )
        }
    except Exception as e:
        print(f"e {e}")
        return {
            'statusCode': 418,
            'body': 'something went wrong in the lambda_handler'
        }