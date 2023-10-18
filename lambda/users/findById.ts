import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const dynamo = new DynamoDBClient({})
const client = DynamoDBDocumentClient.from(dynamo)

export const handler = async (events: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { id } = events.pathParameters!

  const data = await client.send(
    new GetCommand({
      TableName: "DynamoUsers",
      Key: {
        id
      }
    })
  )

  const response = {
    "statusCode": 200,
    "headers": {
      "Content-Type": "*/*"
    },
    "body": JSON.stringify(data.Item),
    "isBase64Encoded": false
  }

  return response;
}