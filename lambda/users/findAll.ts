import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const dynamo = new DynamoDBClient({})
const client = DynamoDBDocumentClient.from(dynamo)

export const handler = async (events: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const res = await client.send(
    new ScanCommand({
      TableName: 'DynamoUsers'
    })
  )

  const response = {
    'statusCode': 200,
    'headers': {
      'Content-Type': '*/*'
    },
    'body': JSON.stringify({
      success: true,
      body: res.Items
    }),
    'isBase64Encoded': false
  }
  return response
}